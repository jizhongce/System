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
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import NavigationBar from 'react-native-navbar';


import Status_Bar from '../Status_Bar.js';



export default class Shopping_Cart_Choose_Address_Board extends Component<{}> {

  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {

      Shopping_Cart_Shipping_Address_List : [],

    };
  }

  Refresh_Shopping_Cart_Choose_Address(){
    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.props.navigation.navigate('User_Home');

      }

      else {

        getaddressbook(User_ID, (response) => {

          const get_address_book_code = response["StatusCode"]

          const Address_Book = response["ResponseText"]

          if (get_address_book_code == 200 || get_address_book_code == 622) {

            var Address_Book_List = []

            for (var Address in Address_Book) {

              Address_Book_List.push(Address_Book[Address])

            }

            this.setState({

              Shopping_Cart_Shipping_Address_List : Address_Book_List,


            }, ()=>{
              // console.log(this.state.Shopping_Cart_Shipping_Address_List);
            });


          } else {

            var errormsg = ErrorCodePrase(get_address_book_code)[1]

            var title = ErrorCodePrase(get_address_book_code)[0]

            // console.log(ErrorCodePrase(get_address_book_code))


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

          }

        });

      }

    });

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

            this.Refresh_Shopping_Cart_Choose_Address();

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



  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });
    this.props.navigation.addListener('willFocus', ()=>{

      this.Refresh_Shopping_Cart_Choose_Address()
    });


  }




  render() {

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
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 选 择 地 址 </Text>
            </View>



          </View>


          <ScrollView style={{backgroundColor: 'white', height: '89%'}}>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>


              {
                this.state.Shopping_Cart_Shipping_Address_List.map((Address, i) =>{
                  return(

                    <View key={i} style={{width:'100%', borderColor: '#dedede', borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop:10, marginBottom: 10, paddingTop:10, paddingBottom: 10}}>

                      <View style={{width: '80%' ,flexDirection: 'column'}}>

                        <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Shopping_Cart_Home', {Shipping_Address_Info: Address})} style={{justifyContent: 'center', flexDirection: 'column', }}>

                          <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, flexWrap:'wrap'}}>
                            <Text style={{fontSize: 18, }} >{Address.Address_Name} </Text>
                            <Text style={{fontSize: 18}}> {ShowPhoneNumber(Address.Address_Phone_Number)} </Text>
                          </View>

                          <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, flexWrap:'wrap'}}>

                            <Text style={{fontSize: 16}} >{Address.Province} {Address.City} {Address.District}, {Address.Street}</Text>

                          </View>
                        </TouchableOpacity>

                      </View>


                      <View style={{width: '20%' ,flexDirection: 'column'}}>

                        <TouchableOpacity activeOpacity={1} onPress={()=> this.Delete_Address_On_Press(Address)} style={{flexDirection: 'row', marginBottom: 5}}>
                          <Image style={{width: 18, height: 18}} source={require('../../../img/clear.png')} />
                          <Text style={{fontSize: 15, }} >删 除</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('User_Edit_Address_Board', { Address : Address})} style={{flexDirection: 'row', marginTop: 5}}>
                          <Image style={{width: 18, height: 18}} source={require('../../../img/edit.png')} />
                          <Text style={{fontSize: 15, }} >编 辑</Text>
                        </TouchableOpacity>

                      </View>


                    </View>


                  );
                })
              }



              <TouchableOpacity onPress={() => this.props.navigation.navigate('User_Add_New_Address_Board')} activeOpacity={0.5}
                style={{
                  marginTop: 10,
                  paddingTop: 5,
                  paddingBottom: 5,
                  width: '70%',
                  backgroundColor: 'white',
                  borderRadius: 10, borderColor: "black", borderWidth: 1 ,
                  justifyContent: "center", alignItems: "center",
                  shadowOffset:{  width: 0,  height: 5,  }, shadowColor: 'black', shadowOpacity: 0.5,
                }}>
                <Text style={{fontSize: 20}}> 添 加 新 地 址 </Text>
              </TouchableOpacity>


            </View>




          </ScrollView>



      </View>




    )
  }
}
