from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import EmailUpdateSerializer, PasswordUpdateSerializer, UsernameUpdateSerializer, ProfileSerializer
from .models import GameSummary, Profile, Friend

class MeView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)
        
        user_data = {
            'username': user.username,
            'email': user.email,
            'status': profile.status,
            'two_factors_auth_status': profile.two_factors_auth_status,
            'mail_confirmation_status': profile.mail_confirmation_status,
            'avatar': profile.avatar.url,
            'phone_number': str(profile.phone_number),
        }

        return Response(user_data, status=200)


class MyGameHistory(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        won_games = GameSummary.objects.filter(winner=user)
        lost_games = GameSummary.objects.filter(loser=user)
        
        game_history = list(won_games) + list(lost_games)
        
        game_history_data = [
            {
                'winner': game.winner.username if game.winner else None,
                'loser': game.loser.username if game.loser else None,
                'score': game.score, #score j1 score j2
                #local : bool
                'date_time': game.date_time
            }
            for game in game_history
        ]

        return Response(game_history_data, status=200)

    def post(self, request):
        user = request.user
        data = request.data
        
        winner_username = data.get('winner')
        loser_username = data.get('loser')
        score = data.get('score')
        
        if not all([winner_username, loser_username, score]):
            raise ValidationError('Winner, loser, and score fields are required.')

		#add a locale check
        if winner_username != user.username:
            return Response({'error': 'You must be the winner to create a game summary.'}, status=status.HTTP_403_FORBIDDEN)
    
        try:
            winner = User.objects.get(username=winner_username)
            loser = User.objects.get(username=loser_username)

        except User.DoesNotExist:
            return Response({'error': 'Winner or loser not found.'}, status=status.HTTP_400_BAD_REQUEST)

        game_summary = GameSummary.objects.create(
            winner=winner,
            loser=loser,
            score=score
        )
        
        game_summary_data = {
            'winner': game_summary.winner.username if game_summary.winner else None,
            'loser': game_summary.loser.username if game_summary.loser else None,
            'score': game_summary.score,
            'date_time': game_summary.date_time
        }

        return Response(game_summary_data, status=status.HTTP_201_CREATED)


class FriendListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, username):
        user = request.user
        friends = Friend.objects.filter(user=user)
        friendsof = Friend.object.filter(friend=user)
        friendlist_data = [
            {'friend': friend.friend.username} for friend in friends
        ] + [
            {'friend': friend.user.username} for friend in friendsof
        ]

        return Response(friendlist_data, status=200)
	

class UpdateAvatarView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser) # Definit les parseurs utilises -> typiquement pour les DL de fichiers

    def post(self, request):
        profile = request.user.profile

        serializer = ProfileSerializer(profile, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateEmailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = EmailUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUsernameView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UsernameUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdatePasswordView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = PasswordUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UpdateStatusView(APIView):

    def put(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)
        serializer = ProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class PublicUserInfoView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        profile = Profile.objects.get(user=user)
        user_data = {
            'username': user.username,
            'status': profile.status,
            'avatar': profile.avatar.url,
        }

        return Response(user_data, status=200)


class PublicGameHistoryView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        user = get_object_or_404(User, username=username)
        won_games = GameSummary.objects.filter(winner=user)
        lost_games = GameSummary.objects.filter(loser=user)
        
        game_history = list(won_games) + list(lost_games)
        
        game_history_data = [
            {
                'winner': game.winner.username if game.winner else None,
                'loser': game.loser.username if game.loser else None,
                'score': game.score,
                'date_time': game.date_time
            }
            for game in game_history
        ]

        return Response(game_history_data, status=200)


class AddFriendView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, username):
        user = request.user
        friend = get_object_or_404(User, username=username)

        if Friend.objects.filter(user=user, friend=friend).exists():
            return Response({'detail': 'Already friends'}, status=status.HTTP_400_BAD_REQUEST)

        Friend.objects.create(user=user, friend=friend)
        return Response({'detail': 'Friend added'}, status=status.HTTP_201_CREATED)


class RemoveFriendView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, username):
        user = request.user
        friend = get_object_or_404(User, username=username)

        friendship = Friend.objects.filter(user=user, friend=friend).first()
        if not friendship:
            return Response({'detail': 'Friendship does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        friendship.delete()
        return Response({'detail': 'Friend removed'}, status=status.HTTP_204_NO_CONTENT)