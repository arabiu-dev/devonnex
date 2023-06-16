# Devonnex Api Installation Guide

## Prerequisites

- Ruby
- Rails
- PostgreSQL
- Bundler

## Steps

Clone the repository to your local machine:

```bash
git clone https://github.com/arabiu-dev/devonnex
```

Navigate to the Devonnex Api directory:

```bash
cd devonnex_api
```

Install the required gems:

```bash
bundle install
```

Create the PostgreSQL database:

```ruby
rails db:create
```

Run the database migrations:

```ruby
rails db:migrate
```

Start the Rails server:

```ruby
rails server -p 3030
```

The Devonnex api backend is now running locally on http://localhost:3030.

## Configuration

To configure the Rails backend with your specific settings, you can update the configuration files located in the config directory, such as **database.yml** for database configuration and **application.yml** for environment-specific variables.
