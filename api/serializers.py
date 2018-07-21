from rest_framework import serializers
from .models import Games


class GamesSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(source='owner_id', read_only=True)

    class Meta:
        model = Games
        fields = ('id', 'name', 'owner', 'created_at', 'modified_at')
