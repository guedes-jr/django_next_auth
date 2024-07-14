from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import Profile

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = Profile
    list_display = ['username', 'email', 'cpfcnpj', 'phone_number', 'address', 'birth_date', 'theme', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('cpfcnpj', 'phone_number', 'address', 'birth_date', 'profile_image', 'theme',)}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('cpfcnpj', 'phone_number', 'address', 'birth_date', 'profile_image', 'theme',)}),
    )

admin.site.register(Profile, CustomUserAdmin)
