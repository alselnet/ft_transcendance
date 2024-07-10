from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import GameSummarySerializer, EmailUpdateSerializer, PasswordUpdateSerializer, UsernameUpdateSerializer, PublicUserInfoSerializer, UserSerializer, ProfileSerializer
from .models import GameSummary, Profile, Friend
from rest_framework.parsers import MultiPartParser, FormParser

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

	
# class ChangeAvatarView(APIView):
#     parser_classes = (MultiPartParser, FormParser) # Definit les parseurs utilises -> typiquement pour les DL de fichiers

#     def post(self, request):
#         profile = request.user.profile

#         serializer = ProfileSerializer(profile, data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class GameSummaryView(viewsets.ModelViewSet):
#     serializer_class = GameSummarySerializer
#     queryset = GameSummary.objects.all()

# class PublicUserInfoView(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def get(self, request, username):
#         try:
#             user = User.objects.get(username=username)
#         except User.DoesNotExist:
#             return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        
#         serializer = PublicUserInfoSerializer(user)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
# class UpdateEmailView(APIView):
#     permission_classes = [IsAuthenticated]

#     def put(self, request):
#         user = request.user
#         serializer = EmailUpdateSerializer(user, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UpdateUsernameView(APIView):
#     permission_classes = [IsAuthenticated]

#     def put(self, request):
#         user = request.user
#         serializer = UsernameUpdateSerializer(user, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class UpdatePasswordView(APIView):
#     permission_classes = [IsAuthenticated]

#     def put(self, request):
#         user = request.user
#         serializer = PasswordUpdateSerializer(user, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class AddFriendView(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request, username, friend_username):
#         user = get_object_or_404(User, username=username)
#         friend = get_object_or_404(User, username=friend_username)

#         if Friend.objects.filter(user=user, friend=friend).exists():
#             return Response({'detail': 'Already friends'}, status=status.HTTP_400_BAD_REQUEST)

#         Friend.objects.create(user=user, friend=friend)
#         return Response({'detail': 'Friend added'}, status=status.HTTP_201_CREATED)

# class RemoveFriendView(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request, username, friend_username):
#         user = get_object_or_404(User, username=username)
#         friend = get_object_or_404(User, username=friend_username)

#         friendship = Friend.objects.filter(user=user, friend=friend).first()
#         if not friendship:
#             return Response({'detail': 'Friendship does not exist'}, status=status.HTTP_400_BAD_REQUEST)

#         friendship.delete()
#         return Response({'detail': 'Friend removed'}, status=status.HTTP_204_NO_CONTENT)
    

# class FriendListView(APIView):
#     def get(self, request, username):
#         user = get_object_or_404(User, username=username)
#         friends = user.friends.all()
#         serializer = UserSerializer(friends, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    

# class ProfileStatusUpdateView(APIView):

#     def put(self, request, username):
#         try:
#             profile = Profile.objects.get(user__username=username)
#         except Profile.DoesNotExist:
#             return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

#         serializer = ProfileSerializer(profile, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

# class ProfileView(APIView):
    
#     def get(self, request, username):
#         try:
#             profile = Profile.objects.get(user__username=username)
#         except Profile.DoesNotExist:
#             return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)
#         serializer = ProfileSerializer(profile)
#         return Response(serializer.data, status=status.HTTP_200_OK)
