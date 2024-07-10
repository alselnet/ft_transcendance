from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GameSummary, Profile, Friend

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('game_history', 'status', 'avatar')

    def update(self, instance, validated_data):
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.save()
        return instance

class PublicUserInfoSerializer(serializers.ModelSerializer):
	
    class Meta:
        model = User
        fields = ('username', 'email')


class EmailUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['email']
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("email already in use")
        return value
    

class UsernameUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("username already in use")
        return value
    

class PasswordUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['password']
   
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password']
        )
        return user
    

class FriendSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    friend = UserSerializer()

    class Meta:
        model = Friend
        fields = ['user', 'friend']