from djoser.serializers import UserSerializer as BaseUserSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Profile

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['phone_number', 'address', 'date_of_birth', 'profile_image']

class CustomUserSerializer(BaseUserSerializer):
    profile = ProfileSerializer()

    class Meta(BaseUserSerializer.Meta):
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile']

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', {})
        profile = instance.profile

        instance = super().update(instance, validated_data)

        profile.phone_number = profile_data.get('phone_number', profile.phone_number)
        profile.address = profile_data.get('address', profile.address)
        profile.date_of_birth = profile_data.get('date_of_birth', profile.date_of_birth)
        profile.profile_image = profile_data.get('profile_image', profile.profile_image)
        profile.save()

        return instance
