import {ButtonGroup, Image, Button, FormGroup, FormControl, ControlLabel, PageHeader, Grid, Row, Col} from 'react-bootstrap';
import './App.css'
const React = require('react');
const config = require('./config.json');

const imgW = 250;
const imgH = 125;


class SiteHeader extends React.Component {
  render() {
    return(
      <div>
        <Col md={3}>
          <Image width={imgW} height={imgH} src={config.host + '/static/images/logo.png'} responsive/>
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



class Feedback extends React.Component {
  render() {
    return(
      <div>
        <div>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"  />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" />
        </div>
        <Grid>
          <div className='top-of-page'>
            <Row className='show-grid'>
              <SiteHeader />
            </Row>
          </div>
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


 export default Feedback;
