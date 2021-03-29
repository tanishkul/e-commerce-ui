// import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// ------------------
import React from 'react';
// import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './App';

// setup fake backend
import { fakeBackend, store } from './helpers';

fakeBackend();

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('app')
// );
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
