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
  AsyncStorage
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
    User_Profile: '',
    Favorite_Products: '',
    Order_List: ''

  };
}


sign_out(e){
  AsyncStorage.multiRemove(['User_ID', 'Shopping_Cart', 'User_Profile', 'Favorite_Products','Order_List'], (error) => {
    if (error) {
      console.log(error);
    }

    this.props.navigation.navigate('User_Home');

  });
}


componentWillMount(){
  //AsyncStorage.clear()
  // AsyncStorage.setItem('UID123', 'hello', () => {
  //
  // });

  this.props.navigation.addListener('willFocus', ()=>{
    AsyncStorage.multiGet(['User_ID','User_Profile', 'Favorite_Products', 'Order_List'], (err, result) => {
      console.log(result);
      var User_ID = result[0][1]
      var Profile = result[1][1]
      var Favorite_Products = result[2][1]
      var Order_List = result[3][1]
      if (User_ID == null || Profile == null) {
        AsyncStorage.multiRemove(['User_ID', 'Shopping_Cart', 'User_Profile', 'Favorite_Products', 'Order_List'], (error) => {
          this.setState({
            User_Flag : false
          });
        });

      }
      else {
        this.setState({
          User_Flag : true,
          User_Profile : JSON.parse(Profile),
          Favorite_Products : JSON.parse(Favorite_Products),
          Order_List : JSON.parse(Order_List),
        });
      }

    });

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
            <ScrollView style={{flex: 1}} >



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

                <TouchableOpacity onPress={(e)=> { this.sign_out(e)} }>
                  <Text style={{ fontSize: 25, textAlign: 'center'} }>Sign Out</Text>
                  </TouchableOpacity>

                </View>

              </View>

              <View style={{backgroundColor:'green'}}>
                <Text style={{ fontSize: 25, textAlign: 'center'} }>Favorite Product</Text>

                {
                  this.state.Favorite_Products.map((product, i) => {
                    return(

                      <View key={i} style={{
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

              {/*end  */}



            </ScrollView>


          );

    }


  }
}
