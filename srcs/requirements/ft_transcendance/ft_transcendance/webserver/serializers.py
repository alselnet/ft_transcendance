from rest_framework import serializers
from django.contrib.auth.models import User
from .models import GameSummary, Profile

class GameSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSummary
        fields = ('winner', 'loser', 'score', 'date_time')

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password']
        )
        return user