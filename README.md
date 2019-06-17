# beams-authenticated-users-demo

## Installation

### Backend

- Install dependencies: `npm install`
- Edit `index.js` and provide your instance id and secret key. You can find them by clicking on the `Credentials` tab on the Beams the dashboard: https://dash.pusher.com/beams
- Run the server: `npm start`
- Server should be running on: `http://localhost:3000/`. If everything works, you should see: Hello World!
- Visit: `http://localhost:3000/auth?user_id=XYZ`, where `XYZ` is your user id.
- You should receive a token back:

```
{
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjA3NzczOTMsImV4cCI6MTU2MDg2Mzc5MywiaXNzIjoiaHR0cHM6Ly9ZWVkucHVzaG5vdGlmaWNhdGlvbnMucHVzaGVyLmNvbSIsInN1YiI6IlhZWiJ9.90f4EZTAEsd6t6wQJTxTEN7E2x9rsX2W1Emoae394W4"
}
```
