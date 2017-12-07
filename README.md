# Photography Site

## Overview

Photography is becoming a favorite hobby of mine, so here's this site that allows me to show off the work I've done! One thing though: I get a lot of inspiration in my photography and editing from music, so each photo is named after and subsequently linked to a song on Spotify.

God bless.

## Data Model

The application will store Photos, Albums, Locations, and Songs.

* photos have all the technical details about them, a title, and one linked song, one linked album, one linked location, as well as an endpoint where the picture will be stored.
* songs have a title, artist, album, link for the spotify api, and at least one linked photo.

An Example Photo:

```javascript
{
  "_id" : ObjectId("5a0bea7007ed3ff16c050246"),
  "name" : "8",
  "title" : "rainbows",
  "date" : ISODate("2017-05-26T01:45:20.201Z"),
  "location_string" : "San Fransisco, CA",
  "camera" : "Canon Rebel T6i",
  "ISO" : 100,
  "focal_length" : 18,
  "aperture" : "f/16.0",
  "exposure_time" : "1/400",
  "endpoint" : "static/photos/8.jpg",
  "song_id" : ObjectId("5a238871ab2a32f9edc9fbfc")
}

```

An Example Song:

``` javascript
{
   "_id" : ObjectId("5a238871ab2a32f9edc9fbfc"),
   "album" : { "id" : "61809gZj46tFYs0g4s51nu",
   "name" : "Madvillainy" },
   "artists" : [
     {
       "id" : "2aoFQUeHD1U7pL098lRsDU",
       "name" : "Madvillain"
     }
   ],
   "href" : "https://api.spotify.com/v1/tracks/7aheCJTgZydWp7D0BWgrpc",
   "id" : "7aheCJTgZydWp7D0BWgrpc",
   "name" : "Rainbows",
   "uri" : "spotify:track:7aheCJTgZydWp7D0BWgrpc",
   "linked_photos" : [ "8" ]
 }

```

Sample Feedback:
``` javascript
{
  "_id" : ObjectId("5a06406b5080e807e46504cb"),
  "from" : "You",
  "text" : "These photos are cool!",
  "__v" : 0 
}

```

## [Link to First Draft Schema](db.js)

## Wireframes

[These were removed since they didn't accurately represent the site anymore.]

## User Stories or Use Cases

1. as a user, I can register browse through photos
2. as a user, I can listen to the song associated with a photo

## Research Topics

* (5 points) Use React as a frontend framework
    * I'm going to use react to create a hopefully beautiful webpage
    * This is my first time dealing with a frontend framework, with limited knowledge of html and css.
    * I'm using react since, based on my readings online, it is relatively easy to learn, widely used, and efficient.
    * 5 points, because it is my first time dealing with frontend.
* (4 points) Use the Spotify API to link photos to songs
    * I want users to be able to listen to songs directly from the site, and the spotify api seems like a prime candidate for using songs I don't have to download.
    * Spotify has most of the songs I listen to, therefore most of the songs I would link to photos.
    * 4 points, although I've used a REST API in the past this is my first exprience with Spotify's, and this involves implementing client side, third party widgets which is also new to me.

* (2 points) Use a CSS framework with reasonable customization
    * I think this will be necessary for the site to look good.
    * I want the size of the photos on the home page or album page to adapt based on the size of the window, which just screams css framework.
    * I will probably use Bootstrap although I haven't looked into Foundation that much (my understanding is that Foundation is more mobile-focused)

11 points total out of 8 required points.


## [Link to Initial Main Project File](app.js)

## Annotations / References Used

1. [Spotify API](https://developer.spotify.com/web-api/).
2. [React tutorial](https://reactjs.org/docs/hello-world.html).
3. [Bootstrap tutorial](http://getbootstrap.com/docs/4.0/getting-started/introduction/)
4. [React-Bootstrap](https://react-bootstrap.github.io/getting-started.html) (I may consider using this after I learn more about react and bootstrap)
