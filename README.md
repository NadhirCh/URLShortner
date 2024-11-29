# URL Shortener

A simple URL shortener application built with **Vue.js** for the frontend and **Node.js** for the backend, using **MongoDB** and **Redis** for data storage. The app is containerized with Docker and easily deployable.

---

## Features

- **Frontend**: Built with Vue.js for a modern, responsive user interface.
- **Backend**: Powered by Node.js with Express for RESTful API functionality.
- **Database**:
  - **MongoDB**: Stores URL mappings.
  - **Redis**: Caches frequently accessed data for performance.
- **Dockerized**: Easily deployable with Docker Compose.

---

## Project Structure

```plaintext
.
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml


Here's the copy-paste-ready README.md content:

markdown
Copier le code
# URL Shortener

A simple URL shortener application built with **Vue.js** for the frontend and **Node.js** for the backend, using **MongoDB** and **Redis** for data storage. The app is containerized with Docker and easily deployable.

---

## Features

- **Frontend**: Built with Vue.js for a modern, responsive user interface.
- **Backend**: Powered by Node.js with Express for RESTful API functionality.
- **Database**:
  - **MongoDB**: Stores URL mappings.
  - **Redis**: Caches frequently accessed data for performance.
- **Dockerized**: Easily deployable with Docker Compose.

---

## Project Structure

```plaintext
.
├── frontend/
│   ├── public/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── backend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml

## Run the Application
To build and run the application locally, follow these steps:

Build and Start Services:
docker-compose up --build

## Access the App:

Frontend: http://localhost:8080
Backend: http://localhost:3000

