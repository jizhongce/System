/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


/*

const NavTitle = {
title: 'hardword',
};


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
import {getuserprofile, getfavoriteproduct, getuserorder} from '../../server.js';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  TabBarIOS,
  Button,
  Alert,
  AsyncStorage,
  RefreshControl
} from 'react-native';
import NavigationBar from 'react-native-navbar';


export default class User_Home extends Component<{}> {



  static navigationOptions = {
    header: null,
}

constructor(props) {
  super(props);
  this.state = {
    User_Flag : false,
    Refreshing_Flag : false,
    User_Profile: '',
    Favorite_Products: '',
    Order_List: ''

  };
}


sign_out(){
  AsyncStorage.removeItem('User_ID', (error) => {
    if (error) {
      console.log(error);
    }

    this.props.navigation.navigate('User_Home');

  });
}

Refresh_User_Info(){
  AsyncStorage.getItem('User_ID', (err, result) => {
    var User_ID = result
    console.log(User_ID);

    if (User_ID == null) {
      this.setState({
        User_Flag : false,
        Refreshing_Flag : false
      });
    }

    else {

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
              var Favorite_Product_List = []

              for (var product in Favorite_Products) {
                console.log(Favorite_Products[product]);
                Favorite_Product_List.push(Favorite_Products[product])
              }

              // Here we need to call the getuserorder function to get user's all order list
              getuserorder(User_ID, (response) => {

                const get_user_order_code = response["StatusCode"]

                const Orders = response["ResponseText"]

                if (get_user_order_code == 200 || get_user_order_code == 618) {


                  // Next we need to create array to store the order list
                  var Order_List = []

                  for (var order in Orders) {
                    console.log(Orders[order]);
                    Order_List.push(Orders[order])
                  }

                  this.setState({
                    User_Flag : true,
                    User_Profile : Profile,
                    Favorite_Products : Favorite_Product_List,
                    Order_List : Order_List,
                    Refreshing_Flag : false
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

                  this.sign_out()


                }



                //  End of getuserorder
              });

              // End of if statement in getfavoriteproduct
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

              this.sign_out()


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

          this.sign_out()


        }


        // Get User Profile End
      });

    }

  });
}

User_Home_On_Refresh(){
  this.setState({
    Refreshing_Flag : true
  },
  () => {this.Refresh_User_Info()}
);
}


componentWillMount(){
  //AsyncStorage.clear()
  // AsyncStorage.setItem('UID123', 'hello', () => {
  //
  // });

  this.props.navigation.addListener('willFocus', ()=>{

    this.Refresh_User_Info()

  });


}


   render() {

    if (this.state.User_Flag == false) {
      return (
        <ScrollView style={{flex: 1}} >


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

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Log_In_Board')}>
              <Text style={{ fontSize: 25, textAlign: 'center'} }>登     录</Text>
            </TouchableOpacity>

            </View>

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

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Sign_Up_Board')}>
              <Text style={{ fontSize: 25, textAlign: 'center'} }>注     册</Text>
            </TouchableOpacity>

            </View>

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

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Pass_Change_Board')}>
              <Text style={{ fontSize: 25, textAlign: 'center'} }>修 改 密 码</Text>
            </TouchableOpacity>

            </View>

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

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Phone_Change_Board')}>
              <Text style={{ fontSize: 25, textAlign: 'center'} }>修 改 手 机</Text>
            </TouchableOpacity>

            </View>

          </View>

        </ScrollView>


      );

    }
    else {

          return (
            <ScrollView
              refreshControl={
              <RefreshControl
                refreshing = {this.state.Refreshing_Flag}
                onRefresh={this.User_Home_On_Refresh.bind(this)}
              />
            }
              style={{flex: 1}} >



              {/*start  */}

              <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

                  <Text style={{ fontSize: 25, textAlign: 'center'} }>User ID: {this.state.User_Profile.User_ID}</Text>

              </View>

              <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

                  <Text style={{ fontSize: 25, textAlign: 'center'} }>First Name: {this.state.User_Profile.First_Name}</Text>

              </View>

              <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

                  <Text style={{ fontSize: 25, textAlign: 'center'} }>Last Name: {this.state.User_Profile.Last_Name}</Text>

              </View>

              <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

                  <Text style={{ fontSize: 25, textAlign: 'center'} }>Level: {this.state.User_Profile.Level}</Text>

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

                <TouchableOpacity onPress={()=> { this.sign_out()} }>
                  <Text style={{ fontSize: 25, textAlign: 'center'} }>Sign Out</Text>
                  </TouchableOpacity>

                </View>

              </View>

              <View style={{backgroundColor:'green'}}>
                <Text style={{ fontSize: 25, textAlign: 'center'} }>Favorite Product</Text>

                {
                  this.state.Favorite_Products.map((product, i) => {
                    return(
                    <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('Favorite_Single_Product_Home', { Product_ID : product.Product_ID, Product_Spec : product.Product_Spec})}>
                      <View style={{
                          flex: 0.15,
                          marginTop: 25,
                          borderWidth: 2,
                          justifyContent: 'center',
                          borderRadius: 10,

                        }}>
                        <Text>key : {i}</Text>
                        <Text>ID : {product.Product_ID}</Text>
                        <Text>Status : {product.Product_Status}</Text>
                        <Text>Specification : {product.Product_Spec}</Text>
                        <Text>Price : {product.Product_Price}</Text>
                      </View>
                    </TouchableOpacity>


                    );
                  })
                }
              </View>

              <View style={{backgroundColor:'white'}}>
                <Text style={{ fontSize: 25, textAlign: 'center'} }>Order List</Text>
                  {
                    this.state.Order_List.map((order, i) => {
                      return(

                        <View key={i} style={{
                            flex: 0.15,
                            marginTop: 25,
                            borderWidth: 2,
                            justifyContent: 'center',
                            borderRadius: 10,

                          }}>
                          <Text>key : {i}</Text>
                          <Text>ID : {order.Order_ID}</Text>
                          <Text>Status : {order.Order_Status}</Text>
                          <Text>Order Time : {order.Order_Time}</Text>
                          <Text>Address : {order.Order_Shipping_Address_ID}</Text>
                        </View>


                      );
                    })
                  }

              </View>


              {/* Favorite Product List  */}
              <View style={{
                backgroundColor:'grey',
                flex: 0.15,
                marginTop: 25,
                borderWidth: 2,
                justifyContent: 'center',
                borderRadius: 10
              }}>

              <TouchableOpacity onPress = {() => this.props.navigation.navigate('Favorite_Products_List')}>
                <Text style={{ fontSize: 25, textAlign: 'center'} }>Favorite Product List</Text>
              </TouchableOpacity>

              </View>

              {/*end  */}


              {/* Order List  */}
              <View style={{
                backgroundColor:'grey',
                flex: 0.15,
                marginTop: 25,
                borderWidth: 2,
                justifyContent: 'center',
                borderRadius: 10
              }}>

              <TouchableOpacity onPress = {() => this.props.navigation.navigate('Order_List')}>
                <Text style={{ fontSize: 25, textAlign: 'center'} }>Order List</Text>
              </TouchableOpacity>


              </View>

              {/*end  */}


              {/* Address Book  */}
              <View style={{
                backgroundColor:'grey',
                flex: 0.15,
                marginTop: 25,
                borderWidth: 2,
                justifyContent: 'center',
                borderRadius: 10
              }}>

              <TouchableOpacity onPress = {() => this.props.navigation.navigate('Address_Book')}>
                <Text style={{ fontSize: 25, textAlign: 'center'} }>Address Book</Text>
              </TouchableOpacity>

              </View>

              {/*end  */}



            </ScrollView>


          );

    }


  }
}
