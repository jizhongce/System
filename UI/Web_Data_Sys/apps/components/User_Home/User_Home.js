/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


/*

const NavTitle = {
title: 'hardword',
};


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
import React, { Component } from 'react';
import {getuserprofile, getfavoriteproduct, getuserorder} from '../../server.js';
import {ErrorCodePrase} from '../../util.js';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  TabBarIOS,
  Button,
  Alert,
  AsyncStorage,
  RefreshControl
} from 'react-native';
import NavigationBar from 'react-native-navbar';

import Log_In_Home from './Log_In_Home.js'
import User_Main_Board from './User_Main_Board.js'


export default class User_Home extends Component<{}> {



  static navigationOptions = {
    header: null,
}


constructor(props) {
  super(props);
  this.state = {
    User_Flag : false

  };
}


Refresh_User_Info(){
  AsyncStorage.getItem('User_ID', (err, result) => {
    var User_ID = result
    console.log(User_ID);

    if (User_ID == null) {
      this.setState({
        User_Flag : false
      });
    }

    else {

      this.setState({
        User_Flag : true
      });

    }

  });
}


componentWillMount(){
  //AsyncStorage.clear()
  // AsyncStorage.setItem('UID123', 'hello', () => {
  //
  // });

  this.Refresh_User_Info()

  this.props.navigation.addListener('willFocus', ()=>{

    this.Refresh_User_Info()

  });


}


   render() {

    if (this.state.User_Flag == false) {

      return (

        <Log_In_Home navigation={this.props.navigation} />

      );

    }
    else {

      return (

        <User_Main_Board navigation={this.props.navigation} />


      );

    }


  }
}
