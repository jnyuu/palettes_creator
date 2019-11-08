import React from 'react';
import {
  View, Text, Button, TextInput, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothPicker from './ClothPicker';
import actions from '../redux/actions';

class MakePalettesScreen extends React.PureComponent {
  render() {
    const {
      navigation, dispatch, clothes,
    } = this.props;
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
            extraData={clothes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <ClothPicker
                colors={clothes[index].colors}
                index={index}
                selectedCloth={item.type}
              />
            )}
            ListFooterComponent={(
              <Button
                title="Add Cloth"
                onPress={() => dispatch(actions.addCloth({
                  type: 'tshirt',
                  colors: [],
                }))}
                color="#975f35"
              />
            )}
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
  dispatch: PropTypes.func.isRequired,
  clothes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

function mapStateToProps(state) {
  return {
    clothes: state.clothes,
    colors: state.clothes.colors,

  };
}

export default connect(mapStateToProps)(MakePalettesScreen);
