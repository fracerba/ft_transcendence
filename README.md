# ft\_transcendence

This repository contains the source code and documentation for an advanced web-based gaming platform featuring a modernized version of the classic Pong game, along with several additional modules.

## Mighty Pong Contest

***

Welcome to the Mighty Pong Contest! This project aims to provide a platform for users to play Pong against others in real-time with a seamless user experience.

## Table of contents
* [ft\_transcendence](README.md)
* [Mighty Pong Contest]()
  * [Overview](#overview)
  * [Features](#features)
  * [Technologies](#technologies)
  * [Setup](#setup)
  * [Usage](#usage)
  * [License](#license)

## Overview

***

The Mighty Pong Contest is a single-page web application that allows users to:

* Play Pong in real-time against other players.
* Participate in tournaments.
* Manage user profiles, including avatars and friend lists.
* View match history and statistics.

### Features

***

* **Real-time Multiplayer Pong**: Play against remote players with smooth real-time updates.
* **Tournaments**: Organize and participate in tournaments.
* **User Management**: Register, login, and manage profiles securely.
* **Friends and Online Status**: Add friends and see their online status.
* **Match History**: View detailed match history and statistics.
* **Responsive Design**: Works on all devices with support for browser navigation.
* **Secure**: HTTPS, JWT authentication, 2FA, and protection against SQL injections/XSS.
* **Developer-friendly**: Easy setup with Docker, CI/CD pipeline, and monitoring tools.

### Technologies

***

#### Backend

* **Django**: Web framework for backend logic.
* **PostgreSQL**: Database for storing user data and game records.
* **JWT**: For secure authentication.
* **Django Channels**: For handling WebSockets and real-time communication.


#### Frontend

* **javascript**: For game logic and rendering.
* **HTML5 Canvas**: For rendering the game on the frontend.
* **css**: For styling the frontend.
* **Bootstrap**: Frontend toolkit for responsive design.

#### Game

* **javascript**: For game logic and rendering.
* **HTML5 Canvas**: For rendering the game on the frontend.
* **WebSockets**: For real-time communication between players.


#### DevOps

* **Docker Compose**: To manage multi-container Docker applications.
* **GitHub Actions**: CI/CD pipeline for automated testing and deployment.
* **ELK Stack**: For log management and analysis. (Elasticsearch, Logstash, Kibana)
* **Prometheus**: Monitoring and alerting toolkit.
* **Grafana**: Analytics and monitoring dashboards

### Setup

***

#### Prerequisites

* Docker

#### Steps

1.  **Clone the repository**

    ```sh
    git clone https://github.com/minestrinad/ft_transcendence.git
    cd ft_transcendence
    ```
2. **Set up environment variables**
   *   Create a `.env` file in the src/ directory or fill in the existing `.env.example` file.
   
3. **Ensure the start_up.sh script is executable**

    ```sh
    chmod +x start_up.sh
      ```
4.  **Build and run the application**

      ```sh
      ./start_up.sh
      ```
5. **Access the application**
   * Open your browser and go to `https://localhost:8000`

### Usage

***

#### User Guide

1. **Register and Login**
   * Navigate to the registration page to create a new account.
   * Use your credentials to log in to your account.
2. **Profile Management**
   * Update your profile information and upload an avatar.
   * Add friends and view their online status.
3. **Playing Pong**
   * Start a new game and wait for a match.
   * Play against another player in real-time.
4. **Tournaments**
   * Join or create a tournament.
   * Follow the tournament schedule and play your matches.
5. **Viewing Match History**
   * Go to your profile to view detailed statistics and match history.

### License

***

This project is licensed under the MIT License. See the [LICENSE](docs/LICENSE) file for more details.

***
