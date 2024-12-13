#!/bin/bash

# Define constants
DB_SERVICE="postgres"
WEB_SERVICE="web"
NETWORK_NAME="$(basename $(pwd))_mighty_pong_net"
VOLUME_NAME="$(basename $(pwd))_postgres_data"

# Function to check if a service is running
is_service_running() {
	docker compose ps --services --filter "status=running" | grep -q "$1"
}

# Start a service if not already running
start_service() {
	if ! is_service_running "$1"; then
			echo "Starting $1..."
			docker compose up -d "$1"
	else
			echo "$1 is already running, skipping..."
	fi
}

# Start services
start_services() {
	echo "Starting services..."

	# Start DB service
	start_service "$DB_SERVICE"

	# Start web service
	start_service "$WEB_SERVICE"

	echo "All services are up!"
}

# Stop services
stop_services() {
	echo "Stopping all services..."
	docker compose down --remove-orphans
	echo "All services stopped."
}

# Show status of network and volumes
status() {
	echo "Checking network and volume status..."

	# Check network status
	if [ -z "$(docker network ls --filter name=$NETWORK_NAME -q)" ]; then
		echo "Network does not exist"
	else
		docker network inspect $NETWORK_NAME
	fi

	# Check volume status
	if [ -z "$(docker volume ls --filter name=$VOLUME_NAME -q)" ]; then
		echo "Volume does not exist"
	else
		docker volume inspect $VOLUME_NAME
	fi
}

if [[ $# -lt 1 ]]; then
	echo "Usage: ./start_app.sh <command>"
	echo "Commands:"
	echo "  start   Start the project"
	echo "  stop    Stop all services"
	echo "  status  Check network and volume status"
	exit 1
fi

case "$1" in
	start)
		start_services
		;;
	stop)
		stop_services
		;;
	status)
		status
		;;
	*)
		echo "Unknown command: $1"
		exit 1
		;;
esac
