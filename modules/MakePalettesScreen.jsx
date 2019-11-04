import React from 'react';
import {
  View, Text, Button, TextInput,
} from 'react-native';
import PropTypes from 'prop-types';
import ClothPicker from './ClothPicker';

class MakePalettesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'tshirt',
    };
    this.setCloth = this.setCloth.bind(this);
  }

  setCloth(value) {
    this.setState({
      selected: value,
    });
  }

  render() {
    const { selected } = this.state;
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

          <ClothPicker
            setCloth={this.setCloth}
            selected={selected}
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
          <View style={{ width: 100 }}><Button title="Add" onPress={() => navigation.goBack()} /></View>
        </View>

      </View>
    );
  }
}
MakePalettesScreen.propTypes = {
  navigation: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,

};
export default MakePalettesScreen;
