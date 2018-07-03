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


class User_Home_Header extends React.Component {
  render() {
    return (
      <View>

        <Status_Bar />

        <View style={{
            height: 50,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
          }} >



          <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 登录/注册 </Text>



        </View>

      </View>

    );
  }
}



export default class Home2 extends Component<{}> {

  static navigationOptions = {
    header: <User_Home_Header />
}

  constructor(props) {
    super(props);
    this.state = {


    };
  }



  render() {

    return(

      <KeyboardAvoidingView  behavior={'position'} >

        <View>

          {/* logo  */}
          <View style={{backgroundColor: 'white', height: '25%', width: '100%', justifyContent: 'center', alignItems: 'center'}}>

            <Image style={{margin: 10}} source={require('../../../img/logo.png')} />

          </View>

          {/* log in form  */}
          <View style={{backgroundColor: 'white', height: '75%', alignItems: 'center', flexDirection: 'column'}}>

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
              placeholder={'请输入用户名'}
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
                  secureTextEntry={true}
                    />


                  <TouchableOpacity style={{
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>

                    <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:20}}>忘记密码</Text>

                  </TouchableOpacity>

              </View>

              <TouchableOpacity style={{
                  width: '70%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderRadius: 5,
                  marginTop: 15,
                }}>

                <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:25}}> 登 录 </Text>

              </TouchableOpacity>

              <TouchableOpacity style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginTop: 15,
                }}>

                <Text style={{justifyContent: 'flex-end', alignItems: 'center', fontSize:17, textDecorationLine: 'underline'}}> 新 用 户 注 册 </Text>

              </TouchableOpacity>





          </View>




        </View>






      </KeyboardAvoidingView>









    )
  }
}
