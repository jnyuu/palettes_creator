import React from 'react';
import {
  Text, View, FlatList, TouchableOpacity, Image,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../redux/actions';

class OutfitDisplay extends React.PureComponent {
  render() {
    const {
      outfit, outfitIndex, dispatch, outfits, navigateToMakePalettes,
    } = this.props;

    return (
      <View style={{ borderWidth: 1, marginTop: 5 }}>
        <Image
          source={{
            uri: outfit.image,
          }}
          style={{
            width: 200, height: 200, alignSelf: 'center', resizeMode: 'contain', margin: 4,
          }}
        />
        <FlatList
          style={{}}
          data={outfit.clothes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item: cloth }) => (
            <View style={{ flexDirection: 'row', borderTopWidth: 1, marginHorizontal: 5 }}>
              <Text style={{
                marginLeft: 5, width: 50, alignSelf: 'center',
              }}
              >
                {cloth.type}
              </Text>
              <FlatList
                horizontal
                style={{ width: '80%' }}
                data={cloth.colors}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item: color }) => (
                  <View style={{
                    width: 30,
                    height: 30,
                    backgroundColor: color,
                    margin: 3,
                  }}
                  />
                )}
              />
            </View>
          )}
          ListFooterComponent={(
            <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <TouchableOpacity
                style={{
                  width: '30%',
                  backgroundColor: '#2596EE',
                  alignItems: 'center',
                  alignSelf: 'flex-end',
                  margin: 7,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                  shadowRadius: 6.27,
                  elevation: 20,
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
              <TouchableOpacity
                style={{
                  width: '30%',
                  backgroundColor: '#2596EE',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  margin: 7,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowOpacity: 0.34,
                  shadowRadius: 6.27,
                  elevation: 20,
                }}
                onPress={() => {
                  dispatch(actions.setEditingIndex(outfitIndex));
                  navigateToMakePalettes();
                }}
              >
                <Text style={{ color: 'white' }}>Edit Outfit</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
}

OutfitDisplay.propTypes = {
  outfit: PropTypes.shape().isRequired,
  outfitIndex: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  outfits: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  navigateToMakePalettes: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    currentClothes: state.currentClothes,
    outfits: state.outfits,
    isEditing: state.isEditing,
  };
}

export default connect(mapStateToProps)(OutfitDisplay);
