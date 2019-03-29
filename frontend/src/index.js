import './polyfill.js';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { polyfill } from 'es6-promise'; polyfill();

ReactDOM.render(<App />, document.getElementById('root'));
