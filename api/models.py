from django.db import models


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
    user_id = models.ForeignKey('auth.user', on_delete=models.CASCADE, related_name='games')
    
    phone_number = models.CharField(max_length=30, null=True, blank=True)
    
    birthday = models.DateField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='N')
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=50)

    # TODO: validate it by comparing with a pre-defined list
    country = models.CharField(max_length=30)
    
