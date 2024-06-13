from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GameSummary, Profile, TwoFactorsCode

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('avatar',)

    def update(self, instance, validated_data):
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.save()
        return instance


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
        return user

class TwoFactorsCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TwoFactorsCode
        fields = ['number', 'user']
        read_only_fields = ['number', 'user']