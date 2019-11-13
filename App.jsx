import React from 'react';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RootStack from './modules/Screens';
import reducer from './redux/reducer';

const store = createStore(reducer);

const AppContainer = createAppContainer(RootStack);
export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
