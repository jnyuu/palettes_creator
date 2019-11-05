import React from 'react';
import {
  View, Text, Button, TextInput, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import ClothPicker from './ClothPicker';

class MakePalettesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clothes: [

      ],
    };
    this.setCloth = this.setCloth.bind(this);
    this.addCloth = this.addCloth.bind(this);
    this.convertSet = this.convertSet.bind(this);
  }

  setCloth(value, index) {
    const { clothes } = this.state;

    clothes[index] = { type: value };

    this.setState({
      clothes,
    });
  }

  addCloth() {
    const { clothes } = this.state;

    clothes.push({
      type: 'tshirt',
    });

    this.setState({
      clothes,
    });
  }

  convertSet() {
    console.log(this.state);
  }

  render() {
    const { clothes } = this.state;
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{
          flex: 3, backgroundColor: '#34a1fa', width: '80%', marginTop: 5, alignItems: 'center', justifyContent: 'center',
        }}
        >
          <View><Text>Add Image</Text></View>
        </View>
        <TextInput placeholder="Type here" style={{}} />
        <View style={{
          flex: 1.4, backgroundColor: '#34a1fa', width: '80%', marginTop: 1,
        }}
        >
          <FlatList
            data={clothes}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ClothPicker
                index={index}
                setCloth={this.setCloth}
                selectedCloth={item.type}
              />
            )}
            ListFooterComponent={<Button title="Add Cloth" onPress={this.addCloth} color="#975f35" />}
          />

        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '80%',
          marginTop: 15,
          marginBottom: 5,
        }}
        >
          <View style={{ width: 100 }}><Button title="Go Back" onPress={() => navigation.goBack()} /></View>
          <View style={{ width: 100 }}><Button title="Add" onPress={this.convertSet} /></View>
        </View>
      </View>
    );
  }
}
MakePalettesScreen.propTypes = {
  navigation: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,
};

export default MakePalettesScreen;
