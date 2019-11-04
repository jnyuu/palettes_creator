// import React from 'react';
// import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './HomeScreen';
import MakePalettesScreen from './MakePalettesScreen';
import ViewPalettesScreen from './ViewPalettesScreen';
import PullImagesScreen from './PullImagesScreen';

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    MakePalettes: MakePalettesScreen,
    ViewPalettes: ViewPalettesScreen,
    PullImages: PullImagesScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default RootStack;
