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
import {getAllproducts, addToshoppingcart, addTofavoriteproduct} from '../../server.js';
import {ErrorCodePrase} from '../../util.js';
import React, { Component } from 'react';
import DropdownAlert from 'react-native-dropdownalert';
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
  AsyncStorage
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class Single_Product_Home extends Component<{}> {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.product.ProductSpec : 'error',
    }

  };


  constructor(props) {
    super(props);
    this.state = {
      product : '',
      quantity : 0
    };
  }

  productQuantityhandler(quantity){
    this.setState({
      quantity : quantity
    });
  }

  add_To_favorite_product(){
    var TempProduct_ID = this.state.product.ProductID

    AsyncStorage.getItem('User_ID', (err, result) =>{
      if (err) {
        console.log(err);
      }

      else {
        var User_ID = result

        if(User_ID == null) {
          console.log(result);
          Alert.alert(
              'Error',
              'please log in first',
            [
              {text: 'OK', style: 'cancel'},
            ],
          )

          this.props.navigation.navigate('User_Home');

        }


        else {

          addTofavoriteproduct(User_ID, TempProduct_ID, (response) => {
            const add_to_favorite_product_status_code = response["StatusCode"]
            const statusText = response["ResponseText"]


            if (add_to_favorite_product_status_code == 200) {

              Alert.alert(
                  'Success',
                  'Item has been added to favorite list',
                [
                  {text: 'OK', style: 'cancel'},
                ],
              )

            }

            else {

              var errormsg = ErrorCodePrase(add_to_favorite_product_status_code)[1]

              var title = ErrorCodePrase(add_to_favorite_product_status_code)[0]

              console.log(ErrorCodePrase(add_to_favorite_product_status_code))

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




  add_To_shopping_cart(){
    var TempProduct = {
      ProductID : this.state.product.ProductID,
      ProductStatus : this.state.product.ProductStatus,
      ProductSpec : this.state.product.ProductSpec,
      ProductPrice : this.state.product.ProductPrice,
      ProductUnits : this.state.quantity
    }

    // console.log(TempProduct);

    AsyncStorage.multiGet(['User_ID','Shopping_Cart'], (err, result) =>{

      if (err) {
        console.log(err);
      }



      else {

        var User_ID = result[0][1]

        var Shopping_Cart = result[1][1]


        if(User_ID == null) {
          console.log(result);
          Alert.alert(
              'Error',
              'please log in first',
            [
              {text: 'OK', style: 'cancel'},
            ],
          )

          this.props.navigation.navigate('User_Home');

        }

        else {
          Shopping_Cart = JSON.parse(Shopping_Cart)

          // here we can not just push the product into the AsyncStorage, instead we need to check if it is already in the shopping cart

          // First we need to add the product into the shopping cart in the database

          addToshoppingcart(User_ID, TempProduct, (response) =>{
            const add_to_shopping_cart_status_code = response["StatusCode"]
            const statusText = response["ResponseText"]

            Shopping_Cart_FLAG = false
            for (var product in Shopping_Cart) {
              console.log(typeof(Shopping_Cart[product].ProductID));
              if (Shopping_Cart[product].ProductID == TempProduct.ProductID) {
                Shopping_Cart[product].ProductUnits = statusText.Products_Units
                Shopping_Cart_FLAG = true

                break
              }
            }

            if (Shopping_Cart_FLAG == false) {
              // now we need to add result as array
              Shopping_Cart.push(TempProduct)

            }


            if (add_to_shopping_cart_status_code == 200) {

              AsyncStorage.setItem('Shopping_Cart', JSON.stringify(Shopping_Cart), () =>{
                // Here we need call add to shooping cart function to add the items into shopping cart in database
                // here we need a flag to indicate end or not

                Alert.alert(
                  'Success!',
                  'Item' + this.state.product.ProductID + 'has been added!',
                  [
                    {text: 'OK', style: 'cancel'},
                  ],
                )

              });





            } else {

              var errormsg = ErrorCodePrase(add_to_shopping_cart_status_code)[1]

              var title = ErrorCodePrase(add_to_shopping_cart_status_code)[0]

              console.log(ErrorCodePrase(add_to_shopping_cart_status_code))

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
    const { params } = this.props.navigation.state;
    const product = params ? params.product : null;
    this.setState({
      product: product,
      quantity : 0
    });
  }


  render() {
    return (
      <ScrollView style={{flex: 1}} >

        <View style={{
          flex: 0.15,
          marginTop: 25,
          borderWidth: 2,
          justifyContent: 'center',
          borderRadius: 10,

        }}>
        <Text>ID : {this.state.product.ProductID}</Text>
        <Text>Status : {this.state.product.ProductStatus}</Text>
        <Text>Specification : {this.state.product.ProductSpec}</Text>
        <Text>Price : {this.state.product.ProductPrice}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="1"
          placeholderTextColor="black"
          onChangeText={(text) => this.productQuantityhandler(text)}
          value={this.state.text}
          />

        <TouchableOpacity onPress = {() => this.add_To_shopping_cart()}>
          <Text style={{ fontSize: 25, textAlign: 'center'} }>加入购物车</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => this.add_To_favorite_product()}>
          <Text style={{ fontSize: 25, textAlign: 'center'} }>Add to Favorite</Text>
        </TouchableOpacity>

        </View>



      </ScrollView>






    );
  }
}
