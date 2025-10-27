# Todo Example

## About

A classic todo example application to use as a reference and provide a simple configuration with Spring Boot, React, and TypeScript.

## Running your application

The application currently runs as a separate frontend and backend, both instances will need to be running for it to function.

### Start dependent services

Run `docker-compose up -d` to start containers for Postgres

### Start the Spring Boot application

By default, the application runs at [http://localhost:8080](http://localhost:8080).

Run your application with the following commands:

- MacOS: `./gradlew bootRun`
- 
### Start the React application

As configured, the application runs at [http://localhost:3000](http://localhost:3000).

Run your application with the following commands:

- MacOS: `cd frontennd && yarn dev`

## Running Tests

- Run `docker compose up -d`

| Tests to Run | Command(s)                                         |
|:-------------|:---------------------------------------------------|
| Frontend     | Run `yarn test` in the `frontend` director         |
| Backend      | Run `./gradlew test` in the project root directory |