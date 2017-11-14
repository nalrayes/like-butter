const React = require('react');
const jQuery = require('jquery');
import {ButtonGroup, Media, Image, Button, FormGroup, Label, Input, FormControl, ControlLabel, PageHeader, Grid, Row, Col} from 'react-bootstrap';

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
        <img className='logo' width={imgW} height={imgH } src='/static/images/logo.png' />
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



class Feedback extends React.Component {
  render() {
    return(
      <div>
        <div>
          <link rel="stylesheet" href="/static/css/additional.css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"  />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" />
        </div>
        <SiteHeader />
        <Grid>
          <Row className='show-grid'>
            <PageHeader className='text-center'>
              please be honest
            </PageHeader>
            <form method='POST' action='/feedback'>
              <FormGroup>
                <ControlLabel className='formLabel' > Name </ControlLabel>

                <div className='formText'>
                  <FormControl name="senderName" type='text' />
                </div>

                <ControlLabel className='formLabel'> Feedback </ControlLabel>

                <div className='formText'>
                  <FormControl className='formText' name="emailBody" componentClass='textarea' />
                </div>

                <Button className='submitButton' type="submit">Submit</Button>
              </FormGroup>
            </form>
          </Row>
        </Grid>
      </div>
    );
  }
}


module.exports = Feedback;
