import React from 'react';
// import { View, Text, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import RootStack from './modules/Screens';


const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      clothTypes: [
        { id: 1, type: 't-shirt' },
        { id: 2, type: 'skirt' },
      ],
    };
  }

  addNewCloth() {
    const { clothTypes } = this.state;

    clothTypes.push({
      id: clothTypes.length + 1,
      type: 'cloth',
    });
  }

  render() {
    return <AppContainer />;
  }
}
