from django.db import models
from django.db.models.signals import pre_save, post_save
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.dispatch import receiver
from django.utils.timezone import now

from rest_framework.authtoken.models import Token

import datetime


class Games(models.Model):
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('created_at',)

# First name, last name are already presented in auth.user model,
# there is no need to include them
class UserProfile(models.Model):
    GENDER_CHOICES = (
        ('N', ''), # Not specified
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, db_index=True, db_column="user_id")
    
    phone_number = models.CharField(max_length=30, null=True, blank=True)
    
    birthday = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='N')
    address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=50)

    # TODO: validate it by comparing with a pre-defined list
    country = models.CharField(max_length=30, null=True, blank=True)

    registered_at = models.DateTimeField(default=now)

# Make sure user email is unique
@receiver(pre_save, sender=User)
def user_pre_save(sender, instance, **kwargs):
    email = instance.email
    username = instance.username

    if not email: raise ValidationError("email required")
    if sender.objects.filter(email=email).exclude(username=username).count(): raise ValidationError("email needs to be unique")

# Create user's authentication token
@receiver(post_save, sender=User)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        