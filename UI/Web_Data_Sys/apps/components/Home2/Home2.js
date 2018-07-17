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
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 选 择 地 址 </Text>
            </View>



          </View>


          <ScrollView style={{backgroundColor: 'white', height: '89%'}}>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>


              {/* Address  */}
              <View style={{width:'100%' , borderColor: '#dedede', borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop:10, marginBottom: 10, paddingTop:10, paddingBottom: 10}}>

                <View style={{width: '80%' ,flexDirection: 'column'}}>

                  <TouchableOpacity style={{justifyContent: 'center', flexDirection: 'column', }}>

                    <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, flexWrap:'wrap'}}>
                      <Text style={{fontSize: 18, }} >Xxxxxx, </Text>
                      <Text style={{fontSize: 18}}>13857788887</Text>
                    </View>

                    <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, flexWrap:'wrap'}}>

                      <Text style={{fontSize: 16}} >zhejiangsheng wenzhoushi luchengqu, luchengguanghasdf</Text>

                    </View>
                  </TouchableOpacity>

                </View>


                <View style={{width: '20%' ,flexDirection: 'column'}}>

                  <TouchableOpacity style={{flexDirection: 'row', marginBottom: 5}}>
                    <Image style={{width: 18, height: 18}} source={require('../../../img/clear.png')} />
                    <Text style={{fontSize: 15, }} >删 除</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{flexDirection: 'row', marginTop: 5}}>
                    <Image style={{width: 18, height: 18}} source={require('../../../img/edit.png')} />
                    <Text style={{fontSize: 15, }} >编 辑</Text>
                  </TouchableOpacity>

                </View>


              </View>



              <TouchableOpacity activeOpacity={0.5}
                style={{
                  marginTop: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                  width: '70%',
                  backgroundColor: 'white',
                  borderRadius: 10, borderColor: "black", borderWidth: 1 ,
                  justifyContent: "center", alignItems: "center",
                  shadowOffset:{  width: 0,  height: 5,  }, shadowColor: 'black', shadowOpacity: 0.5,
                }}>
                <Text style={{fontSize: 20}}> 添 加 新 地 址 </Text>
              </TouchableOpacity>


            </View>




          </ScrollView>



      </View>









    )
  }
}
