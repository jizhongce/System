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
import {OrderButtonsExistStyle, MessageTypePrase} from '../util.js';
import {getsinglemessage} from '../server.js';
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
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import NavigationBar from 'react-native-navbar';


import Status_Bar from './Status_Bar.js';



export default class Single_Message_Board extends Component<{}> {

  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {

      Message_Type: null,

      Messages_Info: null,

    };
  }


  Single_Message_Board_Refresh(){

    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.props.navigation.navigate('User_Home');

      }

      else {

        const { params } = this.props.navigation.state;
        const Message_Type = params ? params.Message_Type : null;

        getsinglemessage(User_ID, Message_Type, (response) => {
          const get_single_message_status_code = response["StatusCode"]
          const Messages_Info = response["ResponseText"]

          console.log(Messages_Info);

          if (get_single_message_status_code == 200) {

            this.setState({

              Message_Type : Message_Type,

              Messages_Info : Messages_Info

            });


          } else {

            const errormsg = ErrorCodePrase(get_single_message_status_code)[1]

            const title = ErrorCodePrase(get_single_message_status_code)[0]

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
    this.props.navigation.addListener('willFocus', ()=>{

      this.Single_Message_Board_Refresh()
    });


  }




  render() {

    if (this.state.Messages_Info == null || this.state.Message_Type == null) {

      return(
        <View>
          <Text>Loading</Text>
        </View>
      )

    }

    else if (this.state.Messages_Info.length == 0) {

      return(

        <View>
          <Status_Bar />

            <View style={{
                height: '8%',
                backgroundColor: 'white',
                flexDirection: 'row',
                borderBottomWidth: 1,
              }} >

              <View style={{
                  height: '100%',
                  width: '10%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  paddingLeft: 5
                }} >

                <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>

                  <Image style={{width: 24, height: 24}} source={require('../../img/back_arrow.png')} />

                </TouchableOpacity>
              </View>

              <View style={{
                  height: '100%',
                  width: '80%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row'
                }} >
                <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> {MessageTypePrase(this.state.Message_Type)} </Text>
              </View>

            </View>

            <View style={{height: '89%', backgroundColor: '#ebebeb', paddingTop: 5, justifyContent: 'center', alignItems: 'center'}}>


              <Text> 暂时无任何信息 </Text>


            </View>



        </View>

      )

    }

    else {

      return(

        <View>
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

                <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>

                  <Image style={{width: 24, height: 24}} source={require('../../img/back_arrow.png')} />

                </TouchableOpacity>
              </View>

              <View style={{
                  height: '100%',
                  width: '40%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row'
                }} >
                <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> {MessageTypePrase(this.state.Message_Type)} </Text>
              </View>

            </View>

            <ScrollView style={{height: '89%', backgroundColor: '#ebebeb', paddingTop: 5}}>

              <View style={{alignItems: 'center'}}>

                {
                  this.state.Messages_Info.map((Message, i) => {

                    return(

                      <View key={i} style={{width: '100%', alignItems: 'center', marginTop: 15, marginBottom: 15}}>

                          <View style={{alignItems: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 2, paddingBottom: 2, margin: 10, borderRadius: 10, backgroundColor: '#cdcdcd'}}>
                            <Text style={{fontSize: 14, color: 'white'}}>{Message.Message_Time}</Text>
                          </View>

                          <View style={{width: '95%', alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, borderRadius: 10, backgroundColor: 'white'}}>
                            <Text style={{fontSize: 16, lineHeight: 25}}>       {Message.Message_Content}</Text>
                          </View>

                      </View>


                    );
                  })


                }


              </View>



            </ScrollView>



        </View>


      )

    }


  }
}
