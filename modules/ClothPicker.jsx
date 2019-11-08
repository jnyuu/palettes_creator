import React from 'react';
import {
  Picker, View, FlatList, Button,
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
      <View style={{ flexDirection: 'row', width: '100%' }}>
        <View style={{ width: '36%' }}>
          <Picker
            selectedValue={selectedCloth}
            mode="dialog"
            style={{
              height: 50, width: '100%', backgroundColor: 'grey', alignItems: 'flex-start',
            }}// (value) => setCloth(value, index)
            onValueChange={(value) => dispatch(actions.setCloth(value, index))}
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
          ListFooterComponent={(
            <View style={{ height: 40, width: 60 }}>
              <Button
                title="Add color"
                onPress={() => dispatch(actions.addColor('new Color', index))}
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
    clothes: state.clothes,
  };
}

export default connect(mapStateToProps)(ClothPicker);
