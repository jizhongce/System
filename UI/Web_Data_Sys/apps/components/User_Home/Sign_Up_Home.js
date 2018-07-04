import {Product_Image, GetDistrictForCity} from '../../util.js';
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


    };
  }


  render() {

    return(

      <KeyboardAvoidingView keyboardVerticalOffset={-50} behavior={'position'}>

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
                  secureTextEntry={true}
                    />


                  <TouchableOpacity style={{
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>

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
                secureTextEntry={true}
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
                placeholder={'请输入新密码'}
                />


              <TouchableOpacity style={{
                  width: '70%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 5,
                  marginTop: 15,
                }}>

                <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:25}}> 注 册 </Text>

              </TouchableOpacity>


          </View>


        </View>



      </KeyboardAvoidingView>







    )
  }
}
