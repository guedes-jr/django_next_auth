# custom_auth/serializers.py

from rest_framework import serializers
from .models import Profile

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'  # Ou especifique os campos que deseja incluir na serialização
