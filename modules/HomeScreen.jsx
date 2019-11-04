import React from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';

class HomeScreen extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ justifyContent: 'center' }}><Text>Choose an option : </Text></View>
        <View style={{ marginTop: 10 }}><Button title="Make Palettes" onPress={() => navigation.navigate('MakePalettes')} /></View>
        <View style={{ marginTop: 10 }}><Button title="View Palettes" onPress={() => navigation.navigate('ViewPalettes')} /></View>
        <View style={{ marginTop: 10 }}><Button title="Pull Images" onPress={() => navigation.navigate('PullImages')} /></View>
      </View>
    );
  }
}
HomeScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,

};


export default HomeScreen;
