/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


/*

<NavigationBar
title={NavTitle}
style={{backgroundColor: 'powderblue', height: 50}}
leftButton = {<TouchableOpacity>
  <Image
    source={require('./img/Home.png')}
    style={{ height:30, width:30, marginTop: 10, marginLeft: 10} }/>
</TouchableOpacity>}
rightButton = {<TouchableOpacity>
  <Image
    source={require('./img/user.png')}
    style={{ height:30, width:30, marginTop: 10, marginRight: 10} }/>
</TouchableOpacity>}
/>

<TabBarIOS >


</TabBarIOS>


*/

import User_Home from './apps/components/User_Home/User_Home.js';
import Log_In_Board from './apps/components/User_Home/Log_In_Board.js';
import Sign_Up_Board from './apps/components/User_Home/Sign_Up_Board.js';
import Sign_Up_Phone_Verify_Board from './apps/components/User_Home/Sign_Up_Phone_Verify_Board.js';
import Log_In_Phone_Verify_Board from './apps/components/User_Home/Log_In_Phone_Verify_Board.js';
import Home1 from './apps/components/Home1/Home1.js';
import Home2 from './apps/components/Home2/Home2.js';
import Home3 from './apps/components/Home3/Home3.js';
import {TabNavigator, StackNavigator} from 'react-navigation';

import {login} from './apps/server.js';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  TabBarIOS,
  Button,
  Alert
} from 'react-native';
import NavigationBar from 'react-native-navbar';

const User_Home_Stack = StackNavigator({
  User_Home: { screen: User_Home },
  Log_In_Board: { screen: Log_In_Board },
  Sign_Up_Board: { screen: Sign_Up_Board },
  Sign_Up_Phone_Verify_Board: { screen: Sign_Up_Phone_Verify_Board },
  Log_In_Phone_Verify_Board: { screen: Log_In_Phone_Verify_Board },
});


export default TabNavigator({
  Home1: {
    screen: Home1,
  },
  Home2: {
    screen: Home2,
  },
  Home3: {
    screen: Home3,
  },
  User_Home: {
    screen: User_Home_Stack,
  },
}
);




// export default class App extends Component<{}> {
//
//
//   render() {
//     return (
//       <View style={{flex: 1}} >
//
//
//         <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>
//
//           <View style={{
//
//             marginTop: 25,
//             height: '50%',
//             width: '60%',
//             left: '85%',
//             borderWidth: 2,
//             justifyContent: 'center',
//             borderRadius: 10,
//
//           }}>
//
//           <TouchableOpacity >
//             <Text style={{ fontSize: 25, textAlign: 'center'} }>登     录</Text>
//           </TouchableOpacity>
//
//           </View>
//
//         </View>
//
//
//         {/*start  */}
//
//         {/*end  */}
//
//
//
//       </View>
//
//
//     );
//   }
// }
