from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = ('id', 'name', 'created_at', 'modified_at')


class UserSerializer(serializers.ModelSerializer):
    # TODO: only allow authorized users to view a user's group?
    groups = serializers.StringRelatedField(many=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'groups', 'password')

# only for testing, should never use it to create user profile
class UserProfileWithUserIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('user_id', 'gender', 'phone_number', 'birthday', 'registered_at')
    
    def create(self, validated_data):
        return UserProfile.objects.create(**validated_data)

class UserProfileSerializer(serializers.ModelSerializer):
    user_id = serializers.CharField(source='user.id', required=False)
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    gender = serializers.CharField(source='get_gender_display')

    password = serializers.CharField(source='user.password', write_only=True)

    class Meta:
        model = UserProfile
        fields = (
            'user_id',
            'username',
            'email',
            'first_name',
            'last_name',
            'password',
            'gender',
            'phone_number',
            'birthday',
            'address',
            'city',
            'country',
            'registered_at',
        )
    
    def create(self, validated_data):
        usr = validated_data.pop('user')

        # TODO: this manual operation is really not desirable, 
        # see if there is a way to create user without doing this
        gender = validated_data.pop('get_gender_display')

        user = User.objects.create_user(username=usr['username'],
                                        email=usr['email'],
                                        first_name=usr['first_name'],
                                        last_name=usr['last_name'],
                                        password=usr['password'])
        if not user:
            return None
        
        return UserProfile.objects.create(user=user, gender=gender, **validated_data)
    