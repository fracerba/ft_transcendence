#!/bin/bash

# Install Node.js version 14
echo "Installing Node.js version 14..."
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify Node.js and npm installation
node -v
npm -v

# Check if package.json and package-lock.json exist and run npm install
if [[ -f "package.json" && -f "package-lock.json" ]]; then
    echo "package.json and package-lock.json found. Installing dependencies..."
    npm install
else
    echo "package.json or package-lock.json not found. Please ensure they are in the current directory."
fi

# Set NODE_ENV environment variable to development
export NODE_ENV=development
echo "Set NODE_ENV to development."

# Check if port 3000 is available
if lsof -i:3000 >/dev/null; then
    echo "Port 3000 is currently in use. Please ensure it is available for the game service. Or start the service in the container."
else
    echo "Port 3000 is available."
fi

echo "Installation game-development requirements complete!"