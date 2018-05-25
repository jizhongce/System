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
import {getAllproducts, addToshoppingcart} from '../../server.js';
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

  add_To_shopping_cart(){
    var TempProduct = {
      ProdcutID : this.state.product.ProdcutID,
      ProductStatus : this.state.product.ProductStatus,
      ProductSpec : this.state.product.ProductSpec,
      ProductPrice : this.state.product.ProductPrice,
      ProductUnits : this.state.quantity
    }

    // console.log(TempProduct);

    AsyncStorage.multiGet(['User_ID','Shopping_Cart'], (err, result) =>{

      if (err) {
        console.log(error);
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

          // now we need to add result as array
          Shopping_Cart.push(TempProduct)

          console.log(Shopping_Cart);

          // console.log(Object.keys(Shopping_Cart));

          // First we need to add the product into the shopping cart in the database


          addToshoppingcart(User_ID, TempProduct, (response) =>{

          })

        //   AsyncStorage.setItem('Shopping_Cart', JSON.stringify(Shopping_Cart), () =>{
        //     // Here we need call add to shooping cart function to add the items into shopping cart in database
        //
        //
        //
        //
        //     Alert.alert(
        //       'Success!',
        //       'Item' + this.state.product.ProdcutID + 'has been added!',
        //       [
        //         {text: 'OK', style: 'cancel'},
        //       ],
        //     )
        //
        //
        //
        //
        // });



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
        <Text>ID : {this.state.product.ProdcutID}</Text>
        <Text>Status : {this.state.product.ProductStatus}</Text>
        <Text>Specification : {this.state.product.ProductSpec}</Text>
        <Text>Price : {this.state.product.ProductPrice}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.productQuantityhandler(text)}
          value={this.state.text}
          />
        <TouchableOpacity onPress = {() => this.add_To_shopping_cart()}>
          <Text style={{ fontSize: 25, textAlign: 'center'} }>加入购物车</Text>
        </TouchableOpacity>

        </View>



      </ScrollView>






    );
  }
}
