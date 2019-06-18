const path = require('path');

const express = require('express');
const PushNotifications = require('@pusher/push-notifications-server');

const port = process.env.PORT || 3000;
const instanceId = 'YYY';
const secretKey = 'XXX';

const app = express();

const beamsClient = new PushNotifications({
  instanceId: instanceId,
  secretKey: secretKey,
});

app.use(express.urlencoded());

//default endpoint to check your node server is running locally
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/index.html')));

//specific endpoint for pusher beams authentication
app.get('/auth', function(req, res) {
  const userIdinQueryParam = req.query['user_id'];
  console.log(userIdinQueryParam);

  //if you don't send a user id query parameter, we reject the authentication
  if (userIdinQueryParam === undefined) {
    res.send(401, 'Inconsistent request');
  } else {
    //generate a token if they passed our authentication check
    //in production you must check they match a user in your database too.
    const beamsToken = beamsClient.generateToken(userIdinQueryParam);
    res.set('Access-Control-Allow-Origin', '*');
    res.send(JSON.stringify(beamsToken));
  }
});

//endpoint to send a test notification
app.post('/send', function(req, res) {
  const userId = req.body['user_id'];
  const message = req.body['notification_message'];

  beamsClient
    .publishToUsers([userId], {
      apns: {
        aps: {
          alert: message,
        },
      },
      fcm: {
        notification: {
          title: message,
        },
      },
      web: {
        notification: {
          title: message,
        },
      },
    })
    .then(publishResponse => {
      const message = `Just published: ${publishResponse.publishId}`;
      console.log(message);
      res.send(`
        <html>
          <body>
              ${message}<br>
              <a href="/">Back</a>
          </body>
        </html>
      `);
    })
    .catch(error => {
      console.error('Error:', error);
      res.send(error.message);
    });
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
