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
import {PaymentShow, PaymentMessage} from '../util.js';
import { Icon, Header } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Modal from "react-native-modal";
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
  Alert,
  ScrollView,
  AsyncStorage,
  RefreshControl,
  TouchableHighlight,
  Picker,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';
import NavigationBar from 'react-native-navbar';


import Status_Bar from './Status_Bar.js';

import {getsingleorder} from '../server.js';


export default class Confirmation_Home extends Component<{}> {


  /*
  Payment Method:

  1 - 支付宝
  2 - 微信
  3 - 银行卡快捷支付
  4 - 银行转帐

  */



  constructor(props) {
    super(props);
    this.state = {



    };
  }



  //
  //
  // Get_Single_Order(){
  //   const { params } = this.props.navigation.state;
  //   const Order_ID = params ? params.Order_ID : null;
  //
  //   if (Order_ID == null) {
  //
  //     Alert.alert(
  //       'Oops',
  //       'There is something wrong with the Order!',
  //       [
  //         {text: 'OK', onPress: ()=>{
  //           this.props.navigation.navigate('Order_List');
  //         }},
  //       ],
  //     )
  //
  //   } else {
  //
  //     AsyncStorage.getItem('User_ID', (err, result) => {
  //       var User_ID = result
  //       console.log(User_ID);
  //
  //       // Here we may need to add one more level security to check the user
  //       if (User_ID == null) {
  //
  //         Alert.alert(
  //             'Oops',
  //             'There is something wrong with the log in!',
  //           [
  //             {text: 'OK', onPress: ()=>{
  //               this.props.navigation.navigate('User_Home');
  //             }},
  //           ],
  //         )
  //
  //       }
  //
  //       else {
  //
  //         getsingleorder(Order_ID, (response) => {
  //
  //           const get_single_order_code = response["StatusCode"]
  //
  //           const Order_Info = response["ResponseText"]
  //
  //           if (get_single_order_code == 200) {
  //
  //             const Order_Basic_Info = Order_Info["Basic_Info"]
  //
  //             const Order_Basic_Info_Total_Price = Order_Basic_Info["Order_Total_Price"]
  //
  //             if (Order_Basic_Info_Total_Price > 20000) {
  //
  //               this.setState({
  //                 order_basic_info: Order_Basic_Info,
  //                 payment_due : (Order_Basic_Info_Total_Price*0.2).toFixed(0)
  //               });
  //
  //
  //             } else {
  //
  //               this.setState({
  //                 order_basic_info: Order_Basic_Info,
  //                 payment_due : Order_Basic_Info_Total_Price
  //               });
  //
  //             }
  //
  //
  //
  //           }
  //
  //           else {
  //
  //             Alert.alert(
  //                 'Oops',
  //                 'Error Code:' + get_single_order_code + '\n' +'There is something wrong with the server! Try again later!',
  //               [
  //                 {text: 'OK', onPress: ()=>{
  //                   AsyncStorage.removeItem('User_ID', (error) => {
  //                     if (error) {
  //                       console.log(error);
  //                     }
  //
  //                     this.props.navigation.navigate('User_Home');
  //
  //                   });
  //
  //                 }},
  //               ],
  //             )
  //
  //
  //
  //
  //           }
  //
  //           //  End of getuserorder
  //         });
  //
  //
  //       }
  //
  //     });
  //
  //
  //
  //
  //   }
  //
  //
  //
  // }






















  componentWillMount(){
    // //AsyncStorage.clear()
    // // AsyncStorage.setItem('UID123', 'hello', () => {
    // //
    // // });
    // this.props.navigation.addListener('willFocus', ()=>{
    //
    //   this.Get_Single_Order()
    // });


  }





  render() {

    return(

      <KeyboardAvoidingView keyboardVerticalOffset={60} behavior={'position'} >

        <Status_Bar />

          <View style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }} >
            <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 订 单 支 付 成 功 </Text>
          </View>





      </KeyboardAvoidingView>









    )
  }
}
