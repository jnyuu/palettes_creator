/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from 'react'; //
import { Provider } from 'react-redux';//
import { createStore } from 'redux';
import App from './App';
import { name as appName } from './app.json';
import reducer from './redux/reducer';

const store = createStore(reducer);

const AppContainer = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => AppContainer);
