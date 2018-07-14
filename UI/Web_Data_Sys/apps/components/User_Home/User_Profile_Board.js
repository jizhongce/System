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
import {getuserprofile} from '../../server.js';
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



export default class User_Profile_Board extends Component<{}> {

  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {
      User_Profile: ''

    };
  }


  sign_out(){
    AsyncStorage.removeItem('User_ID', (error) => {
      if (error) {
        console.log(error);
      }

      this.props.navigation.navigate('User_Home');

    });
  }


  User_Profile_Board_Refresh(){

    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.props.navigation.navigate('User_Home');

      }

      else {

        getuserprofile(User_ID, (response) => {
          const get_user_profile_status_code = response["StatusCode"]
          const User_Profile = response["ResponseText"]

          console.log(User_Profile);

          if (get_user_profile_status_code == 200) {


            this.setState({
              User_Profile : User_Profile,

            });






          } else {

            const errormsg = ErrorCodePrase(get_user_profile_status_code)[1]

            const title = ErrorCodePrase(get_user_profile_status_code)[0]

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



  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });

    this.User_Profile_Board_Refresh()

    this.props.navigation.addListener('willFocus', ()=>{

      this.User_Profile_Board_Refresh()

    });





  }




  render() {

    if (this.state.User_Profile == '') {

      return(
        <View>
          <Text>Loading</Text>
        </View>
      )

    } else {

      return(

        <View >
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
                <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 用 户 资 料 </Text>
              </View>



            </View>



          {/* User info */}

          <ScrollView style={{height: '100%', width: '100%', backgroundColor: 'white', flexDirection: 'column'}}>


            {/* Pic */}
            <TouchableOpacity activeOpacity={1} style={{alignItems: 'center',borderBottomWidth: 1, paddingLeft: 10, paddingTop: 10, paddingBottom:10, flexDirection: 'row'}}>

              <View style={{width: '80%' }}>
                <Image
                  source={require('../../../img/user.png')}
                  style={{height:60, width:60, marginTop: 10, borderRadius: 10 }}/>
              </View>

              <View style={{width: '20%', alignItems: 'center', justifyContent: 'center',}}>

                <Image style={{width: 35, height: 35}} source={require('../../../img/forward_arrow.png')} />

              </View>

            </TouchableOpacity>


            {/* ID */}
            <View style={{borderBottomWidth: 1, alignItems: 'center', paddingLeft: 10,  paddingTop: 10, paddingBottom:10, flexDirection: 'row'}}>

              <View style={{width: '100%' }}>
                <Text style={{fontSize: 25}}>ID: {this.state.User_Profile.User_ID.substring(0,8)}</Text>
              </View>

            </View>


            {/* Name */}
            <TouchableOpacity
              activeOpacity={1}
              onPress={()=> this.props.navigation.navigate('User_Change_Name_Board')}
              style={{borderBottomWidth: 1,
                alignItems: 'center',
                paddingLeft: 10,  paddingTop: 10, paddingBottom:10,
                flexDirection: 'row'
              }}>

              <View style={{width: '80%' }}>
                <Text style={{fontSize: 25}}>名 字: {this.state.User_Profile.Name}</Text>
              </View>

              <View style={{width: '20%', alignItems: 'center', justifyContent: 'center',}}>

                <Image style={{width: 35, height: 35}} source={require('../../../img/forward_arrow.png')} />

              </View>

            </TouchableOpacity>


            {/* Level */}
            <View style={{borderBottomWidth: 1, alignItems: 'center', paddingLeft: 10,  paddingTop: 10, paddingBottom:10, flexDirection: 'row'}}>

              <View style={{width: '100%' }}>
                <Text style={{fontSize: 25}}>等 级: {this.state.User_Profile.Level}</Text>
              </View>

            </View>


            {/* Log out */}
            <TouchableOpacity
              activeOpacity={1}
              onPress = {()=> this.sign_out()}
              style={{
                borderWidth: 1,
                marginTop:100,
                paddingTop: 10, paddingBottom: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <Text style={{fontSize: 25}}>Log out</Text>
            </TouchableOpacity>


          </ScrollView>


        </View>




      )


    }


  }
}
