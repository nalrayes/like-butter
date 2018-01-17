import './App.css'
import {Form, ButtonGroup, Label, Image, Button, FormGroup, FormControl, ControlLabel, Grid, Row, Col} from 'react-bootstrap';
import Gallery from './react-grid-gallery/src/Gallery.js';
const React = require('react');
const config = require('./config.json');

const imgW = 250;
const imgH = 125;

class FilterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLocationChange(event) {
    console.log(event.target.value);
    this.setState({'location': event.target.value});
  }

  handleSubmit(event) {
    console.log(this.state);
    this.props.onImageFilter(this.state);
  }

  render() {
    return(
      <div>
        <Label>Filter By </Label>
        <Form inline>
          <FormGroup>
            <ControlLabel>Location</ControlLabel>
            <FormControl componentClass="select" onChange={this.handleLocationChange}>
              <option value="n/a"></option>
              <option value="New York, NY">New York, NY</option>
              <option value="San Fransisco, CA">San Fransisco, CA</option>
            </FormControl>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

class SiteHeader extends React.Component {
  render() {
    return(
      <div>
        <Col md={3}>
          <Image width={imgW}  height={imgH} src={config.host + "/static/images/logo.png"} responsive/>
        </Col>
        <Col md={4}>
          <div className='filter-form'>
          <FilterForm onImageFilter={this.props.onImageFilter}/>
          </div>
        </Col>
        <Col md={5}>
          <div className='buttons'>
            <ButtonGroup  justified>
              <ButtonGroup>
                <Button bsStyle='link' href='/'>Home</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button bsStyle='link' href='/feedback'>Feedback</Button>
              </ButtonGroup>
            </ButtonGroup>
          </div>
        </Col>
      </div>
    );
  }
}

class Photo extends React.Component {
  render() {
    const name = "photoWrapper" + this.props.num;
    const cssName = "." + name;
    return(
        <Col>
          <div className='img-container'>
            <a href={this.props.href}>
              <img src={this.props.url} alt='oops' class="photo" />
            </a>
          </div>
        </Col>
    );
  }
}

class PhotoRow extends React.Component {
  render() {
    return(
      <div className='photos-flex'>
        {this.props.images}
      </div>
    )
  }
}

function createRemianingPhotos(currentPhoto, remainingPhotos) {
  const l = [];
  const currentI = remainingPhotos.findIndex(photo=> photo === currentPhoto);
  for (let i = currentI; i < remainingPhotos.length; i++) {
    l.push(remainingPhotos[i]);
  }
  for (let i = 0; i < currentI; i++) {
    l.push(remainingPhotos[i]);
  }
  return l;
}


class Photos extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    fetch(config.host + '/photos/')
      .then(data => data.json())
      .then(photosFromDb => {
        console.log(photosFromDb);
        this.setState({currentUrls: photosFromDb.map(element => element.endpoint),
                        photosToFilter: photosFromDb,
                        photoList: photosFromDb.map(element => element.name)});
      });
    this.handleImageFilter = this.handleImageFilter.bind(this);
  }

  handleImageFilter(filterInfo) {
    console.log("FILTER",filterInfo);
    let newCurrentUrls;
    let newPhotoList;
    if (filterInfo.location === "n/a" || !filterInfo.location) {
      newCurrentUrls = this.state.photosToFilter.map(element => element.endpoint);
      newPhotoList = this.state.photosToFilter.map(element => element.name);
    } else {
      const photos =  this.state.photosToFilter.filter(element => element.location_string === filterInfo.location);
      newCurrentUrls = photos.map(element => element.endpoint);
      newPhotoList = photos.map(element => element.name);
    }
    this.setState({currentUrls: newCurrentUrls, photoList: newPhotoList});
    console.log(this.state);
  }

  render() {
    console.log("render called! state", this.state);
    const listOfImages = [];
    const listForGallery = [];
    if (this.state.currentUrls) {
      for (let i = 0; i < this.state.currentUrls.length; i++) {
        const url = config.host + '/' + this.state.currentUrls[i];
        console.log('creating reamin');
        listForGallery.push(
          {
            src: url,
            thumbnail: url,
            thumbnailWidth: this.state.photosToFilter[i].width,
            thumbnailHeight: this.state.photosToFilter[i].height,
          }
        );
        console.log(this.state.photoList[i], this.state.photoList);
        const remain = createRemianingPhotos(this.state.photoList[i], this.state.photoList);
        console.log(remain);
        const href = '/photo/?&photos=' + remain;
        // create number of divs necessary to fill page, 4 photos per div
        listOfImages.push(React.createElement(Photo, {href: href, url: url, num: i}));
      }
    }

    // let listOfDivs = [];
    // for (let i = 0; i < listForGallery.length; i+=4) {
    //   let limit;
    //   if (i + 4 > listForGallery.length) {
    //     limit = listForGallery.length;
    //   } else {
    //     limit = i + 4;
    //   }
    //   // figure out best height
    //   let curImages = listForGallery.slice(i, limit);
    //   let totalWidth = listForGallery.reduce((acc, cur) => (cur.thumbnailWidth/cur.thumbnailHeight) + acc, 0) / 4;
    //   console.log("WIDTH: " + totalWidth);
    //   let scaledHeight = 350;
    //   listOfDivs.push(React.createElement(Gallery, {images: listForGallery.slice(i, limit), rowHeight: scaledHeight}));
    //   listOfDivs.push(<div></div>)
    // }
    return(
      <Grid fluid={true}>
        <div>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"  />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" />
        </div>
        <div className='top-of-page'>
          <Row className='show-grid'>
            <SiteHeader onImageFilter={this.handleImageFilter}/>
          </Row>
        </div>
        <Gallery images={listForGallery} rowHeight={450} margin={1} />
      </Grid>
    );
  }
}


export default Photos;
