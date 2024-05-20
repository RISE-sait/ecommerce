# Use the official Node.js image as a base
FROM node:21.5-alpine as base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json .

ARG NODE_ENV

# Install dependencies
RUN if [ "$NODE_ENV" = "dev" ]; then \
    npm i; \
        else \
    npm i --production; \
    fi

COPY . .

RUN npx prisma generate

# Copy the rest of the application code
RUN if [ "$NODE_ENV" = "dev" ]; then \
    npx prisma db push; \
        else \
    npx prisma db pull; \
    fi



CMD node dist/index.js

EXPOSE 3000
