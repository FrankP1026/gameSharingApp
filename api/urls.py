from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import ListGamesView


urlpatterns = [
    path('games/', ListGamesView.as_view(), name="all-games")
]