import React from 'react';
import {
  Picker, View, FlatList, Button,
} from 'react-native';
import PropTypes from 'prop-types';
import ColorPicker from './ColorPicker';

class ClothPicker extends React.Component {
  constructor() {
    super();

    this.state = {
      colors: [
        { id: 1, title: 'red' },
        { id: 2, title: 'green' },
        { id: 3, title: 'yellow' },
        { id: 4, title: 'blue' },
      ],

    };
    this.addColor = this.addColor.bind(this);
  }


  addColor() {
    const { colors } = this.state;

    colors.push({
      id: colors.length + 1,
      title: `newcolor ${colors.length + 1}`,
    });

    this.setState({
      colors,
    });
  }

  render() {
    const {
      setCloth, selectedCloth, index,
    } = this.props;
    const { colors } = this.state;


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
          keyExtractor={(item, index) => index.toString()} // item.id.toString()
          renderItem={({ item }) => (

            <ColorPicker
              selectedColor={item.title}
            />

          )}
        />


        <Button style={{ }} title="Add color" onPress={this.addColor} color="#7a5f15" />
        {/* this.addColor a nie addColor() żeby nie wywołało się to przy starcie progarmu */}

      </View>
    );
  }
}
ClothPicker.propTypes = {
  setCloth: PropTypes.func.isRequired,
  selectedCloth: PropTypes.string.isRequired,
};

export default ClothPicker;
