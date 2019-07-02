const express = require('express');
const forceDomain = require('forcedomain');
const cors = require('cors');
const path = require('path');

const app = express();


/* Redirects the address wixwareapi.appspot.com to api.wixware.com */
app.use(forceDomain({
  hostname: 'api.rdigger.com',
  protocol: 'https'
}));


/*
  For now, we're allowing everyone to fetch from
  api.rdigger.com. But in the future we may restrict
  CORS to the registered users only.
*/
app.use(cors());


/* Serving the documentation from React build */
app.use(express.static(path.join(__dirname, 'docs/build')));

/* Importing Firebase dependencies */
const admin = require('firebase-admin');

/* Initializing Firebase Admin from Google Cloud
Project's default credentials*/
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

/* Initializing Google Firestore */
const db = admin.firestore();


// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'docs/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port 8080`);
  console.log('Press Ctrl+C to quit.');
});