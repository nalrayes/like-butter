const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config.json');

const Photo = new Schema({
  name: String,
  title: String,
  date: Date,
  location: Schema.Types.ObjectId,
  location_string: String,
  camera: String,
  lens: String,
  ISO: Number,
  focal_length: Number,
  aperture: String,
  exposure_time: String,
  song_id: Schema.Types.ObjectId, // no song name, since all the details would come from the spotify api
  endpoint: String,
});

const Song = new Schema({
  url: String,
  track_id: String,
  title: String,
  album: String,
  artist: String,
  linked_photo_ids: [Schema.Types.ObjectId],
  genre: String,
});

const Location = new Schema({
  name: String,
  country: String,
  city: String,
  state: String,
  stringRep: String,
});

const Feedback = new Schema({
  from: String,
  text: String,
});

mongoose.model('Feedback', Feedback);
mongoose.connect(config.dburl);
