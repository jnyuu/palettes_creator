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
    const { selectedColor, currColor } = this.props;
    return (
      <View style={{
        height: 50, width: 50, backgroundColor: currColor,
      }}
      >
        <TouchableOpacity style={{
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
};

function mapStateToProps(state) {
  return {
    currImage: state.currImage,
    currColor: state.currColor,
  };
}

export default connect(mapStateToProps)(ColorPicker);
