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
import {Product_Image, StockStatusCheck} from '../../util.js';
import React, { Component } from 'react';
import Status_Bar from '../Status_Bar.js';
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
    header: null
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

      <View>

        {/* Header  */}

        <Status_Bar />

        <View style={{
            height: '8%',
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
          }} >

          <View style={{width: '20%', justifyContent: 'center', alignItems: 'center',}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Confirmation_Home',{ Order_ID : '6332b6d8-0593-4d53-a513-858e786bccf1'} )}>
              <Text style={{marginLeft:5}}> 搜 索 </Text>
            </TouchableOpacity>
          </View>


          <View style={{width: '60%', justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}>产品列表</Text>
          </View>

          <View style={{width: '20%', justifyContent: 'center', alignItems: 'center',}}>
            <TouchableOpacity>
              <Text style={{marginRight:5}}> 消 息 </Text>
            </TouchableOpacity>
          </View>

        </View>
        {/* Header  */}



        {/* Main Feed */}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing = {this.state.Refreshing_Flag}
              onRefresh={this.All_Products_On_Refresh.bind(this)}
              />
          } style={{backgroundColor: 'white', height: '89%'}}>

          <View style={{flexDirection:'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>


            {
              this.state.products.map((product, i) => {

                console.log();

                return(


                  <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} key={i} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : product.Products_ID})}>

                    <Image
                      source={Product_Image[product.Products_Image_Dir]}
                      style={{height:160, width:140, marginTop: 10 }}/>
                    <Text style={{}} >名称 : {product.Products_Name}</Text>
                    <Text style={{}} >规格 : {product.Products_Spec}</Text>
                    <Text style={{}} >表色 ： {product.Products_Color}</Text>
                    <Text style={{}} >价格 ： {product.Products_Price}</Text>


                  </TouchableOpacity>


                );
              })
            }



          </View>

        </ScrollView>

        {/* Main Feed */}


      </View>











    );
  }
}
