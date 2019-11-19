import React from 'react';
import {
  Text, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import actions from '../redux/actions';

class ColorPicker extends React.PureComponent {
  render() {
    const {
      selectedColor, currColor, currentClothes, colorIndex, dispatch, clothIndex,
    } = this.props;
    return (
      <View style={{
        height: 50,
        width: 50,
        backgroundColor: currColor,
        position: 'relative',
        borderColor: 'black',
        borderWidth: 1,
      }}
      >
        <View style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 20,
          aspectRatio: 1,
          backgroundColor: 'white',
          borderColor: 'black',
          borderWidth: 1,
          zIndex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <TouchableOpacity
            onPress={() => { dispatch(actions.deleteColor(clothIndex, colorIndex)); }}
          >
            <Text style={{ color: 'red', lineHeight: 24, fontSize: 20 }}>
            X
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity

          style={{
            height: 50, width: 50, justifyContent: 'center',
          }}
        >
          <Text style={{ textAlign: 'center' }}>choose color</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
ColorPicker.propTypes = {
  selectedColor: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,

};

function mapStateToProps(state) {
  return {
    currentClothes: state.currentClothes,
    currImage: state.currImage,
    currColor: state.currColor,
  };
}

export default connect(mapStateToProps)(ColorPicker);
