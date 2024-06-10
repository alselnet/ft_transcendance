from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GameSummary, Profile

class GameSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSummary
        fields = ('winner', 'loser', 'score', 'date_time')

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')
    
    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("username already in use")
        return value
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("email already in use")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password']
        )
        profile = Profile.objects.create(user=user)
        return user

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
