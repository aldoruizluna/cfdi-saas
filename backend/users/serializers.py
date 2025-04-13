from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model() # Get the custom User model

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    Handles password hashing during creation/update.
    Includes password confirmation validation.
    """
    password2 = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'}) # Add password2 field

    class Meta:
        model = User
        # Include password2 in fields list temporarily for validation, but make write_only
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'password2')
        extra_kwargs = {
            'password': {'write_only': True, 'min_length': 8, 'style': {'input_type': 'password'}},
            'email': {'required': True},
            # Remove password2 from here if added above, handled by explicit field definition
        }

    def validate(self, data):
        """
        Check that the two password entries match.
        """
        if data.get('password') != data.get('password2'):
            raise serializers.ValidationError({"password": "Password fields didn't match."}) # Use DRF ValidationError

        # password2 is only for validation, remove it before passing data to create/update
        data.pop('password2', None)
        return data

    def create(self, validated_data):
        """
        Create and return a new User instance, given the validated data.
        Hashes the password.
        Validated_data no longer contains 'password2' after validate() method.
        """
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'), # .get() handles optional email if not required in Meta
            password=validated_data['password'], # Only the validated password is used
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', '')
        )
        return user

    def update(self, instance, validated_data):
        """
        Update and return an existing User instance, given the validated data.
        Handles password update correctly.
        Validated_data no longer contains 'password2' after validate() method.
        """
        password = validated_data.pop('password', None)
        # Update other fields using the parent update method
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password) # Hash the new password
            user.save()

        return user
