import './App.css'
import {Carousel, Grid, Row, Col} from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
const React = require('react');
const queryString = require('query-string');
const config = require('./config.json');

const sample1 = 'https://pmcdeadline2.files.wordpress.com/2016/04/danny-devito-curmudgeons.jpg?w=1000&h=1000&crop=1';
const sample2 = 'https://pmcdeadline2.files.wordpress.com/2016/04/danny-devito-curmudgeons.jpg?w=1000&h=500&crop=1';
const sample3 = 'https://pmcdeadline2.files.wordpress.com/2016/04/danny-devito-curmudgeons.jpg?w=500&h=1000&crop=1';

const images = [
sample1, sample2, sample3
]

class TrackedImage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        images: props.images,
        currentImageIndex: 0,
        currentImage: props.images[0],
        imageClass: "",
        dimensions: {},
      }

      this.onImgLoad = this.onImgLoad.bind(this);
      this.nextImage = this.nextImage.bind(this);
      this.prevImage = this.prevImage.bind(this);
    }

     onImgLoad({target:img}) {
         this.setState({dimensions:{height:img.offsetHeight,
                                    width:img.offsetWidth}});
     }

    nextImage() {
      let nextImg = this.state.currentImageIndex + 1;
      if (nextImg >= this.state.images.length) {
        nextImg = 0;
      }
      this.setState ({
        currentImageIndex: nextImg,
        currentImage: this.state.images[nextImg],
      })
    }

    prevImage() {
      let prevImage = this.state.currentImageIndex - 1;
      if (prevImage < 0) {
        prevImage = this.state.images.length - 1;
      }
      this.setState ({
        currentImageIndex: prevImage,
        currentImage: this.state.images[prevImage],
      })
    }

    render() {
      const {src} = this.props;
      const {width, height} = this.state.dimensions;
      let style = {width:"100%", height:"100%"};
      if (width > height) {
        style = {width:"100%",height:"auto",};
      } else if (height > width){
        style= {height:"100%",width:"auto",};
      }

      return (
        <div>
        width: {width} <br />
        height: {height} <br />
        <img onLoad={this.onImgLoad} src={this.state.currentImage} style={style}/>
        </div>
      )
    }
}

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      direction: null,
    };

    this.handleSelect = this.handleSelect.bind(this);
  }
  getInitialState() {
    return {
      index: 0,
      direction: null,
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render() {
    console.log(this.state);
    return (
      <Grid fluid={true} >
      <Row>
        <p>/test</p>
      </Row>
        <Row className='full-row'>
          <Col md={1} className='prev'>
            <h3>prev</h3>
          </Col>
          <Col md={10} className='car'>
            <TrackedImage images={images}/>
          </Col>
          <Col md={1} className='next'>
            <h3>next</h3>
          </Col>
          <div>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"  />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" />
          </div>
        </Row>
      </Grid>
    );
  }
}

export default Photo;
