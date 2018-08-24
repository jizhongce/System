import {DropDownHolder, ShowPhoneNumber} from '../../util.js';
import {getuserinfo, changepasswordsendverifycode, changepassword} from '../../server.js';
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



export default class Change_Password_Home extends Component<{}> {


    static navigationOptions = {
      header: null,
  }

  constructor(props) {
    super(props);
    this.state = {

      User_Info: '',
      Change_Password_Phone_Number: '',
      Change_Password_Verify_Code: '',
      Change_Password_New_Password: '',


    };
  }


    Change_Password_Phone_Number_Handler(text){
      this.setState({
        Change_Password_Phone_Number: text
      });
    }

    Change_Password_New_Password_Handler(text){
      this.setState({
        Change_Password_New_Password: text
      });
    }

    Change_Password_Verify_Code_Handler(text){
      this.setState({
        Change_Password_Verify_Code: text
      });
    }



    Send_Verify_Code(){

      const Change_Password_Phone_Number = this.state.Change_Password_Phone_Number

      if (Change_Password_Phone_Number == '' || isNaN(Change_Password_Phone_Number)) {

        DropDownHolder.getDropDown().alertWithType('error', 'Error!', '请输入正确的手机号码！' )

      } else {

        changepasswordsendverifycode(Change_Password_Phone_Number, (response) =>{

          const chnage_password_send_verify_code_status_code = response["StatusCode"]

          if (chnage_password_send_verify_code_status_code == 200) {

            DropDownHolder.getDropDown().alertWithType('success', 'Success!', '验证码发送成功！' )

          } else {

            DropDownHolder.getDropDown().alertWithType('error', 'Error!', chnage_password_send_verify_code_status_code )

          }


        });


      }


    }


    Change_Password(){

      const Change_Password_Phone_Number = this.state.Change_Password_Phone_Number
      const Change_Password_New_Password = this.state.Change_Password_New_Password
      const Change_Password_Verify_Code = this.state.Change_Password_Verify_Code

      if (Change_Password_Phone_Number == '' || isNaN(Change_Password_Phone_Number)) {

        DropDownHolder.getDropDown().alertWithType('error', 'Error!', '请输入正确的手机号码！' )

      }

      else if (Change_Password_New_Password == '') {

        DropDownHolder.getDropDown().alertWithType('error', 'Error!', '请输入密码！' )

      }

      else if (Change_Password_Verify_Code == '') {

        DropDownHolder.getDropDown().alertWithType('error', 'Error!', '请输入验证码！' )

      }

      else {

        changepassword(Change_Password_Phone_Number, Change_Password_New_Password, Change_Password_Verify_Code, (response) => {

          const change_password_status_code = response["StatusCode"]

          if (change_password_status_code == 200) {


            this.props.navigation.navigate('User_Home');



          } else {


            DropDownHolder.getDropDown().alertWithType('error', 'Error!', change_password_status_code )


          }


        });



      }
    }





