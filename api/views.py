from django.contrib.auth.models import User
from django.shortcuts import render
from django.db import transaction

from rest_framework import authentication, generics, permissions, status
from rest_framework.exceptions import APIException
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *

# Create your views here.
class ListGamesView(generics.ListCreateAPIView):
    queryset = Games.objects.all()
    serializer_class = GamesSerializer

class ListUserView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    queryset = User.objects.all()
    serializer_class = UserSerializer

class ListUserProfileView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        user_profiles = UserProfile.objects.all()
        serializer = UserProfileSerializer(user_profiles, many=True)
        return Response(serializer.data)

# Only for creating user profile for internal auth.user, 
# do not use it for other purposes
class CreateTestUserProfileWithUserIdView(APIView):
    def post(self, request, format=None):
        serializer = UserProfileWithUserIdSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegistrationView(APIView):
    @transaction.atomic
    def post(self, request, format=None):
        user_serializer = UserSerializer(data=request.data)
        if not user_serializer.is_valid():
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        profile_serializer = UserProfileSerializer(data=request.data)
        if profile_serializer.is_valid():
            profile_serializer.save()
            return Response(profile_serializer.data, status=status.HTTP_201_CREATED)
        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    def get(self, request, format=None):
        user_id = request.query_params['user_id']
        user_profile = UserProfile.objects.get(user_id=user_id)
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)

class UpdateUserProfileView(APIView):
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    @transaction.atomic
    def put(self, request, format=None):
        data = request.data.copy()
        print(request.user.id)

        user_id = int(data["user_id"])

        # TODO: maybe use another exception that better represents the error
        if user_id != request.user.id:
            raise APIException("Can only update your own profile")
        
        # We do not want to update password here
        data.pop("password", None)

        user = User.objects.get(id=user_id)
        user_serializer = UserSerializer(user, data=data, partial=True)
        if not user_serializer.is_valid():
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user_serializer.save()
        print(user_serializer.data)

        user_profile = UserProfile.objects.get(user_id=user_id)

        # TODO: what's the best way of updating user profile? create a custom method?
        profile_serializer = UserProfileSerializer(user_profile, data=data, partial=True)
        if profile_serializer.is_valid():
            profile_serializer.save()
            return Response(profile_serializer.data, status=status.HTTP_200_OK)
        
        return Response(profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Need to make sure the current password matches
class UpdateUserPasswordView(APIView):
    pass