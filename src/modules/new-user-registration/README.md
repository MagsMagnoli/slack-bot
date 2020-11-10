# New User Registration

Stores new user data on entry into the workspace

## Setup

- Create a google sheet to store user data
- Create a service account and share the sheet with it
- Set `USERS_SHEET_ID` env var to the sheet id
- Set `GOOGLE_APPLICATION_CREDENTIALS` env var to the service account location
- Clone repository
- Run the bot with `npm start`
