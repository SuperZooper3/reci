# Reci

It's time to cook!

## Requirements

- Installed npm
- Installed docker, and docker must be running

## Setup

From the root of the repo:

- `npm install`
- `npm run dev` will start the docker container for the database, npm install in FE and BE, and startup the dev apps!

## Troubleshooting

### Postgres "authentication failed"

If you run `npm run dev` and notice you get an error containing `error: password authentication failed for user "postgres"`, then there is likely an issue with the port you are using.

To solve the problem, navigate to `docker-compose.yml` and change the line containing the two ports `"5433:5432"` to something else, ex: `"5432:5432"`. You will then need to change the port in the `backend\src\db.ts` to whatever new port you decided to use, ex: `port: 5432`.

Then, go through the setup steps again and it should work!
