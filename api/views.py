from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import *
from .serializers import *

# Create your views here.
class ListGamesView(generics.ListCreateAPIView):
    queryset = Games.objects.all()
    serializer_class = GamesSerializer


class ListUserView(APIView):
    def get(self, request, format=None):
        userProfiles = UserProfile.objects.all()
        serializer = UserProfileSerializer(userProfiles, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        pass
