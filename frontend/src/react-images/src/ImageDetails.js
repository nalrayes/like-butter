import defaultTheme from './theme';
import React, { Component } from 'react';
import { css, StyleSheet } from 'aphrodite';
import deepMerge from './utils/deepMerge';

class ImageDetails extends Component {
  constructor(props) {
    super(props);
    this.theme = deepMerge(defaultTheme, props.theme);
    this.classes = StyleSheet.create(deepMerge(defaultStyles, this.theme));
  }

  render() {
    const {
      imageDetails,
      currentImage
    } = this.props;

    const takenOn = "Captured using a " + imageDetails[currentImage].camera + ".";
    // return(
    //   <div className={css(this.classes.detailsContainer)}>
    //   <div className={css(this.classes.details)}>
    //   <span className={css(this.classes.title)}>
    //     {imageDetails[currentImage].title}
    //   </span>
    //   , {imageDetails[currentImage].date} <br />
    //   {takenOn} <br />
    //   {imageDetails[currentImage].description} <br />
    //   {imageDetails[currentImage].iso} <br />
    //   {imageDetails[currentImage].aperture} <br />
    //   {imageDetails[currentImage].location} <br />
    //   {imageDetails[currentImage].focal_length} <br />
    //   {imageDetails[currentImage].exposure_time} <br />
    //   </div>
    //   <div className={css(this.classes.spotifyContainer)}>
    //   <iframe title='Song' src={imageDetails[currentImage].spotifyURL} width="100%" height="80" frameborder="0" allowtransparency="true"></iframe>
    //   </div>
    //   </div>
    // )
    return(
      <div className={css(this.classes.gapContainer)}>
      <div className={css(this.classes.detailsContainer)}>
      <div className={css(this.classes.details)}>
      <p className={css(this.classes.titleParagraph)}>
      <span className={css(this.classes.title)}>
        {imageDetails[currentImage].title}
      </span>
      <span className={css(this.classes.date)}>, June 2017</span>
      <br />
      <span className={css(this.classes.location)}> {imageDetails[currentImage].location} </span>
      </p>
      <p className={css(this.classes.descriptionParagraph)}>
      I randomly took this picture while in the car with my pal Moni while she was showing me around San Fransisco. This kind of happened by accident but turned out great, I love the way the light sort of fades out the powerlines and creates a cool shadow over the church. I was listening Madvilliany for the millionth time here, and Rainbows is a strange singy interlude that takes you into my favorite track in the album. <br />
      </p>
      <br />
      <p className={css(this.classes.footerParagraph)}>
      Taken at 1.0f, 1/60s, 350 ISO.
      <br />
      {takenOn}
      </p>
      </div>
      </div>
      <div className={css(this.classes.detailsContainerWithGap)}>
      <div className={css(this.classes.centerMe)}>
      <iframe title='Song' src={imageDetails[currentImage].spotifyURL} width="100%" height="80" frameborder="0" allowtransparency="true"></iframe>
      </div>
      </div>
      </div>
    )
  }
}

const defaultStyles = {
  detailsContainer: {
    'background-color': 'white',
    'width': '100%',
  },
	details: {
		'padding': '25px',
		'width': 'auto',
		'background-color': 'white',
    'font-family': "'Nanum Gothic', sans-serif",
    'font-size': '13px',
	},
  title: {
    'font-size': '2.3em',
    'font-weight': "bold",
  },
  date: {
    'font-size': '1.5em',
  },
  location: {
    'font-size': '1.2em',
    'font-style': 'italic'
  },
  titleParagraph: {
    'lineHeight': '155%',
  },
  descriptionParagraph: {
    'marginTop': '20px',
    'fontSize': '1.1em',
  },
  footerParagraph: {
    'marginBottom': '-5px',
    'font-style': 'italic',
    'fontSize': '1em',
  },
  gapContainer: {
    'max-width': '25%',
    'background-color': 'transparent',
    'float': 'right',
  },
  detailsContainerWithGap: {
    'width': '100%',
    'marginTop': '5%',
    'display': 'flex',
    'justify-content': 'center',
    'align-items': 'center',
  },
  centerMe: {
    'width': '100%',
    'max-width': '375px',
  }
};


export default ImageDetails;
