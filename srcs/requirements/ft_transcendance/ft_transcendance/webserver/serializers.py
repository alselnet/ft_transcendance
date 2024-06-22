from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GameSummary, Profile

class GameSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSummary
        fields = ('winner', 'loser', 'score', 'date_time')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('game_history')

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
    
    def validate(self, attrs):
        username = attrs.get('username')
        email = attrs.get('email')

        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("Username already in use")
        
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already in use")
        
        return attrs

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        
        if password:
            user.set_password(password)
    
        user.save()
        return user

class PublicUserInfoSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer
	
    class Meta:
        model = User
        fields = ('username', 'email', 'profile')

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
