from django.db import models


class Games(models.Model):
    DEFAULT_OWNER_ID = 1

    name = models.CharField(max_length=100)
    owner_id = models.ForeignKey('auth.user', on_delete=models.CASCADE, related_name='games',
                              default=DEFAULT_OWNER_ID)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('created_at',)
