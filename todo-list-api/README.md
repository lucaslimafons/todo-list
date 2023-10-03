# TODO List API

## Prerequisites

* [Nodejs](https://nodejs.org/en/download/current)
* [Docker](https://www.docker.com/)
* [Docker compose](https://docs.docker.com/compose/install/)


### Setting up the database

To start the PostgreSQL container, navigate to the directory containing the docker-compose.yml file in your terminal and run the following command:

```
$ docker-compose up -d
```

```
$ docker-compose up -d
Creating network "todo-list-api_default" with the default driver
Creating todo-list-api_pg_postgres_1 ... done
```


The commands:

* ```up``` brings up the container
* ```-d``` in a detached mode

This command will start the container in detached mode, which means that it will run in the background. You can verify that the container is running by running the following command:

```
$ docker ps
Name                        Command                      State     ...
-------------------------------------------------------------------------
todo-list-api_postgres_1   docker-entrypoint.sh postgres   Up      ...
```


To stop and remove the PostgreSQL container you can run the following command:

```
$ docker-compose down
```

This will stop and remove the container.


## Getting started

Let's start installing the packages:

```
$ npm install
```

Now please create the `.env` file and paste the content from `.env.example`.

```
$ vi .env
```

Now that you have all the libraries installed, the PostgreSQL container up and running and the env file created, you can run the following command to migrate and create the database:

```
$ npx prisma migrate dev
```

You can use the prisma studio to browse and manage your data running this command:

```
$ npx prisma studio
```

And now we can run the API

```
$ npm start
```

We can run the tests with

```
$ npm test
```

## Project scaffolding

- `prisma` - migrations and database schemas
- `factories` - factory classes to easily build and create entities
- `middleware` - middleware to validate authenticated users for routing and to keep it secure
- `providers` - folder to have all providers to be used in the project, such as aws, database, logging, etc...
- `resolvers` - to control the request/response with the logic
- `routes` - routing application endpoints
- `schemas` - schema declarations/validations
- `server` - application definitions and express server
- `services` - business logic for the entities


## Decisions Tech stack

- Postgres for the database
  - I think it's the best option now for a relation database, and it's not that important for this simple solution.
Added Docker to easily have the database up and running.

- ORM? Prisma.

  -  Why?
Sequelize it's always the first option, but not the best one anymore! it's pretty easy to setup and to use, but you can easily lost a lot of performance with eager loading queries, so it's not that good if you want to scale. I thought about Knex (SQL Builder) + Zod, then you can have a nice control over the database, but it would take a lot of time configuring and doing it, doesn't worth it, another thing is for a big project it will be a headache. TypeORM it was another really good option and I chose Prisma over it, because it's lighter and they operate in a different way, TypeORM is closer to mirroring SQL in its API while Prisma Client provides a higher-level abstraction, we have nice features with prisma such as prisma studio and a better TypeScript support with types for enhanced safety.

- Vitest
  - faster run for your unit tests! Even though I would love to add more tests in a world of thousands of tests, time to setup x running, vitest it's a perfect option.

- Zod?
  - A really good TypeScript-first schema library for validations and types


## TODO's and Improvements

Because of the short period of time to complete this project, of course I had to leave some things as it's to be able to continue and finish it, so below are a list of items of TODO's and improvements:

- [ ] Standardize the error object
- [ ] Error handling over the services/resolvers, etc...
- [ ] Add unit tests for everything, I just added an example on `services/__tests__/task.test.ts` - to be fast, the tests are running at the same database of the project, but this should not be the case :)
- [ ] Improve authentication and security - now is pretty simple just using jwt token
- [ ] Add rate limiting
- [ ] Add integration tests