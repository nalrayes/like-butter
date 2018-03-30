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

    const takenOn = "Taken on a " + imageDetails[currentImage].camera;
    return(
      <div className={css(this.classes.detailsContainer)}>
      <div className={css(this.classes.details)}>
      <span className={css(this.classes.title)}>
        {imageDetails[currentImage].title}
      </span>
      , {imageDetails[currentImage].date} <br />
      {takenOn} <br />
      {imageDetails[currentImage].description} <br />
      {imageDetails[currentImage].iso} <br />
      {imageDetails[currentImage].aperture} <br />
      {imageDetails[currentImage].location} <br />
      {imageDetails[currentImage].focal_length} <br />
      {imageDetails[currentImage].exposure_time} <br />
      </div>
      <div className={css(this.classes.spotifyContainer)}>
      <iframe title='Song' src={imageDetails[currentImage].spotifyURL} width="100%" height="80" frameborder="0" allowtransparency="true"></iframe>
      </div>
      </div>
    )
  }
}

const defaultStyles = {
  detailsContainer: {
    'background-color': 'white',
    'maxWidth': '50%',
    'float': 'right',
  },
	details: {
		'padding': '10px',
		'width': 'auto',
		'background-color': 'white',
	},
  title: {
    'font-size': 'x-large',
    'font-family': "'Nanum Gothic', sans-serif",
    'font-weight': "bold",
  },
  spotifyContainer: {
    'padding': '10px',
    'background-color': 'black',
  }
};


export default ImageDetails;
