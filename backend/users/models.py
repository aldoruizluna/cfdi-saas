from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom User model inheriting from AbstractUser.
    Add custom fields here in the future if needed (e.g., RFC, company).
    """
    # Example of adding a field later:
    # rfc = models.CharField(max_length=13, blank=True, null=True, unique=True)

    def __str__(self):
        return self.username
