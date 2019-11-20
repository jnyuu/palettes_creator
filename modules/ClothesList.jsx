import React from 'react';
import {
  View, Button, FlatList, Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ClothPicker from './ClothPicker';
import actions from '../redux/actions';

class ClothesList extends React.PureComponent {
  render() {
    const {
      currentClothes, dispatch, currImage,
    } = this.props;
    return (
      <View style={{
        flex: 1.4, backgroundColor: '#34a1fa', width: '80%', marginTop: 1,
      }}
      >
        {currImage === null ? (
          <Text style={{ textAlign: 'center', color: 'red', fontSize: 18 }}>
            Before customizing the outfit you will need to choose an image!
          </Text>
        )
          : (
            <View>
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
          )}
      </View>
    );
  }
}

ClothesList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentClothes: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  currImage: PropTypes.string,
};

ClothesList.defaultProps = {
  currImage: null,

};

function mapStateToProps(state) {
  return {
    currentClothes: state.currentClothes,
    currImage: state.currImage,
    currColor: state.currColor,
  };
}

export default connect(mapStateToProps)(ClothesList);
