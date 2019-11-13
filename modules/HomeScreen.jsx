import React from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import actions from '../redux/actions';

class HomeScreen extends React.PureComponent {
  componentDidMount = async () => {
    const { dispatch } = this.props;
    const outfits = JSON.parse(await AsyncStorage.getItem('outfits'));
    if (outfits !== null) { dispatch(actions.setOutfits(outfits)); }
  }

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
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }).isRequired,
};


function mapStateToProps(state) {
  return {
    outfits: state.outfits,
  };
}

export default connect(mapStateToProps)(HomeScreen);
