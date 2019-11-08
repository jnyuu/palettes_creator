import React from 'react';
import { createAppContainer } from 'react-navigation';
import RootStack from './modules/Screens';

const AppContainer = createAppContainer(RootStack);
export default class App extends React.PureComponent {
  render() {
    return <AppContainer />;
  }
}

// function mapStateToProps(state) {
//   return {
//     colors: state.colors,
//   };
// }

// export default connect(mapStateToProps, null)(App);


// class App extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.onChangeText = this.onChangeText.bind(this);
//   }

//   onChangeText(number) {
//     const count = parseInt(number);
//     this.props.counterSet(count);
//   }

//   render() {
//     console.log(this.props);

//     const { container, countViewStyle, welcome } = styles;
//     const { helloText, pressedButton } = this.props.hello;
//     return (
//       <View style={container}>
//         <TextInput
//           style={{ width: 40, height: 40, borderWidth: 1 }}
//           onChangeText={this.onChangeText}
//           value={this.props.count.toString()}
//         />
//         <View style={countViewStyle}>
//           <Button onPress={this.props.counterIncrement} title="+" />
//           <Text style={welcome}>
//             {this.props.count}
//           </Text>
//           <Button onPress={this.props.counterDecrement} title="-" />
//         </View>
//         <Button onPress={this.props.counterClear} title="Clear" />
//         <Text>{helloText}</Text>
//         <Text>
//           Did you press the button ?
//           {pressedButton.toString()}
//         </Text>
//         <Button onPress={this.props.helloAction} title="Show me the magic" />
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
//   countViewStyle: {
//     flexDirection: 'row',
//   },
// });

// function mapStateToProps(state) {
//   return {
//     count: state.counter,
//     hello: state.hello,
//   };
// }

// export default connect(mapStateToProps, {
//   counterIncrement, counterDecrement, counterClear, counterSet, helloAction,
// })(App);


// constructor() {
//   super();
//   this.state = {
//     clothTypes: [
//       { id: 1, type: 't-shirt' },
//       { id: 2, type: 'skirt' },
//     ],
//   };
// }

// addNewCloth() {
//   const { clothTypes } = this.state;

//   clothTypes.push({
//     id: clothTypes.length + 1,
//     type: 'cloth',
//   });
// }

// render() {
//   // <AppContainer />;
// }
