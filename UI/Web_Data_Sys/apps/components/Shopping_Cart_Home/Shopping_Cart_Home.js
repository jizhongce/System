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
import {getshoppingcart} from '../../server.js';
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
  AsyncStorage,
  ScrollView,
  RefreshControl
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class Shopping_Cart_Home extends Component<{}> {


  constructor(props) {
    super(props);
    this.state = {
      User_Flag : true,
      Shopping_Cart : [],
      Refreshing_Flag : false
    };
  }


  Refresh_Shopping_Cart(){
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
            console.log(Shopping_Cart);

            this.setState({
              User_Flag : true,
              Shopping_Cart : Shopping_Cart,
              Refreshing_Flag : false
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

  OnRefresh(){
    this.setState({
      refreshing : true
    },
    () => {this.Refresh_Shopping_Cart()}
  );
  }

  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });
    this.props.navigation.addListener('willFocus', ()=>{

      this.Refresh_Shopping_Cart()
    });


  }

  render() {

    if (this.state.User_Flag == false) {
      return (
        <ScrollView style={{flex: 1}} >



          {/*start  */}

          <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

            <Text style={{ fontSize: 25, textAlign: 'center'} }>Please log in first to see the shopping cart</Text>

          </View>




          {/*end  */}



        </ScrollView>


      );
    }




    else {


          return (
            <ScrollView
              refreshControl={
              <RefreshControl
                onRefresh={this.OnRefresh.bind(this)}
                refreshing = {this.state.Refreshing_Flag}
              />
            }
              style={{flex: 1}}>



              {/*start  */}
              {
                this.state.Shopping_Cart.map((product, i) =>{
                  return(
                    <View key={i} style={{
                      flex: 0.2,
                      marginTop: 25,
                      borderWidth: 2,
                      justifyContent: 'center',
                      borderRadius: 10,

                    }}>
                      <Text>key : {i}</Text>
                      <Text>ID : {product.ProductID}</Text>
                      <Text>Status : {product.ProductStatus}</Text>
                      <Text>Specification : {product.ProductSpec}</Text>
                      <Text>Price : {product.ProductPrice}</Text>
                      <Text>Units : {product.ProductUnits}</Text>
                    </View>
                  );
                })
              }
              {/*end  */}



            </ScrollView>


          );
    }



  }
}
