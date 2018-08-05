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
import {PaymentPrase, StatusPrase} from '../util.js';
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
      order_basic_info: ''


    };
  }





  Get_Single_Order(){
    const { params } = this.props.navigation.state;
    const Order_ID = params ? params.Order_ID : null;

    if (Order_ID == null) {

      Alert.alert(
        'Oops',
        'There is something wrong with the Order!',
        [
          {text: 'OK', onPress: ()=>{
            this.props.navigation.navigate('Order_List');
          }},
        ],
      )

    } else {

      AsyncStorage.getItem('User_ID', (err, result) => {
        var User_ID = result
        console.log(User_ID);

        // Here we may need to add one more level security to check the user
        if (User_ID == null) {

          Alert.alert(
              'Oops',
              'There is something wrong with the log in!',
            [
              {text: 'OK', onPress: ()=>{
                this.props.navigation.navigate('User_Home');
              }},
            ],
          )

        }

        else {

          getsingleorder(User_ID, Order_ID, (response) => {

            const get_single_order_code = response["StatusCode"]

            const Order_Info = response["ResponseText"]

            if (get_single_order_code == 200) {

              const Order_Basic_Info = Order_Info["Basic_Info"]

              console.log(Order_Basic_Info);

              this.setState({
                order_basic_info: Order_Basic_Info,

              });


            }

            else {

              Alert.alert(
                  'Oops',
                  'Error Code:' + get_single_order_code + '\n' +'There is something wrong with the server! Try again later!',
                [
                  {text: 'OK', onPress: ()=>{
                    AsyncStorage.removeItem('User_ID', (error) => {
                      if (error) {
                        console.log(error);
                      }

                      this.props.navigation.navigate('User_Home');

                    });

                  }},
                ],
              )




            }

            //  End of getuserorder
          });


        }

      });




    }



  }









  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });
    this.props.navigation.addListener('willFocus', ()=>{

      this.Get_Single_Order()

    });


  }





  render() {

    if (this.state.order_basic_info.Order_Payment_Method == 4 && this.state.order_basic_info.Order_Status == 'NDP') {

      return(


              <View >

                <Status_Bar />

                  <View style={{
                      height: '8%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      borderBottomWidth: 1,
                    }} >

                      <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 订 单 待 支 付 </Text>


                  </View>


                  <View style={{height: '89%', width: '100%' , marginTop: 10, backgroundColor: 'white', flexDirection: 'column'}}>


                    {/* order information */}
                    <View style={{
                        flexDirection: 'column',
                        marginLeft: 5,
                        marginBottom: 5,
                      }}>

                      <Text style={{fontSize: 19, marginTop: 5, marginBottom: 5}}> 订单信息: </Text>

                      <Text style={{fontSize: 17, marginTop: 5, marginLeft: 5, marginBottom: 5}}> 订单号码: {this.state.order_basic_info.Order_ID} </Text>

                      <Text style={{fontSize: 17, marginTop: 5, marginLeft: 5, marginBottom: 5}}> 待支付金额: { (this.state.order_basic_info.Order_Total_Price*0.2).toFixed(0) } </Text>

                      <Text style={{fontSize: 17, marginTop: 5, marginLeft: 5, marginBottom: 5}}> 支付方式: {PaymentPrase(this.state.order_basic_info.Order_Payment_Method)} </Text>

                      <Text style={{fontSize: 17, marginTop: 5, marginLeft: 5, marginBottom: 5}}> 订单状态: {StatusPrase(this.state.order_basic_info.Order_Status)} </Text>


                    </View>

                    <View
                      style={{
                        borderTopColor: 'black',
                        borderTopWidth: 1,
                        width: '100%'
                      }}
                      />


                    {/* transfer instruction */}
                    <View style={{
                        flexDirection: 'column',
                        marginLeft: 5,
                        marginBottom: 5,
                      }}>

                      <Text style={{fontSize: 19, marginTop: 5, marginBottom: 5}}> 汇款指南: </Text>

                      <Text style={{fontSize: 17, marginTop: 5, marginLeft: 5, marginBottom: 5}}> 汇款账号: 6228888888888 </Text>

                      <Text style={{fontSize: 17, marginTop: 5, marginLeft: 5, marginBottom: 5}}> 汇款银行: 交通银行车站大道支行 </Text>

                      <Text style={{fontSize: 17, marginTop: 5, marginLeft: 5, marginBottom: 5}}> 汇款金额: { (this.state.order_basic_info.Order_Total_Price*0.2).toFixed(0) } </Text>

                      <Text style={{fontSize: 17, marginTop: 5, marginLeft: 5, marginBottom: 5}}> 汇款识别码: {this.state.order_basic_info.Order_ID} (请填写在汇款用途或者附注里) </Text>


                    </View>

                    <View
                      style={{
                        borderTopColor: 'black',
                        borderTopWidth: 1,
                        width: '100%'
                      }}
                      />


                    {/* buttons */}
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',}}>

                      <TouchableOpacity style={{
                          borderWidth: 1,
                          borderColor: 'black',
                          margin: 10,
                          width: 120,
                          alignItems: 'center',
                          justifyContent: 'center',

                        }} onPress = {() => this.props.navigation.navigate('User_Single_Order_Board', { Order_ID : this.state.order_basic_info.Order_ID})} activeOpacity={0.5}>

                        <Text style={{fontSize: 17, marginTop: 5, marginBottom: 5}}>查看订单</Text>

                      </TouchableOpacity>


                      <TouchableOpacity style={{
                          borderWidth: 1,
                          borderColor: 'black',
                          margin: 10,
                          width: 120,
                          alignItems: 'center',
                          justifyContent: 'center',


                        }} onPress = {() => this.props.navigation.navigate('Product_Home')} activeOpacity={0.5}>

                        <Text style={{fontSize: 17, marginTop: 5, marginBottom: 5}}>继续选购产品</Text>

                      </TouchableOpacity>

                    </View>





                  </View>






              </View>





      )




    } else {

      return(

        <View >

          <Status_Bar />

            <View style={{
                height: '8%',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                flexDirection: 'row',
                borderBottomWidth: 1,
              }} >

                <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 订 单 支 付 成 功 </Text>


            </View>


            <View style={{height: '89%', width: '100%' , paddingTop: 10, backgroundColor: 'white', flexDirection: 'column', }}>


              {/* order information */}
              <View style={{
                  flexDirection: 'column',
                  marginLeft: 5,
                  marginBottom: 5,
                }}>

                <Text style={{fontSize: 19, marginTop: 5, marginBottom: 5}}> 订单信息: </Text>

                <Text style={{fontSize: 17, marginTop: 5, marginBottom: 5}}> 订单号码: {this.state.order_basic_info.Order_ID} </Text>

                <Text style={{fontSize: 17, marginTop: 5, marginBottom: 5}}> 已支付金额: {this.state.order_basic_info.Order_Paid_Price} </Text>

                <Text style={{fontSize: 17, marginTop: 5, marginBottom: 5}}> 支付方式: {PaymentPrase(this.state.order_basic_info.Order_Payment_Method)} </Text>

                <Text style={{fontSize: 17, marginTop: 5, marginBottom: 5}}> 订单状态: {StatusPrase(this.state.order_basic_info.Order_Status)} </Text>


              </View>

              <View
                style={{
                  borderTopColor: 'black',
                  borderTopWidth: 1,
                  width: '100%'
                }}
                />


                {/* buttons */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',}}>

                  <TouchableOpacity style={{
                      borderWidth: 1,
                      marginTop: 10,
                      marginBottom: 10,
                      width: 120,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 10,

                    }} onPress = {() => this.props.navigation.navigate('Single_Order', { Order_ID : this.state.order_basic_info.Order_ID})} activeOpacity={0.5}>

                    <Text style={{fontSize: 17, marginTop: 5, marginBottom: 5}}>查看订单</Text>

                  </TouchableOpacity>


                  <TouchableOpacity style={{
                      borderWidth: 1,
                      marginTop: 10,
                      marginBottom: 10,
                      width: 120,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 10,

                    }} onPress = {() => this.props.navigation.navigate('Product_Home')} activeOpacity={0.5}>

                    <Text style={{fontSize: 17, marginTop: 5, marginBottom: 5}}>继续选购产品</Text>

                  </TouchableOpacity>

                </View>



            </View>






        </View>









      )


    }


  }
}
