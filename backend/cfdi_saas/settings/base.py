# backend/cfdi_saas/settings/base.py

import os
from pathlib import Path
from dotenv import load_dotenv
import dj_database_url
from django.core.exceptions import ImproperlyConfigured

# Load environment variables from .env file
# This is primarily for local development convenience.
# In staging/production, variables should be set directly in the environment.
# The path is ../../.env.dev relative to this file (settings/base.py)
dotenv_path = Path(__file__).resolve().parent.parent.parent / '.env.dev'
load_dotenv(dotenv_path=dotenv_path)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR is now the 'backend' directory
BASE_DIR = Path(__file__).resolve().parent.parent.parent

# Quick-start development settings - unsuitable for production
# https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-default-key-for-dev-only')

# SECURITY WARNING: don't run with debug turned on in production!
# Default to False for safety. Override in local.py for development.
DEBUG = os.getenv('DEBUG', 'False') == 'True' # Keep env var support, but default false if not set

ALLOWED_HOSTS_STRING = os.getenv('ALLOWED_HOSTS', 'localhost,127.0.0.1')
ALLOWED_HOSTS = [host.strip() for host in ALLOWED_HOSTS_STRING.split(',') if host.strip()]


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third-party apps
    'rest_framework',
    # Local apps
    'users.apps.UsersConfig',
    # 'invoices.apps.InvoicesConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'cfdi_saas.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'cfdi_saas.wsgi.application'


# --- Database Configuration ---
DATABASE_URL = os.getenv('DATABASE_URL')

# Check if DATABASE_URL looks incomplete (e.g., missing user:pass)
db_url_incomplete = not DATABASE_URL or '://@' in DATABASE_URL or ': خالی@' in DATABASE_URL # Handle potential empty string for password if env var is just empty

if db_url_incomplete:
    print("INFO: DATABASE_URL env var is missing, empty, or incomplete. Attempting to construct from components.")
    db_user = os.getenv('POSTGRES_USER')
    db_password = os.getenv('POSTGRES_PASSWORD')
    db_host = os.getenv('POSTGRES_HOST')
    db_port = os.getenv('POSTGRES_PORT', '5432')
    db_name = os.getenv('POSTGRES_DB')

    if all([db_user, db_password is not None, db_host, db_name]): # Check password is not None, allowing empty string
        DATABASE_URL = f"postgres://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}"
        print(f"INFO: Constructed DATABASE_URL: postgres://{db_user}:******@{db_host}:{db_port}/{db_name}")
    else:
        missing_vars = [
            var for var, val in {
                'POSTGRES_USER': db_user,
                'POSTGRES_PASSWORD': db_password,
                'POSTGRES_HOST': db_host,
                'POSTGRES_DB': db_name
            }.items() if not val and val is not '' # Check if None or truly empty, allow empty password
        ]
        raise ImproperlyConfigured(
            "Database configuration error: DATABASE_URL is invalid/missing, and could not "
            f"construct from components. Missing component(s): {', '.join(missing_vars)}"
        )

# Now, configure DATABASES using the determined DATABASE_URL
try:
    DATABASES = {
        'default': dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            ssl_require=os.getenv('DB_SSL_REQUIRE', 'False') == 'True'
        )
    }
    # Quick validation check
    if not DATABASES['default'].get('NAME'):
        raise ValueError("Database NAME is missing after configuration.")
except (ValueError, ImproperlyConfigured) as e:
    raise ImproperlyConfigured(
        f"Final database configuration failed using URL: {DATABASE_URL}. Error: {e}"
    )

print(f"INFO: Database configured for host '{DATABASES['default'].get('HOST')}' and database '{DATABASES['default'].get('NAME')}'")
# --- End Database Configuration ---


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    { 'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator', },
    { 'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator', },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = '/static/'
# STATIC_ROOT = BASE_DIR / 'staticfiles' # Define if/when needed for deployment

# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Custom User Model
# https://docs.djangoproject.com/en/4.2/topics/auth/customizing/#substituting-a-custom-user-model
AUTH_USER_MODEL = 'users.User'

# Django REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    # Add authentication classes later
    # 'DEFAULT_AUTHENTICATION_CLASSES': [],
}

# ASGI application
ASGI_APPLICATION = 'cfdi_saas.asgi.application'
