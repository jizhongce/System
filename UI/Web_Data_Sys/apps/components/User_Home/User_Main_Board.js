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
import {UserMainBoardNameExistStyle, ErrorCodePrase} from '../../util.js';
import {getuserprofile} from '../../server.js';
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



export default class User_Main_Board extends Component<{}> {

  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {

      User_Profile: '',
      Name_Flag: false

    };
  }

  User_Main_Board_Refresh(){

    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.props.navigation.navigate('User_Home');

      }

      else {

        getuserprofile(User_ID, (response) => {
          const get_user_profile_status_code = response["StatusCode"]
          const User_Profile = response["ResponseText"]

          console.log(User_Profile);

          if (get_user_profile_status_code == 200) {

            if (User_Profile.Name == '') {

              this.setState({
                User_Profile : User_Profile,
                Name_Flag : false
              });

            } else {

              this.setState({
                User_Profile : User_Profile,
                Name_Flag : true
              });

            }




          } else {

            const errormsg = ErrorCodePrase(get_user_profile_status_code)[1]

            const title = ErrorCodePrase(get_user_profile_status_code)[0]

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

    });


  }



  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });

    this.User_Main_Board_Refresh()

    this.props.navigation.addListener('willFocus', ()=>{

      this.User_Main_Board_Refresh()

    });






  }



  render() {

    if (this.state.User_Profile == '') {

      return(
        <View>
          <Text>loding</Text>
        </View>
      )

    } else {


          return(

            <View >
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

                <TouchableOpacity activeOpacity={1} onPress={()=> this.props.navigation.navigate('User_Profile_Board') } style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, paddingLeft: 5, paddingTop: 20, paddingBottom: 20, paddingRight: 5}}>


                  <View style={{width: '30%', justifyContent: 'center'}}>
                    <Image
                      source={require('../../../img/user.png')}
                      style={{height:100, width:100, marginTop: 10, borderRadius: 10 }}/>
                  </View>

                  <View style={{width: '60%', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
                    <Text style={UserMainBoardNameExistStyle(this.state.Name_Flag) }>用户{this.state.User_Profile.User_ID.substring(0,8)}</Text>

                    <Text style={UserMainBoardNameExistStyle(!this.state.Name_Flag)}>{this.state.User_Profile.Name}</Text>

                    <Text style={{fontSize: 20, marginTop:10}}>Level: 1</Text>
                  </View>

                  <View style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name='navigate-next' />
                  </View>

                </TouchableOpacity>


                {/* order */}

                <View style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, paddingLeft: 5, paddingTop: 20, paddingBottom: 20}}>

                  <TouchableOpacity activeOpacity={1} style={{width: '20%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{fontSize: 20}}> 代 付 </Text>
                    <Text style={{fontSize: 20}}> 定 金 </Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={1} style={{width: '20%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{fontSize: 20}}> 代 </Text>
                    <Text style={{fontSize: 20}}> 收 货 </Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={1} style={{width: '20%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{fontSize: 20}}> 代 付 </Text>
                    <Text style={{fontSize: 20}}> 尾 款 </Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={1} style={{width: '20%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{fontSize: 20}}> 已 </Text>
                    <Text style={{fontSize: 20}}> 完 成 </Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={1} style={{width: '20%', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', borderLeftWidth: 1, borderLeftColor: '#c4c4c4',}}>
                    <Text style={{fontSize: 20}}> 全 部 </Text>
                    <Text style={{fontSize: 20}}> 订 单 </Text>
                  </TouchableOpacity>

                </View>


                {/* address */}


                <TouchableOpacity onPress={()=> this.props.navigation.navigate('User_Address_Board') } style={{width: '100%', flexDirection: 'row', borderBottomWidth: 1, paddingLeft: 5, paddingTop: 20, paddingBottom: 20}}>

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
                <TouchableOpacity
                  onPress={()=> this.props.navigation.navigate('Change_Password_Home')}
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    paddingLeft: 5, paddingTop: 20, paddingBottom: 20
                  }}>

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




            </View>









          )

    }

  }
}
