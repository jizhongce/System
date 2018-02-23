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
import {phonechangelogin} from '../../server.js';
import React, { Component } from 'react';
import {ErrorCodePrase} from '../../util.js'
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
  Alert
} from 'react-native';
import NavigationBar from 'react-native-navbar';

const NavTitle = {
  title:'登录',
  style: {fontSize: 25}
}

const NavLeftButton = {
  icon: require('../../../img/platform3.png')
}

export default class Phone_Change_Board extends Component<{}> {

  static navigationOptions = {
    title: '手机修改',
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

  phone_change_log_in(){
    phonechangelogin(this.state.username,this.state.password,(response) =>{
      const code = response[0]
      const statusText = response[1]
      if (code == 200) {
        this.props.navigation.navigate('Phone_Change_Phone_Verify_Board',{
          PhoneNum : statusText,
        });
      }
      else if (code == 603) {
        this.props.navigation.navigate('Phone_Change_New_Phone_Board',{
          Id : statusText,
        });

      }
      else {
        var errormsg = ErrorCodePrase(code)[1]

        var title = ErrorCodePrase(code)[0]

        console.log(ErrorCodePrase(code))

        Alert.alert(
            title,
            errormsg,
          [
            {text: 'OK', style: 'cancel'},
          ],
        )
      }
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

          <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'green'}}>
            <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
              密码：
            </Text>
            <TextInput style={ this.state.InputStyle }  onChangeText = {(text) => this.passwordHandler(text)} autoCapitalize='none'  secureTextEntry={true} />
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

            <TouchableOpacity onPress={(e)=> { this.phone_change_log_in(e)} }>
              <Text style={{ fontSize: 25, textAlign: 'center'} }>提     交</Text>
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
