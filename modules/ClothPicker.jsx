import React from 'react';
import {
  Picker,
} from 'react-native';
import PropTypes from 'prop-types';

class ClothPicker extends React.PureComponent {
  render() {
    const { setCloth, selected } = this.props;


    return (

      <Picker
        selectedValue={selected}
        mode="dialog"
        style={{
          height: 100, width: '50%', backgroundColor: 'grey', alignItems: 'flex-start', flexDirection: 'row',
        }}
        onValueChange={(value) => setCloth(value)}
        itemStyle={{ height: 100, width: 100, backgroundColor: 'grey' }}
      >
        <Picker.Item label="T-shirt" value="tshirt" />
        <Picker.Item label="Skirt" value="skirt" />
        <Picker.Item label="Pants" value="pants" />
        <Picker.Item label="Shoes" value="shoes" />
      </Picker>
    );
  }
}
ClothPicker.propTypes = {
  setCloth: PropTypes.func.isRequired,
  selected: PropTypes.string.isRequired,
};

export default ClothPicker;
