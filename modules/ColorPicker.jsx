import React from 'react';
import {
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import actions from '../redux/actions';

class ColorPicker extends React.PureComponent {
  render() {
    const {
      currentClothes, colorIndex, dispatch, clothIndex,
    } = this.props;
    return (
      <View style={{
        height: 50,
        width: 50,
        backgroundColor: currentClothes[clothIndex].colors[colorIndex],
        position: 'relative',
        marginVertical: 4,
        marginLeft: 8,
      }}
      >
        <View style={{
          position: 'absolute',
          top: -4,
          right: -3,
          zIndex: 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <TouchableOpacity
            onPress={() => { dispatch(actions.deleteColor(clothIndex, colorIndex)); }}
          >
            <Icon
              name="closecircle"
              type="antdesign"
              color="#F0433E"
            />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          style={{
            height: 50, width: 50, justifyContent: 'center',
          }}
        >
          <Text style={{ textAlign: 'center' }}>choose color</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}

ColorPicker.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentClothes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  colorIndex: PropTypes.number.isRequired,
  clothIndex: PropTypes.number.isRequired,

};

function mapStateToProps(state) {
  return {
    currentClothes: state.currentClothes,
    currImage: state.currImage,
    currColor: state.currColor,
  };
}

export default connect(mapStateToProps)(ColorPicker);
