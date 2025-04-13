from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from .serializers import UserSerializer

User = get_user_model()

class UserCreateView(generics.CreateAPIView):
    """
    API view for creating (registering) new users.
    Accessible via POST request.
    """
    queryset = User.objects.all() # Required for CreateAPIView, though not strictly used for creation
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny] # Allow anyone to access this endpoint
