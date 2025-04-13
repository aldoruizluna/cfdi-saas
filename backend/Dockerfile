# backend/Dockerfile
# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Copy project
COPY . /app/

# Expose port 8000 for the Django app
EXPOSE 8000

# Specify the command to run on container start (will be overridden by docker-compose)
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
