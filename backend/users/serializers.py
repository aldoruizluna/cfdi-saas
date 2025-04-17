from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model() # Get the custom User model

class UserSerializer(serializers.ModelSerializer):
    """
    DEBUGGING: Simplified Serializer for testing User model basics.
    """
    class Meta:
        model = User
        # Minimal fields for testing
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 8}, # Keep password settings
            'email': {'required': True}, # Keep email required
        }

    def create(self, validated_data):
        """
        Create and return a new User instance, given the validated data.
        Hashes the password.
        """
        # Use create_user to handle password hashing automatically
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
        )
        return user
