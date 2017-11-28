import './App.css'
import Photos from './Photos.js';
import Feedback from './Feedback.js';
import {Photo} from './Photo.js';
import DetailedPhoto from './DetailedPhoto.js';
import {Form, Thumbnail, ButtonGroup, Media, Image, Button, FormGroup, Label, Input, FormControl, ControlLabel, PageHeader, Grid, Row, Col} from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom'
const React = require('react');
const queryString = require('query-string');

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Photos} />
        <Route path='/feedback' component={Feedback} />
        <Route path='/photo' component={Photo} />
        <Route path='/detailed' component={DetailedPhoto} />
      </Switch>
    );
  }
}


export default App;
