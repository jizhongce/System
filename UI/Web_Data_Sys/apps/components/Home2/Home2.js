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


class Confirmation_Page_Header extends React.Component {
  render() {
    return (
      <View>

        <Status_Bar />

        <View style={{
            height: 50,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }} >



          <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 收 银 台 </Text>



        </View>

      </View>

    );
  }
}



export default class Home2 extends Component<{}> {

  static navigationOptions = {
    header: <Confirmation_Page_Header />
}

  constructor(props) {
    super(props);
    this.state = {


    };
  }



  render() {

    return(

      <KeyboardAvoidingView keyboardVerticalOffset={60} behavior={'position'} >

        {/* Header */}

        <View style={{marginTop: '2%', paddingLeft: 10, height: '7%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>

          <Text style={{fontSize: 18}}> 需 支 付 : <Text style={{color: 'red'}}>9999</Text> </Text>

        </View>

        {/* Header */}


        {/* Payment Method */}

        <View style={{height: '80%'}}>


          {/* online payment method  */}

          <View style={{marginTop:10, backgroundColor: 'white'}}>

            <View style={{borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10}}>
              <Text style={{fontSize: 16}}> 线 上 支 付 </Text>
            </View>



            <View style={{marginLeft: 5, paddingTop: 10, paddingBottom: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: 'row',  alignItems: 'center'}}>


              <View style={{width: '80%'}}>
                <Text style={{fontSize: 17}}> 支 付 宝 支 付 </Text>

              </View>

              <View style={{width: '20%'}}>
                <Icon name='radio-button-checked' />

              </View>


            </View>


            <View style={{marginLeft: 5, paddingTop: 10, paddingBottom: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: 'row',  alignItems: 'center'}}>


                <View style={{width: '80%'}}>
                  <Text style={{fontSize: 17}}> 微 信 支 付 </Text>

                </View>

                <View style={{width: '20%'}}>
                  <Icon name='radio-button-unchecked' />

                </View>


            </View>


            <View style={{marginLeft: 5, paddingTop: 10, paddingBottom: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: 'row',  alignItems: 'center'}}>


              <View style={{width: '80%'}}>
                <Text style={{fontSize: 17}}> 银 行 卡 快 捷 支 付 </Text>

              </View>

              <View style={{width: '20%'}}>
                <Icon name='radio-button-unchecked' />

              </View>


            </View>



          </View>



          {/* online payment method  */}



          {/* offline payment method  */}

          <View style={{marginTop:10, backgroundColor: 'white',}}>

            <View style={{borderBottomColor: 'black', borderBottomWidth: 1, paddingTop: 10, paddingBottom: 10}}>
              <Text style={{fontSize: 16}}> 线 下 支 付 </Text>
            </View>


            <View style={{marginLeft: 5, paddingTop: 10, paddingBottom: 10, borderBottomColor: 'black', borderBottomWidth: 1, flexDirection: 'row',  alignItems: 'center'}}>


              <View style={{width: '80%'}}>
                <Text style={{fontSize: 17}}> 银 行 转 账 </Text>

              </View>

              <View style={{width: '20%'}}>
                <Icon name='radio-button-unchecked' />

              </View>

            </View>


          </View>



          {/* offline payment method  */}




        </View>

        {/* Payment Method */}


        {/* Submit Payment */}

        <View style={{height: '12%', width: '100%', backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>

          <Text style={{fontSize: 17}}> 支 付 宝 支 付 : 9999 </Text>

        </View>

        {/* Submit Payment */}






      </KeyboardAvoidingView>









    )
  }
}
