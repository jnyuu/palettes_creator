import React from 'react';
import {
  View, Button, Image,
  BackHandler, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Buffer } from 'buffer';
import AsyncStorage from '@react-native-community/async-storage';
import * as RNFS from 'react-native-fs';
import bmp from 'bmp-js';
import ClothesList from './ClothesList';
import actions from '../redux/actions';
import ImagePickerButton from './ImagePickerButton';

global.Buffer = Buffer;


const imgContainerSize = 300;
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

class MakePalettesScreen extends React.PureComponent {
  componentDidMount() {
    const {
      navigation, dispatch, editingIndex,
    } = this.props;
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', async () => {
      dispatch(actions.clearCurrentClothes(null));
      if (editingIndex !== null) {
        dispatch(actions.toggleEditing());
        navigation.goBack();
      } else {
        navigation.goBack();
      }
    });
    this.checkIfEditing();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  checkIfEditing = async () => {
    const {
      dispatch,
      editingIndex, currImage,
    } = this.props;
    if (editingIndex !== null) {
      const { width: imgWidth, height: imgHeight } = await getImageSize(currImage);
      const imageBytes = await RNFS.readFile(currImage, 'base64');
      const buf = Buffer.from(imageBytes, 'base64');
      const decoded = bmp.decode(buf);
      const { data: pixels } = decoded;
      const colors = [];
      for (let i = 0; i < pixels.length; i += 4) {
        colors.push(pixels.slice(i, i + 4));
      }
      const rows = [];
      for (let i = 0; i < colors.length; i += imgWidth) {
        rows.push(colors.slice(i, i + imgWidth));
      }
      const imageInfoData = {
        imgWidth, imgHeight, rows,
      };
      dispatch(actions.updateImageInfo(imageInfoData));
    }
  };

   readPixel = async (e) => {
     const { currImage, dispatch, imageInfo } = this.props;
     if (currImage !== null) {
       const { locationX: touchX, locationY: touchY } = e.nativeEvent;
       const vertical = imageInfo.imgHeight > imageInfo.imgWidth;
       let ratio;
       if (vertical) {
         ratio = imgContainerSize / imageInfo.imgHeight;
       } else {
         ratio = imgContainerSize / imageInfo.imgWidth;
       }
       const trueWidth = Math.floor(imageInfo.imgWidth * ratio);
       const trueHeight = Math.floor(imageInfo.imgHeight * ratio);
       if (touchX > (imgContainerSize - trueWidth) / 2
       && touchX < (imgContainerSize + trueWidth) / 2
       && touchY > (imgContainerSize - trueHeight) / 2
       && touchY < (imgContainerSize + trueHeight) / 2) {
         const trueXDistance = touchX - (imgContainerSize - trueWidth) / 2;
         const trueYDistance = touchY - (imgContainerSize - trueHeight) / 2;
         const imageX = Math.floor(trueXDistance / ratio);
         const imageY = Math.floor(trueYDistance / ratio);
         const abgr = imageInfo.rows[imageY][imageX];
         const rgb = `rgb(${abgr[3]}, ${abgr[2]}, ${abgr[1]})`;
         dispatch(actions.setCurrentColor(rgb));
       }
     }
   };

   render() {
     const {
       navigation, dispatch, currentClothes, outfits,
       editingIndex, currImage, currColor, selectingColor,
     } = this.props;
     return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <View style={{
           backgroundColor: '#34a1fa', width: imgContainerSize, height: imgContainerSize, marginTop: 5, alignItems: 'center', justifyContent: 'center',
         }}
         >
           <View
             style={{ width: '100%', height: '100%' }}
             onTouchStart={(e) => {
               if (currColor !== null) { this.readPixel(e); }
             }}
           >
             {currImage === null ? (
               <ImagePickerButton
                 buttonText="Add Image"
                 style={{
                   width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',
                 }}
               />
             ) : (
               <Image
                 source={{
                   uri: currImage,
                 }}
                 style={{ width: '100%', height: '100%' }}
                 resizeMode="contain"
               />
             )}
           </View>
         </View>
         {currImage !== null ? (
           <ImagePickerButton
             buttonText="Change Image"
             style={{
               justifyContent: 'center', alignItems: 'center', height: 30, backgroundColor: '#2596EE', padding: 3, margin: 3,
             }}
           />
         ) : (<View />)}
         {currColor === null ? (<ClothesList />) : (
           <View style={{
             flex: 1.4, backgroundColor: currColor, width: '80%', marginTop: 1, marginBottom: 4,
           }}
           />
         )}
         {currColor === null ? (
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
                 onPress={async () => {
                   dispatch(actions.clearCurrentClothes());
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
                    clothes: currentClothes.slice(0),
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
         ) : (
           <View style={{ width: 300, paddingBottom: 4 }}>
             <Text style={{
               backgroundColor: '#00a19a', width: 300, textAlign: 'center', color: 'white', marginBottom: 1,
             }}
             >
              ^ Chosen color is displayed above ^
               {'\n'}
              ^ Just press on the image ^
             </Text>
             <Button
               title="Confirm color selection"
               onPress={async () => {
                 dispatch(actions.setColor(selectingColor[0], selectingColor[1], currColor));
                 dispatch(actions.clearSelectedColors());
               }}
             />
           </View>
         )}
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
  currColor: PropTypes.string,
  selectingColor: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  imageInfo: PropTypes.shape(),
};

MakePalettesScreen.defaultProps = {
  editingIndex: null,
  currImage: null,
  currColor: null,
  imageInfo: {},
};

function mapStateToProps(state) {
  return {
    currentClothes: state.currentClothes,
    outfits: state.outfits,
    editingIndex: state.editingIndex,
    currImage: state.currImage,
    currColor: state.currColor,
    imageInfo: state.imageInfo,
    selectingColor: state.selectingColor,
  };
}

export default connect(mapStateToProps)(MakePalettesScreen);
