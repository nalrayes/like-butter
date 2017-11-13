require('./db.js');
const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const config = require('../config.json');

const mongoose = require('mongoose');
const Feedback = mongoose.model('Feedback');
const app = express();

const publicPath = path.resolve(__dirname, "public/") + '/';
app.use('/static', express.static(publicPath));


app.use(express.urlencoded({ extended: false }));


// app.get('/images/logo.png', (req, res) => {
//   res.sendFile('/home/nayef/Dropbox/NYU Classes/Senior Semester 1/ait/na1487-final-project/src/pubilc/images/logo.png');
// });

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require("express-react-views").createEngine());

// not doing hbs or view engine setup quite yet, need
// to see how that would work with bootsrap/react

// home endpoint
// app.get('/', (req, res) => {
//
// });

app.get('/feedback', (req, res) => {
  res.render('feedback');
});

app.post('/feedback', (req, res) => {
  sgMail.setApiKey(config.sendGridKey);
  new Feedback({
    from: req.body.senderName,
    text: req.body.emailBody
  }).save();
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

app.listen(config.port);
