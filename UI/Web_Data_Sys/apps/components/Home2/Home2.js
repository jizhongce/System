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

      <KeyboardAvoidingView  behavior={'position'} >
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
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 用 户 资 料 </Text>
            </View>



          </View>



        {/* User info */}

        <ScrollView style={{height: '100%', width: '100%', backgroundColor: 'white', flexDirection: 'column'}}>

          <View style={{borderBottomWidth: 1, paddingLeft: 10, paddingTop: 10, paddingBottom:10, flexDirection: 'row'}}>

            <View style={{width: '80%' }}>
              <Image
                source={require('../../../img/user.png')}
                style={{height:60, width:60, marginTop: 10, borderRadius: 10 }}/>
            </View>

            <View style={{width: '20%', alignItems: 'center', justifyContent: 'center',}}>

              <Image style={{width: 35, height: 35}} source={require('../../../img/forward_arrow.png')} />

            </View>

          </View>

          <View style={{borderBottomWidth: 1, alignItems: 'center', paddingLeft: 10,  paddingTop: 10, paddingBottom:10, flexDirection: 'row'}}>

            <View style={{width: '100%' }}>
              <Text style={{fontSize: 25}}>ID: 8fce5ce0</Text>
            </View>

          </View>

          <View style={{borderBottomWidth: 1, alignItems: 'center', paddingLeft: 10,  paddingTop: 10, paddingBottom:10, flexDirection: 'row'}}>
            <View style={{width: '80%' }}>
              <Text style={{fontSize: 25}}>Name: Zhongce Ji</Text>
            </View>

            <View style={{width: '20%', alignItems: 'center', justifyContent: 'center',}}>

              <Image style={{width: 35, height: 35}} source={require('../../../img/forward_arrow.png')} />

            </View>

          </View>

          <View style={{borderBottomWidth: 1, alignItems: 'center', paddingLeft: 10,  paddingTop: 10, paddingBottom:10, flexDirection: 'row'}}>

            <View style={{width: '100%' }}>
              <Text style={{fontSize: 25}}>Level: 1</Text>
            </View>

          </View>

          <View style={{borderWidth: 1, marginTop:100, paddingTop: 10, paddingBottom: 10, alignItems: 'center', justifyContent: 'center',}}>
            <Text style={{fontSize: 25}}>Log out</Text>
          </View>



        </ScrollView>




      </KeyboardAvoidingView>









    )
  }
}
