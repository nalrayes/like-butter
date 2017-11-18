import './App.css'
import {Form, Thumbnail, ButtonGroup, Media, Image, Button, FormGroup, Label, Input, FormControl, ControlLabel, PageHeader, Grid, Row, Col} from 'react-bootstrap';
const React = require('react');
const queryString = require('query-string');
const config = '../config.json';

const imgW = 250;
const imgH = 125;

let currentImageURLS = [];

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
          <Image width={imgW} height={imgH} src={config.host + "static/images/logo.png"} responsive/>
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
                <Button bsStyle='link'>About</Button>
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
    return(
      <Col>
        <img src={this.props.url} class="photo"/>
      </Col>
    );
  }
}




class Photos extends React.Component {

  constructor(props) {
    super(props);
    const i= 1;
    const listOfUrls = [];
    this.state = {};
    fetch(config.host + '/photos/')
      .then(data => data.json())
      .then(photosFromDb => {
        console.log(photosFromDb);
        this.setState({currentUrls: photosFromDb.map(element => element.endpoint), photosToFilter: photosFromDb});
      });
    this.handleImageFilter = this.handleImageFilter.bind(this);
  }

  handleImageFilter(filterInfo) {
    console.log("FILTER",filterInfo);
    let newCurrentUrls;
    if (filterInfo.location === "n/a" || !filterInfo.location) {
      newCurrentUrls = this.state.photosToFilter.map(element => element.endpoint);
    } else {
      newCurrentUrls =  this.state.photosToFilter.filter(element => element.location_string === filterInfo.location).map(element => element.endpoint);
    }
    this.setState({currentUrls: newCurrentUrls});
    console.log(this.state);
  }

  render() {
    console.log("render called! state", this.state);
    const i= 1;
    const listOfImages = [];
    if (this.state.currentUrls) {
      for (let i = 0; i <=this.state.currentUrls.length; i++) {
        const photo = <Photo />;
        listOfImages.push(React.createElement(Photo, {url: config.host + this.state.currentUrls[i]}));
      }
    }
    return(
      <Grid fluid={true}>
        <div>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"  />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" />
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          .photo { height: 350px; float: left }
        `}} />
        <div className='top-of-page'>
          <Row className='show-grid'>
            <SiteHeader onImageFilter={this.handleImageFilter}/>
          </Row>
        </div>
        <Row className='show-grid'>
          <ul>
            {listOfImages}
          </ul>
        </Row>
      </Grid>
    );
  }
}


export default Photos;
