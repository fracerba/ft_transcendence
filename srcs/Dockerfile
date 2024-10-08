# Stage 1: Build the React frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install
COPY ./frontend ./
RUN npm run build

# Stage 2: Build the Django backend and integrate frontend build
FROM python:3.11-slim

WORKDIR /app

COPY ./backend/ ./
COPY --from=frontend-builder /app/build/ /app/static/

RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

CMD ["sh", "-c", "python manage.py migrate && gunicorn --workers=3 --bind=0.0.0.0:8000 web.wsgi:application"]
