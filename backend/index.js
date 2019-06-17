const express = require('express');
const PushNotifications = require('@pusher/push-notifications-server');

const port = process.env.PORT || 3000;
const instanceId = 'YYY';
const secretKey = 'XXX';


const app = express();
const beamsClient = new PushNotifications({
  instanceId: instanceId,
  secretKey: secretKey
});

//default endpoint to check your node server is running locally
app.get('/', (req, res) => res.send('Hello World!'))

//specific endpoint for pusher beams authentication
app.get('/auth', function(req, res) {


  const userIdinQueryParam = req.query['user_id'];
  console.log(userIdinQueryParam);

  //if you don't send a user id query parameter, we reject the authentication
  if (userIdinQueryParam === undefined) {
    res.send(401, 'Inconsistent request');
  } else {
    //generate a token if they passed our authentication check
    //ideally, you'd want to check they match a user in your database too.
    const beamsToken = beamsClient.generateToken(userIdinQueryParam);
    res.send(JSON.stringify(beamsToken));
  }

});

app.listen(port, () => console.log(`Listening on port ${port}...`));
