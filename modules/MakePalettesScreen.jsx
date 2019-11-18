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
import penis from '../outfit.json';

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

const getImageSize = async (uri) => {
  const success = (resolve) => (width, height) => {
    resolve({
      width,
      height,
    });
  };
  const error = (reject) => (failure) => {
    reject(failure);
  };

  return new Promise((resolve, reject) => {
    Image.getSize(uri, success(resolve), error(reject));
  });
};

const imgContainerSize = 300;

class MakePalettesScreen extends React.PureComponent {
  render() {
    const {
      navigation, dispatch, currentClothes, outfits, editingIndex, currImage,
    } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          backgroundColor: '#34a1fa', width: imgContainerSize, height: imgContainerSize, marginTop: 5, alignItems: 'center', justifyContent: 'center',
        }}
        >
          <View
            style={{ width: '100%', height: '100%' }}
            onTouchStart={async (e) => {
              if (currImage !== null) {
                console.log('touchMove', e.nativeEvent);
                console.log(penis[1][1]);
                console.log(currImage);
                const { locationX: touchX, locationY: touchY } = e.nativeEvent;
                const { width: imgWidth, height: imgHeight } = await getImageSize(currImage);
                const vertical = imgHeight > imgWidth;
                let ratio;
                if (vertical) {
                  ratio = imgContainerSize / imgHeight;
                } else {
                  ratio = imgContainerSize / imgWidth;
                }
                const trueWidth = Math.floor(imgWidth * ratio);
                const trueHeight = Math.floor(imgHeight * ratio);
                console.log('height', trueHeight);
                console.log('width', trueWidth);
                console.log('touchX: ', touchX);
                if (touchX < (imgContainerSize - trueWidth) / 2
                  || touchX > (imgContainerSize + trueWidth) / 2
                  || touchY < (imgContainerSize - trueHeight) / 2
                  || touchY > (imgContainerSize + trueHeight) / 2) {
                  console.log('PIZDA');
                } else {
                  const trueXDistance = touchX - (imgContainerSize - trueWidth) / 2;
                  const trueYDistance = touchY - (imgContainerSize - trueHeight) / 2;
                  const imageX = Math.floor(trueXDistance / ratio);
                  const imageY = Math.floor(trueYDistance / ratio);
                  console.log(imageX, imageY);
                  console.log(penis[imageY][imageX]);
                }
              }
            }}
          >
            <TouchableOpacity
              style={{
                width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
              }}
              onPress={async () => {
                if (Platform.OS === 'android') {
                  await checkAndroidPermission();
                }
                ImagePicker.showImagePicker(options, (response) => {
                  if (response.didCancel || response.error || response.customButton) {
                  } else { dispatch(actions.setImage(response.uri)); }
                });
              }}
            >
              {currImage !== null ? (
                <Image
                  source={{
                    uri: currImage,
                  }}
                  style={{ width: '100%', height: '100%' }}
                  resizeMode="contain"
                />
              )
                : (<Text>Add Image</Text>)}
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
