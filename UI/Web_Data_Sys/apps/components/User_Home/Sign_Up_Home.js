import {DropDownHolder} from '../../util.js';
import {signupsendverifycode, signup} from '../../server.js';
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

import Status_Bar from '../Status_Bar.js';



export default class Sign_Up_Home extends Component<{}> {


    static navigationOptions = {
      header: null,
  }

  constructor(props) {
    super(props);
    this.state = {

      Sign_Up_Phone_Number: '',
      Sign_Up_Password: '',
      Sign_Up_Verify_Code: '',

    };
  }


  Sign_Up_Phone_Number_Handler(text){
    this.setState({
      Sign_Up_Phone_Number: text
    });
  }

  Sign_Up_Password_Handler(text){
    this.setState({
      Sign_Up_Password: text
    });
  }

  Sign_Up_Verify_Code_Handler(text){
    this.setState({
      Sign_Up_Verify_Code: text
    });
  }


  Send_Verify_Code(){

    const Sign_Up_Phone_Number = this.state.Sign_Up_Phone_Number

    if (Sign_Up_Phone_Number == '' || isNaN(Sign_Up_Phone_Number)) {

      DropDownHolder.getDropDown().alertWithType('error', 'Error!', '请输入正确的手机号码！' )

    } else {

      signupsendverifycode(Sign_Up_Phone_Number, (response) =>{

        const sign_up_send_verify_code_status_code = response["StatusCode"]

        if (sign_up_send_verify_code_status_code == 200) {

          DropDownHolder.getDropDown().alertWithType('success', 'Success!', '验证码发送成功！' )

        } else {

          DropDownHolder.getDropDown().alertWithType('error', 'Error!', sign_up_send_verify_code_status_code )

        }


      });


    }


  }



  Sign_Up(){

    const Sign_Up_Phone_Number = this.state.Sign_Up_Phone_Number
    const Sign_Up_Password = this.state.Sign_Up_Password
    const Sign_Up_Verify_Code = this.state.Sign_Up_Verify_Code

    if (Sign_Up_Phone_Number == '' || isNaN(Sign_Up_Phone_Number)) {

      DropDownHolder.getDropDown().alertWithType('error', 'Error!', '请输入正确的手机号码！' )

    }

    else if (Sign_Up_Password == '') {

      DropDownHolder.getDropDown().alertWithType('error', 'Error!', '请输入密码！' )

    }

    else if (Sign_Up_Verify_Code == '') {

      DropDownHolder.getDropDown().alertWithType('error', 'Error!', '请输入验证码！' )

    }

    else {

      signup(Sign_Up_Phone_Number, Sign_Up_Password, Sign_Up_Verify_Code, (response) => {

        const sign_up_status_code = response["StatusCode"]
        const User_ID = response["ResponseText"]

        if (sign_up_status_code == 200) {

          AsyncStorage.setItem('User_ID', User_ID, () => {

            this.props.navigation.navigate('User_Home');

            // AsyncStorage End
          });


        } else {


          DropDownHolder.getDropDown().alertWithType('error', 'Error!', sign_up_status_code )


        }


      });



    }





  }



  render() {

    return(

      <KeyboardAvoidingView keyboardVerticalOffset={-70} behavior={'position'}>

        <Status_Bar />

        <View style={{
            height: 50,
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

            <TouchableOpacity onPress = {()=> this.props.navigation.goBack()}>

              <Image style={{width: 24, height: 24}} source={require('../../../img/back_arrow.png')} />

            </TouchableOpacity>
          </View>

          <View style={{
              height: '100%',
              width: '40%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }} >
            <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 注 册 </Text>
          </View>



        </View>


        <View>

          {/* logo  */}
          <View style={{backgroundColor: 'white', height: '25%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>

            <Image style={{margin: 10}} source={require('../../../img/logo.png')} />

          </View>

          {/* Sign Up form  */}
          <View style={{backgroundColor: 'white', height: '75%', alignItems: 'center', flexDirection: 'column'}}>

              <View style={{flexDirection: 'row', marginBottom: 10, marginTop:10}}>
                <TextInput
                  style={{
                    marginTop: 15,
                    width: '65%',
                    height: 40,
                    borderBottomWidth: 1,
                    fontSize: 20,
                    marginBottom: 10,
                  }}
                  placeholder={'请输入手机号码'}
                  autoCapitalize='none'
                  keyboardType={'phone-pad'}
                  onChangeText = {(text) => this.Sign_Up_Phone_Number_Handler(text)}
                    />


                  <TouchableOpacity
                    activeOpacity={1}
                    style={{
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }} onPress={() => this.Send_Verify_Code()}>

                    <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:20}}>发送验证码</Text>

                  </TouchableOpacity>

              </View>

              <TextInput
                style={{
                  marginTop: 15,
                  width: '95%',
                  height: 40,
                  borderBottomWidth: 1,
                  fontSize: 20,
                  marginBottom: 10,
                }}
                autoCapitalize='none'
                keyboardType={'numeric'}
                onChangeText = {(text) => this.Sign_Up_Verify_Code_Handler(text)}
                placeholder={'请输入验证码'}
                />

              <TextInput
                style={{
                  marginTop: 25,
                  width: '95%',
                  height: 40,
                  borderBottomWidth: 1,
                  fontSize: 20,
                  marginBottom: 10,
                }}
                autoCapitalize='none'
                secureTextEntry={true}
                onChangeText = {(text) => this.Sign_Up_Password_Handler(text)}
                placeholder={'请输入新密码'}
                />


              <TouchableOpacity
                activeOpacity={1}
                style={{
                  width: '70%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 5,
                  marginTop: 15,
                }} onPress={() => this.Sign_Up()}>

                <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:25}}> 注 册 </Text>

              </TouchableOpacity>


          </View>


        </View>



      </KeyboardAvoidingView>







    )
  }
}
