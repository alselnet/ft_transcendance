from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import EmailUpdateSerializer, PasswordUpdateSerializer, UsernameUpdateSerializer, AvatarSerializer, StatusUpdateSerializer
from .models import GameSummary, Profile, Friend
from .utils import get_object_or_none
import logging

logger = logging.getLogger(__name__)


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
            'two_fa_method': profile.two_fa_method,
            'mail_confirmation_status': profile.mail_confirmation_status,
            'avatar': profile.avatar.url,
            'scored_points': profile.scored_points,
            'conceded_points': profile.conceded_points,
            'played_games': profile.played_games,
            'won_games': profile.won_games,
            'perfect_wins': profile.perfect_wins,
            'fortytwo_account': profile.fortytwo_account,
            'totp_secret': profile.totp_secret
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
                'user': user.username,
                'winner': game.winner.username if game.winner else 'Invité',
                'winner_avatar': game.winner.profile.avatar.url if game.winner else 'https://localhost/media/default.png',
				'loser': game.loser.username if game.loser else 'Invité',
                'loser_avatar': game.loser.profile.avatar.url if game.loser else 'https://localhost/media/default.png',
                'winner_score': game.winner_score,
                'loser_score': game.loser_score,
                'perfect': game.perfect,
               	'local_game': game.local_game,
                'date_time': game.date_time
            }
            for game in game_history
        ]

        return Response(game_history_data, status=200)

    def post(self, request):
#GETTING DATA FROM FRONT
        user = request.user
        data = request.data
        
        winner_username = data.get('winner_username')
        loser_username = data.get('loser_username')
        winner_score = data.get('winner_score')
        loser_score = data.get('loser_score')
        perfect = data.get('perfect')
        local_game = data.get('local_game')
        
        if not all(key in data for key in ['winner_username', 'loser_username', 'winner_score', 'loser_score', 'perfect', 'local_game']):
            raise ValidationError('winner_username, loser_username, winner_score, loser_score, perfect and local_game fields are required.')

# UPDATING GAME STATS
        if local_game is False:
            if winner_username != user.username:
                return Response({'error': 'You must be the winner to create a game summary.'}, status=status.HTTP_403_FORBIDDEN)
            winner = get_object_or_none(User, username=winner_username)
            loser = get_object_or_none(User, username=loser_username)
            if (winner is None or loser is None):
                return Response({'error': 'Winner user or loser user not found.'}, status=status.HTTP_400_BAD_REQUEST)
            winner_profile = winner.profile
            loser_profile = loser.profile
            winner_profile.scored_points += winner_score
            winner_profile.conceded_points += loser_score
            winner_profile.played_games += 1
            winner_profile.won_games +=1
            if perfect:
                winner_profile.perfect_wins += 1
            winner_profile.save()

            loser_profile.scored_points += loser_score
            loser_profile.conceded_points += winner_score
            loser_profile.played_games += 1
            loser_profile.save()
		
        else:
            winner = get_object_or_none(User, username=winner_username)
            loser = get_object_or_none(User, username=loser_username)
            if (winner is None and loser is None):
                return Response({'error': 'Winner user or loser user not found.'}, status=status.HTTP_400_BAD_REQUEST)
            if user.username == winner_username:
                user.profile.scored_points += winner_score
                user.profile.conceded_points += loser_score
                user.profile.won_games +=1
                user.profile.played_games += 1
                if perfect:
                    user.profile.perfect_wins += 1
                user.profile.save()
            else:
                user.profile.scored_points += loser_score
                user.profile.conceded_points += winner_score
                user.profile.played_games += 1
                user.profile.save()
                
#CREATING GAME SUMMARY INSTANCE
        game_summary = GameSummary.objects.create(
            winner = winner,
            loser = loser,
            winner_score = winner_score,
            perfect = perfect,
            loser_score =  loser_score,
            local_game = local_game
        )

 #SENDING RELEVANT DATA BACK       
        game_summary_data = {
            'winner': game_summary.winner.username if game_summary.winner else None,
            'loser': game_summary.loser.username if game_summary.loser else None,
            'winner_score': game_summary.winner_score,
            'loser_score': game_summary.loser_score,
            'perfect': game_summary.perfect,
            'local_game': game_summary.local_game,
            'date_time': game_summary.date_time
        }

        return Response(game_summary_data, status=status.HTTP_201_CREATED)


class FriendListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        friends = Friend.objects.filter(user=user)
        friendlist_data = [
				{
					'username': friend.friend.username,
					'status': friend.friend.profile.status,
					'avatar': friend.friend.profile.avatar.url
				} 
				for friend in friends
			]

        return Response(friendlist_data, status=200)
	

class UpdateAvatarView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser) # Definit les parseurs utilises -> typiquement pour les DL de fichiers

    def post(self, request):
        profile = request.user.profile
        if profile.fortytwo_account is True:
            return Response({'error': '42 accounts data can only be edited on intra.42.fr'}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = AvatarSerializer(profile, data=request.data)

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
        profile = request.user.profile
        if profile.fortytwo_account is True:
            return Response({'error': '42 accounts data can only be edited on intra.42.fr'}, status=status.HTTP_401_UNAUTHORIZED)
        
        serializer = EmailUpdateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.validated_data['email']
            serializer.update(user, serializer.validated_data)
            profile.mail_confirmation_status = False
            if profile.two_fa_method == "email":
                profile.two_fa_method = "none"
            profile.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUsernameView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        profile = request.user.profile
        if profile.fortytwo_account is True:
            return Response({'error': '42 accounts data can only be edited on intra.42.fr'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = UsernameUpdateSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.update(user, serializer.validated_data)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdatePasswordView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    logger.info("")

    def put(self, request):
        user = request.user
        profile = request.user.profile
        if profile.fortytwo_account:
            return Response({'error': '42 accounts data can only be edited on intra.42.fr'}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = PasswordUpdateSerializer(user, data=request.data, context={'request': request}, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'detail': 'Password updated successfully'}, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class UpdateStatusView(APIView):

    def put(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)
        serializer = StatusUpdateSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
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
            'scored_points': profile.scored_points,
            'conceded_points': profile.conceded_points,
            'played_games': profile.played_games,
            'won_games': profile.won_games,
            'perfect_wins': profile.perfect_wins,
            'fortytwo_account': profile.fortytwo_account
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
                'user': user.username,
                'winner': game.winner.username if game.winner else 'Invité',
                'winner_avatar': game.winner.profile.avatar.url if game.winner else 'https://localhost/media/default.png',
				'loser': game.loser.username if game.loser else 'Invité',
                'loser_avatar': game.loser.profile.avatar.url if game.loser else 'https://localhost/media/default.png',
                'winner_score': game.winner_score,
                'loser_score': game.loser_score,
                'perfect': game.perfect,
               	'local_game': game.local_game,
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
    
    def delete(self, request, username):
        user = request.user
        friend = get_object_or_404(User, username=username)

        friendship = Friend.objects.filter(user=user, friend=friend).first()
        if not friendship:
            return Response({'detail': 'Friendship does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        friendship.delete()
        return Response({'detail': 'Friend removed'}, status=status.HTTP_200_OK)
    