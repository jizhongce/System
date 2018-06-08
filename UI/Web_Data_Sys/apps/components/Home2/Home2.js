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
  RefreshControl
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class Home2 extends Component<{}> {


  constructor(props) {
    super(props);
    this.state = {
      Indicate_Flag : false,
      refreshing : false
    };
  }

  cancelicon(){
    this.setState({
      refreshing : false
    });
  }

  RefreshInfo1(){
    this.setState({
      Indicate_Flag: true,
      refreshing : true
    },
    () => {this.cancelicon()}
  );
  }

  RefreshInfo2(){
    this.setState({
      Indicate_Flag: false,
      refreshing : true
    },
    () => {this.cancelicon()}
  );
  }

  componentWillMount(){
    this.props.navigation.addListener('willFocus', ()=>{
      this.setState({
        Indicate_Flag: false,
        refreshing : false
      });
    });

  }


  render() {
    if (this.state.Indicate_Flag == false) {
      return (
        <ScrollView
          refreshControl={
          <RefreshControl
            refreshing = {this.state.refreshing}
            onRefresh={this.RefreshInfo1.bind(this)}
          />
        }
          style={{flex: 1}} >

            <Text style={{ fontSize: 25, textAlign: 'center'} }>This is when user flag is false</Text>

        </ScrollView>


      );

    }
    else {

          return (
            <ScrollView
              refreshControl={
              <RefreshControl
                refreshing = {this.state.refreshing}
                onRefresh={this.RefreshInfo2.bind(this)}
              />
            }
              style={{flex: 1}} >

                <Text style={{ fontSize: 25, textAlign: 'center'} }>This is when user flag is true</Text>

            </ScrollView>



          );

    }
  }
}
