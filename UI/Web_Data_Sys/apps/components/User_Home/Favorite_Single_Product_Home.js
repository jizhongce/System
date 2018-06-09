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
import {ErrorCodePrase, FavoriteExistStyle} from '../../util.js';
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
import NavigationBar from 'react-native-navbar';

export default class Favorite_Single_Product_Home extends Component<{}> {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.Product_Spec : 'error',
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
      Product_ID : this.state.product.Product_ID,
      Product_Price : this.state.product.Product_Price,
      Product_Spec : this.state.product.Product_Spec,
      Product_Status : this.state.product.Product_Status

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

          addTofavoriteproduct(User_ID, TempProduct.Product_ID, (response) => {
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
      Product_ID : this.state.product.Product_ID,
      Product_Price : this.state.product.Product_Price,
      Product_Spec : this.state.product.Product_Spec,
      Product_Status : this.state.product.Product_Status

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

          deleteFromfavoriteproduct(User_ID, TempProduct.Product_ID, (response) => {
            const delete_from_favorite_product_status_code = response["StatusCode"]
            const statusText = response["ResponseText"]


            if (delete_from_favorite_product_status_code == 200) {

                Alert.alert(
                    'Success',
                    'Item has been deleted from favorite list',
                  [
                    {text: 'OK', style: 'cancel'},
                  ],
                )

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
      ProductID : this.state.product.Product_ID,
      ProductStatus : this.state.product.Product_Status,
      ProductSpec : this.state.product.Product_Spec,
      ProductPrice : this.state.product.Product_Price,
      ProductUnits : this.state.quantity
    }

    if (TempProduct.ProductStatus <= 0 ) {

      Alert.alert(
          'Sorry',
          'The item has sold out, please wait for more coming',
        [
          {text: 'OK', style: 'cancel'},
        ],
      )

    }

    else if (TempProduct.ProductStatus > 0 && TempProduct.ProductStatus < TempProduct.ProductUnits) {

      Alert.alert(
          'Sorry',
          'The item has no such high storage, please enter smaller amount',
        [
          {text: 'OK', style: 'cancel'},
        ],
      )

    }

    else {

      // console.log(TempProduct);

      AsyncStorage.getItem('User_ID', (err, result) =>{

        if (err) {
          console.log(err);
        }



        else {

          const User_ID = result


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
            // here we can not just push the product into the AsyncStorage, instead we need to check if it is already in the shopping cart

            // First we need to add the product into the shopping cart in the database

            addToshoppingcart(User_ID, TempProduct, (response) =>{
              const add_to_shopping_cart_status_code = response["StatusCode"]
              const statusText = response["ResponseText"]


              if (add_to_shopping_cart_status_code == 200) {


                  Alert.alert(
                    'Success!',
                    'Item' + this.state.product.Product_ID + 'has been added!',
                    [
                      {text: 'OK', style: 'cancel'},
                    ],
                  )

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



  }


  Favorite_Single_Product_Home_Refresh(){
    const { params } = this.props.navigation.state;
    const Product_ID = params ? params.Product_ID : null;

    if (Product_ID != null) {
      getsingleproductinfo(Product_ID, (response) =>{
        const get_single_product_info_status_code = response["StatusCode"]
        const Product_Info = response["ResponseText"]

        if (get_single_product_info_status_code == 200) {

          AsyncStorage.getItem('User_ID', (err, result) => {
            const User_ID = result
            console.log(User_ID);

            if (User_ID == null) {

              Alert.alert(
                  'Whatch Out!',
                  'You have not sign in, please sign in to do more things',
                [
                  {text: 'OK', style: 'cancel'},
                ],
              )


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

      if (this.state.quantity >= this.state.product.Product_Status) {
        Alert.alert(
            'Sorry',
            'Requested quantity larger than status! ',
          [
            {text: 'OK', style: 'cancel'},
          ],
        )
      } else {
        this.setState({
          quantity : this.state.quantity + 1
        });
      }
    }


    Favorite_Single_Product_Home_Minus(){

      if ( this.state.quantity <= 0) {
        Alert.alert(
            'Sorry',
            'Requested quantity smaller than 0! ',
          [
            {text: 'OK', style: 'cancel'},
          ],
        )
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
      <ScrollView
        refreshControl={
        <RefreshControl
          refreshing = {this.state.Refreshing_Flag}
          onRefresh={this.Favorite_Single_Product_Home_On_Refresh.bind(this)}
        />
      }
        style={{flex: 1}} >

        <View style={{
          flex: 0.15,
          marginTop: 25,
          borderWidth: 2,
          justifyContent: 'center',
          borderRadius: 10,

        }}>
        <Text>ID : {this.state.product.Product_ID}</Text>
        <Text>Status : {this.state.product.Product_Status}</Text>
        <Text>Specification : {this.state.product.Product_Spec}</Text>
        <Text>Price : {this.state.product.Product_Price}</Text>

        <TouchableOpacity onPress = {() => this.Favorite_Single_Product_Home_Plus()} style= {{borderWidth: 2, width: 15, height:15, justifyContent: 'center'}} >
          <Text style={{fontSize: 25} }>+</Text>
        </TouchableOpacity>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder={String(this.state.quantity)}
          placeholderTextColor="black"
          onChangeText={(text) => this.productQuantityhandler(text)}
          value={this.state.text}
          />

        <TouchableOpacity onPress = {() => this.Favorite_Single_Product_Home_Minus()} style= {{borderWidth: 2, width: 15, height:15, justifyContent: 'center'}} >
          <Text style={{fontSize: 25} }>-</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => this.add_To_shopping_cart()}>
          <Text style={{ fontSize: 25, textAlign: 'center'} }>加入购物车</Text>
        </TouchableOpacity>

        {/*This is when product exist in the favorite list */}
        <TouchableOpacity style={FavoriteExistStyle(this.state.favorite_exist)} onPress = {() => this.add_To_favorite_product()}>
          <Text style={{ fontSize: 25, textAlign: 'center'} }>Add to Favorite</Text>
        </TouchableOpacity>

        {/*This is when product not exist in the favorite list */}
        <TouchableOpacity style={FavoriteExistStyle(!this.state.favorite_exist)} onPress = {() => this.delete_From_favorite_product()}>
          <Text style={{ fontSize: 25, textAlign: 'center'} }>Delete From Favorite</Text>
        </TouchableOpacity>

        </View>



      </ScrollView>






    );
  }
}
