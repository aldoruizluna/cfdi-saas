from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model() # Get the custom User model

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    Handles password hashing during creation/update.
    """
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password')
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 8}, # Don't expose password hash, enforce min length
            'email': {'required': True}, # Make email required
        }

    def create(self, validated_data):
        """
        Create and return a new User instance, given the validated data.
        Hashes the password.
        """
        # Use create_user to handle password hashing automatically
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'), # .get() handles optional email if not required in Meta
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

    def update(self, instance, validated_data):
        """
        Update and return an existing User instance, given the validated data.
        Handles password update correctly.
        """
        password = validated_data.pop('password', None)
        # Update other fields using the parent update method
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password) # Hash the new password
            user.save()

        return user
