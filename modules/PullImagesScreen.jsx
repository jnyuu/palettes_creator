import React from 'react';
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types';

class PullImagesScreen extends React.PureComponent {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Pull Images Screen</Text>
        <Button title="Go to Home Screen" onPress={() => navigation.goBack()} />
      </View>
    );
  }
}

PullImagesScreen.propTypes = {
  navigation: PropTypes.shape({ goBack: PropTypes.func.isRequired }).isRequired,

};

export default PullImagesScreen;
