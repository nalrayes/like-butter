require('./db.js');
const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const config = require('../config.json');

const mongoose = require('mongoose');
const Feedback = mongoose.model('Feedback');
const Photo = mongoose.model('Photo');
const Song = mongoose.model('Song');
const app = express();

const publicPath = path.resolve(__dirname, "public/") + '/';
app.use('/static', express.static(publicPath));
app.use(express.static(path.resolve(__dirname, '../../frontend/build')));


app.use(express.urlencoded({ extended: false }));

app.set('views', __dirname + '/views');

app.use((req, res, next) => {
  // res.append('Access-Control-Allow-Origin', config.host);
  res.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

// app.post('/feedback', (req, res) => {
//   sgMail.setApiKey(config.sendGridKey);
//   new Feedback({
//     from: req.body.senderName,
//     text: req.body.emailBody
//   }).save();
//   const msg = {
//     to: 'thenalrayes@gmail.com',
//     from: 'thenalrayes@gmail.com',
//     subject: req.body.senderName,
//     text: req.body.emailBody,
//   };
//   sgMail.send(msg);
//   res.redirect('/feedback');
// });

app.get('/photos', (req, res) => {
  if (req.query.location) {
    console.log(req.query.location);
    Photo.find({location_string: req.query.location}, (err, photos) => {
      res.json(photos);
    });
  } else {
    Photo.find((err, photos) => {
      if (err) {
        res.json({'error': err});
      } else {
        console.log('photos');
        console.log(photos);
        res.json(photos);
      }
    });
  }
});

app.get('/api/photo', (req, res) => {
  Photo.find({name: req.query.name}, (err, photos) => {
    if (err) {
      res.json({'error': err});
    } else {
      const currentSongId = photos[0].song_id;
      Song.find({_id: currentSongId}, (err, songs) =>{
        if (err) {
          res.json({'error': err});
        } else {
          photos[0]._doc.uri = songs[0].uri;
          res.json(photos[0]);
        }
      });
    }
  });
});

app.get('/api/songs', (req, res) => {
  Song.find((err, songs) => {
    res.json(songs);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../frontend/build/index.html'));
});

app.listen(config.port);
