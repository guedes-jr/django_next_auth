from django.contrib.auth.models import AbstractUser
from django.db import models

class Profile(AbstractUser):
    THEME_CHOICES = [
        ('dark', 'Dark'),
        ('light', 'Light'),
    ]

    cpfcnpj = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=50, blank=True)
    address = models.CharField(max_length=255, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    profile_image = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    theme = models.CharField(max_length=5, choices=THEME_CHOICES, default='dark')

    def __str__(self):
        return self.username
