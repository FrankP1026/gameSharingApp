from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *


urlpatterns = [
    path('games/', ListGamesView.as_view(), name="all-games"),
    path('userProfiles/', ListUserView.as_view(), name="all-users")
]