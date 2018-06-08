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
import {getAllproducts} from '../../server.js';
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
  AsyncStorage,
  RefreshControl
} from 'react-native';


export default class Product_Home extends Component<{}> {


  static navigationOptions = {
      header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      products : [],
      Refreshing_Flag: false
    };
  }

  // moreproduct(){
  //   this.setState({
  //     products : []
  //   });
  // }
  // onScrollEndDrag={() => this.moreproduct()}
  //
  Refresh_All_Product(){
    getAllproducts((response) =>{
      const get_all_products_code = response["StatusCode"]
      const Products = response["ResponseText"]
      console.log(Products);

      if (get_all_products_code == 200) {
        this.setState({
          products : Products,
          Refreshing_Flag: false
        });
      }

    });
  }

  All_Products_On_Refresh(){
    this.setState({
      Refreshing_Flag : true
    },
    () => {this.Refresh_All_Product()}
  );
  }



  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });
    this.props.navigation.addListener('willFocus', ()=>{

      this.Refresh_All_Product()

    });



  }

  render() {
    return (
      <ScrollView
        refreshControl={
        <RefreshControl
          refreshing = {this.state.Refreshing_Flag}
          onRefresh={this.All_Products_On_Refresh.bind(this)}
        />
      }
        style={{flex: 1}}  >


        {
          this.state.products.map((product, i) => {
            return(
            <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ product : product})}>
              <View style={{
                flex: 0.15,
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
              </View>
            </TouchableOpacity >
            );
          })
        }





      </ScrollView>






    );
  }
}
