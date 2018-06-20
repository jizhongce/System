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

// Start from here we import the screen for user home
import User_Home from './apps/components/User_Home/User_Home.js';

// After_Log_In
import Favorite_Single_Product_Home from './apps/components/User_Home/After_Log_In/Favorite_Single_Product_Home.js';
import Favorite_Products_List from './apps/components/User_Home/After_Log_In/Favorite_Products_List.js';
import Address_Book from './apps/components/User_Home/After_Log_In/Address_Book.js';
import Order_List from './apps/components/User_Home/After_Log_In/Order_List.js';
import Single_Order from './apps/components/User_Home/After_Log_In/Single_Order.js';

// Before_Log_In
import Log_In_Board from './apps/components/User_Home/Before_Log_In/Log_In_Board.js';
import Sign_Up_Board from './apps/components/User_Home/Before_Log_In/Sign_Up_Board.js';
import Pass_Change_Board from './apps/components/User_Home/Before_Log_In/Pass_Change_Board.js';
import Phone_Change_Board from './apps/components/User_Home/Before_Log_In/Phone_Change_Board.js';
import Sign_Up_Phone_Verify_Board from './apps/components/User_Home/Before_Log_In/Sign_Up_Phone_Verify_Board.js';
import Log_In_Phone_Verify_Board from './apps/components/User_Home/Before_Log_In/Log_In_Phone_Verify_Board.js';
import Pass_Change_Phone_Verify_Board from './apps/components/User_Home/Before_Log_In/Pass_Change_Phone_Verify_Board.js';
import Pass_Change_New_Pass_Board from './apps/components/User_Home/Before_Log_In/Pass_Change_New_Pass_Board.js';
import Phone_Change_Phone_Verify_Board from './apps/components/User_Home/Before_Log_In/Phone_Change_Phone_Verify_Board.js';
import Phone_Change_New_Phone_Board from './apps/components/User_Home/Before_Log_In/Phone_Change_New_Phone_Board.js';
import Phone_Change_New_Phone_Verify_Board from './apps/components/User_Home/Before_Log_In/Phone_Change_New_Phone_Verify_Board.js';

// Start from here we import the screen for product home
import Product_Home from './apps/components/Product_Home/Product_Home.js';
import Single_Product_Home from './apps/components/Product_Home/Single_Product_Home.js';

// Start from here we import the screen for the shopping cart home
import Shopping_Cart_Home from './apps/components/Shopping_Cart_Home/Shopping_Cart_Home.js';
import Shopping_Cart_Single_Product_Home from './apps/components/Shopping_Cart_Home/Shopping_Cart_Single_Product_Home.js';
import Order_Confirmation from './apps/components/Shopping_Cart_Home/Order_Confirmation.js';

import Home2 from './apps/components/Home2/Home2.js';

import {DropDownHolder} from './apps/util.js';


import {TabNavigator, StackNavigator} from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';

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


  Favorite_Single_Product_Home: { screen: Favorite_Single_Product_Home },
  Favorite_Products_List: { screen: Favorite_Products_List },
  Order_List: { screen: Order_List },
  Single_Order: { screen: Single_Order },
  Address_Book: { screen: Address_Book },

  Log_In_Board: { screen: Log_In_Board },
  Sign_Up_Board: { screen: Sign_Up_Board },
  Pass_Change_Board: { screen: Pass_Change_Board },
  Phone_Change_Board: { screen: Phone_Change_Board },
  Sign_Up_Phone_Verify_Board: { screen: Sign_Up_Phone_Verify_Board },
  Log_In_Phone_Verify_Board: { screen: Log_In_Phone_Verify_Board },
  Pass_Change_Phone_Verify_Board: { screen: Pass_Change_Phone_Verify_Board },
  Pass_Change_New_Pass_Board: { screen: Pass_Change_New_Pass_Board },
  Phone_Change_Phone_Verify_Board: { screen: Phone_Change_Phone_Verify_Board },
  Phone_Change_New_Phone_Board: { screen: Phone_Change_New_Phone_Board },
  Phone_Change_New_Phone_Verify_Board: { screen: Phone_Change_New_Phone_Verify_Board },
});

const Product_Home_Stack = StackNavigator({
  Product_Home: { screen: Product_Home },
  Single_Product_Home: { screen: Single_Product_Home},
});


const Shopping_Cart_Home_Stack = StackNavigator({
  Shopping_Cart_Home: { screen: Shopping_Cart_Home },
  Shopping_Cart_Single_Product_Home: { screen: Shopping_Cart_Single_Product_Home },
  Order_Confirmation: { screen: Order_Confirmation},
});


const Home2_Stack = StackNavigator({
  Home2: { screen: Home2 },
});


const Tap_Nav = TabNavigator({
  Product_Home_Stack: {
    screen: Product_Home_Stack,
    navigationOptions: { tabBarLabel:  'Product'  },
  },
  Home2_Stack: {
    screen: Home2_Stack,
    navigationOptions: { tabBarLabel:  'Home2'  },
  },
  Shopping_Cart_Home_Stack: {
    screen: Shopping_Cart_Home_Stack,
    navigationOptions: { tabBarLabel:  'Shopping Cart'  },
  },
  User_Home: {
    screen: User_Home_Stack,
    navigationOptions: { tabBarLabel:  'User Home'  },
  },
}
);

export default class App extends Component<{}> {
    render() {
        return (
            <View style={{width: '100%', height: '100%'}}>
                <Tap_Nav/>
                <DropdownAlert ref={(ref) => DropDownHolder.setDropDown(ref)}/>
            </View>
        )
    }
}

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
