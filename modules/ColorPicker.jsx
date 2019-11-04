import React from 'react';
import {
  Text, View,
} from 'react-native';
import PropTypes from 'prop-types';

class ColorPicker extends React.PureComponent {
  render() {
    const { selectedColor } = this.props;


    return (
      <View style={{
        height: 50, width: 50, backgroundColor: selectedColor, alignItems: 'flex-start',
      }}
      >
        <Text>{selectedColor}</Text>
      </View>

    );
  }
}
ColorPicker.propTypes = {
  selectedColor: PropTypes.string.isRequired,
};

export default ColorPicker;
