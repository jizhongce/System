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

              <TouchableOpacity >

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
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 添 加 新 地 址 </Text>
            </View>



          </View>


          <View style={{backgroundColor: 'white', height: '100%', flexDirection: 'column', alignItems: 'center',}}>

            <View style={{width: '100%', flexDirection: 'row', paddingLeft: 5, paddingBottom: 15, paddingTop: 15, alignItems: 'center', borderBottomWidth: 1, borderColor: '#dddddd'}}>

              <View style={{marginRight:10}}>
                <Text style={{fontSize: 16}}>地 址 名 字:</Text>
              </View>

              <View style={{}}>
                <TextInput
                  style={{
                    width: 230,
                    fontSize: 16,
                  }}
                  placeholder={'请输入地址名字'}
                  autoCapitalize='none'
                    />
              </View>

              <TouchableOpacity style={{}}>
                <Image source={require('../../../img/cancel.png')} />
              </TouchableOpacity>


            </View>



            <View style={{width: '100%', flexDirection: 'row', paddingLeft: 5, paddingBottom: 10, paddingTop: 15, alignItems: 'center',  borderBottomWidth: 1, borderColor: '#dddddd'}}>

              <View style={{marginRight:10}}>
                <Text style={{fontSize: 16}}>联 系 方 式:</Text>
              </View>

              <View style={{}}>
                <TextInput
                  style={{
                    width: 230,
                    fontSize: 16,
                  }}
                  placeholder={'请输入手机号码'}
                  keyboardType={'phone-pad'}
                  autoCapitalize='none'
                    />
              </View>

              <TouchableOpacity style={{}}>
                <Image source={require('../../../img/cancel.png')} />
              </TouchableOpacity>

            </View>


            <View style={{width: '100%', flexDirection: 'row', paddingLeft: 5, paddingBottom: 10, paddingTop: 15, alignItems: 'center', borderBottomWidth: 1, borderColor: '#dddddd'}}>

              <View style={{marginRight:10}}>
                <Text style={{fontSize: 16}}>所 在 地 区:</Text>
              </View>

              <View style={{flexDirection: 'row'}}>

                <TouchableOpacity style={{marginRight: 10, borderColor: "black", borderWidth: 1}}>
                  <Text style={{fontSize: 16}}>省 份</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginRight: 10, borderColor: "black", borderWidth: 1}}>
                  <Text style={{fontSize: 16}}>城 市</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginRight: 10, borderColor: "black", borderWidth: 1}}>
                  <Text style={{fontSize: 16}}>地 区</Text>
                </TouchableOpacity>


              </View>

            </View>

            <View style={{width: '100%', flexDirection: 'row', paddingLeft: 5, paddingBottom: 10, paddingTop: 15, borderBottomWidth: 1, alignItems: 'center', borderColor: '#dddddd'}}>

              <View style={{marginRight:10}}>
                <Text style={{fontSize: 16}}>详 细 地 址:</Text>
              </View>

              <View style={{}}>
                <TextInput
                  numberOfLines = {3}
                  multiline = {true}
                  autoCapitalize='none'
                  placeholder={'请输入详细地址'}
                  style={{
                    height: 60,
                    width: 230,
                    fontSize: 16,
                  }} />
              </View>

              <TouchableOpacity style={{}}>
                <Image source={require('../../../img/cancel.png')} />
              </TouchableOpacity>

            </View>


            <TouchableOpacity
              style={{
                width: '70%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 20,
                paddingTop:10,
                paddingBottom: 10,
              }} >

              <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:20}}> 提 交 新 地 址 </Text>

            </TouchableOpacity>




          </View>



      </View>









    )
  }
}
