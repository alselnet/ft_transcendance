import logging, requests, qrcode, json, pyotp
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.core.files.base import ContentFile
from django.http import JsonResponse, HttpResponse
from django.middleware.csrf import get_token
from django.shortcuts import redirect
from django.template.loader import render_to_string
from django.urls import reverse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from ft_transcendance.settings import EMAIL_HOST_USER
from users.models import Profile, GameSummary
from .utils import generate_token, verify_token, resize_image, crop_to_square
from .serializers import UserRegistrationSerializer, Update2FAStatusSerializer, DeleteUserSerializer
from io import BytesIO
from PIL import Image

logger = logging.getLogger(__name__)


class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            user = authenticate(username=request.data.get('username'), password=request.data.get('password'))
            profile = Profile.objects.get(user=user)
            profile.status = 'online'
            profile.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'User created successfully',
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': serializer.data['username'],
                'email': serializer.data['email'],
			}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDeletionView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    logger.info("Deleting Account\n")

    def delete(self, request):
        serializer = DeleteUserSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        password = serializer.validated_data.get('password')
        user = authenticate(username=request.user.username, password=password)

        if not user:
            return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = request.user
            game_summaries = GameSummary.objects.filter(winner=user) | GameSummary.objects.filter(loser=user)
            for game in game_summaries:
                winner_exists = True if game.winner and User.objects.filter(username=game.winner.username).exists() else False
                loser_exists = True if game.loser and User.objects.filter(username=game.loser.username).exists() else False
                
                if not winner_exists or not loser_exists:
                    game.delete()

            user.delete()
            return Response({"message": "User and related game summaries deleted successfully"}, status=status.HTTP_200_OK)
        
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

class UserSigninView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user:
            profile = Profile.objects.get(user=user)
            profile.status = 'online'
            profile.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'message': 'successful login',
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': username
            }, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    

class UserSignoutView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)
        profile.status = 'offline'
        profile.save()

        return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        

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
            # logger.info("Réponse de l'intra 42: %s", json.dumps(user_info, indent=4))
            username = user_info['login']
            email = user_info['email']
            avatar_url = user_info['image']['versions']['small']
            logger.info("Link de l'intra 42: %s", avatar_url)
            
            user, created = User.objects.get_or_create(username=username)
            
            if not created:
                user.email = email
                user.save()

            profile = Profile.objects.get(user=user)

            response = requests.get(avatar_url)
            response.raise_for_status()
            img = Image.open(BytesIO(response.content))
            img = crop_to_square(img)
            img = resize_image(img, size=(300, 300))
            buffer = BytesIO()
            img.save(buffer, format='PNG')
            filebuffer = ContentFile(buffer.getvalue())
            profile.avatar.save(f"{user.username}.png", filebuffer, save=False)
            profile.status = 'online'
            profile.fortytwo_account = True
            profile.save()

            refresh = RefreshToken.for_user(user)
            redirect_url = f"https://localhost/callback#access={refresh.access_token}&refresh={refresh}"
            return redirect(redirect_url)
        except requests.exceptions.RequestException as e:
            return Response({'error': 'Failed to obtain access token', 'details': str(e)}, status=status.HTTP_400_BAD_REQUEST)


def CsrfTokenView(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})


