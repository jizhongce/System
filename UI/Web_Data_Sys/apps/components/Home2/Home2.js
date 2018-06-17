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
import {Product_Image} from '../../util.js';
import { Icon } from 'react-native-elements'
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
  Modal,
  TouchableHighlight,
  Picker,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';
import NavigationBar from 'react-native-navbar';


import Status_Bar from '../../Status_Bar.js';

class Shopping_Cart_Header extends React.Component {
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



          <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}>购    物    车</Text>



        </View>

      </View>

    );
  }
}


export default class Home2 extends Component<{}> {

  static navigationOptions = {
    header: <Shopping_Cart_Header />,
}

  constructor(props) {
    super(props);
    this.state = {
      isVisible : true
    };
  }

  closeModal(){
    this.setState({
      isVisible : false
    });
  }


  render() {

    return(

      <KeyboardAvoidingView keyboardVerticalOffset={60} behavior={'position'} >


        <ScrollView style={{backgroundColor: 'white'}}>


          {/*end  */}



        </ScrollView>






      </KeyboardAvoidingView>









    )
  }
}
