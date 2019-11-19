import React from 'react';
import {
  Picker, View, FlatList, Button, TouchableOpacity, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import ColorPicker from './ColorPicker';

class ClothPicker extends React.PureComponent {
  render() {
    const {
      selectedCloth, index, colors, dispatch,
    } = this.props;
    return (
      <View style={{
        overflow: 'visible',
        flexDirection: 'row',
        width: '100%',
        position: 'relative',
      }}
      >
        <TouchableOpacity
          onPress={() => dispatch(actions.deleteCloth(index))}
          activeOpacity={0.6}
          style={{
            position: 'absolute', bottom: '16%', left: 80, zIndex: 2,
          }}
        >
          <Text style={{ color: 'red', fontSize: 25 }}>
            X
          </Text>
        </TouchableOpacity>
        <View style={{ width: '36%' }}>
          <Picker
            selectedValue={selectedCloth}
            mode="dialog"
            style={{
              height: 50, width: '100%', backgroundColor: 'grey', alignItems: 'flex-start',
            }}// (value) => setCloth(value, index)
            onValueChange={(value) => dispatch(actions.setCloth(value, index))}
            itemStyle={{ height: 100, width: '100%', backgroundColor: 'grey' }}
            pickerTextEllipsisLen={6}
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
          keyExtractor={(item, itemIndex) => itemIndex.toString()}
          renderItem={({ item, index: colorIndex }) => (
            <ColorPicker
              selectedColor={item}
              colorIndex={colorIndex}
              clothIndex={index}
            />
          )}
          ListFooterComponent={(
            <View style={{ height: 40, width: 60 }}>
              <Button
                title="Add color"
                onPress={() => {
                  dispatch(actions.addColor('new Color', index));
                }}
                color="#7a5f15"
              />
            </View>
          )}
        />
        {/* this.addColor a nie addColor() żeby nie wywołało się to przy starcie progarmu */}
      </View>
    );
  }
}

ClothPicker.propTypes = {
  selectedCloth: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    currentClothes: state.currentClothes,
    outfits: state.outfits,
  };
}

export default connect(mapStateToProps)(ClothPicker);
