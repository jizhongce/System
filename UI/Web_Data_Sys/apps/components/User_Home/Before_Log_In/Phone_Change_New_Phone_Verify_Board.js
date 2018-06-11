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
import {sendverifycode} from '../../../server.js';
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
  Alert
} from 'react-native';
import NavigationBar from 'react-native-navbar';

const NavTitle = {
  title:'登录',
  style: {fontSize: 25}
}

const NavLeftButton = {
  icon: require('../../../../img/platform3.png')
}

export default class Phone_Change_New_Phone_Verify_Board extends Component<{}> {

  static navigationOptions = {
    title: '新手机验证',
  };

  constructor(props) {
    super(props);
    this.state = {code: '123'};
  }

  send_verify_code(e, phonenum){
    sendverifycode(phonenum, this.state.code, (response) =>{
      const verify_status_code = response["StatusCode"]
      const statusText = response["ResponseText"]
      console.log(response)
      if (verify_status_code != 200) {

        var errormsg = ErrorCodePrase(verify_status_code)[1]

        var title = ErrorCodePrase(verify_status_code)[0]

        console.log(ErrorCodePrase(verify_status_code))

        Alert.alert(
            title,
            errormsg,
          [
            {text: 'OK', style: 'cancel'},
          ],
        )
      }

      else {
        console.log(statusText)
        Alert.alert(
            'success',
            'change success',
          [
            {text: 'OK', style: 'cancel'},
          ],
        )
        this.props.navigation.navigate('User_Home');
      }
    });
  }

  codeHandler(text){
    this.setState({
      code: text
    });
  }


  render() {
    const { params } = this.props.navigation.state;
    const PhoneNum = params ? params.PhoneNum : null;

      return (
        <View style={{flex: 1}} >


          <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'lightblue'}}>
            <Text style={{width:120, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333', }}>
              验证码：
            </Text>
            <TextInput style={{
              marginTop: 20,
              height: '50%',
              width: '50%',
              borderWidth: 2,
              borderRadius: 10,

            }} keyboardType={'phone-pad'} onChangeText = {(text) => this.codeHandler(text)} autoCapitalize='none' />
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

            <TouchableOpacity onPress={(e)=> { this.send_verify_code(e,PhoneNum)} }>
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


            <Text style={{ fontSize: 25, textAlign: 'center'} }>{PhoneNum}</Text>


            </View>

          </View>
          {/*end  */}


        </View>


      );

  }
}
