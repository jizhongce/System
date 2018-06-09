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
import {login} from '../../../server.js';
import React, { Component } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import {ErrorCodePrase} from '../../../util.js'
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

const NavTitle = {
  title:'登录',
  style: {fontSize: 25}
}

const NavLeftButton = {
  icon: require('../../../../img/platform3.png')
}

export default class Log_In_Board extends Component<{}> {

  static navigationOptions = {
    title: '登 录',
  };

  constructor(props) {
    super(props);
    this.state = {text: '',
                  username: '123',
                  password: '123',

                  InputStyle: {
                    marginTop: 20,
                    height: '50%',
                    width: '50%',
                    borderWidth: 2,
                    borderRadius: 10,
                  }

                  };
  }


  log_in(e){
    login(this.state.username,this.state.password,(response) => {
      const log_in_status_code = response["StatusCode"]
      const User_ID = response["ResponseText"]

      if (log_in_status_code != 200 & log_in_status_code != 603) {

        var errormsg = ErrorCodePrase(log_in_status_code)[1]

        var title = ErrorCodePrase(log_in_status_code)[0]

        console.log(ErrorCodePrase(log_in_status_code))

        Alert.alert(
            title,
            errormsg,
          [
            {text: 'OK', style: 'cancel'},
          ],
        )
      }
      else if (log_in_status_code == 603) {
        console.log(User_ID)
        this.props.navigation.navigate('Log_In_Phone_Verify_Board',{
          PhoneNum : User_ID,
        });
      }

      else {

        // now we have User_ID, so we need to call the get shopping cart function
        // return the shopping cart for user
        // input with the User_ID

        AsyncStorage.setItem('User_ID', User_ID, () => {

          this.props.navigation.navigate('User_Home');

          // AsyncStorage End
        });

        // End of else in the log in function
      }

    });

  }


  usernameHandler(text){
    this.setState({
      username: text
    });
  }

  passwordHandler(text){
    this.setState({
      password: text
    });
  }



  render() {
      return (
        <View style={{flex: 1}} >

          <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'green'}}>
            <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
              用户名：
            </Text>
            <TextInput style={ this.state.InputStyle }  onChangeText = {(text) => this.usernameHandler(text)}  autoCapitalize='none' />
          </View>

          <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'yellow'}}>
            <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333', }}>
              密码：
            </Text>
            <TextInput style={{
              marginTop: 20,
              height: '50%',
              width: '50%',
              borderWidth: 2,
              borderRadius: 10,

            }}  onChangeText = {(text) => this.passwordHandler(text)} autoCapitalize='none'  secureTextEntry={true}/>
          </View>

          <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

            <View style={{

              marginTop: 25,
              height: '50%',
              width: '60%',
              left: '85%',
              borderWidth: 2,
              justifyContent: 'center',
              borderRadius: 10,

            }}>

            <TouchableOpacity onPress={(e)=> { this.log_in(e)} }>
              <Text style={{ fontSize: 25, textAlign: 'center'} }>登     录</Text>
            </TouchableOpacity>

            </View>

          </View>


          {/*start  */}
          <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'white'}}>

            <View style={{

              marginTop: 25,
              height: '50%',
              width: '60%',
              left: '85%',
              borderWidth: 2,
              justifyContent: 'center',
              borderRadius: 10,

            }}>


            <Text style={{ fontSize: 25, textAlign: 'center'} }>{this.state.text}</Text>


            </View>

          </View>
          {/*end  */}


        </View>


      );

  }
}
