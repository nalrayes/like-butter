const React = require('react');
const jQuery = require('jquery');
import {Button, FormGroup, Label, Input, FormControl} from 'react-bootstrap';

class Feedback extends React.Component {
  render() {
    return(
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"  />

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" />

        <form method='POST' action='/feedback'>
          <FormGroup>
            <Label> Name </Label>
            <FormControl name="senderName" type='text' />

            <Label> Feedback </Label>
            <FormControl name="emailBody" componentClass='textarea' />

            <Button type="submit">Submit</Button>
          </FormGroup>
        </form>
        <script
  src="https://code.jquery.com/jquery-3.2.1.js"
  integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE="
  crossOrigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
      </div>
    );
  }
}

module.exports = Feedback;
