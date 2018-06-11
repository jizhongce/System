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
import {getshoppingcart, getaddressbook, shoppingcartquantitychange, deletefromshoppingcart, submitorder} from '../../server.js';
import {ShoppingCartAddressExistStyle} from '../../util.js';
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
      Shopping_Cart_Product_List : [],
      Shopping_Cart_Shipping_Info : '',
      Shopping_Cart_Shipping_Address_List : [],
      Shopping_Cart_Shipping_Info_Flag : false,
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
          Refreshing_Flag : false,
          Shopping_Cart_Product_List : [],
          Shopping_Cart_Shipping_Address_List : [],
          Shopping_Cart_Shipping_Info : '',
          Shopping_Cart_Shipping_Info_Flag : false
        });
      }

      else {

        getshoppingcart(User_ID, (response) => {


          const get_shopping_cart_code = response["StatusCode"]

          const Products = response["ResponseText"]

          if (get_shopping_cart_code == 200) {

            // next create array to store the products object
            var Shopping_Cart_Product_List = []
            for (var product in Products) {
              console.log(Products[product]);
              Shopping_Cart_Product_List.push(Products[product])
            }
            console.log(Shopping_Cart_Product_List);

            getaddressbook(User_ID, (response) => {

              const get_address_book_code = response["StatusCode"]

              const Address_Book = response["ResponseText"]

              if (get_address_book_code == 200 || get_address_book_code == 622) {

                var Address_Book_List = []

                for (var Address in Address_Book) {
                  console.log(Address_Book[Address]);
                  Address_Book_List.push(Address_Book[Address])
                }

                this.setState({
                  User_Flag : true,
                  Shopping_Cart_Shipping_Address_List : Address_Book_List,
                  Shopping_Cart_Product_List : Shopping_Cart_Product_List,
                  Refreshing_Flag : false
                }, ()=>{
                  console.log(this.state.Shopping_Cart_Shipping_Address_List);
                });


              } else {

                var errormsg = ErrorCodePrase(get_address_book_code)[1]

                var title = ErrorCodePrase(get_address_book_code)[0]

                console.log(ErrorCodePrase(get_address_book_code))


                Alert.alert(
                    title,
                    errormsg,
                  [
                    {text: 'OK', onPress: ()=>{

                      AsyncStorage.removeItem('User_ID', (error) => {
                        if (error) {
                          console.log(error);
                        }

                        this.props.navigation.navigate('User_Home');

                      });

                    }},
                  ],
                )

              }

            });



          } else {


            var errormsg = ErrorCodePrase(get_shopping_cart_code)[1]

            var title = ErrorCodePrase(get_shopping_cart_code)[0]

            console.log(ErrorCodePrase(get_shopping_cart_code))

            Alert.alert(
                title,
                errormsg,
              [
                {text: 'OK', onPress: ()=>{

                  AsyncStorage.removeItem('User_ID', (error) => {
                    if (error) {
                      console.log(error);
                    }

                    this.props.navigation.navigate('User_Home');

                  });

                }},
              ],
            )

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
            Refreshing_Flag : false,
            Shopping_Cart_Product_List : [],
            Shopping_Cart_Shipping_Address_List : [],
            Shopping_Cart_Shipping_Info : '',
            Shopping_Cart_Shipping_Info_Flag : false
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
            Refreshing_Flag : false,
            Shopping_Cart_Product_List : [],
            Shopping_Cart_Shipping_Address_List : [],
            Shopping_Cart_Shipping_Info : '',
            Shopping_Cart_Shipping_Info_Flag : false
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
          Refreshing_Flag : false,
          Shopping_Cart_Product_List : [],
          Shopping_Cart_Shipping_Address_List : [],
          Shopping_Cart_Shipping_Info : '',
          Shopping_Cart_Shipping_Info_Flag : false
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




  // Submit_Order(Shopping_Cart){
  //
  //   AsyncStorage.getItem('User_ID', (err, result) => {
  //     var User_ID = result
  //     console.log(User_ID);
  //
  //     if (User_ID == null) {
  //       this.setState({
  //         User_Flag : false,
  //         Refreshing_Flag : false
  //       });
  //     }
  //
  //     else {
  //
  //       submitorder(User_ID, Shopping_Cart, (response) =>{
  //
  //         const submit_order_code = response["StatusCode"]
  //
  //
  //         if (submit_order_code == 200) {
  //
  //           Alert.alert(
  //             'Success',
  //             'Your Order has been submitted! \n Next you will be directed to payments!',
  //             [
  //               {text: 'OK', style: 'cancel', onPress: () =>{
  //                 this.Refresh_Shopping_Cart()
  //               }},
  //             ],
  //           )
  //
  //
  //         } else {
  //
  //           Alert.alert(
  //             'Oops',
  //             'Error Code:' + submit_order_code + '\n' +'There is something wrong with the server! Try again later!',
  //             [
  //               {text: 'OK', style: 'cancel', onPress: () =>{
  //                 this.Refresh_Shopping_Cart()
  //               }},
  //             ],
  //           )
  //
  //         }
  //
  //
  //       });
  //
  //
  //
  //
  //     }
  //
  //   });
  //
  //
  // }



  Submit_Order_On_Press(Shopping_Cart_Product_List){

    if (Shopping_Cart_Product_List.length <= 0) {

      Alert.alert(
          'Oops!',
          'There is nothing in your shopping cart! ',
        [
          {text: 'OK', style: 'cancel'}

        ],
      )

    } else {

      var Shopping_Cart_Confirm = ''

      console.log(Shopping_Cart_Product_List.length);

      for (var Product in Shopping_Cart_Product_List) {
        var TempProduct = Shopping_Cart_Product_List[Product]
        console.log(Shopping_Cart_Product_List[Product]);
        console.log('\n');
        Shopping_Cart_Confirm = Shopping_Cart_Confirm + TempProduct.Product_ID + ':' + TempProduct.Product_Units + '\n' + '----------' + '\n'

      }

      console.log(Shopping_Cart_Confirm);
      Alert.alert(
        'Watch Out!',
        'you are Submitting your order the item from the shopping cart! \n Order Detail: \n ' + Shopping_Cart_Confirm,
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Confirm', onPress: ()=>{
            // this.Submit_Order_Confirm_On_Press(Shopping_Cart);
          } },

        ],
      )


    }


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
                this.state.Shopping_Cart_Product_List.map((product, i) =>{
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

              {/* Here is the address selection which will be represented by the Modal */}

              <Text style={{ fontSize: 25, textAlign: 'center', marginTop: 25,} }>Shipping Info</Text>

                <View style={{
                  flex: 0.2,
                  marginTop: 25,
                  marginBottom: 25,
                  borderWidth: 2,
                  justifyContent: 'center',
                  borderRadius: 10,

                }}>
                  <View style={ShoppingCartAddressExistStyle(!this.state.Shopping_Cart_Shipping_Info_Flag)}>
                    <Text>ID : {this.state.Shopping_Cart_Shipping_Info.Product_ID}</Text>
                    <Text>Specification : {this.state.Shopping_Cart_Shipping_Info.Product_Spec}</Text>
                    <Text>Price : {this.state.Shopping_Cart_Shipping_Info.Product_Price}</Text>
                    <Text>Status : {this.state.Shopping_Cart_Shipping_Info.Product_Status}</Text>
                  </View>

                  <View style={ShoppingCartAddressExistStyle(this.state.Shopping_Cart_Shipping_Info_Flag)}>
                    <TouchableOpacity >
                      <Text style={{fontSize: 25} }>Choose a Shipping Address</Text>
                    </TouchableOpacity>

                  </View>

                </View>



              <TouchableOpacity onPress = {() => this.Submit_Order_On_Press(this.state.Shopping_Cart_Product_List)}>
                <Text style={{fontSize: 25, textAlign: 'center'} }>Submit the Order</Text>
              </TouchableOpacity>


            </ScrollView>


          );
    }



  }
}
