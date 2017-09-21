import React, {Component} from 'react';
import {
    AppRegistry,
} from 'react-native';
import setup from './js/pages/setup'

AppRegistry.registerComponent('OV', () => setup);


// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//
// import React, {Component} from 'react';
// import {
//     AppRegistry,
//     StyleSheet,
//     Text,
//     View
// } from 'react-native';
// import {Navigator} from 'react-native-deprecated-custom-components';
// import Boy from './Boy';
// import ListViewTest from './ListViewTest';
// import FetchTest from './FetchTest'
//
// export default class OV extends Component {
//
//     render() {
//         return (
//             <View style={styles.container}>
//
//                 {/*  <Navigator
//                  initialRoute={{component:Boy}}
//                  renderScene={(route,navigator)=>{
//                  let Component=route.component;
//                  return <Component navigator={navigator} {...route.params}/>
//                  }}
//
//                  ></Navigator>
//                  */}
//
//                 <FetchTest/>
//
//                 {/*<ListViewTest/>*/}
//             </View>
//         );
//     }
// }
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//
//     },
//
// });
//
// AppRegistry.registerComponent('OV', () => OV);
