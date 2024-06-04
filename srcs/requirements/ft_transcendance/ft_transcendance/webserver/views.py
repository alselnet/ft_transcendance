from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.template.loader import get_template
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import viewsets, status, request
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import GameSummarySerializer, UserRegistrationSerializer, TwoFactorsCodeSerializer
from .models import GameSummary, Profile
import logging, requests
from django.core.mail import send_mail, EmailMessage
from ft_transcendance.settings import EMAIL_HOST_USER

logger = logging.getLogger(__name__)

class Generate2FACodeView(APIView):
    def post(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        # code = ''.join(random.choices('0123456789', k=5))
        two_factors_code, created = TwoFactorsCode.objects.get_or_create(user=user)
        # two_factors_code.number = code
        two_factors_code.save()

        subject = 'Your 2FA Code'
        message = f'Your 2FA code is {two_factors_code.number}'
        recipient_list = [user.email]

        try:
            send_mail(subject, message, EMAIL_HOST_USER, recipient_list)
            logger.info(f"2FA code sent to {user.email}")

            serializer = TwoFactorsCodeSerializer(two_factors_code)
            return Response(serializer, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error sending email: {str(e)}")
            return Response({'error': 'Failed to send 2FA code'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


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
        code = request.GET.get('code')
        client_id = settings.CLIENT_ID
        client_secret = settings.CLIENT_SECRET
        redirect_uri = settings.REDIRECT_URI
        token_url = 'https://api.intra.42.fr/oauth/token'
        data = {
            'grant_type': 'authorization_code',
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
            'redirect_uri': redirect_uri
        }
        try:
            response = requests.post(token_url, data=data)
            response.raise_for_status()
            token_info = response.json()
            access_token = token_info['access_token']  
            user_info_url = 'https://api.intra.42.fr/v2/me'
            headers = {'Authorization': f'Bearer {access_token}'}
            user_info_response = requests.get(user_info_url, headers=headers)
            user_info_response.raise_for_status()
            user_info = user_info_response.json()
            username = user_info['login']
            email = user_info['email']
            user, created = User.objects.get_or_create(username=username, defaults={'email': email})
            
            if not created:
                user.email = email
                user.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'User registered successfully'
                }, status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            return Response({'error': 'Failed to obtain access token', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)
