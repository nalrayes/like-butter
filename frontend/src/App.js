import './App.css'
import Photos from './Photos.js';
import Feedback from './Feedback.js';
import {Photo} from './Photo.js';
import { Switch, Route } from 'react-router-dom'
const React = require('react');

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Photos} />
        <Route path='/feedback' component={Feedback} />
        <Route path='/photo' component={Photo} />
      </Switch>
    );
  }
}


export default App;
