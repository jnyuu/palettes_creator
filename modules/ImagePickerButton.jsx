import React from 'react';
import {
  Text, TouchableOpacity, Platform, PermissionsAndroid, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import * as RNFS from 'react-native-fs';
import bmp from 'bmp-js';
import { Buffer } from 'buffer';
import actions from '../redux/actions';

global.Buffer = Buffer;

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
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

const checkAndroidPermission = async () => {
  try {
    const permission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
    await PermissionsAndroid.request(permission);
    Promise.resolve();
  } catch (error) {
    Promise.reject(error);
  }
};

class ImagePickerButton extends React.PureComponent {
  render() {
    const {
      dispatch, buttonText, style, currImage,
    } = this.props;
    return (
      <TouchableOpacity
        style={style}
        onPress={async () => {
          let imagePath = null;
          if (Platform.OS === 'android') {
            await checkAndroidPermission();
          }
          ImagePicker.showImagePicker(options, async (response) => {
            if (!response.didCancel && !response.error && !response.customButton) {
              dispatch(actions.setImage(`file:///${response.path}`));
              imagePath = `file:///${response.path}`;
              if (imagePath !== currImage) {
                const { width: imgWidth, height: imgHeight } = await getImageSize(imagePath);
                const imageBytes = await RNFS.readFile(imagePath, 'base64');
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
            }
          });
        }}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>{buttonText}</Text>
      </TouchableOpacity>
    );
  }
}

ImagePickerButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  currImage: PropTypes.string,
  style: PropTypes.PropTypes.oneOfType([PropTypes.shape(), PropTypes.arrayOf(PropTypes.shape())]),
};

ImagePickerButton.defaultProps = {
  currImage: null,
  style: {},
};

function mapStateToProps(state) {
  return {
    currentClothes: state.currentClothes,
    currImage: state.currImage,
    currColor: state.currColor,
    imageInfo: state.imageInfo,
  };
}

export default connect(mapStateToProps)(ImagePickerButton);
