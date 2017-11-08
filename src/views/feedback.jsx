const React = require('react');
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

class Feedback extends React.Component {
  render() {
    return(
      <Form>
        <FormGroup>
          <Label> Text </Label>
          <Input type='textarea' />
        </FormGroup>
      </Form>
    );
  }
}

module.exports = Feedback;
