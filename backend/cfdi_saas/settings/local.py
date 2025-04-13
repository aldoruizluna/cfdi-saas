# backend/cfdi_saas/settings/local.py

from .base import * # Import base settings

# Override base settings for local development
DEBUG = True

# Allow all hosts during local development for convenience
ALLOWED_HOSTS = ['*']

# Optional: Add development-specific apps like django-debug-toolbar
# INSTALLED_APPS += ['debug_toolbar']
# MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']
# INTERNAL_IPS = ['127.0.0.1', 'localhost'] # Required for debug toolbar

# Optional: Use console email backend for development
# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

print("*****************************************")
print("**** Running with LOCAL settings ****")
print(f"**** DEBUG = {DEBUG} ****")
print("*****************************************")
