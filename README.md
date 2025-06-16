# Reci - It's time to cook!

Reci is a social recipe-sharing app where users can post recipes, review what they’ve cooked, and follow friends to stay updated on what’s hot in their kitchens.

<img src="reci.png" alt="Reci Logo" width="200">

C1. README file: A README file describing how to create and load your sample database, how
to run your working database-driven application, and what features it currently supports.
• C2. SQL code (create tables, etc): Files containing the SQL code used for creating tables,
constraints, stored procedures, and triggers (if any).
• C3. SQL queries for features, test-sample.sql, test-sample.out A file test-sample.sql (or other
corresponding files) containing the SQL statements, and a file test-sample.out showing the results of
running test-sample.sql over your sample database.
• C4. SQL queries for features, test-production.sql, test-production.out A file test-production.sql
(or other corresponding files) containing the SQL statements, and a file test-production.out showing
the results of running test-production.sql over your production database.
• C5. Application code: The end-to-end application code that implements all the claimed features
for the corresponding milestone.
• If applicable, any code for downloading/scraping/transforming real data that you have written.

## App Structure

This repo is strucutred as a mono-repo, with our frontend living under `frontend/`, and our backend living in `backend/`. The frontend is built using React, while the backend is built with Express. Both can be started with `npm run dev`, but see the startup instructions for an automatic script.

Of special note, the backend pulls the SQL instructions it needs at runtime from the `backend/sql/` folder. This folder is where all SQL lives for our project. Our seeding generation script also lives in `backend/sql/seed/`, and you can read more about it in the README located there.

## How to create and load the database

Every time the app starts up, we automatically delete the existing database instance (by doing `docker compose down -v` which deletes it's volume), create a new database container (by doing `docker compose up`), automatically run `backend/sql/init.sql` to create tables, constraints, stored procedures, and triggers, and finally run `backend/sql/seed.sql` to seed the database with toy data.

This process is made to ensure a consistent developer environement, making it fast to itterate on our SQL schemas.

## Installation

1. Installed [docker](https://www.docker.com/get-started/)
2. Install npm
3. From the root of the repo, run `npm install`
4. Copy `example.env` and rename it to `.env`

As a note: the JWT secret is generated with `openssl rand -base64 32`, but we use the same secret in dev for consistency.

## Startup

1. Make sure docker is running
2. Run `npm run dev`. It will start the docker container for the database, npm install in FE and BE, startup the dev apps, and automatically reset and seed the database for you!

## Troubleshooting

### Postgres "authentication failed"

If you run `npm run dev` and notice you get an error containing `error: password authentication failed for user "postgres"`, then there is likely an issue with the port you are using.

To solve the problem, navigate to `docker-compose.yml` and change the line containing the two ports `"5433:5432"` to something else, ex: `"5432:5432"`. You will then need to change the port in the `backend\src\db.ts` to whatever new port you decided to use, ex: `port: 5432`.

Then, go through the setup steps again and it should work!
