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
import {sendverifycode, getuserprofile, getshoppingcart, getfavoriteproduct} from '../../server.js';
import React, { Component } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
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
  Alert,
  AsyncStorage
} from 'react-native';
import NavigationBar from 'react-native-navbar';

const NavTitle = {
  title:'登录',
  style: {fontSize: 25}
}

const NavLeftButton = {
  icon: require('../../../img/platform3.png')
}

export default class Log_In_Phone_Verify_Board extends Component<{}> {

  static navigationOptions = {
    title: '登录手机验证',
  };

  constructor(props) {
    super(props);
    this.state = {code: '123'};
  }

  send_verify_code(e, phonenum){
    sendverifycode(phonenum, this.state.code, (response) =>{
      const verify_status_code = response["StatusCode"]
      const User_ID = response["ResponseText"]

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
        getshoppingcart(User_ID, (response) => {


          const get_shopping_cart_code = response["StatusCode"]

          const Products = response["ResponseText"]

          if (get_shopping_cart_code == 200) {

            // next create array to store the products object
            var Shopping_Cart = []
            for (var product in Products) {
              console.log(Products[product]);
              Shopping_Cart.push(Products[product])
            }

            // Next we need to use getuserprofile function to get the profile of the user

            getuserprofile(User_ID, (response) => {

              const get_profile_code = response["StatusCode"]

              const Profile = response["ResponseText"]


              if (get_profile_code == 200) {


                // Next we need to getfavoriteproduct function to get the favorite product of the user

                getfavoriteproduct(User_ID, (response) => {

                  const get_favorite_product_code = response["StatusCode"]

                  const Favorite_Products = response["ResponseText"]

                  if (get_favorite_product_code == 200 || get_favorite_product_code == 617) {

                    // next create array to store the products object
                    var Favorite_Product_list = []
                    for (var product in Favorite_Products) {
                      console.log(Favorite_Products[product]);
                      Favorite_Product_list.push(Favorite_Products[product])
                    }



                    console.log(Profile);
                    AsyncStorage.multiSet([['User_ID', User_ID],['Shopping_Cart', JSON.stringify(Shopping_Cart) ], ['User_Profile', JSON.stringify(Profile) ], ['Favorite_Products', JSON.stringify(Favorite_Product_list) ], ], () => {

                      this.props.navigation.navigate('User_Home');

                      // AsyncStorage End
                    });

                  }

                  else {

                    var errormsg = ErrorCodePrase(get_favorite_product_code)[1]

                    var title = ErrorCodePrase(get_favorite_product_code)[0]

                    console.log(ErrorCodePrase(get_favorite_product_code))

                    Alert.alert(
                        title,
                        errormsg,
                      [
                        {text: 'OK', style: 'cancel'},
                      ],
                    )

                    this.props.navigation.navigate('User_Home');


                  }

                  // Get favorite product list End
                });



              } else {

                var errormsg = ErrorCodePrase(get_profile_code)[1]

                var title = ErrorCodePrase(get_profile_code)[0]

                console.log(ErrorCodePrase(get_profile_code))

                Alert.alert(
                    title,
                    errormsg,
                  [
                    {text: 'OK', style: 'cancel'},
                  ],
                )

                this.props.navigation.navigate('User_Home');



              }


              // Get User Profile End
            });




          } else {


            var errormsg = ErrorCodePrase(get_shopping_cart_code)[1]

            var title = ErrorCodePrase(get_shopping_cart_code)[0]

            console.log(ErrorCodePrase(get_shopping_cart_code))

            Alert.alert(
                title,
                errormsg,
              [
                {text: 'OK', style: 'cancel'},
              ],
            )

            this.props.navigation.navigate('User_Home');



          }



        // Get Shopping Cart End
        });



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
    console.log(PhoneNum)

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

            }}  onChangeText = {(text) => this.codeHandler(text)} autoCapitalize='none' />
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
