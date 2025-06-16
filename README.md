# Reci - It's time to cook!

Reci is a social recipe-sharing app where users can post recipes, review what they’ve cooked, and follow friends to stay updated on what’s hot in their kitchens.

<img src="reci.png" alt="Reci Logo" width="200">

## App structure

This repo is strucutred as a mono-repo, with our frontend living under `frontend/`, and our backend living in `backend/`. The frontend is built using React, while the backend is built with Express. Both can be started with `npm run dev`, but see the startup instructions for an automatic script. This is where the end-to-end application code that implements all the claimed features is.

### SQL queries for features

Of special note, the backend pulls the SQL instructions it needs at runtime from the `backend/sql/` folder. This folder is where all SQL lives for our project, including our seeding code.

Our production data generation script also lives in `backend/sql/seed/`, and you can read more about it in the README located there. This is the code for downloading/scraping/transforming real data that we have written.

Instead of having a single `test-sample.sql`, for each of our features listed in the Milestone 1 report, you can find their query in the `backend/sql/` folder, and their corresponding expected output in `backend/sql/test-sample-out/` such as `backend/sql/test-sample-out/filterRecipes.out`.

We do not have `test-production` outputs yet.

## How to create and load the database

Every time the app starts up, we automatically delete the existing database instance (by doing `docker compose down -v` which deletes it's volume), create a new database container (by doing `docker compose up`), automatically run `backend/sql/init.sql` to create tables, constraints, stored procedures, and triggers, and finally run `backend/sql/seed.sql` to seed the database with toy data.

This process is made to ensure a consistent developer environement, making it fast to iterate on our SQL schemas.

## How to run the app

This is how to run our working database-driven application.

### Installation

1. Installed [docker](https://www.docker.com/get-started/)
2. Install npm
3. From the root of the repo, run `npm install`
4. Copy `example.env` and rename it to `.env`

As a note: the JWT secret is generated with `openssl rand -base64 32`, but we use the same secret in dev for consistency.

### Startup

1. Make sure docker is running
2. Run `npm run dev`. It will start the docker container for the database, npm install in FE and BE, startup the dev apps, and automatically reset and seed the database for you!

### Troubleshooting

#### Postgres "authentication failed"

If you run `npm run dev` and notice you get an error containing `error: password authentication failed for user "postgres"`, then there is likely an issue with the port you are using.

To solve the problem, navigate to `docker-compose.yml` and change the line containing the two ports `"5433:5432"` to something else, ex: `"5432:5432"`. You will then need to change the port in the `backend\src\db.ts` to whatever new port you decided to use, ex: `port: 5432`.

Then, go through the setup steps again and it should work!

## Currently supported features

We've worked extensively on our backend systems with a long suite of fleshed out SQL queries and endpoints. Current features include:

- Fully working SQL database with dynamic loading of files
- Signing up accounts, and authentication with JWTs
- CRUD (Create Read Update Delete) operations for recipies, accounts
- Searching for recipies
- Reading recipies
- Reading followers, following, account information

Our app's frontend is currently quite bare-bones, so the main app isn't functional yet, but backend endpoints can be found in the routes folder and tested with Postman.

![Screenshot of the current frontend](milestone-1-fe.png)
