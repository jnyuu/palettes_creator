import React from 'react';
import {
  Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../redux/actions';

class OutfitDisplay extends React.PureComponent {
  render() {
    const {
      outfit, outfitIndex, dispatch, outfits,
    } = this.props;
    return (
      <View>
        <FlatList
          style={{ borderWidth: 1, marginTop: 5 }}
          data={outfit}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: cloth }) => (
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ width: 50 }}>
                {cloth.type}
              </Text>
              <FlatList
                horizontal
                style={{ width: '80%' }}
                data={cloth.colors}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: color }) => (
                  <View Style={{ width: 100, alignItems: 'flex-start' }}>
                    <Text>
                      {color}
                    </Text>
                  </View>
                )}
              />
            </View>
          )}
          ListFooterComponent={(
            <TouchableOpacity
              style={{
                width: '30%', backgroundColor: '#2596EE', alignItems: 'center', alignSelf: 'center', margin: 7,
              }}
              onPress={async () => {
                const newOutfits = [...outfits];
                newOutfits.splice(outfitIndex, 1);
                await AsyncStorage.setItem('outfits', JSON.stringify(newOutfits));
                dispatch(actions.setOutfits(newOutfits));
              }}
            >
              <Text style={{ color: 'white' }}>Remove Outfit</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

OutfitDisplay.propTypes = {
  outfit: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  outfitIndex: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  outfits: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape()).isRequired).isRequired,
};

function mapStateToProps(state) {
  return {
    currentClothes: state.currentClothes,
    outfits: state.outfits,
  };
}

export default connect(mapStateToProps)(OutfitDisplay);
