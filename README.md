# Reci

# Steps to test:

1. Clone this repo.

## Setting up the DB
2. In the terminal, navigate to the reci directory and run `docker compose up -d`.

## Running Reci
3. Navigate to the \backend directory. Run `npm install`. 
4. Run `npm run dev` to start the backend.
5. Navigate to the \frontend directory. Run `npm install`.
6. Run `npm run dev` to start the frontend. 
7. Go to http://localhost:5173/ in your browser.

## Troubleshooting

### Common Issue

If you run `npm run dev` and notice you get an error containing `error: password authentication failed for user "postgres"`, then there is likely an issue with the port you are using.

### Solution

Navigate to `docker-compose.yml` and change the line containing the two ports `"5432:5432"` to something else, ex: `"5433:5432"`. You will then need to change the port in the `backend\src\db.ts` to whatever new port you decided to use, ex: `port: 5433`.

Then, go through the setup steps again and it should work!