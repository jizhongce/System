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
      height: 100

    };
  }

  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });
    this.props.navigation.addListener('willFocus', ()=>{

      var {height, width} = Dimensions.get('window');

      this.setState({
        height: height
      });

    });



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
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 产 品 收 藏 </Text>
            </View>



          </View>


          <ScrollView style={{backgroundColor: 'white', height: '89%'}}>

            <View style={{ justifyContent: 'center', flexDirection: 'column'}}>

              <View style={{borderWidth: 1, height: 100}}>
                <Text>hello</Text>
              </View>

              <View style={{borderWidth: 1, height: 100}}>
                <Text>hello</Text>
              </View>

              <View style={{borderWidth: 1, height: 100}}>
                <Text>hello</Text>
              </View>

              <View style={{borderWidth: 1, height: 100}}>
                <Text>hello</Text>
              </View>

              <View style={{borderWidth: 1, height: 100}}>
                <Text>hello</Text>
              </View>

              <View style={{borderWidth: 1, height: 100}}>
                <Text>hello</Text>
              </View>

              <View style={{borderWidth: 1, height: 100}}>
                <Text>hello</Text>
              </View>

              <View style={{borderWidth: 1, height: 100}}>
                <Text>hello</Text>
              </View>

            </View>




          </ScrollView>



      </View>









    )
  }
}
