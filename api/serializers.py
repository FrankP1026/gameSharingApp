from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = ('id', 'name', 'created_at', 'modified_at')


class UserSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(many=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'groups')

# only for testing, should never use it to create user profile
class UserProfileWithUserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('user_id', 'gender', 'phone_number', 'birthday', 'registered_at')
    
    # TODO: need to validate if auth.user exists
    def create(self, validated_data):
        return UserProfile.objects.create(**validated_data)

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user_id.username')
    email = serializers.EmailField(source='user_id.email')
    first_name = serializers.CharField(source='user_id.first_name')
    last_name = serializers.CharField(source='user_id.last_name')

    class Meta:
        model = UserProfile
        fields = (
            'username',
            'email',
            'first_name',
            'last_name',
            'gender',
            'phone_number',
            'birthday',
            'address',
            'city',
            'country',
            'registered_at'
        )