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
import {getshoppingcart, shoppingcartquantitychange, deletefromshoppingcart} from '../../server.js';
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


  Shopping_Cart_Quantity_Plus(Product){

    if (Product.Product_Units >= Product.Product_Status) {

      Alert.alert(
          'Sorry',
          'Requested quantity larger than status! ',
        [
          {text: 'OK', style: 'cancel'},
        ],
      )

    } else {

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
          const TempProduct = {
            Product_ID : Product.Product_ID,
            Product_Units : Product.Product_Units + 1
          }

          shoppingcartquantitychange(User_ID, TempProduct, (response) =>{

            const shopping_cart_quantity_plus_code = response["StatusCode"]

            const Products = response["ResponseText"]

            if (shopping_cart_quantity_plus_code == 200) {


              this.Refresh_Shopping_Cart()


            } else {

              Alert.alert(
                  'Sorry',
                  'Something Wrong with shopping cart quantity plus! ',
                [
                  {text: 'OK', style: 'cancel'},
                ],
              )

              this.Refresh_Shopping_Cart()

            }



          });



        }

      });

    }

    // End of Shopping_Cart_Quantity_Plus
  }



  Shopping_Cart_Quantity_Minus(Product){

    if (Product.Product_Units < 1) {

      Alert.alert(
          'Sorry',
          'Requested quantity less than 1! ',
        [
          {text: 'OK', style: 'cancel'},
        ],
      )

    }
    else if (Product.Product_Units == 1 ) {

      // here we need to delete the product
      Alert.alert(
          'Watch Out!',
          'you are deleting the item from the shopping cart! ',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'OK', onPress: () => {

            this.Delete_From_Shopping_Cart(Product);

          } },

        ],
      )

    }
     else {

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
          const TempProduct = {
            Product_ID : Product.Product_ID,
            Product_Units : Product.Product_Units - 1
          }

          shoppingcartquantitychange(User_ID, TempProduct, (response) =>{

            const shopping_cart_quantity_plus_code = response["StatusCode"]

            const Products = response["ResponseText"]

            if (shopping_cart_quantity_plus_code == 200) {


              this.Refresh_Shopping_Cart()


            } else {

              Alert.alert(
                  'Sorry',
                  'Something Wrong with shopping cart quantity plus! ',
                [
                  {text: 'OK', style: 'cancel'},
                ],
              )

              this.Refresh_Shopping_Cart()

            }



          });



        }

      });

    }

    // End of Shopping_Cart_Quantity_Minus
  }


  Delete_From_Shopping_Cart(Product){

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
        const Product_ID = Product.Product_ID

        deletefromshoppingcart(User_ID, Product_ID, (response) =>{

          const delete_from_shopping_cart_code = response["StatusCode"]

          const Products = response["ResponseText"]

          if (delete_from_shopping_cart_code == 200) {

            Alert.alert(
                'Success',
                'Item has been deleted from the shopping cart! ',
              [
                {text: 'OK', style: 'cancel', onPress: () =>{
                  this.Refresh_Shopping_Cart()
                }},
              ],
            )


          } else {

            Alert.alert(
                'Sorry',
                'Something wrong with the database, delete fail! ',
              [
                {text: 'OK', style: 'cancel', onPress: () =>{
                  this.Refresh_Shopping_Cart()
                }},
              ],
            )

          }


        });

      }

    });

    // End of Delete_From_Shopping_Cart
  }



  Delete_Item_On_Press(Product){
    Alert.alert(
        'Watch Out!',
        'you are deleting the item from the shopping cart! ',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => {

          this.Delete_From_Shopping_Cart(Product);

        } },

      ],
    )
    // End of Delete_Item_On_Press
  }




  Submit_Order_On_Press(Shopping_Cart){

    var Shopping_Cart_Confirm = ''

    for (var Product in Shopping_Cart) {
      var TempProduct = Shopping_Cart[Product]
      console.log(Shopping_Cart[Product]);
      console.log('\n');
      Shopping_Cart_Confirm = Shopping_Cart_Confirm + TempProduct.Product_ID + ':' + TempProduct.Product_Units + '\n' + '----------' + '\n'

    }

    console.log(Shopping_Cart_Confirm);
    Alert.alert(
        'Watch Out!',
        'you are Submitting your order the item from the shopping cart! \n Order Detail: \n ' + Shopping_Cart_Confirm,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Confirm' },

      ],
    )

    // End of Submit_Order_On_Press
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
                      <Text>ID : {product.Product_ID}</Text>
                      <Text>Specification : {product.Product_Spec}</Text>
                      <Text>Price : {product.Product_Price}</Text>
                      <Text>Status : {product.Product_Status}</Text>
                      <Text>Units :

                        <TouchableOpacity onPress = {() => this.Shopping_Cart_Quantity_Minus(product)} style= {{borderWidth: 2, width: 15, height:15, justifyContent: 'center'}} >
                          <Text style={{fontSize: 25} }>-</Text>
                        </TouchableOpacity>

                        {product.Product_Units}

                        <TouchableOpacity onPress = {() => this.Shopping_Cart_Quantity_Plus(product)} style= {{borderWidth: 2, width: 15, height:15, justifyContent: 'center'}}>
                          <Text style={{fontSize: 25} }>+</Text>
                        </TouchableOpacity>

                      </Text>
                      <TouchableOpacity onPress = {() => this.Delete_Item_On_Press(product)}>
                        <Text style={{fontSize: 25} }>Delete Item</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })
              }
              {/*end  */}


              <TouchableOpacity onPress = {() => this.Submit_Order_On_Press(this.state.Shopping_Cart)}>
                <Text style={{fontSize: 25} }>Submit the Order</Text>
              </TouchableOpacity>


            </ScrollView>


          );
    }



  }
}
