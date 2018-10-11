from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.compat import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _

from .auth_backends import EmailBackend

from api.models import UserProfile
from api.serializers import UserProfileSerializer


class AuthTokenSerializerWithEmail(serializers.Serializer):
    username_or_email = serializers.CharField(label=_("Username or Email address"))
    password = serializers.CharField(
        label=_("Password"),
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        username_or_email = attrs.get('username_or_email')
        password = attrs.get('password')

        if username_or_email and password:
            user = authenticate(request=self.context.get('request'),
                                username=username_or_email, password=password)

            # The authenticate call simply returns None for is_active=False
            # users. (Assuming the default ModelBackend authentication
            # backend.)
            if not user:
                emailBackend = EmailBackend()
                user = emailBackend.authenticate(username=username_or_email, password=password)

                if not user:
                    msg = _('Unable to log in with provided credentials.')
                    raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "username/email" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs

class ObtainAuthTokenWithEmail(APIView):
    serializer_class = AuthTokenSerializerWithEmail

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                        context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        user_profile = UserProfile.objects.get(user=user)
        user_profile_serializer = UserProfileSerializer(user_profile)
        return Response({'token': token.key, 'user_profile': user_profile_serializer.data})