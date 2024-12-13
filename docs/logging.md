# Logging

## Overview
The logging is managed via the ELK stack. The ELK stack is a combination of three open-source products: Elasticsearch, Logstash, and Kibana. Each of these products is designed to work together seamlessly.

## Setup
To setup logging, you need to have the following installed:
- Docker

## Usage
To start the ELK stack, run the following command:
```bash
docker-compose -f docker-compose.elk.yml up
```
This will start the Elasticsearch, Logstash, and Kibana services. You can access the Kibana dashboard by navigating to `http://localhost:5601` in your web browser.

!Remember the credentials for Kibana are ELASTIC_USER and the ELASTIC_PASSWORD you set in the `.env` file (KIBANA_PASSWORD is for internal use only)!

## Configuration
The configuration for the ELK stack is managed via the `docker-compose.elk.yml` file. This file contains the configuration for the Elasticsearch, Logstash, and Kibana services.

## Troubleshooting
If you encounter any issues with the ELK stack, you can check the logs for each service by running the following command:
```bash
docker-compose -f docker-compose.elk.yml logs
```
## Todo
Ensure that we can start the hole project with a single command, else we need to change the way logs are shared between the services.