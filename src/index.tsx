import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';
import App from './components/App';
import store from './store';

ReactDOM.render(
  < Provider store={store} >
    <App />
  </Provider >,
  document.getElementById('root') as HTMLElement
);