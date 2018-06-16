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
import {Product_Image} from '../../util.js';
import Product_Home_Header from './Product_Home_Header.js';
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
    header: <Product_Home_Header />,
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
      }>

        <View style={{flexDirection:'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>


        {
          this.state.products.map((product, i) => {

            console.log();

            return(


              <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} key={i} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : product.Products_ID, Products_Name : product.Products_Name})}>

                <Image
                  source={Product_Image['Product_1']}
                  style={{height:160, width:140, marginTop: 10 }}/>
                <Text style={{}} >名称 : {product.Products_Name}</Text>
                <Text style={{}} >规格 : {product.Products_Spec}</Text>
                <Text style={{}} >表色 ： {product.Products_Color}</Text>
                <Text style={{}} >价格 ： {product.Products_Price}</Text>
                <Text style={{}} >状态 ： {product.Products_Status}</Text>

              </TouchableOpacity>


            );
          })
        }



      </View>

      </ScrollView>






    );
  }
}
