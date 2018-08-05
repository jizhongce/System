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
import {CancelExistStyle, ErrorCodePrase} from '../../util.js';
import {getuserprofile, changeusername} from '../../server.js';
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



export default class User_Change_Name_Board extends Component<{}> {

  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {

      User_Profile: '',
      User_Profile_Flag: false,
      Name: '',
      Cancel_Flag: true,

    };
  }


  Name_Handler(text){
    this.setState({
      Name: text
    });
  }


  Change_Name_Submit(){

    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.props.navigation.navigate('User_Home');

      }

      else {

        const User_ID = this.state.User_Profile.User_ID
        const New_Name = this.state.Name

        changeusername(User_ID, New_Name, (response) => {
          const change_user_name_status_code = response["StatusCode"]


          if (change_user_name_status_code == 200) {


            this.props.navigation.goBack();


          } else {

            const errormsg = ErrorCodePrase(change_user_name_status_code)[1]

            const title = ErrorCodePrase(change_user_name_status_code)[0]

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
              User_Profile_Flag: true,
              Name : User_Profile.Name,

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



  }



  render() {

    if (this.state.User_Profile_Flag == false) {

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
                      paddingLeft: 5
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
                    <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 修 改 名 字 </Text>
                  </View>

                  <View style={{
                      height: '100%',
                      width: '30%',
                      alignItems: 'center',
                      flexDirection: 'row-reverse',
                      paddingRight: 5,
                      paddingRight: 5,
                    }} >

                    <TouchableOpacity onPress={()=> this.Change_Name_Submit()}>

                      <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 完成 </Text>

                    </TouchableOpacity>
                  </View>




                </View>



              {/* User info */}


              <View style={{height: '89%', width: '100%', backgroundColor: 'white', flexDirection: 'column'}}>


                <ScrollView
                  scrollEnabled={false}
                  >

                <View style={{marginTop: 20, paddingLeft: 10, paddingRight: 10, borderWidth: 1, flexDirection: 'row'}}>



                    <TextInput
                      style={{
                        width: '95%',
                        height: 40,
                        fontSize: 20,
                      }}
                      value={this.state.Name}
                      autoCapitalize='none'
                      onFocus={()=> this.setState({Cancel_Flag: false})}
                      onBlur={()=> this.setState({Cancel_Flag: true})}
                      onChangeText = {(text) => this.Name_Handler(text)}
                      />



                    <TouchableOpacity
                      onPress={() => this.setState({Name: ''})}
                      style={CancelExistStyle(this.state.Cancel_Flag)}
                      >

                      <Image source={require('../../../img/cancel.png')} />

                    </TouchableOpacity>


                </View>

              </ScrollView>

              </View>






            </View>




          )

    }

  }
}
