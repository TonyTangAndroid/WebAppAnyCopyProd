// import dependencies 
import bootstrap from 'bootstrap'
// import modernizr from 'modernizr'

import Root from './components/Root';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/configureStore';

const targetEl = document.getElementById('root');

React.render(
  <Provider store={store}>
    {() => <Root />}
  </Provider>,
  targetEl
);