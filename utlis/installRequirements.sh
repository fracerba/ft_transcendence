#!/bin/bash

# Update package index
echo "Updating package index..."
sudo apt update

# Install Docker
echo "Installing Docker..."
sudo apt install -y docker.io

# Start and enable Docker service
echo "Starting and enabling Docker service..."
sudo systemctl start docker
sudo systemctl enable docker

# Verify Docker installation
echo "Verifying Docker installation..."
docker --version

# Install Docker Compose
echo "Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Apply executable permissions to Docker Compose binary
echo "Applying executable permissions to Docker Compose binary..."
sudo chmod +x /usr/local/bin/docker-compose

# Verify Docker Compose installation
echo "Verifying Docker Compose installation..."
docker-compose --version

# Install Python3 and pip
echo "Installing Python3 and pip..."
sudo apt install -y python3-pip

# Install Django using pip
echo "Installing Django..."
pip3 install Django

# Verify Django installation
echo "Verifying Django installation..."
django-admin --version

echo "Installation complete!"
