import {DropDownHolder} from '../../util.js';
import {login} from '../../server.js';
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




export default class Log_In_Home extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      Log_In_Phone_Number: '',
      Log_In_Password: '',

    };
  }


  Log_In_Phone_Number_Handler(text){
    this.setState({
      Log_In_Phone_Number: text
    });
  }

  Log_In_Password_Handler(text){
    this.setState({
      Log_In_Password: text
    });
  }


  Log_In(){

    const Log_In_Phone_Number = this.state.Log_In_Phone_Number
    const Log_In_Password = this.state.Log_In_Password

    if (Log_In_Phone_Number == '' || isNaN(Log_In_Phone_Number)) {

      DropDownHolder.getDropDown().alertWithType('error', 'Error!', '请输入正确的手机号码！' )

    }

    else if (Log_In_Password == '') {

      DropDownHolder.getDropDown().alertWithType('error', 'Error!', '请输入密码！' )

    }

    else {

      login(Log_In_Phone_Number, Log_In_Password, (response) => {

        const log_in_status_code = response["StatusCode"]
        const User_ID = response["ResponseText"]

        if (log_in_status_code == 200) {

          AsyncStorage.setItem('User_ID', User_ID, () => {

            this.props.navigation.navigate('User_Home');

            // AsyncStorage End
          });


        } else {


          DropDownHolder.getDropDown().alertWithType('error', 'Error!', log_in_status_code )


        }


      });



    }

  }






  render() {

    return(

      <View>

        <Status_Bar />

        <View style={{
            height: '8%',
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
          }} >



          <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 登录/注册 </Text>



        </View>


        <View>

          {/* logo  */}
          <ScrollView scrollEnabled={false} style={{backgroundColor: 'white', height: '25%', width: '100%'}}>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image style={{margin: 10}} source={require('../../../img/logo.png')} />
            </View>

          </ScrollView>

          {/* log in form  */}
          <ScrollView scrollEnabled={false} style={{backgroundColor: 'white', height: '74%', }}>
            
            <View style={{alignItems: 'center', flexDirection: 'column'}}>

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
                onChangeText = {(text) => this.Log_In_Phone_Number_Handler(text)}
                placeholder={'请输入手机号码'}
                />

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
                  placeholder={'请输入密码'}
                  autoCapitalize='none'
                  onChangeText = {(text) => this.Log_In_Password_Handler(text)}
                  secureTextEntry={true}
                  />


                <TouchableOpacity
                  style={{
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }} onPress={()=> this.props.navigation.navigate('Change_Password_Home')}>

                  <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:20}}>忘记密码</Text>

                </TouchableOpacity>

              </View>

              <TouchableOpacity
                activeOpacity={1}
                style={{
                  width: '70%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 5,
                  marginTop: 15,
                }} onPress={() => this.Log_In()}>

                <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:25}}> 登 录 </Text>

              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 15,
                }} onPress={()=> this.props.navigation.navigate('Sign_Up_Home')}>

                <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:17, textDecorationLine: 'underline'}}> 新 用 户 注 册 </Text>

              </TouchableOpacity>



            </View>



          </ScrollView>



        </View>




      </View>









    )
  }
}
