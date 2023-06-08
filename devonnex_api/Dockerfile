FROM ruby:3.1.3-alpine

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apk update && apk add --no-cache \
    build-base \
    nodejs \
    tzdata \
    postgresql-dev \
    postgresql-client \
    imagemagick

# Install bundler
ENV BUNDLER_VERSION=2.4.7
RUN gem install bundler:2.4.7

# Copy only the Gemfile and Gemfile.lock to the container
COPY Gemfile Gemfile.lock ./

# Install dependencies
RUN bundle config set --local without 'development test'
RUN bundle install 

# Copy the rest of the application code to the container
COPY . .
# Copy the credentials file to the container
COPY config/credentials.yml.enc config/credentials.yml.enc


# Precompile assets and clean up
RUN rm -rf node_modules tmp/cache vendor/bundle

# Expose the port that the Rails server will listen on
EXPOSE 3000

# Set the Rails environment
ENV RAILS_ENV production

# Start the Rails server
CMD [ "bundle","exec", "puma", "config.ru"]