class ConfirmEmailView(APIView):
    def get(self, request, token=None):
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
            path = reverse('confirm-email', args=[token])
            confirm_url = f"https://localhost:4443{path}"

            subject = 'Email Confirmation'
            message = f"""
            Bonjour,

            Merci de vous être inscrit. Veuillez confirmer votre adresse email en cliquant sur le lien ci-dessous :
            
            {confirm_url}
            
            Merci,
            L'équipe
            """
            send_mail(subject, message, settings.EMAIL_HOST_USER, [email])

            return Response({'message': 'Confirmation email sent'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)


class InitialAuthenticationView(APIView):

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)
        if user is not None:
            # Authentification réussie, retourne une réponse positive sans générer les tokens
            return Response({'message': 'Authentication successful', 'username': username}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class Generate2FACodeView(APIView):
    def post(self, request):
        logger.info('Requête reçue pour générer un code 2FA')
        tfa_token = request.data.get('tfa_token')
        logger.debug(f'tfa_token reçu : {tfa_token}')

        if not tfa_token:
            logger.error('TFA secret est manquant dans la requête')
            return Response({'error': 'TFA secret is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            profile = Profile.objects.get(tfa_token=tfa_token)
            user = profile.user
            logger.debug(f'Utilisateur trouvé : {user.username}')
        except Profile.DoesNotExist:
            logger.error('TFA secret invalide')
            return Response({'error': 'Invalid TFA secret'}, status=status.HTTP_400_BAD_REQUEST)

        method = profile.two_fa_method
        logger.debug(f'Méthode 2FA trouvée : {method}')

        if not profile.totp_secret:
            logger.error('TOTP secret non défini pour cet utilisateur')
            return Response({'error': 'TOTP secret is not set for this user'}, status=status.HTTP_400_BAD_REQUEST)

        if method == 'authenticator':
            totp = pyotp.TOTP(profile.totp_secret)
            uri = totp.provisioning_uri(user.username, issuer_name="Pong")
            qr = qrcode.make(uri)

            buffer = BytesIO()
            qr.save(buffer, format="PNG")
            buffer.seek(0)

            response = HttpResponse(buffer, content_type="image/png")
            logger.info('QR code généré pour authenticator')
            return response

        elif method == 'email':
            if not profile.mail_confirmation_status:
                logger.error('Email non confirmé')
                return Response({'error': 'Email is not confirmed'}, status=status.HTTP_400_BAD_REQUEST)

            totp = pyotp.TOTP(profile.totp_secret)
            totp_code = totp.now()

            subject = 'Your 2FA Code'
            message = f'Your 2FA code is {totp_code}'
            recipient_list = [user.email]

            try:
                send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list)
                logger.info(f"Code 2FA envoyé à {user.email}")

                return Response({'message': '2FA code sent via email'}, status=status.HTTP_200_OK)
            except Exception as e:
                logger.error(f"Erreur lors de l'envoi de l'email : {str(e)}")
                return Response({'error': 'Failed to send 2FA code via email'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        else:
            logger.error('Méthode 2FA invalide dans le profil')
            return Response({'error': 'Invalid 2FA method in profile'}, status=status.HTTP_400_BAD_REQUEST)

class Validate2FACodeView(APIView):
    def post(self, request):
        tfa_token = request.data.get('tfa_token')
        code = request.data.get('code')

        if not tfa_token or not code:
            return Response({'error': 'TFA secret and code are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            profile = Profile.objects.get(tfa_token=tfa_token)
            user = profile.user
        except Profile.DoesNotExist:
            return Response({'error': 'Invalid TFA secret'}, status=status.HTTP_400_BAD_REQUEST)

        totp = pyotp.TOTP(profile.totp_secret)

        if totp.verify(code):
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token

            profile.tfa_token = pyotp.random_base32()
            profile.save()
            return Response({
                'access': str(access),
                'refresh': str(refresh),
                'message': '2FA code is valid'
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid 2FA code'}, status=status.HTTP_400_BAD_REQUEST)


class Update2FAStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        logger.info("POST request received")
        logger.info(f"Request data: {request.data}")
        
        user = request.user
        profile = Profile.objects.get(user=user)
        
        if not profile.totp_secret:
            profile.totp_secret = pyotp.random_base32()
            
        profile.tfa_token = pyotp.random_base32()
        profile.save()

        serializer = Update2FAStatusSerializer(data=request.data)
        if serializer.is_valid():
            two_fa_method = serializer.validated_data['method']
        
            if two_fa_method == 'email' and not profile.mail_confirmation_status:
                return Response({'error': 'Email is not confirmed'}, status=status.HTTP_400_BAD_REQUEST)
            
            profile.two_fa_method = two_fa_method
            profile.save()
            
            return Response({'message': '2FA method updated successfully'}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)