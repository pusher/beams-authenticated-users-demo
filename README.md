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


### Android

* Ensure you add your google-services.json from firebase with the package `com.pusher.demo.myapplication`
* Open the project in Android Studio
* Open MainActivity.kt
* Write your beams instance id into the placeholder variable
* Write out your auth url by pointing to your laptop ip address that's running the backend server e.g. ` http://192.168.6.27:3000/auth`
* Press play, and ensure the emulator or device is on the same wifi network as the lapotp running the backend server.
* You should get a logcat message to say `Beams login success`!
### iOS

- Ensure that iOS SDK is successfully configured by following our [docs](https://pusher.com/docs/beams/getting-started/ios/configure-apns).
- Open the `PushNotifications.xcworkspace` in `ios/push-notifications-swift`.
- Select `push-notifications-ios` project and open the `AppDelegate.swift` file.
- Add correct values for `instanceId`, `authURL`, and `userId`.
- Run the project on your device. If successfull, you should see the `All good!` message in your console.
