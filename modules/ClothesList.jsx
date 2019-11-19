import React from 'react';
import {
  View, Button, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothPicker from './ClothPicker';
import actions from '../redux/actions';


class ClothesList extends React.PureComponent {
  render() {
    const {
      selectedColor, currColor, currentClothes, colorIndex, dispatch, clothIndex,
    } = this.props;
    return (

      <View style={{
        flex: 1.4, backgroundColor: '#34a1fa', width: '80%', marginTop: 1,
      }}
      >
        <FlatList
          data={currentClothes}
          extraData={currentClothes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <ClothPicker
              colors={currentClothes[index].colors}
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
    );
  }
}


function mapStateToProps(state) {
  return {
    currentClothes: state.currentClothes,
    currImage: state.currImage,
    currColor: state.currColor,
  };
}

export default connect(mapStateToProps)(ClothesList);
