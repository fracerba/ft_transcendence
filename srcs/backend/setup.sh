#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Ensure required environment variables are set
if [[ -z "$ADMIN_USER" || -z "$ADMIN_EMAIL" || -z "$ADMIN_PASSWORD" ]]; then
  echo "Error: ADMIN_USER, ADMIN_EMAIL, and ADMIN_PASSWORD must be set."
  exit 1
fi

# Check if the environment is development
if [ "$DEVELOPMENT" = "True" ]; then
  echo "Running in development mode..."

  # Run Django migrations
  echo "Running migrations..."
  python manage.py makemigrations
  python manage.py migrate

  # # Collect static files only in production
  # echo "Collecting static files..."
  # python manage.py collectstatic --noinput
fi

# Create admin user
echo "Ensuring admin user exists..."
python manage.py shell <<EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username="$ADMIN_USER").exists():
  User.objects.create_superuser(username="$ADMIN_USER", email="$ADMIN_EMAIL", password="$ADMIN_PASSWORD")
  print("Admin user created.")
else:
  print("Admin user already exists.")
EOF



# Start the application
if [ "$DEVELOPMENT" = "True" ]; then
  echo "Starting the application in development mode..."
  python manage.py runsslserver 0.0.0.0:8000 --cert /etc/ssl/cert.pem --key /etc/ssl/key.pem
else
  echo "Starting the application in production mode with Gunicorn..."
  gunicorn --workers=3 --bind 0.0.0.0:8000 web.wsgi:application
fi
