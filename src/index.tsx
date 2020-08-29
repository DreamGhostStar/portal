import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Entry from './app/Entry'
import * as serviceWorker from './serviceWorker';

// let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
// console.log(htmlWidth);

// let htmlDom = document.getElementsByTagName('html')[0];

// htmlDom.style.fontSize = htmlWidth / 10 + 'px';

ReactDOM.render(
  <Entry />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
