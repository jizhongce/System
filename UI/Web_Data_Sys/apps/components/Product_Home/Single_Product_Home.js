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
import {getAllproducts, addToshoppingcart, addTofavoriteproduct, checkfavoriteexist, deleteFromfavoriteproduct, getsingleproductinfo} from '../../server.js';
import {ErrorCodePrase, FavoriteExistStyle, Product_Image, StockStatusCheck, DropDownHolder} from '../../util.js';
import { Icon} from 'react-native-elements'
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
  RefreshControl,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import NavigationBar from 'react-native-navbar';

import Status_Bar from '../Status_Bar.js';

export default class Single_Product_Home extends Component<{}> {

  static navigationOptions = {
    header: null
}


  constructor(props) {
    super(props);
    this.state = {
      product : '',
      favorite_exist : false,
      Refreshing_Flag : false,
      quantity : 1
    };
  }

  productQuantityhandler(quantity){
    this.setState({
      quantity : quantity
    });
  }


  add_To_favorite_product(){
    const TempProduct = {
      Product_ID : this.state.product.Products_ID,
      Product_Price : this.state.product.Products_Price,
      Product_Spec : this.state.product.Products_Spec,
      Product_Status : this.state.product.Products_Status

    }

    console.log(TempProduct.Product_ID);

    AsyncStorage.getItem('User_ID', (err, result) =>{
      if (err) {
        console.log(err);
      }

      else {
        const User_ID = result

        if(User_ID == null) {
          console.log(result);

          DropDownHolder.getDropDown().alertWithType('error', 'Error!', 'please log in first' )

        }


        else {

          addTofavoriteproduct(User_ID, TempProduct.Product_ID, (response) => {
            const add_to_favorite_product_status_code = response["StatusCode"]
            const statusText = response["ResponseText"]


            if (add_to_favorite_product_status_code == 200) {

                DropDownHolder.getDropDown().alertWithType('info', 'Success!', 'Item ' + this.state.product.Products_Name + ' has been Added to favorite list!' )

                this.Single_Product_Home_Refresh()

            }

            else {

              const errormsg = ErrorCodePrase(add_to_favorite_product_status_code)[1]

              const title = ErrorCodePrase(add_to_favorite_product_status_code)[0]

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

  delete_From_favorite_product(){
    const TempProduct = {
      Product_ID : this.state.product.Products_ID,
      Product_Price : this.state.product.Products_Price,
      Product_Spec : this.state.product.Products_Spec,
      Product_Status : this.state.product.Products_Status

    }

    console.log(TempProduct.Product_ID);

    AsyncStorage.getItem('User_ID', (err, result) =>{
      if (err) {
        console.log(err);
      }

      else {
        const User_ID = result

        if(User_ID == null) {
          console.log(result);
          DropDownHolder.getDropDown().alertWithType('error', 'Error!', 'please log in first' )

        }


        else {

          deleteFromfavoriteproduct(User_ID, TempProduct.Product_ID, (response) => {
            const delete_from_favorite_product_status_code = response["StatusCode"]
            const statusText = response["ResponseText"]


            if (delete_from_favorite_product_status_code == 200) {

                DropDownHolder.getDropDown().alertWithType('info', 'Success!', 'Item ' + this.state.product.Products_Name + ' has been removed from favorite list!' )

                this.Single_Product_Home_Refresh()

            }

            else {

              const errormsg = ErrorCodePrase(delete_from_favorite_product_status_code)[1]

              const title = ErrorCodePrase(delete_from_favorite_product_status_code)[0]

              console.log(ErrorCodePrase(delete_from_favorite_product_status_code))

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
    const TempProduct = {
      ProductID : this.state.product.Products_ID,
      ProductStatus : this.state.product.Products_Status,
      ProductSpec : this.state.product.Products_Spec,
      ProductPrice : this.state.product.Products_Price,
      ProductUnits : this.state.quantity
    }

      // console.log(TempProduct);

      AsyncStorage.getItem('User_ID', (err, result) =>{

        if (err) {
          console.log(err);
        }



        else {

          const User_ID = result


          if(User_ID == null) {
            console.log(result);
            DropDownHolder.getDropDown().alertWithType('error', 'Error!', 'please log in first' )

          }

          else {
            // here we can not just push the product into the AsyncStorage, instead we need to check if it is already in the shopping cart

            // First we need to add the product into the shopping cart in the database

            addToshoppingcart(User_ID, TempProduct, (response) =>{
              const add_to_shopping_cart_status_code = response["StatusCode"]
              const statusText = response["ResponseText"]


              if (add_to_shopping_cart_status_code == 200) {


                DropDownHolder.getDropDown().alertWithType('info', 'Success!', 'Item ' + this.state.product.Products_Name + ' has been added!' )


                this.Single_Product_Home_Refresh()


              } else {

                const errormsg = ErrorCodePrase(add_to_shopping_cart_status_code)[1]

                const title = ErrorCodePrase(add_to_shopping_cart_status_code)[0]

                console.log(add_to_shopping_cart_status_code)

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




  buy_product(){
    const TempProduct = {
      ProductID : this.state.product.Products_ID,
      ProductStatus : this.state.product.Products_Status,
      ProductSpec : this.state.product.Products_Spec,
      ProductPrice : this.state.product.Products_Price,
      ProductUnits : this.state.quantity
    }

      // console.log(TempProduct);

      AsyncStorage.getItem('User_ID', (err, result) =>{

        if (err) {
          console.log(err);
        }



        else {

          const User_ID = result


          if(User_ID == null) {
            console.log(result);
            DropDownHolder.getDropDown().alertWithType('error', 'Error!', 'please log in first' )

          }

          else {
            // here we can not just push the product into the AsyncStorage, instead we need to check if it is already in the shopping cart

            // First we need to add the product into the shopping cart in the database

            addToshoppingcart(User_ID, TempProduct, (response) =>{
              const add_to_shopping_cart_status_code = response["StatusCode"]
              const statusText = response["ResponseText"]


              if (add_to_shopping_cart_status_code == 200) {


                DropDownHolder.getDropDown().alertWithType('info', 'Success!', 'Item ' + this.state.product.Products_Name + ' has been added!' )

                this.props.navigation.navigate('Shopping_Cart_Home');




              } else {

                const errormsg = ErrorCodePrase(add_to_shopping_cart_status_code)[1]

                const title = ErrorCodePrase(add_to_shopping_cart_status_code)[0]

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





  Single_Product_Home_Refresh(){
    const { params } = this.props.navigation.state;
    const Product_ID = params ? params.Products_ID : null;

    if (Product_ID != null) {
      getsingleproductinfo(Product_ID, (response) =>{
        const get_single_product_info_status_code = response["StatusCode"]
        const Product_Info = response["ResponseText"]

        if (get_single_product_info_status_code == 200) {

          AsyncStorage.getItem('User_ID', (err, result) => {
            const User_ID = result
            console.log(User_ID);

            if (User_ID == null) {

              DropDownHolder.getDropDown().alertWithType('warn', 'Watch Out!', 'You have not sign in, please sign in to do more things!' )

              this.setState({
                favorite_exist : false,
                product : Product_Info,
                Refreshing_Flag : false
              });


            }

            else {

              checkfavoriteexist(User_ID, Product_ID, (response)=>{

                const check_favorite_exist_status_code = response["StatusCode"]
                const statusText = response["ResponseText"]

                if (check_favorite_exist_status_code == 200) {
                  // here means exist, so set flag to true
                  this.setState({
                    favorite_exist : true,
                    product : Product_Info,
                    Refreshing_Flag : false
                  });

                }

                else if (check_favorite_exist_status_code == 619) {
                  this.setState({
                    favorite_exist : false,
                    product : Product_Info,
                    Refreshing_Flag : false
                  });
                }

                else {

                  const errormsg = ErrorCodePrase(check_favorite_exist_status_code)[1]

                  const title = ErrorCodePrase(check_favorite_exist_status_code)[0]

                  console.log(ErrorCodePrase(check_favorite_exist_status_code))

                  Alert.alert(
                      title,
                      errormsg,
                    [
                      {text: 'OK', style: 'cancel'},
                    ],
                  )

                  this.props.navigation.navigate('Product_Home');;

                }


              });

            }

          });


        } else {

          const errormsg = ErrorCodePrase(get_single_product_info_status_code)[1]

          const title = ErrorCodePrase(get_single_product_info_status_code)[0]

          console.log(ErrorCodePrase(get_single_product_info_status_code))

          Alert.alert(
              title,
              errormsg,
            [
              {text: 'OK', style: 'cancel'},
            ],
          )

          this.props.navigation.navigate('Product_Home');

        }



      });


    } else {
      Alert.alert(
          'error',
          'errormsg',
        [
          {text: 'OK', style: 'cancel'},
        ],
      )

      this.props.navigation.navigate('Product_Home');


    }

  }

  Single_Product_Home_On_Refresh(){
    this.setState({
      Refreshing_Flag : true
    },
    () => {this.Single_Product_Home_Refresh()}
  );
  }


  Single_Product_Home_Plus(){

      this.setState({
        quantity : this.state.quantity + 1
      });

  }


  Single_Product_Home_Minus(){

    if ( this.state.quantity <= 0) {

      DropDownHolder.getDropDown().alertWithType('error', 'Sorry!', 'Requested quantity smaller than 0! ' )

    } else {
      this.setState({
        quantity : this.state.quantity - 1
      });
    }

  }


  componentWillMount(){
    this.props.navigation.addListener('willFocus', ()=>{

      this.Single_Product_Home_Refresh()

    });


  }


  render() {
    return (

      <KeyboardAvoidingView behavior={'position'} >

        <Status_Bar />

        <View style={{
            height: '8%',
            backgroundColor: 'white',
            flexDirection: 'row',
            borderBottomWidth: 1,
          }} >

          <View style={{
              height: '100%',
              width: '10%',
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 5
            }} >

            <TouchableOpacity onPress = {()=> this.props.navigation.goBack()}>

              <Image style={{width: 24, height: 24}} source={require('../../../img/back_arrow.png')} />

            </TouchableOpacity>
          </View>

          <View style={{
              height: '100%',
              width: '80%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row'
            }} >
            <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> {this.state.product.Products_Name} </Text>
          </View>



        </View>

        <ScrollView refreshControl={
          <RefreshControl
          refreshing = {this.state.Refreshing_Flag}
          onRefresh={this.Single_Product_Home_On_Refresh.bind(this)}
        />
    } style={{backgroundColor: 'white', height:'81%'}}>



          {/*start  */}

          <View style={{backgroundColor: 'white'}}>


              <Image
                source={Product_Image[this.state.product.Products_Image_Dir]}
                style={{width: '100%', height: 200}}/>

              <View style={{marginTop:10, marginLeft:5, marginRight:5, flexDirection:'row', justifyContent: 'space-between',}}>
                <View>
                  <Text>商品编号: {this.state.product.Products_Number} </Text>
                </View>

                {/*This is when product not exist in the favorite list */}
                <TouchableOpacity activeOpacity={0.5} style={FavoriteExistStyle(this.state.favorite_exist)} onPress = {() => this.add_To_favorite_product()}>
                  <Image style={{width: 24, height: 24}} source={require('../../../img/favorite_border.png')} />
                </TouchableOpacity>

                {/*This is when product exist in the favorite list */}
                <TouchableOpacity activeOpacity={0.5} style={FavoriteExistStyle(!this.state.favorite_exist)} onPress = {() => this.delete_From_favorite_product()}>
                  <Image style={{width: 24, height: 24}} source={require('../../../img/favorite.png')} />
                </TouchableOpacity>


              </View>

              <View style={{marginTop:5, marginLeft:5, marginBottom: 10}}>

                <Text style={{fontSize: 25, textAlign: 'left',}}>{this.state.product.Products_Name}(XXXXXXXXXXXXXXXXXXXXX)</Text>

              </View>

              <View style={{marginTop:5, marginLeft:5, marginRight:5, marginBottom: 5, flexDirection:'row', justifyContent: 'space-between',}}>

                <Text style={{fontSize: 15}}>规格 : {this.state.product.Products_Spec}</Text>
                <Text style={{fontSize: 15}}>表色 : {this.state.product.Products_Color}</Text>
                <Text style={{fontSize: 15}}>加工处理 : {this.state.product.Products_Color}</Text>

              </View>

              <View style={{marginTop:5, marginLeft:5, marginBottom: 5}}>

                <Text style={{fontSize: 15, textAlign: 'left',}}>库存状况 : {StockStatusCheck(this.state.product.Products_Status)}</Text>

              </View>

              <View style={{marginTop:10, marginLeft:5, marginRight:5, marginBottom: 5, flexDirection:'row', justifyContent: 'space-between',}}>

                <Text style={{fontSize: 15, color: 'red', fontWeight:'bold'}}>红本价格:</Text>
                <Text style={{fontSize: 15, color: 'red', fontWeight:'bold'}}>{this.state.product.Products_Price}/千件</Text>



              </View>

              <View style={{marginTop:5, marginLeft:5, marginRight:5, marginBottom: 10, flexDirection:'row', justifyContent: 'space-between',}}>

                <Text style={{fontSize: 15, color: 'blue', fontWeight:'bold'}}>蓝本价格:</Text>
                <Text style={{fontSize: 15, color: 'blue', fontWeight:'bold'}}>{this.state.product.Products_Price}/千件</Text>

              </View>




          </View>


          {/* Suggestion Header */}
          <View style={{marginBottom:10, marginTop:10, marginLeft:5, marginRight:5, flexDirection:'row', justifyContent: 'space-between',}}>

            <View
              style={{
                marginTop: 10,
                borderTopColor: 'black',
                borderTopWidth: 1,
                width: '30%'
              }}
              />

            <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}>热门产品</Text>

            <View
              style={{
                marginTop:10 ,
                borderTopColor: 'black',
                borderTopWidth: 1,
                width: '30%'
              }}
              />

          </View>

          {/* Suggestion */}

          <View style={{marginTop:10, flexDirection:'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>


                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}}>

                  <Image
                    source={require('../../../img/product1.jpg')}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : GB846-82</Text>
                  <Text style={{}} >规格 : 55 X 66</Text>
                  <Text style={{}} >表色 ： yellow</Text>
                  <Text style={{}} >价格 ： 5000</Text>


                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}}>

                  <Image
                    source={require('../../../img/product1.jpg')}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : GB846-82</Text>
                  <Text style={{}} >规格 : 55 X 66</Text>
                  <Text style={{}} >表色 ： yellow</Text>
                  <Text style={{}} >价格 ： 5000</Text>


                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}}>

                  <Image
                    source={require('../../../img/product1.jpg')}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : GB846-82</Text>
                  <Text style={{}} >规格 : 55 X 66</Text>
                  <Text style={{}} >表色 ： yellow</Text>
                  <Text style={{}} >价格 ： 5000</Text>


                </TouchableOpacity>



        </View>



          {/*end  */}



        </ScrollView>

        <View style={{height:'8%',  flexDirection:'row', alignItems: 'center', borderTopWidth: 1}}>

          <View style={{width:'50%', height:'100%',flexDirection:'row', alignItems: 'center', backgroundColor: 'white'}}>

            <TouchableOpacity onPress = {() => this.Single_Product_Home_Minus()} activeOpacity={0.5} style={{ marginBottom: 5,marginTop:5, marginLeft:5, marginRight:5}}>
              <Icon name='remove' />
            </TouchableOpacity>

            <TextInput
              placeholder={String(this.state.quantity)}
              placeholderTextColor="black"
              onChangeText={(text) => this.productQuantityhandler(text)}
              value={this.state.text}
              keyboardType={'numeric'}
              style={{
                marginBottom: 5,
                marginTop:5,
                marginLeft:5,
                marginRight:5,
                borderWidth: 2,
                borderRadius: 5,
                width: 50}} />

            <TouchableOpacity onPress = {() => this.Single_Product_Home_Plus()} activeOpacity={0.5} style={{marginBottom: 5,marginTop:5, marginLeft:5, marginRight:5}}>
              <Icon name='add' />
            </TouchableOpacity>

            <Text style={{ color: 'black', fontWeight:'bold', marginBottom: 5,marginTop:5}}>/千件</Text>
          </View>


          <TouchableOpacity onPress = {() => this.add_To_shopping_cart()} activeOpacity={0.5} style={{width:'25%', height:'100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1,  borderLeftWidth: 1 }}>
            <Text style={{ color: 'black', fontWeight:'bold', textAlign: 'center'}}>加入购物车</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.buy_product()} activeOpacity={0.5} style={{width:'25%', height:'100%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontWeight:'bold', textAlign: 'center', }}>立即购买</Text>
          </TouchableOpacity>



        </View>


      </KeyboardAvoidingView>




    );
  }
}
