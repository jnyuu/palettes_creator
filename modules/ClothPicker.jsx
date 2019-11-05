import React from 'react';
import {
  Picker, View, FlatList, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import ColorPicker from './ColorPicker';

class ClothPicker extends React.PureComponent {
  render() {
    const {
      setCloth, selectedCloth, index, addColor, colors,
    } = this.props;
    return (
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <View style={{ width: '36%' }}>
          <Picker
            selectedValue={selectedCloth}
            mode="dialog"
            style={{
              height: 50, width: '100%', backgroundColor: 'grey', alignItems: 'flex-start',
            }}
            onValueChange={(value) => setCloth(value, index)}
            itemStyle={{ height: 100, width: '100%', backgroundColor: 'grey' }}
          >
            <Picker.Item label="T-shirt" value="tshirt" />
            <Picker.Item label="Skirt" value="skirt" />
            <Picker.Item label="Pants" value="pants" />
            <Picker.Item label="Shoes" value="shoes" />
          </Picker>
        </View>
        <FlatList
          horizontal
          data={colors}
          extraData={this.state}
          keyExtractor={(item, itemIndex) => itemIndex.toString()}
          renderItem={({ item }) => (
            <ColorPicker
              selectedColor={item}
            />
          )}
          ListFooterComponent={<View style={{ height: 40, width: 60 }}><Button title="Add color" onPress={() => addColor(index)} color="#7a5f15" /></View>}
        />

        {/* this.addColor a nie addColor() żeby nie wywołało się to przy starcie progarmu */}
      </View>
    );
  }
}
ClothPicker.propTypes = {
  setCloth: PropTypes.func.isRequired,
  selectedCloth: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  addColor: PropTypes.func.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default ClothPicker;
