from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import Profile, Friend

class AvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('avatar',)

    def update(self, instance, validated_data):
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.save_avatar()
        instance.save()
        return instance


class PublicUserInfoSerializer(serializers.ModelSerializer):
	
    class Meta:
        model = User
        fields = ['username', 'email']


class StatusUpdateSerializer(serializers.ModelSerializer):
	
    class Meta:
        model = Profile
        fields = ['status']


class EmailUpdateSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        password = data.get('password')
        user = self.context['request'].user
        if not user.check_password(password):
            raise serializers.ValidationError({'password': 'Password is incorrect.'})
        if User.objects.exclude(pk=user.pk).filter(email=email).exists():
            raise serializers.ValidationError({'email': 'This email is already in use.'})
        return data

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.save()
        return instance


class UsernameUpdateSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        password = data.get('password')
        user = self.context['request'].user
        if not user.check_password(password):
            raise serializers.ValidationError({'password': 'Password is incorrect.'})
        if User.objects.exclude(pk=user.pk).filter(username=username).exists():
            raise serializers.ValidationError({'username': 'This username is already in use.'})
        return data

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.save()
        return instance
    

class PasswordUpdateSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['current_password', 'new_password']

    def validate(self, attrs):
        user = self.context['request'].user
        current_password = attrs.get('current_password')
        new_password = attrs.get('new_password')

        if not user.check_password(current_password):
            raise serializers.ValidationError({'current_password': 'Current password is incorrect'})

        return attrs

    def update(self, instance, validated_data):
        new_password = validated_data.pop('new_password')
        instance.set_password(new_password)
        instance.save()
        return instance
   
        
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