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

import {getsingleorder, depositpaymentsubmited} from '../server.js';


export default class Cashier_Home extends Component<{}> {


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

      order_info: '',

      alipay_flag: true,

      wechatpay_flag: false,

      bankcardpay_flag: false,

      banktransferpay_flag: false,

      payment_method_value: 1,

      payment_due : 0,



    };
  }


  alipay_handler(){
    this.setState({
      alipay_flag: true,

      wechatpay_flag: false,

      bankcardpay_flag: false,

      banktransferpay_flag: false,

      payment_method_value: 1,
    });
  }


  wechatpay_handler(){
    this.setState({
      alipay_flag: false,

      wechatpay_flag: true,

      bankcardpay_flag: false,

      banktransferpay_flag: false,

      payment_method_value: 2,
    });
  }


  bankcardpay_handler(){
    this.setState({
      alipay_flag: false,

      wechatpay_flag: false,

      bankcardpay_flag: true,

      banktransferpay_flag: false,

      payment_method_value: 3,
    });
  }


  banktransferpay_handler(){
    this.setState({
      alipay_flag: false,

      wechatpay_flag: false,

      bankcardpay_flag: false,

      banktransferpay_flag: true,

      payment_method_value: 4,
    });
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
            this.props.navigation.navigate('User_Order_Board');
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

              const Order_Basic_Info_Total_Price = Order_Basic_Info["Order_Total_Price"]

              if (Order_Basic_Info_Total_Price > 20000) {

                this.setState({
                  order_basic_info: Order_Basic_Info,
                  payment_due : (Order_Basic_Info_Total_Price*0.2).toFixed(0)
                });


              } else {

                this.setState({
                  order_basic_info: Order_Basic_Info,
                  payment_due : Order_Basic_Info_Total_Price
                });

              }



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


  Deposit_Payment_Submited(Order_ID, Paid_Amount, Payment_Method){

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

        const Deposit_Payment_Info = {
          Order_ID : Order_ID,
          Paid_Amount : Paid_Amount,
          Payment_Method : Payment_Method
        }

        depositpaymentsubmited(User_ID, Deposit_Payment_Info, (response) =>{

          const deposit_payment_submited_code = response["StatusCode"]

          const deposit_payment_submited_Text = response["ResponseText"]

          if (deposit_payment_submited_code == 200) {


            this.props.navigation.navigate('Confirmation_Home',{ Order_ID : Order_ID} )


          } else {

            const errormsg = ErrorCodePrase(deposit_payment_submited_code)[1]

            const title = ErrorCodePrase(deposit_payment_submited_code)[0]


            Alert.alert(
              title,
              errormsg,
              [
                {text: 'OK', style: 'cancel'},
              ],
            )


          }



        });


      }

    });





  }






  onlinepay(){

    // uphere we will implement the alipay protoco then we have the status to instead
    // After that we will handle the different situation in the callback function


    const Paid_Amount = this.state.payment_due

    const Order_ID = this.state.order_basic_info.Order_ID

    const Payment_Method = this.state.payment_method_value

    Alert.alert(
      'Wow!',
      'Did you finish the payment on the' + PaymentMessage(this.state.payment_method_value) +'?',
      [
        {text: 'Success', onPress: () =>{

          this.Deposit_Payment_Submited(Order_ID, Paid_Amount, Payment_Method);



        }},
        {text: 'Fail', onPress: () =>{

          this.props.navigation.navigate('User_Order_Board');

        }},
      ],
    )


  }



  banktransferpay(){

    const Paid_Amount = 0

    const Order_ID = this.state.order_basic_info.Order_ID

    const Payment_Method = this.state.payment_method_value


    Alert.alert(
      'Wow!',
      'You choose offline bank transfer payment, please follow the instruction on next page!',
      [
        {text: 'Ok', onPress: () =>{

          this.Deposit_Payment_Submited(Order_ID, Paid_Amount, Payment_Method);

        }},
        {text: 'No'},
      ],
    )




  }





  Submit_Payment_Method(){

    switch (this.state.payment_method_value) {
      case 1:
        this.onlinepay();
        break;
      case 2:
        this.onlinepay();
        break;
      case 3:
        this.onlinepay();
        break;
      case 4:
        this.banktransferpay();
        break;

      default:
        Alert.alert(
          'Wow!',
          'Please choose a payment method!',
          [
            {text: 'OK'},
          ],
        );
        break;

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

    return(

      <KeyboardAvoidingView keyboardVerticalOffset={70} behavior={'position'} >

        <Status_Bar />

        <View style={{
            height: '8%',
            backgroundColor: 'white',
            flexDirection: 'row',
            borderBottomWidth: 1,
          }} >

          <View style={{
              height: '100%',
              width: '30%',
              alignItems: 'center',
              flexDirection: 'row',
              marginLeft: 5
            }} >

            <TouchableOpacity onPress = {()=> this.props.navigation.navigate('User_Order_Board')}>

              <Image style={{width: 24, height: 24}} source={require('../../img/back_arrow.png')} />

            </TouchableOpacity>
          </View>

          <View style={{
              height: '100%',
              width: '40%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',

            }} >
            <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 收 银 台 </Text>
          </View>



        </View>


        {/* Header */}

        <View style={{paddingLeft: 10, height: '7%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>

          <Text style={{fontSize: 18}}> 需 支 付 定 金: <Text style={{color: 'red'}}>{this.state.payment_due}</Text> </Text>


        </View>

        {/* Header */}


        {/* Payment Method */}

        <View style={{height: '72%'}}>


          {/* online payment method  */}

          <View style={{marginTop:10, backgroundColor: 'white'}}>

            <View style={{borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10}}>
              <Text style={{fontSize: 16}}> 线 上 支 付 </Text>
            </View>



            <TouchableOpacity onPress={() => this.alipay_handler()} activeOpacity={1} style={{marginLeft: 5, paddingTop: 10, paddingBottom: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: 'row',  alignItems: 'center'}}>


              <View style={{width: '80%'}}>
                <Text style={{fontSize: 17}}> 支 付 宝 支 付 </Text>

              </View>

              <View style={{width: '20%'}}>

                <View style={PaymentShow(this.state.alipay_flag)}>
                  <Icon name='radio-button-checked' />
                </View>

                <View style={PaymentShow(!this.state.alipay_flag)}>
                  <Icon name='radio-button-unchecked' />
                </View>

              </View>


            </TouchableOpacity>


            <TouchableOpacity onPress={() => this.wechatpay_handler()} activeOpacity={1} style={{marginLeft: 5, paddingTop: 10, paddingBottom: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: 'row',  alignItems: 'center'}}>


                <View style={{width: '80%'}}>
                  <Text style={{fontSize: 17}}> 微 信 支 付 </Text>

                </View>

                <View style={{width: '20%'}}>

                  <View style={PaymentShow(this.state.wechatpay_flag)}>
                    <Icon name='radio-button-checked' />
                  </View>

                  <View style={PaymentShow(!this.state.wechatpay_flag)}>
                    <Icon name='radio-button-unchecked' />
                  </View>

                </View>


            </TouchableOpacity>


            <TouchableOpacity onPress={() => this.bankcardpay_handler()} activeOpacity={1} style={{marginLeft: 5, paddingTop: 10, paddingBottom: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: 'row',  alignItems: 'center'}}>


              <View style={{width: '80%'}}>
                <Text style={{fontSize: 17}}> 银 行 卡 快 捷 支 付 </Text>

              </View>

              <View style={{width: '20%'}}>

                <View style={PaymentShow(this.state.bankcardpay_flag)}>
                  <Icon name='radio-button-checked' />
                </View>

                <View style={PaymentShow(!this.state.bankcardpay_flag)}>
                  <Icon name='radio-button-unchecked' />
                </View>

              </View>


            </TouchableOpacity>



          </View>



          {/* online payment method  */}



          {/* offline payment method  */}

          <View style={{marginTop:10, backgroundColor: 'white',}}>

            <View style={{borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10}}>
              <Text style={{fontSize: 16}}> 线 下 支 付 </Text>
            </View>


            <TouchableOpacity onPress={() => this.banktransferpay_handler()} activeOpacity={1} style={{marginLeft: 5, paddingTop: 10, paddingBottom: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: 'row',  alignItems: 'center'}}>


              <View style={{width: '80%'}}>
                <Text style={{fontSize: 17}}> 银 行 转 账 </Text>

              </View>

              <View style={{width: '20%'}}>

                <View style={PaymentShow(this.state.banktransferpay_flag)}>
                  <Icon name='radio-button-checked' />
                </View>

                <View style={PaymentShow(!this.state.banktransferpay_flag)}>
                  <Icon name='radio-button-unchecked' />
                </View>

              </View>

            </TouchableOpacity>


          </View>



          {/* offline payment method  */}




        </View>

        {/* Payment Method */}


        {/* Submit Payment */}

        <TouchableOpacity onPress={()=> this.Submit_Payment_Method()} activeOpacity={0.6} style={{height: '10%', width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>


          <Text style={{fontSize: 17}}>{PaymentMessage(this.state.payment_method_value)}: {this.state.payment_due} </Text>


        </TouchableOpacity>

        {/* Submit Payment */}




      </KeyboardAvoidingView>









    )
  }
}
