const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Photo = new Schema({
  name: String,
  title: String,
  date: Date,
  location_id: Schema.types.ObjectId,
  location_string: String,
  camera: String,
  lens: String,
  ISO: Number,
  focal_length: Number,
  aperture: String,
  exposure_time: String,
  source_album_id: Schema.types.ObjectId,
  source_album_name: String,
  song_id: Schema.types.ObjectId, // no song name, since all the details would come from the spotify api
  endpoint: String,
});

const Album = new Schema({
  album_name: String,
  list_of_photo_ids: [Schema.types.ObjectId],
  album_endpoint_name: String,
});

const Song = new Schema({
  url: String,
  track_id: String,
  title: String,
  album: String,
  artist: String,
  linked_photo_ids: [Schema.types.ObjectId],
});

const Location = new Schema({
  name: String,
  country: String,
  city: String,
  state: String,
});

module.exports = {Photo: Photo, Album: Album, Song: Song, Location: Location};
