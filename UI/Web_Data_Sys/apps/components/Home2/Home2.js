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
import {OrderButtonsExistStyle} from '../../util.js';
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


import Status_Bar from '../Status_Bar.js';



export default class Home2 extends Component<{}> {

  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {


    };
  }




  render() {

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
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 消 息(20) </Text>
            </View>

          </View>

          <ScrollView style={{height: '89%', backgroundColor: 'white', paddingTop: 10, paddingLeft: 10}}>

            <TouchableOpacity activeOpacity={0.8} style={{width: '100%', flexDirection: 'row', paddingBottom: 10}}>

              <View style={{width: '20%', justifyContent: 'center', alignItems: 'center', paddingRight: 10}}>

                <View style={{width: 60, height: 60, backgroundColor: '#ff441b', borderRadius: 10, justifyContent: 'center', alignItems: 'center',}}>

                  <Image style={{width: '95%', height: '95%'}} source={require('../../../img/Price_Down_Notification.png')} />

                </View>

              </View>


              <View style={{width: '80%', flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#f7f6f6'}}>

                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                  <Text style={{ fontSize: 18, paddingBottom: 5}}>价格通知(3)</Text>
                  <Text style={{ fontSize: 14, paddingBottom: 5}}>2018/8/6</Text>
                </View>


                <Text style={{fontSize: 14, paddingBottom: 5 }}>您关注的产品xxxxxxxxxxx价格价格发生变动，请关注<Text style={{fontSize: 18}}>. . .</Text></Text>


              </View>


            </TouchableOpacity>


            <TouchableOpacity activeOpacity={0.8} style={{width: '100%', flexDirection: 'row', paddingBottom: 10}}>


              <View style={{width: '20%', justifyContent: 'center', alignItems: 'center', paddingRight: 10}}>

                <View style={{width: 60, height: 60, backgroundColor: '#ff6a20', borderRadius: 10, justifyContent: 'center', alignItems: 'center',}}>

                  <Image style={{width: '80%', height: '80%'}} source={require('../../../img/Customer_Service_Notification.png')} />

                </View>

              </View>


              <View style={{width: '80%', flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#f7f6f6'}}>

                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                  <Text style={{ fontSize: 18, paddingBottom: 5}}>客服消息(4)</Text>
                  <Text style={{ fontSize: 14, paddingBottom: 5}}>2018/8/6</Text>
                </View>


                <Text style={{fontSize: 14, paddingBottom: 5 }}>您的订单121232123已经成功修改，请关注是否本人操作，如不是请联系客服<Text style={{fontSize: 18}}>. . .</Text></Text>


              </View>


            </TouchableOpacity>


            <TouchableOpacity activeOpacity={0.8} style={{width: '100%', flexDirection: 'row', paddingBottom: 10}}>


              <View style={{width: '20%', justifyContent: 'center', alignItems: 'center', paddingRight: 10}}>

                <View style={{width: 60, height: 60, backgroundColor: '#06debd', borderRadius: 10, justifyContent: 'center', alignItems: 'center',}}>

                  <Image style={{width: '80%', height: '80%'}} source={require('../../../img/Account_Notification.png')} />

                </View>

              </View>


              <View style={{width: '80%', flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#f7f6f6'}}>

                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                  <Text style={{ fontSize: 18, paddingBottom: 5}}>账户消息(5)</Text>
                  <Text style={{ fontSize: 14, paddingBottom: 5}}>2018/8/6</Text>
                </View>


                <Text style={{fontSize: 14, paddingBottom: 5 }}>您的密码已经修改，请关注是否本人操作，如不是请联系客服<Text style={{fontSize: 18}}>. . .</Text></Text>


              </View>


            </TouchableOpacity>


            <TouchableOpacity activeOpacity={0.8} style={{width: '100%', flexDirection: 'row', paddingBottom: 10}}>


              <View style={{width: '20%', justifyContent: 'center', alignItems: 'center', paddingRight: 10}}>

                <View style={{width: 60, height: 60, backgroundColor: '#06de70', borderRadius: 10, justifyContent: 'center', alignItems: 'center',}}>

                  <Image style={{width: '80%', height: '80%'}} source={require('../../../img/Shipping_Notification.png')} />

                </View>

              </View>


              <View style={{width: '80%', flexDirection: 'column', paddingLeft: 10, paddingRight: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#f7f6f6'}}>

                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                  <Text style={{ fontSize: 18, paddingBottom: 5}}>物理消息(5)</Text>
                  <Text style={{ fontSize: 14, paddingBottom: 5}}>2018/8/6</Text>
                </View>


                <Text style={{fontSize: 14, paddingBottom: 5 }}>您的订单已经发货，预计到达时间7天，请关注物流信息<Text style={{fontSize: 18}}>. . .</Text></Text>


              </View>


            </TouchableOpacity>


          </ScrollView>



      </View>









    )
  }
}
