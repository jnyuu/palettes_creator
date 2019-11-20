import React from 'react';
import {
  Text, TouchableOpacity, Platform, PermissionsAndroid,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
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

class ImagePickerButton extends React.PureComponent {
  render() {
    const {
      dispatch, buttonText, style,
    } = this.props;
    return (
      <TouchableOpacity
        style={style}
        onPress={async () => {
          if (Platform.OS === 'android') {
            await checkAndroidPermission();
          }
          ImagePicker.showImagePicker(options, (response) => {
            if (!response.didCancel && !response.error && !response.customButton) {
              dispatch(actions.setImage(`file:///${response.path}`));
            }
          });
        }}
      >
        <Text style={{ color: 'white' }}>{buttonText}</Text>
      </TouchableOpacity>

    );
  }
}

ImagePickerButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  style: PropTypes.PropTypes.oneOfType([PropTypes.shape(), PropTypes.arrayOf(PropTypes.shape())]),
};

ImagePickerButton.defaultProps = {
  style: {},
};

function mapStateToProps(state) {
  return {
    currentClothes: state.currentClothes,
    currImage: state.currImage,
    currColor: state.currColor,
  };
}

export default connect(mapStateToProps)(ImagePickerButton);
