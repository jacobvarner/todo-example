# todo

<!-- TOC -->
* [Spring Boot Starter](#starter-app)
    * [About the project](#about-the-project)
    * [Creating your new application](#creating-your-new-application)
    * [Required Software](#required-software)
    * [Running your application](#running-your-application)
        * [Start dependent services](#start-dependent-services)
        * [Start the Spring Boot application](#start-the-spring-boot-application)
    * [Running Tests](#running-tests)
<!-- TOC -->

## About the project

Project supporting Vite Testing with React Vite. react-vite-typescript testing app

## Creating your new application

1. Create a new project on [GitHub `Create New Project`](https://github.com)
2. Create a new Spring Boot App [Spring Boot Starter `Create New App`](https://start.spring.io)

### Required Software

1. Docker Desktop Running
2. Intellij
3. Java 21
4. Spring Boot Starter

## Running your application

### Start dependent services

Run `docker-compose up -d` to start containers for Postgres

### Start the Spring Boot application

By default, the application runs at [http://localhost:8080](http://localhost:8080).

Run your application with one of the following commands:

- MacOS: `./gradlew bootRun`

To run your Application within a terminal of your IDE.

```
-Djava.security.properties=src/main/dist/java.security
```

## Running Tests

- Run `docker compose up -d`

| Tests to Run       | Command(s)                                         |
|:-------------------|:---------------------------------------------------|
| Backend            | Run `./gradlew test` in the project root directory |