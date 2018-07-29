from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import *


urlpatterns = [
    path('games/', ListGamesView.as_view(), name="all-games"),
    path('users/', ListUserView.as_view(), name="all-users"),
    path('userProfilesCreateInternal/', CreateTestUserProfileWithUserIdView.as_view(), 
         name="user-profile-create-internal"),
    path('userProfiles/', ListUserProfileView.as_view(), name="all-user-profiles")
]