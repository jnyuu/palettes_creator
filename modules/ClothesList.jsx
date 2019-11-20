import React from 'react';
import {
  View, FlatList, Text, TouchableNativeFeedback,
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
                style={{ elevation: 34, backgroundColor: '#34a1fa' }}
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
                  <TouchableNativeFeedback
                    onPress={() => dispatch(actions.addCloth({
                      type: 'tshirt',
                      colors: [],
                    }))}
                  >
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 35,
                        backgroundColor: '#B7BA0B',
                        width: '100%',
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
                      <Text style={{
                        color: 'white', fontSize: 40, lineHeight: 50,
                      }}
                      >
                      +
                      </Text>
                    </View>
                  </TouchableNativeFeedback>
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
