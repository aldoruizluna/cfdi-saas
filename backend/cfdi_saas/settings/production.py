# backend/cfdi_saas/settings/production.py
from .base import *

# Production specific settings go here
# Example:
# DEBUG = False
# ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']
# DATABASES['default'] = dj_database_url.config(default=os.getenv('PRODUCTION_DATABASE_URL'))
# SECRET_KEY = os.getenv('PRODUCTION_SECRET_KEY') # Must be set in production environment
# Use secure settings for production! E.g., SECURE_SSL_REDIRECT, CSRF_COOKIE_SECURE, SESSION_COOKIE_SECURE

# Ensure critical security settings are enabled for production
# SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
# SECURE_SSL_REDIRECT = True
# SESSION_COOKIE_SECURE = True
# CSRF_COOKIE_SECURE = True
# SECURE_HSTS_SECONDS = 31536000 # 1 year
# SECURE_HSTS_INCLUDE_SUBDOMAINS = True
# SECURE_HSTS_PRELOAD = True

print("*****************************************")
print("**** Running with PRODUCTION settings ****")
print("*****************************************")
