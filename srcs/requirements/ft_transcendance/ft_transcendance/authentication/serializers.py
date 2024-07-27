from rest_framework import serializers
from django.contrib.auth.models import User

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


class Update2FAStatusSerializer(serializers.Serializer):
    two_fa_method = serializers.ChoiceField(choices=[('none', 'None'), ('email', 'Email'), ('authenticator', 'Authenticator')])