import React from 'react';
import {
  View, Text, Button, TextInput, FlatList, PermissionsAndroid, Platform, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import ClothPicker from './ClothPicker';
import actions from '../redux/actions';

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const checkAndroidPermission = async () => {
  try {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    await PermissionsAndroid.request(permission);
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};


class MakePalettesScreen extends React.PureComponent {
  render() {
    const {
      navigation, dispatch, currentClothes, outfits, editingIndex, currImage,
    } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          flex: 3, backgroundColor: '#34a1fa', width: '80%', marginTop: 5, alignItems: 'center', justifyContent: 'center',
        }}
        >

          <View>
            <TouchableOpacity
              onPress={async () => {
                if (Platform.OS === 'android') {
                  await checkAndroidPermission();
                }

                ImagePicker.showImagePicker(options, (response) => {
                  dispatch(actions.setImage(response.uri));
                });
              }}
            >
              {currImage !== null ? (
                <Image
                  source={{
                    uri: currImage,
                  }}
                  style={{ width: 200, height: 200 }}
                />
              ) : (<Text>Add Image</Text>)}


            </TouchableOpacity>

          </View>
        </View>
        <TextInput placeholder="Type here" style={{}} />
        <View style={{
          flex: 1.4, backgroundColor: '#34a1fa', width: '80%', marginTop: 1,
        }}
        >
          <FlatList
            data={currentClothes}
            extraData={currentClothes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ClothPicker
                colors={currentClothes[index].colors}
                index={index}
                selectedCloth={item.type}
              />
            )}
            ListFooterComponent={(
              <Button
                title="Add Cloth"
                onPress={() => dispatch(actions.addCloth({
                  type: 'tshirt',
                  colors: [],
                }))}
                color="#975f35"
              />
            )}
          />
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
          marginTop: 15,
          marginBottom: 5,
        }}
        >
          <View style={{ width: 100 }}>
            <Button
              title="Go Back"
              onPress={() => {
                if (editingIndex !== null) {
                  dispatch(actions.toggleEditing());
                  navigation.goBack();
                } else {
                  navigation.goBack();
                }
              }}
            />
          </View>
          <View style={{ width: 100 }}>
            {editingIndex !== null ? (
              <Button
                title="Save"
                onPress={
                async () => {
                  const outfit = {
                    image: currImage,
                    clothes: currentClothes,
                  };
                  const newOutfits = outfits;
                  newOutfits[editingIndex] = outfit;
                  await AsyncStorage.setItem('outfits', JSON.stringify(newOutfits));
                  dispatch(actions.setOutfits(newOutfits));
                  dispatch(actions.toggleEditing());
                  navigation.goBack();
                }
              }
              />
            ) : (
              <Button
                title="Add"
                onPress={
                async () => {
                  const outfit = {
                    image: currImage,
                    clothes: currentClothes,
                  };
                  const newOutfits = [...outfits, outfit];
                  await AsyncStorage.setItem('outfits', JSON.stringify(newOutfits));
                  dispatch(actions.setOutfits(newOutfits));
                }
              }
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}
MakePalettesScreen.propTypes = {
  navigation: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
  dispatch: PropTypes.func.isRequired,
  currentClothes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  outfits: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
  editingIndex: PropTypes.number,
  currImage: PropTypes.string,
};

MakePalettesScreen.defaultProps = {
  editingIndex: null,
  currImage: null,

};

function mapStateToProps(state) {
  return {
    currentClothes: state.currentClothes,
    outfits: state.outfits,
    editingIndex: state.editingIndex,
    currImage: state.currImage,
  };
}

export default connect(mapStateToProps)(MakePalettesScreen);
