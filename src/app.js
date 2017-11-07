const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const config = require('../config.json');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// not doing hbs or view engine setup quite yet, need
// to see how that would work with bootsrap/react

// home endpoint
// app.get('/', (req, res) => {
//
// });

app.get('/feedback', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/feedback.html'));
});

app.post('/feedback', (req, res) => {
  sgMail.setApiKey(config.sendGridKey);
  const msg = {
    to: 'thenalrayes@gmail.com',
    from: 'thenalrayes@gmail.com',
    subject: req.body.senderName,
    text: req.body.emailBody,
  };
  sgMail.send(msg);
  res.redirect('/feedback');
});
//
// app.get('/photo', (req, res) => {
//   // needs photo id to work
//   // if no query submitted, give 404
//   // if photo_id is invalid, give 404
//   // else show the picture
// });
//
// app.get ('/about', (req, res) => {
//
// });
//
// app.get('/album', (req, res) => {
//   // needs album_id to work
//   // if no query submitted, give 404
//   // if album_id is invalid, give 404
//   // else show the album
// });



app.listen(3000);
