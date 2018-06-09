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
import {changephone} from '../../../server.js';
import React, { Component } from 'react';
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

export default class Phone_Change_New_Phone_Board extends Component<{}> {

  static navigationOptions = {
    title: '新手机',
  };

  constructor(props) {
    super(props);
    this.state = {text: '',
                  phonenum: '123',
                  InputStyle: {
                    marginTop: 20,
                    height: '50%',
                    width: '50%',
                    borderWidth: 2,
                    borderRadius: 10,
                  }

                  };
  }


  phonenumHandler(text){
    this.setState({
      phonenum: text
    });
  }

  phone_change(e, id){
    changephone(id, this.state.phonenum,(response) =>{
      const phone_change_status_code = response["StatusCode"]
      const statusText = response["ResponseText"]

      if (phone_change_status_code == 200) {
        this.props.navigation.navigate('Phone_Change_New_Phone_Verify_Board',{
          PhoneNum : statusText,
        });
      }
      else {
        var errormsg = ErrorCodePrase(phone_change_status_code)[1]

        var title = ErrorCodePrase(phone_change_status_code)[0]

        console.log(ErrorCodePrase(phone_change_status_code))

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
    const { params } = this.props.navigation.state;
    const Id = params ? params.Id : null;

      return (
        <View style={{flex: 1}} >

          <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'yellow'}}>
            <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333', }}>
              新手机：
            </Text>
            <TextInput style={{
              marginTop: 20,
              height: '50%',
              width: '50%',
              borderWidth: 2,
              borderRadius: 10,

            }}  onChangeText = {(text) => this.phonenumHandler(text)} autoCapitalize='none' />
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

            <TouchableOpacity onPress={(e)=> { this.phone_change(e, Id)} }>
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


            <Text style={{ fontSize: 25, textAlign: 'center'} }>{Id}</Text>


            </View>

          </View>
          {/*end  */}


        </View>


      );

  }
}
