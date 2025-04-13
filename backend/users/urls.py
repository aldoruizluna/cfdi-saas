from django.urls import path
from .views import UserCreateView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='user-register'),
    # Add other user-related URLs here later (e.g., login, profile)
]
