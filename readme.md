## Info
Created by: Joshua Lawrinenko

## Client
Bootstrapped with create-react-app.
Served through react-scripts in dev. 
Updates docker image on the fly in dev.
Served through nginx docker image in prod.

## Server
Node, Express, and Mongoose.
Nodemon in dev, updates docker image on the fly.

## State
MongoDB local docker instance.

## Commands

### `docker compose build`
Builds docker container/images

### `docker compose up`
Runs docker container, press ctrl+c to stop container

## Dev Commands

### `docker compose -f docker-compose-dev.yml build`
Builds docker container/images

### `docker compose -f docker-compose-dev.yml up`
Runs docker container, press ctrl+c to stop container
