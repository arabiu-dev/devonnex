# Devonnex Chat Backend Installation Guide

Before setting up the Go backend, ensure that you have the following prerequisites installed:

## Prerequisites

- Go
- Redis

## Steps

Clone the repository to your local machine:

```bash
git clone https://github.com/arabiu-dev/devonnex
```

Navigate to the Chat backend directory:

```bash
cd chat_backend
```

Install the Go dependencies:

```go
go mod download
```

Set up the Redis database:

- Install and configure Redis on your machine.
- Update the Redis connection details in the .env file.

Build and run the Chat backend:

```go
go run main.go
```

The Chat backend is now running locally on http://localhost:8000.

## Configuration

To configure the Chat backend with your specific settings, you can update the environment variables in the **.env** file. Adjust the values according to your **Redis database connection** details and any other required configuration options.
