import './App.css'
import {Carousel, Grid, Row, Col, Image, Button} from 'react-bootstrap';
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
        dimensions: {},
        divDimensions: {},
      }

      this.onImgLoad = this.onImgLoad.bind(this);
    }

    componentDidMount() {
      const height = this.divElement.clientHeight;
      const width = this.divElement.clientWidth;

      this.setState({divDimensions: {height:height,
                                     width:width}});
    }

     onImgLoad({target:img}) {
         this.setState({dimensions:{height:img.offsetHeight,
                                    width:img.offsetWidth}});
     }

    render() {
      const {src} = this.props;
      const {width, height} = this.state.dimensions;
      const divWidth = this.state.divDimensions.width;
      const divHeight = this.state.divDimensions.height;

      let style = {width:"100%", height:"100%"};
      if (divHeight / divWidth > height / width) {
        style = {width:"100%", height: 'auto'};
      } else {
        style = {height:"100%",  width: 'auto'};
      }

      return (
        <div className='img-container' ref={ (divElement) => this.divElement = divElement}>
          <Image className='photo' onLoad={this.onImgLoad} src={this.props.currentImage} style={style}/>
        </div>
      )
    }
}

class Photo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
    };

    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
  }
  getInitialState() {
    return {
      index: 0,
    };
  }

  onNext() {;
    if (this.index + 1 >= images.length) {
      this.setState({index: 0});
    } else {
      this.setstate({index: this.state.index + 1});
    }
  }

  onPrev() {
    // console.log(this.state);
    if (this.state.index - 1 < 0) {
      this.setState({index: images.length - 1});
    } else {
      this.setState({index: this.state.index - 1});
    }
  }

  render() {
    console.log(this.state.index);
    return (
      <Grid fluid={true} >
        <Row className='full-row'>
          <Col md={1} className='prev'>
            <Button onClick={this.onPrev}>prev</Button>
          </Col>
          <Col md={10} className='car'>
            <TrackedImage currentImage={images[this.state.index]} images={images}/>
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
