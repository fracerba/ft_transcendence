# ft\_transcendence

This repository contains the source code and documentation for an advanced web-based gaming platform featuring a modernized version of the classic Pong game, along with several additional modules enhancing user experience, security, and gameplay features.

***

## Mighty Pong Contest

Welcome to the Mighty Pong Contest! This project aims to provide a platform for users to play Pong against others in real-time with a seamless user experience.

### Table of Contents

* [Overview](./#overview)
* [Features](./#features)
* [Technologies](./#technologies)
* [Setup](./#setup)
* [Usage](./#usage)
* [Contributing](./#contributing)
* [License](./#license)

### Overview

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

### Technologies

***

#### Backend

* **Django**: Web framework for backend logic.
* **PostgreSQL**: Database for storing user data and game records.
* **JWT**: For secure authentication.

#### Frontend

* **Bootstrap**: Frontend toolkit for responsive design.

#### Game

* **WebSockets**: For real-time communication between players.

#### DevOps

* **Docker**: Containerization for easy setup and deployment.
* **Docker Compose**: To manage multi-container Docker applications.
* **GitHub Actions**: CI/CD pipeline for automated testing and deployment.
* **Prometheus**: Monitoring and alerting toolkit.
* **Grafana**: Analytics and monitoring dashboards.

### Setup

***

#### Prerequisites

* Docker and Docker Compose
* Python 3.8+
* Node.js 14+

#### Steps

1.  **Clone the repository**

    ```sh
    git clone https://github.com/yourusername/mighty-pong-contest.git
    cd mighty-pong-contest
    ```
2. **Set up environment variables**
   *   Create a `.env` file in the root directory with necessary environment variables:

       ```sh
       DATABASE_URL=postgres://user:password@postgres:5432/mydatabase
       SECRET_KEY=your_secret_key
       JWT_SECRET_KEY=your_jwt_secret_key
       ```
3.  **Build and run the application**

    ```sh
    docker-compose up --build
    ```
4. **Access the application**
   * Open your browser and go to `http://localhost:8000`

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

This project is licensed under the MIT License. See the LICENSE file for more details.

***
