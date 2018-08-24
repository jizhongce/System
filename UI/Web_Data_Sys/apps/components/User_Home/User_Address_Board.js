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
import {ShowPhoneNumber, DropDownHolder} from '../../util.js';
import {getaddressbook, deleteaddress} from '../../server.js';
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



export default class User_Address_Board extends Component<{}> {

  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {

      Address_Book: '',
      Address_Book_Flag: false,


    };
  }


  // Delete function start here
  Delete_Address(Address){
    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        Alert.alert(
            'Oops',
            'There is something wrong with the log in!',
          [
            {text: 'OK', onPress: ()=>{
              this.props.navigation.navigate('User_Home');
            }},
          ],
        )

      }

      else {
        const Address_ID = Address.Address_ID

        deleteaddress(User_ID, Address_ID, (response) =>{
          const delete_address_status_code = response["StatusCode"]
          const statusText = response["ResponseText"]


          if (delete_address_status_code == 200) {

            this.Refresh_User_Address_Board();

            DropDownHolder.getDropDown().alertWithType('success', '成功!', '地址已成功删除！' )


          }

          else if (delete_address_status_code == 624) {

            Alert.alert(
                'Oops',
                'Error Code:' + delete_address_status_code + '\n' +'There is something wrong with the server! Try again later!',
              [
                {text: 'OK'},
              ],
            )

          }

          else {

            Alert.alert(
                'Oops',
                'There is something wrong with the server! Try again later!',
              [
                {text: 'OK'},
              ],
            )

          }



        });

      }

    });

  }



  Delete_Address_On_Press(Address){

    const Delete_Address = Address.Address_Name + '\n' + Address.Address_Phone_Number + '\n' + Address.Province + '\n' + Address.City + '\n' + Address.District + '\n' + Address.Street

    Alert.alert(
      '注意!',
      '您正在删除地址： \n' + Delete_Address,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Confirm', onPress: ()=>{
          this.Delete_Address(Address)
        }},

      ],
    )
  }




  // Refresh function start here

  Refresh_User_Address_Board(){
    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        Alert.alert(
            'Oops',
            'There is something wrong with the log in!',
          [
            {text: 'OK', onPress: ()=>{
              this.props.navigation.navigate('User_Home');
            }},
          ],
        )

      }

      else {

        // Next we need call function to get all the address detail for the user
        getaddressbook(User_ID, (response) => {

          const get_address_book_code = response["StatusCode"]

          const Address_Book = response["ResponseText"]

          if (get_address_book_code == 200 || get_address_book_code == 622) {

            // next create array to store the products object
            var Address_Book_List = []

            for (var Address in Address_Book) {
              console.log(Address_Book[Address]);
              Address_Book_List.push(Address_Book[Address])
            }

            this.setState({

              Address_Book : Address_Book_List,
              Address_Book_Flag : true

            });

          }

          else {

            var errormsg = ErrorCodePrase(get_address_book_code)[1]

            var title = ErrorCodePrase(get_address_book_code)[0]

            console.log(ErrorCodePrase(get_address_book_code))


            Alert.alert(
                title,
                errormsg,
              [
                {text: 'OK', onPress: ()=>{
                  AsyncStorage.removeItem('User_ID', (error) => {
                    if (error) {
                      console.log(error);
                    }

                    this.props.navigation.navigate('User_Home');

                  });

                }},
              ],
            )

            // End of else statement in getfavoriteproduct
          }

          // Get favorite product list End
        });


      }

    });
  }



  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });



    this.Refresh_User_Address_Board()

    this.props.navigation.addListener('willFocus', ()=>{

      this.Refresh_User_Address_Board()

    });


  }


  render() {

    if (this.state.Address_Book_Flag == false) {

      return(
        <View>
          <Text>Loading</Text>
        </View>
      )

    }

    else if (this.state.Address_Book.length == 0) {

      return(

        <View>
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
                <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 地 址 管 理 </Text>
              </View>



            </View>


            <ScrollView style={{backgroundColor: 'white', height: '90%'}}>

              <View style={{alignItems: 'center', justifyContent: 'center'}}>


                <TouchableOpacity onPress={() => this.props.navigation.navigate('User_Add_New_Address_Board')} style={{width: '90%', marginTop: 10, marginBottom: 10, borderRadius: 10, borderWidth:1, borderColor: '#9e9e9e', alignItems: 'center', justifyContent: 'center'}}>

                  <Text style={{fontSize: 20, marginTop: 5, marginBottom:5}}>添 加 新 地 址</Text>

                </TouchableOpacity>

              </View>




            </ScrollView>



        </View>


      )

    }

    else {

      return(

        <View>
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
                <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 地 址 管 理 </Text>
              </View>



            </View>


            <ScrollView style={{backgroundColor: 'white', height: '89%'}}>

              <View style={{alignItems: 'center', justifyContent: 'center'}}>

                {
                  this.state.Address_Book.map((Address, i) => {
                    return(

                      <View key={i} style={{width: '100%', marginTop: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#9e9e9e', flexDirection: 'column', paddingLeft: 10}}>

                        <View style={{flexDirection: 'row', paddingTop: 10}}>
                          <Text style={{paddingRight: 10, fontSize: 18}}>{Address.Address_Name}</Text>
                          <Text style={{fontSize: 18}}>{ShowPhoneNumber(Address.Address_Phone_Number)}</Text>
                        </View>

                        <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 10, paddingTop: 10, borderBottomWidth: 1, borderColor: '#d6d3d3'}}>
                          <Text style={{paddingRight: 10, fontSize: 18}}>{Address.Province} {Address.City} {Address.District}</Text>
                          <Text style={{fontSize: 18}}>{Address.Street}</Text>
                        </View>

                        <View style={{flexDirection: 'row-reverse', paddingBottom: 10, paddingTop: 10}}>

                          <TouchableOpacity onPress={()=> this.Delete_Address_On_Press(Address)} style={{marginLeft: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>

                            <Image style={{width: 21, height: 21, marginLeft: 5, marginRight: 5}} source={require('../../../img/clear.png')} />
                            <Text style={{fontSize: 18, marginLeft: 5, marginRight: 5 }} >删 除</Text>

                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => this.props.navigation.navigate('User_Edit_Address_Board', { Address : Address})} style={{marginLeft: 10, marginRight: 10, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>

                            <Image style={{width: 21, height: 21, marginLeft: 5, marginRight: 5}} source={require('../../../img/edit.png')} />
                            <Text style={{fontSize: 18, marginLeft: 5, marginRight: 5}} >编 辑</Text>

                          </TouchableOpacity>


                        </View>

                      </View>

                    );
                  })
                }


                <TouchableOpacity onPress={() => this.props.navigation.navigate('User_Add_New_Address_Board')} style={{width: '90%', marginTop: 10, marginBottom: 10, borderRadius: 10, borderWidth:1, borderColor: '#9e9e9e', alignItems: 'center', justifyContent: 'center'}}>

                  <Text style={{fontSize: 20, marginTop: 5, marginBottom:5}}>添 加 新 地 址</Text>

                </TouchableOpacity>

              </View>




            </ScrollView>



        </View>


      )

    }


  }
}
