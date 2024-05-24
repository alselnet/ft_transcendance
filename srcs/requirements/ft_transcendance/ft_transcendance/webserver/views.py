from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.template.loader import get_template
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import viewsets, status, request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import GameSummarySerializer, UserRegistrationSerializer
from .models import GameSummary
import logging, requests

logger = logging.getLogger(__name__)

class GameSummaryView(viewsets.ModelViewSet):
    serializer_class = GameSummarySerializer
    queryset = GameSummary.objects.all()

class UserRegistration(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = authenticate(username=serializer.data.get('username'), password=serializer.data.get('password'))
            refresh = RefreshToken.for_user(user)
            return Response({
               'username': serializer.data['username'],
                'email': serializer.data['email'],
                'message': 'User created successfully',
                'refresh': str(refresh),
                'access': str(refresh.acces_token)
			}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserSignin(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message':'successful login'
            }, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
def FortyTwoLogin(request):
    client_id = 'u-s4t2ud-4a8765005fe04140b558efe9051388e6a5d1f458ba5b995ac961b074239af7f7'
    redirect_uri = 'https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-4a8765005fe04140b558efe9051388e6a5d1f458ba5b995ac961b074239af7f7&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fapi%2Fcallback&response_type=code'
    auth_url = f"https://api.intra.42.fr/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type=code"
    return redirect(auth_url)

class Callback(APIView):
    def get(self, request):
        logger.info("------------->1<-------------")
        code = request.GET.get('code')
        logger.info(f"code:{code}")
        client_id = 'u-s4t2ud-4a8765005fe04140b558efe9051388e6a5d1f458ba5b995ac961b074239af7f7'
        client_secret = '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'
        redirect_uri = 'http://localhost:8000/api/callback'
        token_url = 'https://api.intra.42.fr/oauth/token'
        data = {
            'grant_type': 'authorization_code',
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
            'redirect_uri': redirect_uri
            # 'state': optional security measure to proctect against cross forgery attacks
        }
        
        logger.info("------------->2<-------------")
        try:
            response = requests.post(token_url, data=data)
            logger.info("------------->3<-------------")
            logger.info("------------->try block<-------------")
            response.raise_for_status()
            token_info = response.json()
            logger.info(f'Token response: {token_info}') # tmp
            access_token = token_info['access_token']  
            user_info_url = 'https://api.intra.42.fr/v2/me'
            headers = {'Authorization': f'Bearer {access_token}'}
            logger.info("------------->querying api for user info<-------------")
            user_info_response = requests.get(user_info_url, headers=headers)
            user_info_response.raise_for_status()
            user_info = user_info_response.json()
            logger.info(f'user info: {user_info}') # tmp
            username = user_info['login']
            email = user_info['email']
            user, created = User.objects.get_or_create(username=username, defaults={'email': email})
            
            if not created:
                user.email = email
                user.save()
            
            return Response({'message': 'User registered successfully'}, status=status.HTTP_200_OK)
        # SHOULD DELIVER A JWT AND REDIRECT TO PROFILE PAGE
        except requests.exceptions.RequestException as e:
            return Response({'error': 'Failed to obtain access token', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)