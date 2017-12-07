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
  album: {
    id: String,
    name: String
  },
  artists: [{
    id: String,
    name: String
  }],
  href: String,
  track_id: String,
  name: String,
  linked_photos: [String],
  linked_photo_ids: [Schema.Types.ObjectId],
  uri: String,
});



const Feedback = new Schema({
  from: String,
  text: String,
});

mongoose.model('Feedback', Feedback);
mongoose.model('Photo', Photo);
mongoose.model('Song', Song);
mongoose.connect(config.dburl);
