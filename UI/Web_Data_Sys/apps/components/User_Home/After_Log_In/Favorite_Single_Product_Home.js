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
import {getAllproducts, addToshoppingcart, addTofavoriteproduct, checkfavoriteexist, deleteFromfavoriteproduct, getsingleproductinfo} from '../../../server.js';
import {ErrorCodePrase, FavoriteExistStyle, Product_Image, StockStatusCheck, DropDownHolder} from '../../../util.js';
import { Icon } from 'react-native-elements'
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
  KeyboardAvoidingView
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class Favorite_Single_Product_Home extends Component<{}> {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.Products_Name : 'error',
    }

  };


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

          this.props.navigation.navigate('User_Home');

        }


        else {

          addTofavoriteproduct(User_ID, TempProduct.Product_ID, (response) => {
            const add_to_favorite_product_status_code = response["StatusCode"]
            const statusText = response["ResponseText"]


            if (add_to_favorite_product_status_code == 200) {

                DropDownHolder.getDropDown().alertWithType('info', 'Success!', 'Item ' + this.state.product.Products_Name + ' has been Added to favorite list!' )

                this.Favorite_Single_Product_Home_Refresh()

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

          this.props.navigation.navigate('User_Home');

        }


        else {

          deleteFromfavoriteproduct(User_ID, TempProduct.Product_ID, (response) => {
            const delete_from_favorite_product_status_code = response["StatusCode"]
            const statusText = response["ResponseText"]


            if (delete_from_favorite_product_status_code == 200) {

                DropDownHolder.getDropDown().alertWithType('info', 'Success!', 'Item ' + this.state.product.Products_Name + ' has been removed from favorite list!' )

                this.Favorite_Single_Product_Home_Refresh()

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

            this.props.navigation.navigate('User_Home');

          }

          else {
            // here we can not just push the product into the AsyncStorage, instead we need to check if it is already in the shopping cart

            // First we need to add the product into the shopping cart in the database

            addToshoppingcart(User_ID, TempProduct, (response) =>{
              const add_to_shopping_cart_status_code = response["StatusCode"]
              const statusText = response["ResponseText"]


              if (add_to_shopping_cart_status_code == 200) {


                  DropDownHolder.getDropDown().alertWithType('info', 'Success!', 'Item ' + this.state.product.Products_Name + ' has been added!' )

                  this.Favorite_Single_Product_Home_Refresh()


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

            this.props.navigation.navigate('User_Home');

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






  Favorite_Single_Product_Home_Refresh(){
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

                } else {

                  this.setState({
                    favorite_exist : false,
                    product : Product_Info,
                    Refreshing_Flag : false
                  });

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

          this.props.navigation.navigate('User_Home');

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

      this.props.navigation.navigate('User_Home');


    }


  }


    Favorite_Single_Product_Home_Plus(){

        this.setState({
          quantity : this.state.quantity + 1
        });

    }


    Favorite_Single_Product_Home_Minus(){

      if ( this.state.quantity <= 0) {

        DropDownHolder.getDropDown().alertWithType('error', 'Sorry!', 'Requested quantity smaller than 0! ' )

      } else {
        this.setState({
          quantity : this.state.quantity - 1
        });
      }
    }



  Favorite_Single_Product_Home_On_Refresh(){
    this.setState({
      Refreshing_Flag : true
    },
    () => {this.Favorite_Single_Product_Home_Refresh()}
  );
  }


  componentWillMount(){
    this.props.navigation.addListener('willFocus', ()=>{

      this.Favorite_Single_Product_Home_Refresh()

    });


  }


  render() {
    return (

      <KeyboardAvoidingView keyboardVerticalOffset={60} behavior={'position'} >

        <ScrollView refreshControl={
          <RefreshControl
          refreshing = {this.state.Refreshing_Flag}
          onRefresh={this.Favorite_Single_Product_Home_On_Refresh.bind(this)}
        />
      } style={{backgroundColor: 'white', height:'92%'}}>



          {/*start  */}

          <View style={{backgroundColor: 'white'}}>


              <Image
                source={Product_Image[this.state.product.Products_Image_Dir]}
                style={{width: '100%', height: 200}}/>

              <View style={{marginTop:10, marginLeft:5, marginRight:5, flexDirection:'row', justifyContent: 'space-between',}}>
                <View>
                  <Text>商品编号: {this.state.product.Products_Number} </Text>
                </View>

                {/*This is when product exist in the favorite list */}
                <TouchableOpacity activeOpacity={0.5} style={FavoriteExistStyle(this.state.favorite_exist)} onPress = {() => this.add_To_favorite_product()}>
                  <Icon name='favorite-border' />
                </TouchableOpacity>

                {/*This is when product not exist in the favorite list */}
                <TouchableOpacity activeOpacity={0.5} style={FavoriteExistStyle(!this.state.favorite_exist)} onPress = {() => this.delete_From_favorite_product()}>
                  <Icon name='favorite' />
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




          {/*end  */}



        </ScrollView>

        <View style={{height:'8%',  flexDirection:'row', alignItems: 'center'}}>

          <View style={{width:'50%', height:'100%',flexDirection:'row', alignItems: 'center', backgroundColor: 'grey'}}>

            <TouchableOpacity onPress = {() => this.Favorite_Single_Product_Home_Minus()} activeOpacity={0.5} style={{ marginBottom: 5,marginTop:5, marginLeft:5, marginRight:5}}>
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

            <TouchableOpacity onPress = {() => this.Favorite_Single_Product_Home_Plus()} activeOpacity={0.5} style={{marginBottom: 5,marginTop:5, marginLeft:5, marginRight:5}}>
              <Icon name='add' />
            </TouchableOpacity>

            <Text style={{ color: 'black', fontWeight:'bold', marginBottom: 5,marginTop:5}}>/千件</Text>
          </View>


          <TouchableOpacity onPress = {() => this.add_To_shopping_cart()} activeOpacity={0.5} style={{width:'25%', height:'100%', backgroundColor: '#fb5252', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontWeight:'bold', textAlign: 'center'}}>加入购物车</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress = {() => this.buy_product()} activeOpacity={0.5} style={{width:'25%', height:'100%', backgroundColor: '#e9fb52', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontWeight:'bold', textAlign: 'center', }}>立即购买</Text>
          </TouchableOpacity>



        </View>


      </KeyboardAvoidingView>



    );
  }
}
