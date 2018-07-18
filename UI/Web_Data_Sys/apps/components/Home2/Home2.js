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
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 我 的 收 藏 </Text>
            </View>



          </View>


          <ScrollView style={{backgroundColor: 'white', height: '89%'}}>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>

              {/* Product */}
              <View style={{width:'100%' , height: 170, borderColor: '#dedede', borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop:10, marginBottom: 10, paddingTop:10, paddingBottom: 10, paddingLeft: 10,}}>

                <View style={{width: '40%'}}>
                  <Image
                    source={Product_Image["Product_1"]}
                    style={{height:'100%', width: '100%'}}/>
                </View>



                <View style={{width: '60%', flexDirection:'column', marginLeft: 10, marginTop:10, flexWrap:'wrap'}}>

                  <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5, marginBottom: 10}}>
                    <Text style={{fontSize: 20}}>GB846-82</Text>
                  </View>

                  <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5, marginBottom: 5}}>
                    <Text style={{fontSize: 15}}>商品编号: P5547384 </Text>
                  </View>

                  <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5, marginBottom: 5}}>
                    <Text style={{fontSize: 15, marginRight: 10}}>规格 : 32 X 12</Text>
                  </View>

                  <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5, marginBottom: 5}}>
                    <Text style={{fontSize: 15}}>表色 : Yellow</Text>
                  </View>

                  <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5, marginBottom: 5}}>
                    <Text style={{fontSize: 15}}>价格 : 1232/千件</Text>
                  </View>



                  </View>

                </View>




              </View>




          </ScrollView>



      </View>









    )
  }
}
