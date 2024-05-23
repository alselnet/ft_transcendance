from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template
from django.contrib.auth import authenticate
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import GameSummarySerializer, UserRegistrationSerializer
from .models import GameSummary

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

# class fortytwologin(APIView):
    
def home(request):
    return render(request, 'ft_transcendance/home.html')