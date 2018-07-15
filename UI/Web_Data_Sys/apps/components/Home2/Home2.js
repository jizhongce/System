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
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 地 址 管 理 </Text>
            </View>



          </View>


          <ScrollView style={{backgroundColor: 'white', height: '90%'}}>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>

              <View style={{width: '100%', marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#9e9e9e', flexDirection: 'column', paddingLeft: 10}}>

                <View style={{flexDirection: 'row', paddingTop: 10}}>
                  <Text style={{paddingRight: 10, fontSize: 18}}>wenzhoujunhaoshiye</Text>
                  <Text style={{fontSize: 18}}>15555555555</Text>
                </View>

                <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 10, paddingTop: 10, borderBottomWidth: 1, borderColor: '#d6d3d3'}}>
                  <Text style={{paddingRight: 10, fontSize: 18}}>wenzhoushiluchengqu</Text>
                  <Text style={{fontSize: 18}}>luchengguangchang 5 building room 5</Text>
                </View>

                <View style={{flexDirection: 'row-reverse', paddingBottom: 10, paddingTop: 10}}>

                  <TouchableOpacity style={{marginLeft: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>

                    <Image style={{width: 21, height: 21, marginLeft: 5, marginRight: 5}} source={require('../../../img/clear.png')} />
                    <Text style={{fontSize: 18, marginLeft: 5, marginRight: 5 }} >删 除</Text>

                  </TouchableOpacity>

                  <TouchableOpacity style={{marginLeft: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>

                    <Image style={{width: 21, height: 21, marginLeft: 5, marginRight: 5}} source={require('../../../img/edit.png')} />
                    <Text style={{fontSize: 18, marginLeft: 5, marginRight: 5}} >编 辑</Text>

                  </TouchableOpacity>


                </View>

              </View>


              <TouchableOpacity style={{width: '90%', marginTop: 10, marginBottom: 10, borderRadius: 10, borderWidth:1, borderColor: '#9e9e9e', alignItems: 'center', justifyContent: 'center'}}>

                <Text style={{fontSize: 20, marginTop: 5, marginBottom:5}}>添 加 新 地 址</Text>

              </TouchableOpacity>

            </View>




          </ScrollView>



      </View>









    )
  }
}
