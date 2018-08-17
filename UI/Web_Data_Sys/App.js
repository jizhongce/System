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
import User_Main_Board from './apps/components/User_Home/User_Main_Board.js';
import User_Profile_Board from './apps/components/User_Home/User_Profile_Board.js';
import User_Address_Board from './apps/components/User_Home/User_Address_Board.js';
import User_Order_Board from './apps/components/User_Home/User_Order_Board.js';
import User_Single_Order_Board from './apps/components/User_Home/User_Single_Order_Board.js';
import User_Single_Order_Shipping_Board from './apps/components/User_Home/User_Single_Order_Shipping_Board.js';
import Change_Password_Home from './apps/components/User_Home/Change_Password_Home.js';
import User_Change_Name_Board from './apps/components/User_Home/User_Change_Name_Board.js';
import User_Add_New_Address_Board from './apps/components/User_Home/User_Add_New_Address_Board.js';
import User_Edit_Address_Board from './apps/components/User_Home/User_Edit_Address_Board.js';
import User_Favorite_Product_Board from './apps/components/User_Home/User_Favorite_Product_Board.js';

// Before_Log_In
import Log_In_Home from './apps/components/User_Home/Log_In_Home.js';
import Sign_Up_Home from './apps/components/User_Home/Sign_Up_Home.js';


// Start from here we import the screen for product home
import Product_Home from './apps/components/Product_Home/Product_Home.js';
import Single_Product_Home from './apps/components/Product_Home/Single_Product_Home.js';

// Start from here we import the screen for the shopping cart home
import Shopping_Cart_Home from './apps/components/Shopping_Cart_Home/Shopping_Cart_Home.js';
import Shopping_Cart_Single_Product_Home from './apps/components/Shopping_Cart_Home/Shopping_Cart_Single_Product_Home.js';
import Shopping_Cart_Choose_Address_Board from './apps/components/Shopping_Cart_Home/Shopping_Cart_Choose_Address_Board.js';

import Home2 from './apps/components/Home2/Home2.js';

import Messages_Board from './apps/components/Messages_Board.js';
import Single_Message_Board from './apps/components/Single_Message_Board.js';
import Cashier_Home from './apps/components/Cashier_Home.js';
import Confirmation_Home from './apps/components/Confirmation_Home.js';

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

  Log_In_Home: { screen: Log_In_Home },

  User_Main_Board: { screen: User_Main_Board },

});


const Tap_Nav_Home = TabNavigator({
  Product_Home: {
    screen: Product_Home,
    navigationOptions: { tabBarLabel:  'Product'  },
  },
  Shopping_Cart_Home: {
    screen: Shopping_Cart_Home,
    navigationOptions: { tabBarLabel:  'Shopping Cart'  },
  },
  User_Home: {
    screen: User_Home_Stack,
    navigationOptions: { tabBarLabel:  'User Home'  },
  },
}
);


const Total_Stack = StackNavigator({

  Tap_Nav_Home: {screen: Tap_Nav_Home},

  Cashier_Home: {screen: Cashier_Home},

  Home2: { screen: Home2 },

  Change_Password_Home: { screen: Change_Password_Home },

  User_Change_Name_Board: { screen: User_Change_Name_Board },

  User_Add_New_Address_Board: { screen: User_Add_New_Address_Board },

  User_Edit_Address_Board: { screen: User_Edit_Address_Board },

  Shopping_Cart_Single_Product_Home: { screen: Shopping_Cart_Single_Product_Home },

  Shopping_Cart_Choose_Address_Board: { screen: Shopping_Cart_Choose_Address_Board },

  User_Favorite_Product_Board: { screen: User_Favorite_Product_Board },

  User_Profile_Board: { screen: User_Profile_Board },

  User_Order_Board: { screen: User_Order_Board },

  User_Single_Order_Board: { screen: User_Single_Order_Board },

  User_Single_Order_Shipping_Board: { screen: User_Single_Order_Shipping_Board },

  User_Address_Board: { screen: User_Address_Board },

  Single_Product_Home: { screen: Single_Product_Home},

  Sign_Up_Home: { screen: Sign_Up_Home },

  Confirmation_Home: {screen: Confirmation_Home},

  Messages_Board: {screen: Messages_Board},

  Single_Message_Board: {screen: Single_Message_Board},

}, {
    headerMode: 'none',
  });



export default class App extends Component<{}> {
    render() {
        return (
            <View style={{width: '100%', height: '100%'}}>
                <Total_Stack/>
                <DropdownAlert ref={(ref) => DropDownHolder.setDropDown(ref)}/>
            </View>
        )
    }
}
