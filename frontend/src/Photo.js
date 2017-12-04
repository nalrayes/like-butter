import './App.css'
import {Carousel, Grid, Row, Col, Image, Button} from 'react-bootstrap';
import ResizeDetector from 'react-resize-detector';
const React = require('react');
const queryString = require('query-string');
const config = require('./config.json');

// class DetailedPhoto extends React.Component {
//   /*
//   For going back:
//   check the last page. If last page was /photos/, have
//   back button go to url with current photo in front.
//   if not go to /photos/ with all photos.
//   */
//   constructor(props) {
//     super(props);
//     const photoNum = this.props.name;
//     this.state = {
//       'photo': photoNum,
//       'photoDetails': {}};
//     console.log(this.state);
//     fetch(config.host + '/api/photo?name=' + photoNum)
//       .then(data => data.json())
//       .then(photo => {
//         this.setState({'photoDetails': photo});
//       });
//   }
//
//   render () {
//     const photoDetails = this.state.photoDetails;
//     const photoURL = config.host + '/static/photos/' + this.state.photo + '.jpg';
//     const spotifyURL = "https://open.spotify.com/embed?uri=" + this.state.photoDetails.uri;
//     // const {goBack} = this.props.navigation;
//     return (
//       <Grid fluid={true}>
//         <Row className='full-row'>
//           <Col md={15} className='carLeft'>
//             <Button onClick={this.}>leave</Button>
//             <TrackedImage currentImage={photoURL} />
//           </Col>
//           <Col md={2} className='details'>
//             <h2>{photoDetails.title}</h2> <br />
//             <iframe src={spotifyURL} width="90%" height="100" frameborder="0" allowtransparency="true"></iframe>
//             <h4> {photoDetails.location_string}</h4> <br />
//             <h4> {photoDetails.camera} </h4> <br />
//             <h4> {photoDetails.date} </h4> <br />
//           </Col>
//         </Row>
//       </Grid>
//     )
//   }
// }

class TrackedImage extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        dimensions: {},
        divDimensions: {},
      }

      this.onImgLoad = this.onImgLoad.bind(this);
      this._onResize = this._onResize.bind(this);
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

     _onResize(width, height) {
       this.setState({divDimensions: {height:height,
                                      width:width}});
       }



    render() {
      const {width, height} = this.state.dimensions;
      const divWidth = this.state.divDimensions.width;
      const divHeight = this.state.divDimensions.height;

      let style = {width:"100%", height:"100%", display: "none"};
      if (divHeight / divWidth > height / width) {
        style = {width:"100%", height: 'auto'};
      } else {
        style = {height:"100%",  width: 'auto'};
      }

      return (
        <div className='img-container' ref={ (divElement) => this.divElement = divElement}>
          <ResizeDetector handleHeight handleWidth onResize={this._onResize} />
          <Image className='photo' onLoad={this.onImgLoad} src={this.props.currentImage} style={style}/>
        </div>
      )
    }
}

class Photo extends React.Component {
  constructor(props) {
    super(props);
    const unparsedIds = queryString.parse(this.props.location.search).photos;
    const ids = unparsedIds.split(',');
    const urls = [];
    for (const i in ids) {
      const cur = ids[i];
      urls.push(config.host + '/static/photos/' + cur + '.jpg');
    }

    this.state = {
      index: 0,
      currentImages: urls,
      detailed: false,
      photoDetails: {},
      photoList: ids,
    };


    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.toggleDetail = this.toggleDetail.bind(this);
    this.getPhotoDetails = this.getPhotoDetails.bind(this);

    // so that photodetails has something to start with
    this.getPhotoDetails();
  }

  getInitialState() {
    return {
      index: 0,
    };
  }

  onNext() {;
    if (this.state.index + 1 >= this.state.currentImages.length) {
      this.setState({index: 0});
    } else {
      this.setState({index: this.state.index + 1});
    }
  }

  onPrev() {
    // console.log(this.state);
    if (this.state.index - 1 < 0) {
      this.setState({index: this.state.currentImages.length - 1});
    } else {
      this.setState({index: this.state.index - 1});
    }
  }

  toggleDetail() {
    console.log("COME DONW");
    console.log(this.state);
    const detailed = this.state.detailed;
    if (detailed) {
      this.setState({detailed: false});
    } else {
      this.getPhotoDetails();
      this.setState({detailed: true});
    }
  }

  getPhotoDetails() {
    fetch(config.host + '/api/photo?name=' + this.state.photoList[this.state.index])
      .then(data => data.json())
      .then(photo => {
        this.setState({'photoDetails': photo});
      });
  }

  goHope() {

  }

  render() {
    if (!this.state.detailed) {
      return (
        <Grid fluid={true} >
        <Row className='full-row'>
        <Col md={1} className='left-side'>
        <Button onClick={this.onPrev}>prev</Button>
        <Button href='/'>home</Button>
        </Col>
        <Col md={10} className='car'>
        <TrackedImage currentImage={this.state.currentImages[this.state.index]}/>
        </Col>
        <Col md={1} className='right-side'>
        <Button onClick={this.onNext}>next</Button>
        <Button onClick={this.toggleDetail}>detailed</Button>
        </Col>
        <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"  />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" />
        </div>
        </Row>
        </Grid>
      );
    } else {
      const photoDetails = this.state.photoDetails;
      const photoURL = config.host + '/static/photos/' + this.state.photoList[this.state.index] + '.jpg';
      const spotifyURL = "https://open.spotify.com/embed?uri=" + this.state.photoDetails.uri;
      // const {goBack} = this.props.navigation;
      return (
        <Grid fluid={true}>
          <Row className='full-row'>
            <Col md={1} className='carLeft'>
              <TrackedImage currentImage={photoURL} />
            </Col>
            <Col md={10} className='details'>
              <h2>{photoDetails.title}</h2> <br />
              <iframe src={spotifyURL} width="90%" height="100" frameborder="0" allowtransparency="true"></iframe>
              <h4> {photoDetails.location_string}</h4> <br />
              <h4> {photoDetails.camera} </h4> <br />
              <h4> {photoDetails.date} </h4> <br />
              <Button onClick={this.toggleDetail}>leave</Button>
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}

export {TrackedImage, Photo};
// export  Photo;
