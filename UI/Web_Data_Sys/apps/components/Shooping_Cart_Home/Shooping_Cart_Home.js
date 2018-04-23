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
  AsyncStorage
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class Shooping_Cart_Home extends Component<{}> {



  constructor(props) {
    super(props);
    this.state = {
      User_Flag : true,
      Shopping_Cart : ''
    };
  }

  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });
    this.props.navigation.addListener('willFocus', ()=>{

      AsyncStorage.getItem('User_ID', (err, result) => {
        if (result == null) {
          this.setState({
            User_Flag : false,
          });
        }
        else {
          this.setState({
            User_Flag : true,
            Shopping_Cart : result
          });
        }

      });
    });


  }

  render() {

    if (this.state.User_Flag == false) {
      return (
        <View style={{flex: 1}} >



          {/*start  */}

          <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

            <Text style={{ fontSize: 25, textAlign: 'center'} }>Please log in first to see the shopping cart</Text>

          </View>




          {/*end  */}



        </View>


      );
    }




    else {


          return (
            <View style={{flex: 1}} >



              {/*start  */}

              <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

                <Text style={{ fontSize: 25, textAlign: 'center'} }>{this.state.Shopping_Cart}</Text>

              </View>




              {/*end  */}



            </View>


          );
    }



  }
}
