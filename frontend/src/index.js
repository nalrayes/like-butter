import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Photos from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Photos />, document.getElementById('root'));
registerServiceWorker();
