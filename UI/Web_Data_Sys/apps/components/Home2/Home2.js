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


class Sign_Up_Home_Header extends React.Component {
  render() {
    return (
      <View>

        <Status_Bar />

        <View style={{
            height: 50,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
          }} >


          <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 用 户 中 心 </Text>


        </View>

      </View>

    );
  }
}



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
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
          }} >


          <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 用 户 中 心 </Text>


        </View>


        {/* User info */}

        <ScrollView style={{height: '100%', width: '100%', backgroundColor: 'white', flexDirection: 'column'}}>

          <TouchableOpacity style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, paddingLeft: 5, paddingTop: 20, paddingBottom: 20, paddingRight: 5}}>


            <View style={{width: '30%', justifyContent: 'center'}}>
              <Image
                source={require('../../../img/user.png')}
                style={{height:100, width:100, marginTop: 10, borderRadius: 50 }}/>
            </View>

            <View style={{width: '60%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
              <Text style={{fontSize: 25}}>Zhongce Ji</Text>
            </View>

            <View style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
              <Icon name='navigate-next' />
            </View>

          </TouchableOpacity>


          {/* order */}

          <View style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, paddingLeft: 5, paddingTop: 20, paddingBottom: 20}}>

            <TouchableOpacity style={{width: '20%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',}}>
              <Text style={{fontSize: 20}}> 代 付 </Text>
              <Text style={{fontSize: 20}}> 定 金 </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width: '20%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',}}>
              <Text style={{fontSize: 20}}> 代 </Text>
              <Text style={{fontSize: 20}}> 收 货 </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width: '20%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',}}>
              <Text style={{fontSize: 20}}> 代 付 </Text>
              <Text style={{fontSize: 20}}> 尾 款 </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width: '20%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',}}>
              <Text style={{fontSize: 20}}> 已 </Text>
              <Text style={{fontSize: 20}}> 完 成 </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width: '20%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderLeftColor: '#c4c4c4',}}>
              <Text style={{fontSize: 20}}> 全 部 </Text>
              <Text style={{fontSize: 20}}> 订 单 </Text>
            </TouchableOpacity>

          </View>


          {/* address */}

          <TouchableOpacity style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, paddingLeft: 5, paddingTop: 20, paddingBottom: 20}}>

            <View style={{width: '90%', justifyContent: 'center'}}>

              <Text style={{fontSize: 20}}> 地 址 管 理 </Text>

            </View>

            <View style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
              <Icon name='navigate-next' />
            </View>

          </TouchableOpacity>



          {/* favorite product */}
          <TouchableOpacity style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, paddingLeft: 5, paddingTop: 20, paddingBottom: 20}}>

            <View style={{width: '90%', justifyContent: 'center'}}>

              <Text style={{fontSize: 20}}> 产 品 收 藏 </Text>

            </View>

            <View style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
              <Icon name='navigate-next' />
            </View>

          </TouchableOpacity>


          {/* password change */}
          <TouchableOpacity style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, paddingLeft: 5, paddingTop: 20, paddingBottom: 20}}>

            <View style={{width: '90%', justifyContent: 'center'}}>

              <Text style={{fontSize: 20}}> 密 码 修 改 </Text>

            </View>

            <View style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
              <Icon name='navigate-next' />
            </View>

          </TouchableOpacity>


          {/* rule */}
          <TouchableOpacity style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, paddingLeft: 5, paddingTop: 20, paddingBottom: 20}}>

            <View style={{width: '90%', justifyContent: 'center'}}>

              <Text style={{fontSize: 20}}> 使 用 条 款 </Text>

            </View>

            <View style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
              <Icon name='navigate-next' />
            </View>

          </TouchableOpacity>




        </ScrollView>




      </KeyboardAvoidingView>









    )
  }
}