  Change_Password_Refresh(){

    AsyncStorage.getItem('User_ID', (err, result) =>{
      if (err) {
        console.log(err);
      }

      else {
        const User_ID = result

        if(User_ID == null) {

          this.setState({
            User_Info: '',
            Change_Password_Phone_Number: '',
            Change_Password_Verify_Code: '',
            Change_Password_New_Password: '',
          });

        }


        else {

          getuserinfo(User_ID, (response) => {
            const get_user_info_status_code = response["StatusCode"]
            const User_Info = response["ResponseText"]


            if (get_user_info_status_code == 200) {

              this.setState({
                User_Info: User_Info,
                Change_Password_Phone_Number: User_Info.Phone_Number,
                Change_Password_Verify_Code: '',
                Change_Password_New_Password: '',
              });

            }

            else {

              const errormsg = ErrorCodePrase(get_user_info_status_code)[1]

              const title = ErrorCodePrase(get_user_info_status_code)[0]

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


      }


    });



  }



  componentWillMount(){
    this.props.navigation.addListener('willFocus', ()=>{

      this.Change_Password_Refresh()

    });


  }



  render() {

    if (this.state.User_Info == '') {

      return(

        <View >

          <Status_Bar />

          <View style={{
              height: '8%',
              backgroundColor: 'white',
              flexDirection: 'row',
              borderBottomWidth: 1,
            }} >

            <View style={{
                height: '100%',
                width: '10%',
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: 5
              }} >

              <TouchableOpacity onPress = {()=> this.props.navigation.goBack()}>

                <Image style={{width: 24, height: 24}} source={require('../../../img/back_arrow.png')} />

              </TouchableOpacity>
            </View>

            <View style={{
                height: '100%',
                width: '80%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }} >
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 修 改 密 码 </Text>
            </View>



          </View>


          <View>

            <ScrollView scrollEnabled={false} style={{paddingTop:10, backgroundColor: 'white', height: '100%'}}>

              <View style={{alignItems: 'center', flexDirection: 'column'}}>


                <View style={{flexDirection: 'row', marginBottom: 10, marginTop:10}}>
                  <TextInput
                    style={{
                      marginTop: 15,
                      width: '65%',
                      height: 40,
                      borderBottomWidth: 1,
                      fontSize: 20,
                      marginBottom: 10,
                    }}
                    placeholder={'请输入手机号码'}
                    autoCapitalize='none'
                    keyboardType={'numeric'}
                    onChangeText = {(text) => this.Change_Password_Phone_Number_Handler(text)}
                    />


                  <TouchableOpacity style={{
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }} onPress={()=> this.Send_Verify_Code()}>

                    <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:20}}>发送验证码</Text>

                  </TouchableOpacity>

                </View>

                <TextInput
                  style={{
                    marginTop: 15,
                    width: '95%',
                    height: 40,
                    borderBottomWidth: 1,
                    fontSize: 20,
                    marginBottom: 10,
                  }}
                  autoCapitalize='none'
                  placeholder={'请输入验证码'}
                  keyboardType={'numeric'}
                  onChangeText = {(text) => this.Change_Password_Verify_Code_Handler(text)}
                  />

                <TextInput
                  style={{
                    marginTop: 25,
                    width: '95%',
                    height: 40,
                    borderBottomWidth: 1,
                    fontSize: 20,
                    marginBottom: 10,
                  }}
                  autoCapitalize='none'
                  secureTextEntry={true}
                  placeholder={'请输入新密码'}
                  onChangeText = {(text) => this.Change_Password_New_Password_Handler(text)}
                  />


                <TouchableOpacity style={{
                    width: '70%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginTop: 15,
                  }} onPress={() => this.Change_Password()}>

                  <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:25}}> 提 交 </Text>

                </TouchableOpacity>

              </View>




            </ScrollView>



          </View>



        </View>



      )

    }


    else {

      return(

        <View >

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

              <TouchableOpacity onPress = {()=> this.props.navigation.goBack()}>

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
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 修 改 密 码 </Text>
            </View>



          </View>


          <View>

            <ScrollView scrollEnabled={false} style={{paddingTop:10, backgroundColor: 'white', height: '100%', }}>

              <View style={{alignItems: 'center', flexDirection: 'column'}}>


                <View style={{flexDirection: 'row', marginBottom: 10, marginTop:10}}>
                  <TextInput
                    style={{
                      marginTop: 15,
                      width: '65%',
                      height: 40,
                      borderBottomWidth: 1,
                      fontSize: 20,
                      marginBottom: 10,
                    }}
                    autoCapitalize='none'
                    keyboardType={'numeric'}
                    value={ShowPhoneNumber(this.state.Change_Password_Phone_Number)}
                    editable={false}
                    />


                  <TouchableOpacity style={{
                      width: '30%',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }} onPress={()=> this.Send_Verify_Code()}>

                    <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:20}}>发送验证码</Text>

                  </TouchableOpacity>

                </View>

                <TextInput
                  style={{
                    marginTop: 15,
                    width: '95%',
                    height: 40,
                    borderBottomWidth: 1,
                    fontSize: 20,
                    marginBottom: 10,
                  }}
                  autoCapitalize='none'
                  placeholder={'请输入验证码'}
                  keyboardType={'numeric'}
                  onChangeText = {(text) => this.Change_Password_Verify_Code_Handler(text)}
                  />

                <TextInput
                  style={{
                    marginTop: 25,
                    width: '95%',
                    height: 40,
                    borderBottomWidth: 1,
                    fontSize: 20,
                    marginBottom: 10,
                  }}
                  autoCapitalize='none'
                  secureTextEntry={true}
                  placeholder={'请输入新密码'}
                  onChangeText = {(text) => this.Change_Password_New_Password_Handler(text)}
                  />


                <TouchableOpacity style={{
                    width: '70%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 5,
                    marginTop: 15,
                  }} onPress={() => this.Change_Password()}>

                  <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:25}}> 提 交 </Text>

                </TouchableOpacity>

              </View>




            </ScrollView>



          </View>



        </View>



      )



    }


  }
}
