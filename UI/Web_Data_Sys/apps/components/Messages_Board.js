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
import {UnReadMessageExist, MessageContentShow, MessageExistStyle} from '../util.js';
import {getallmessages} from '../server.js';
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



export default class Messages_Board extends Component<{}> {

  static navigationOptions = {
    header: null
}


  constructor(props) {
    super(props);
    this.state = {

      User_Flag : true,

      Messages_Info: null

    };
  }


  Messages_Board_Refresh(){

    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.setState({

          User_Flag : false,

        });

      }

      else {

        getallmessages(User_ID, (response) => {
          const get_all_messages_status_code = response["StatusCode"]
          const Messages_Info = response["ResponseText"]

          console.log(Messages_Info);

          if (get_all_messages_status_code == 200) {

            this.setState({
              Messages_Info : Messages_Info

            });


          } else {

            const errormsg = ErrorCodePrase(get_all_messages_status_code)[1]

            const title = ErrorCodePrase(get_all_messages_status_code)[0]

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



  Price_Messages_Exist(Price_Messages){
    if (Price_Messages.length > 0) {

      return(

        <View style={{width: '80%', flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#f7f6f6'}}>

          <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 18, paddingBottom: 5}}>价格通知{UnReadMessageExist(this.state.Messages_Info.Unread_Price_Messages_Count)}</Text>
            <Text style={{ fontSize: 14, paddingBottom: 5}}>{Price_Messages[0].Message_Time}</Text>
          </View>


          <Text style={{fontSize: 14, paddingBottom: 5 }}>{MessageContentShow(Price_Messages[0].Message_Content)}<Text style={{fontSize: 18}}>. . .</Text></Text>


        </View>

      )

    } else {

      return(
        <View style={{width: '80%', flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#f7f6f6'}}>

          <View style={{flexDirection:'row'}}>
            <Text style={{ fontSize: 18, paddingBottom: 5}}>价格通知</Text>
          </View>

          <Text style={{fontSize: 14, paddingBottom: 5 }}>暂无任何信息</Text>

        </View>

      )

    }
  }



  Customer_Service_Messages_Exist(Customer_Service_Messages){
    if (Customer_Service_Messages.length > 0) {

      return(

        <View style={{width: '80%', flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#f7f6f6'}}>

          <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 18, paddingBottom: 5}}>客服消息{UnReadMessageExist(this.state.Messages_Info.Unread_Customer_Service_Messages_Count)}</Text>
            <Text style={{ fontSize: 14, paddingBottom: 5}}>{Customer_Service_Messages[0].Message_Time}</Text>
          </View>


          <Text style={{fontSize: 14, paddingBottom: 5 }}>{MessageContentShow(Customer_Service_Messages[0].Message_Content)}<Text style={{fontSize: 18}}>. . .</Text></Text>


        </View>


      )

    } else {

      return(

        <View style={{width: '80%', flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#f7f6f6'}}>

          <View style={{flexDirection:'row'}}>
            <Text style={{ fontSize: 18, paddingBottom: 5}}>客服消息</Text>
          </View>


          <Text style={{fontSize: 14, paddingBottom: 5 }}>暂无任何信息</Text>


        </View>

      )

    }
  }



  Account_Messages_Exist(Account_Messages){

    if (Account_Messages.length > 0) {

      return(

        <View style={{width: '80%', flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#f7f6f6'}}>

          <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 18, paddingBottom: 5}}>账户消息{UnReadMessageExist(this.state.Messages_Info.Unread_Account_Messages_Count)}</Text>
            <Text style={{ fontSize: 14, paddingBottom: 5}}>{Account_Messages[0].Message_Time}</Text>
          </View>


          <Text style={{fontSize: 14, paddingBottom: 5 }}>{MessageContentShow(Account_Messages[0].Message_Content)}<Text style={{fontSize: 18}}>. . .</Text></Text>


        </View>

      )

    } else {

      return(

        <View style={{width: '80%', flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#f7f6f6'}}>

          <View style={{flexDirection:'row'}}>
            <Text style={{ fontSize: 18, paddingBottom: 5}}>账户消息</Text>
          </View>


          <Text style={{fontSize: 14, paddingBottom: 5 }}>暂无任何信息</Text>


        </View>

      )

    }

  }



  Shipping_Messages_Exist(Shipping_Messages){
    if (Shipping_Messages.length > 0) {

      return(

        <View style={{width: '80%', flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#f7f6f6'}}>

          <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={{ fontSize: 18, paddingBottom: 5}}>物流消息{UnReadMessageExist(this.state.Messages_Info.Unread_Shipping_Messages_Count)}</Text>
            <Text style={{ fontSize: 14, paddingBottom: 5}}>{Shipping_Messages[0].Message_Time}</Text>
          </View>


          <Text style={{fontSize: 14, paddingBottom: 5 }}>{MessageContentShow(Shipping_Messages[0].Message_Content)}<Text style={{fontSize: 18}}>. . .</Text></Text>


        </View>

      )

    } else {

      return(

        <View style={{width: '80%', flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#f7f6f6'}}>

          <View style={{flexDirection:'row'}}>
            <Text style={{ fontSize: 18, paddingBottom: 5}}>物流消息</Text>
          </View>


          <Text style={{fontSize: 14, paddingBottom: 5 }}>暂无任何信息</Text>


        </View>

      )

    }
  }



  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });
    this.props.navigation.addListener('willFocus', ()=>{

      this.Messages_Board_Refresh()
    });


  }





  render() {

    if (this.state.User_Flag == false) {

      Alert.alert(
        'Watch Out!',
        '您尚未登录，请先登录以便查询消息！',
        [
          {text: '前往登录', onPress: ()=>{
            this.props.navigation.navigate('User_Home')
          } },

        ],
      )


      return(

          <View style={{backgroundColor: '#ededed'}}>
            <View>

              <Status_Bar />

            </View>



          </View>

      )

    }

    else if (this.state.Messages_Info == null) {

      return(
        <View>
          <Text>loading</Text>
        </View>
      )

    } else {

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
                <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 消 息{UnReadMessageExist(this.state.Messages_Info.Unread_Account_Messages_Count + this.state.Messages_Info.Unread_Customer_Service_Messages_Count + this.state.Messages_Info.Unread_Price_Messages_Count + this.state.Messages_Info.Unread_Shipping_Messages_Count)}</Text>
              </View>

            </View>

            <ScrollView style={{height: '89%', backgroundColor: 'white', paddingTop: 10, paddingLeft: 10, paddingTop: 10, paddingRight: 10}}>


              <TouchableOpacity onPress={() => this.props.navigation.navigate('Single_Message_Board', {Message_Type : 1})} activeOpacity={0.8} style={{width: '100%', flexDirection: 'row', paddingBottom: 10}}>

                <View style={{width: '20%', justifyContent: 'center', alignItems: 'center', paddingRight: 10}}>

                  <View style={{width: 60, height: 60, backgroundColor: '#ff441b', borderRadius: 10, justifyContent: 'center', alignItems: 'center',}}>

                    <Image style={{width: '95%', height: '95%'}} source={require('../../img/Price_Down_Notification.png')} />

                  </View>

                </View>

                {

                  this.Price_Messages_Exist(this.state.Messages_Info.Price_Messages)

                }


              </TouchableOpacity>


              <TouchableOpacity onPress={() => this.props.navigation.navigate('Single_Message_Board', {Message_Type : 2})} activeOpacity={0.8} style={{width: '100%', flexDirection: 'row', paddingBottom: 10, paddingTop: 10}}>


                <View style={{width: '20%', justifyContent: 'center', alignItems: 'center', paddingRight: 10}}>

                  <View style={{width: 60, height: 60, backgroundColor: '#ff6a20', borderRadius: 10, justifyContent: 'center', alignItems: 'center',}}>

                    <Image style={{width: '80%', height: '80%'}} source={require('../../img/Customer_Service_Notification.png')} />

                  </View>

                </View>


                {

                  this.Customer_Service_Messages_Exist(this.state.Messages_Info.Customer_Service_Messages)

                }



              </TouchableOpacity>


              <TouchableOpacity onPress={() => this.props.navigation.navigate('Single_Message_Board', {Message_Type : 3})} activeOpacity={0.8} style={{width: '100%', flexDirection: 'row', paddingBottom: 10, paddingTop: 10}}>


                <View style={{width: '20%', justifyContent: 'center', alignItems: 'center', paddingRight: 10}}>

                  <View style={{width: 60, height: 60, backgroundColor: '#06debd', borderRadius: 10, justifyContent: 'center', alignItems: 'center',}}>

                    <Image style={{width: '80%', height: '80%'}} source={require('../../img/Account_Notification.png')} />

                  </View>

                </View>


                {

                  this.Account_Messages_Exist(this.state.Messages_Info.Account_Messages)

                }


              </TouchableOpacity>


              <TouchableOpacity onPress={() => this.props.navigation.navigate('Single_Message_Board', {Message_Type : 4})} activeOpacity={0.8} style={{width: '100%', flexDirection: 'row', paddingBottom: 10, paddingTop: 10}}>


                <View style={{width: '20%', justifyContent: 'center', alignItems: 'center', paddingRight: 10}}>

                  <View style={{width: 60, height: 60, backgroundColor: '#06de70', borderRadius: 10, justifyContent: 'center', alignItems: 'center',}}>

                    <Image style={{width: '80%', height: '80%'}} source={require('../../img/Shipping_Notification.png')} />

                  </View>

                </View>


                {
                  this.Shipping_Messages_Exist(this.state.Messages_Info.Shipping_Messages)

                }



              </TouchableOpacity>


            </ScrollView>



        </View>



      )

    }


  }
}
