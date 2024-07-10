import logging, requests
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import redirect
from django.template.loader import render_to_string
from django.urls import reverse
from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from twilio.rest import Client
from ft_transcendance.settings import EMAIL_HOST_USER
from users.models import Profile
from .models import TwoFactorsCode
from .utils import generate_token, verify_token
from .serializers import UserRegistrationSerializer, TwoFactorsCodeSerializer

logger = logging.getLogger(__name__)

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'message': 'User created successfully',
                'username': serializer.data['username'],
                'email': serializer.data['email'],
			}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserSigninView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': username,
                'message':'successful login'
            }, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
def FortyTwoLoginView(request):
    client_id = settings.CLIENT_ID
    redirect_uri = settings.REDIRECT_URI
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
                'message': 'User registered successfully',
                'username': username
                }, status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            return Response({'error': 'Failed to obtain access token', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)

def CsrfTokenView(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})

class ConfirmEmailView(APIView):
    def get(self, request, token):
        email = verify_token(token)
        if email:
            try:
                user = User.objects.get(email=email)
                user.profile.mail_confirmation_status = True
                user.profile.save()
                return Response({'message': 'Email confirmed'}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({'error': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)


class SendConfirmationEmailView(APIView):
    def post(self, request):
        email = request.data.get('email')
        try:
            user = User.objects.get(email=email)
            token = generate_token(email)
            confirm_url = request.build_absolute_uri(reverse('confirm-email', args=[token])) # construit l'url de confirmation

            subject = 'Email Confirmation'
            message = render_to_string('confirmation_email.html', {'confirm_url': confirm_url})
            send_mail(subject, message, settings.EMAIL_HOST_USER, [email])

            return Response({'message': 'Confirmation email sent'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)

class Generate2FACodeView(APIView):
    def post(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        method = request.data.get('method')

        # code = ''.join(random.choices('0123456789', k=5))
        two_factors_code, created = TwoFactorsCode.objects.get_or_create(user=user)
        # two_factors_code.number = code
        two_factors_code.save()

        if method == 'sms':
            profile = Profile.objects.get(user=user)
            phone_number = profile.phone_number
            if not phone_number:
                return Response({'error': 'No phone number provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                phone_number = '0652453352'
                client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
                message = client.message.create(
                    body=f'Your 2FA code is {two_factors_code.number}',
                    from_=settings.TWILIO_PHONE_NUMBER,
                    to=phone_number
                )
                logger.info(f"2FA code sent to {phone_number}")

                serializer = TwoFactorsCodeSerializer(two_factors_code)
                return Response(serializer, status=status.HTTP_200_OK)
            except Exception as e:
                logger.error(f"Error sending SMS: {str(e)}")
                return Response({'error': 'Failed to send 2FA code via SMS'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        elif method == 'email':
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
                return Response({'error': 'Failed to send 2FA code via email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
