from django.shortcuts import render
from rest_framework import generics

from .models import Games
from .serializers import GamesSerializer

# Create your views here.
class ListGamesView(generics.ListCreateAPIView):
    queryset = Games.objects.all()
    serializer_class = GamesSerializer
