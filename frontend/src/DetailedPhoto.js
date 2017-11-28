import './App.css'
import {Carousel, Grid, Row, Col, Image, Button} from 'react-bootstrap';
import ResizeDetector from 'react-resize-detector';
import {TrackedImage} from './Photo.js';
const React = require('react');
const queryString = require('query-string');
const config = require('./config.json');

class DetailedPhoto extends React.Component {
  constructor(props) {
    super(props);
    const photoNum = queryString.parse(this.props.location.search).name;
    this.state = {
      'photo': photoNum,
      'photoDetails': {}};
    console.log(this.state);
    fetch(config.host + '/api/photo?name=' + photoNum)
      .then(data => data.json())
      .then(photo => {
        console.log('deets');
        console.log(photo);
        this.setState({'photoDetails': photo});
      });
  }
  render () {
    const photoDetails = this.state.photoDetails;
    const photoURL = config.host + '/static/photos/' + this.state.photo + '.jpg';
    return (
      <Grid fluid={true}>
        <Row className='full-row'>
          <Col md={10} className='carLeft'>
            <div className='car'>
              <TrackedImage currentImage={photoURL} />
            </div>
          </Col>
          <Col md={10} className='side'>
            <div className='goleft'>
              {photoDetails.title} <br />
              {photoDetails.location_string} <br />
              {photoDetails.camera} <br />
              {photoDetails.date} <br />
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default DetailedPhoto;
