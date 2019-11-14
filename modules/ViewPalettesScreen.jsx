import React from 'react';
import {
  View, Text, Button, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OutfitDisplay from './OutfitDisplay';


class ViewPalettesScreen extends React.PureComponent {
  render() {
    const { navigation, outfits } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>View Palettes Screen</Text>
        <Button title="Go to Home Screen" onPress={() => navigation.goBack()} />
        <FlatList
          data={outfits}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <OutfitDisplay
              outfit={item}
              outfitIndex={index}
              navigateToMakePalettes={() => navigation.navigate('MakePalettes')}
            />
          )}
        />
      </View>
    );
  }
}

ViewPalettesScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  outfits: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
};

function mapStateToProps(state) {
  return {
    currentClothes: state.currentClothes,
    outfits: state.outfits,
  };
}

export default connect(mapStateToProps)(ViewPalettesScreen);
