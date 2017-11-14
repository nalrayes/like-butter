import './App.css'
import {Thumbnail, ButtonGroup, Media, Image, Button, FormGroup, Label, Input, FormControl, ControlLabel, PageHeader, Grid, Row, Col} from 'react-bootstrap';
const React = require('react');

const imgW = 250;
const imgH = 125;

// <Media>
//   <Media.Left>
//     <img width={imgW} height={imgH }src='/static/images/logo.png' />
//   </Media.Left>
// </Media>
class SiteHeader extends React.Component {
  render() {
    return(
      <Row className='top-of-page'>
        <img className='logo' width={imgW} height={imgH } src='http://localhost:3001/static/images/logo.png' />
        <div className='absolute-bottom-align'>
          <ButtonGroup className='relative-bottom-align' justified>
            <ButtonGroup>
              <Button bsStyle='link'>Home</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button bsStyle='link'>About</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button bsStyle='link'>Feedback</Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      </Row>
    )
  }
}

class Photo extends React.Component {
  render() {
    return(
      <Col>
        <Thumbnail src={this.props.url} alt="242x200"/>
      </Col>
    )
  }
}




class Photos extends React.Component {
  render() {
    const i= 1;
    const listOfImages = [];
    for (let i = 1; i <= 10; i++) {
      const photo = <Photo />;
      listOfImages.push(React.createElement(Photo, {url: 'http://localhost:3001/static/photos/' + i + '.jpg'}));
    }
    return(
      <div>
        <div>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"  />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" />
        </div>
        <SiteHeader />
          <Row className='show-grid'>
            <ul>
              {listOfImages}
            </ul>
          </Row>
      </div>
    );
  }
}


export default Photos;
