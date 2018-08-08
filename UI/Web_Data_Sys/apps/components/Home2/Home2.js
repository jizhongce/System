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
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 价 格 通 知 </Text>
            </View>

          </View>

          <ScrollView style={{height: '89%', backgroundColor: '#ebebeb', paddingTop: 5}}>

            <View style={{alignItems: 'center'}}>

              <View style={{width: '100%', alignItems: 'center', marginTop: 15, marginBottom: 15}}>

                  <View style={{alignItems: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 2, paddingBottom: 2, margin: 10, borderRadius: 10, backgroundColor: '#cdcdcd'}}>
                    <Text style={{fontSize: 14, color: 'white'}}>2018/09/09 19:12:34</Text>
                  </View>

                  <View style={{width: '95%', alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, borderRadius: 10, backgroundColor: 'white'}}>
                    <Text style={{fontSize: 16, lineHeight: 25}}>       产品GB987的价格已经发生了浮动，请重新关注产品价格，确认后可以继续购买,新价格由2018年8月10日开始生效!</Text>
                  </View>

              </View>

              <View style={{width: '100%', alignItems: 'center', marginTop: 15, marginBottom: 15}}>

                  <View style={{alignItems: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 2, paddingBottom: 2, margin: 10, borderRadius: 10, backgroundColor: '#cdcdcd'}}>
                    <Text style={{fontSize: 14, color: 'white'}}>2018/09/09 19:12:34</Text>
                  </View>

                  <View style={{width: '95%', alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 5, paddingRight: 5, borderRadius: 10, backgroundColor: 'white'}}>
                    <Text style={{fontSize: 16, lineHeight: 25}}>       产品GB987的价格已经发生了浮动，请重新关注产品价格，确认后可以继续购买,新价格由2018年8月10日开始生效!</Text>
                  </View>

              </View>

            </View>






          </ScrollView>



      </View>









    )
  }
}
