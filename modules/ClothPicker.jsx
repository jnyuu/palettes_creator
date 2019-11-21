import React from 'react';
import {
  Picker, View, FlatList, TouchableOpacity, Text, TouchableNativeFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
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
            position: 'absolute', bottom: 16, left: 80, zIndex: 2,
          }}
        >
          <Icon
            name="closecircle"
            type="antdesign"
            color="#F0433E"
          />
        </TouchableOpacity>
        <View style={{ width: '36%', backgroundColor: '#0A5FA1', margin: 4 }}>
          <Picker
            selectedValue={selectedCloth}
            mode="dialog"
            style={{
              height: 50, width: 1000, alignItems: 'flex-start', color: 'white',
            }}// (value) => setCloth(value, index)
            onValueChange={(value) => dispatch(actions.setCloth(value, index))}
            itemStyle={{ height: 100, width: '100%' }}
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
            <TouchableNativeFeedback
              onPress={() => {
                dispatch(actions.addColor(index));
              }}
            >
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 50,
                  width: 50,
                  backgroundColor: '#B7BA0B',
                  margin: 4,
                  marginLeft: 8,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 34,
                }}
              >
                <Text style={{ color: 'white', fontSize: 30 }}>+</Text>
              </View>
            </TouchableNativeFeedback>
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
  dispatch: PropTypes.func.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

function mapStateToProps(state) {
  return {
    currentClothes: state.currentClothes,
    outfits: state.outfits,
  };
}

export default connect(mapStateToProps)(ClothPicker);
