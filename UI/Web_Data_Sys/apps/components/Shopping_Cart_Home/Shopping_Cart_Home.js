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
import {getshoppingcart, getaddressbook, shoppingcartquantitychange, deletefromshoppingcart, addnewaddress, submitorder} from '../../server.js';
import {ShoppingCartAddressExistStyle, PraseCityValue, ShowProvinceName, ShowCityName, ShowDistrictName, GetCityForProvince, AddNewAddressCheck, Product_Image, GetDistrictForCity} from '../../util.js';
import Shopping_Cart_Home_Header from './Shopping_Cart_Home_Header.js';
import { Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
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
  RefreshControl,
  Modal,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class Shopping_Cart_Home extends Component<{}> {


    static navigationOptions = {
      header: <Shopping_Cart_Home_Header />,
  }


  constructor(props) {
    super(props);
    this.state = {
      User_Flag : true,
      Shopping_Cart_Product_List : [],
      Shopping_Cart_Shipping_Address_List : [],


      Shopping_Cart_Shipping_Info : '',
      Shopping_Cart_Shipping_Info_Flag : false,

      Shipping_Address_Selection_Visible : false,

      Add_New_Shipping_Address_Visible : false,

      Choose_Province_Add_New_Shipping_Address_Visible : false,

      Choose_City_Add_New_Shipping_Address_Visible : false,

      Choose_District_Add_New_Shipping_Address_Visible : false,

      New_Province_Value: '',


      New_City_Value: '',


      New_Address_Name_Value: '',
      New_Address_Phone_Number_Value: '',
      New_Street_Value: '',
      New_District_Value: '',


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
          Shopping_Cart_Shipping_Info_Flag : false,

          Shipping_Address_Selection_Visible : false,

          Add_New_Shipping_Address_Visible : false,

          Choose_Province_Add_New_Shipping_Address_Visible : false,

          Choose_City_Add_New_Shipping_Address_Visible : false,

          Choose_District_Add_New_Shipping_Address_Visible : false,

          New_Province_Value: '',


          New_City_Value: '',


          New_Address_Name_Value: '',
          New_Address_Phone_Number_Value: '',
          New_Street_Value: '',
          New_District_Value: '',

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

                if (this.state.Shopping_Cart_Shipping_Info == '') {

                  this.setState({
                    User_Flag : true,
                    Shopping_Cart_Shipping_Address_List : Address_Book_List,
                    Shopping_Cart_Product_List : Shopping_Cart_Product_List,
                    Refreshing_Flag : false,

                    Shopping_Cart_Shipping_Info : Address_Book_List[0],
                    Shopping_Cart_Shipping_Info_Flag : true,

                    Shipping_Address_Selection_Visible : false,

                    Add_New_Shipping_Address_Visible : false,

                    Choose_Province_Add_New_Shipping_Address_Visible : false,

                    Choose_City_Add_New_Shipping_Address_Visible : false,

                    Choose_District_Add_New_Shipping_Address_Visible : false,

                    New_Province_Value: '',


                    New_City_Value: '',


                    New_Address_Name_Value: '',
                    New_Address_Phone_Number_Value: '',
                    New_Street_Value: '',
                    New_District_Value: '',

                  }, ()=>{
                    console.log(this.state.Shopping_Cart_Shipping_Address_List);
                  });

                } else {

                  this.setState({
                    User_Flag : true,
                    Shopping_Cart_Shipping_Address_List : Address_Book_List,
                    Shopping_Cart_Product_List : Shopping_Cart_Product_List,
                    Refreshing_Flag : false,

                    Shopping_Cart_Shipping_Info : this.state.Shopping_Cart_Shipping_Info,
                    Shopping_Cart_Shipping_Info_Flag : true,

                    Shipping_Address_Selection_Visible : false,

                    Add_New_Shipping_Address_Visible : false,

                    Choose_Province_Add_New_Shipping_Address_Visible : false,

                    Choose_City_Add_New_Shipping_Address_Visible : false,

                    Choose_District_Add_New_Shipping_Address_Visible : false,

                    New_Province_Value: '',


                    New_City_Value: '',


                    New_Address_Name_Value: '',
                    New_Address_Phone_Number_Value: '',
                    New_Street_Value: '',
                    New_District_Value: '',

                  }, ()=>{
                    console.log(this.state.Shopping_Cart_Shipping_Address_List);
                  });

                }




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
            Shopping_Cart_Shipping_Info_Flag : false,

            Shipping_Address_Selection_Visible : false,

            Add_New_Shipping_Address_Visible : false,

            Choose_Province_Add_New_Shipping_Address_Visible : false,

            Choose_City_Add_New_Shipping_Address_Visible : false,

            Choose_District_Add_New_Shipping_Address_Visible : false,

            New_Province_Value: '',


            New_City_Value: '',


            New_Address_Name_Value: '',
            New_Address_Phone_Number_Value: '',
            New_Street_Value: '',
            New_District_Value: '',

          });
        }

        else {
          const TempProduct = {
            Products_ID : Product.Products_ID,
            Products_Units : Product.Products_Units + 1
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


    // End of Shopping_Cart_Quantity_Plus
  }



  Shopping_Cart_Quantity_Minus(Product){

    if (Product.Products_Units < 1) {

      Alert.alert(
          'Sorry',
          'Requested quantity less than 1! ',
        [
          {text: 'OK', style: 'cancel'},
        ],
      )

    }
    else if (Product.Products_Units == 1 ) {

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
            Shopping_Cart_Shipping_Info_Flag : false,
            Shipping_Address_Selection_Visible : false,

            Add_New_Shipping_Address_Visible : false,

            Choose_Province_Add_New_Shipping_Address_Visible : false,

            Choose_City_Add_New_Shipping_Address_Visible : false,

            Choose_District_Add_New_Shipping_Address_Visible : false,

            New_Province_Value: '',


            New_City_Value: '',


            New_Address_Name_Value: '',
            New_Address_Phone_Number_Value: '',
            New_Street_Value: '',
            New_District_Value: '',
          });
        }

        else {
          const TempProduct = {
            Products_ID : Product.Products_ID,
            Products_Units : Product.Products_Units - 1
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
          Shopping_Cart_Shipping_Info_Flag : false,

          Shipping_Address_Selection_Visible : false,

          Add_New_Shipping_Address_Visible : false,

          Choose_Province_Add_New_Shipping_Address_Visible : false,

          Choose_City_Add_New_Shipping_Address_Visible : false,

          Choose_District_Add_New_Shipping_Address_Visible : false,

          New_Province_Value: '',


          New_City_Value: '',


          New_Address_Name_Value: '',
          New_Address_Phone_Number_Value: '',
          New_Street_Value: '',
          New_District_Value: '',
        });
      }

      else {
        const Products_ID = Product.Products_ID

        deletefromshoppingcart(User_ID, Products_ID, (response) =>{

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


  // Here function for handle the modal for the shipping address list
  Open_Shipping_Address_Selection_Modal(){
    this.setState({
      Shipping_Address_Selection_Visible: true
    });
  }

  Close_Shipping_Address_Selection_Modal(){
    this.setState({
      Shipping_Address_Selection_Visible : false
    });
  }


  // Here function for choose the shipping address

  Choose_Shipping_Address(Address){
    this.setState({
      Shopping_Cart_Shipping_Info : Address,
      Shopping_Cart_Shipping_Info_Flag : true,
      Shipping_Address_Selection_Visible : false
    });
  }



  // Here function for adding new address and choose it

  Open_Add_New_Shipping_Address_Modal(){
    this.setState({
      Add_New_Shipping_Address_Visible: true
    });
  }

  Close_Add_New_Shipping_Address_Modal(){
    this.setState({
      Add_New_Shipping_Address_Visible: false
    });
  }


  // Here function for selecting province modal
  Open_Choose_Province_Add_New_Shipping_Address_Modal(){
    this.setState({
      Choose_Province_Add_New_Shipping_Address_Visible: true
    });
  }

  Close_Choose_Province_Add_New_Shipping_Address_Modal(){
    this.setState({
      Choose_Province_Add_New_Shipping_Address_Visible: false
    });
  }

  New_Province_Handler(item){
    this.setState({
      New_Province_Value: item.key,

      Choose_Province_Add_New_Shipping_Address_Visible: false,

      New_City_Value: '',


      New_Street_Value: '',
      New_District_Value: ''
    });
  }

  // Next is choosing the city
  Open_Choose_City_Add_New_Shipping_Address_Modal(){
    if (this.state.New_Province_Value == '') {
      Alert.alert(
        'Oops',
        'Please Choose a province first',
        [
          {text: 'OK'},
        ],
      )
    }
    else {
      this.setState({
        Choose_City_Add_New_Shipping_Address_Visible : true
      });
    }


  }

  Close_Choose_City_Add_New_Shipping_Address_Modal(){
    this.setState({
      Choose_City_Add_New_Shipping_Address_Visible : false
    });
  }

  New_City_Handler(item){
    this.setState({
      New_City_Value: item.key,
      Choose_City_Add_New_Shipping_Address_Visible: false,

      New_Street_Value: '',
      New_District_Value: ''
    });
  }

  // Next is choosing the District
  Open_Choose_District_Add_New_Shipping_Address_Modal(){
    if (this.state.New_City_Value == '') {
      Alert.alert(
        'Oops',
        'Please Choose a city first',
        [
          {text: 'OK'},
        ],
      )
    }
    else {
      this.setState({
        Choose_District_Add_New_Shipping_Address_Visible : true
      });
    }


  }

  Close_Choose_City_Add_New_Shipping_Address_Modal(){
    this.setState({
      Choose_District_Add_New_Shipping_Address_Visible : false
    });
  }

  New_District_Handler(item){
    this.setState({
      New_District_Value: item.key,
      Choose_District_Add_New_Shipping_Address_Visible: false,
      New_Street_Value: '',
    });
  }



  New_Street_Handler(text){
    this.setState({
      New_Street_Value: text
    });
  }


  New_Address_Name_Handler(text){
    this.setState({
      New_Address_Name_Value: text
    });
  }

  New_Address_Phone_Number_Handler(text){
    this.setState({
      New_Address_Phone_Number_Value: text
    });
  }



  //Here is function for submit the new Address

  Submit_New_Address_On_Press(){
    if (this.state.New_Province_Value == '' || this.state.New_City_Value == '' || this.state.New_Street_Value == '' ||  this.state.New_District_Value == '' ||  this.state.New_Address_Name_Value == '' ||  this.state.New_Address_Phone_Number_Value == '') {

      Alert.alert(
        'Oops',
        AddNewAddressCheck(this.state.New_Province_Value, this.state.New_City_Value, this.state.New_Street_Value, this.state.New_District_Value, this.state.New_Address_Name_Value, this.state.New_Address_Phone_Number_Value),
        [
          {text: 'OK'},
        ],
      )

    } else {

      const New_Address = this.state.New_Address_Name_Value + '\n' + this.state.New_Address_Phone_Number_Value + '\n' + this.state.New_Province_Value + '\n' + this.state.New_City_Value + '\n' + this.state.New_Street_Value + '\n' +  this.state.New_District_Value

      Alert.alert(
        'Watch Out!',
        'you are adding new address! \n Address Detail: \n ' + New_Address,
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Confirm', onPress: ()=>{
            this.Submit_New_Address(this.state.New_Address_Name_Value, this.state.New_Address_Phone_Number_Value, this.state.New_Province_Value, this.state.New_City_Value, this.state.New_Street_Value, this.state.New_District_Value)
          }},

        ],
      )


    }
  }


  // Submit new address function
  Submit_New_Address(Address_Name, Address_Phone_Number, Province, City, Street, District){
    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        Alert.alert(
            'Oops',
            'There is something wrong with the log in!',
          [
            {text: 'OK', onPress: ()=>{
              this.props.navigation.navigate('User_Home');
            }},
          ],
        )

      }

      else {
        const New_Address = {
          Address_Name: Address_Name,
          Address_Phone_Number: Address_Phone_Number,
          Province: Province,
          City: City,
          Street: Street,
          District: District
        }

        addnewaddress(User_ID, New_Address, (response) =>{
          const submit_new_address_status_code = response["StatusCode"]
          const Address = response["ResponseText"]


          if (submit_new_address_status_code == 200) {
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

                  Shopping_Cart_Shipping_Address_List : Address_Book_List,

                  Shipping_Address_Selection_Visible : true,

                  Add_New_Shipping_Address_Visible : false,

                  Choose_Province_Add_New_Shipping_Address_Visible : false,

                  Choose_City_Add_New_Shipping_Address_Visible : false,

                  Choose_District_Add_New_Shipping_Address_Visible : false,

                  New_Province_Value: '',


                  New_City_Value: '',


                  New_Address_Name_Value: '',
                  New_Address_Phone_Number_Value: '',
                  New_Street_Value: '',
                  New_District_Value: ''

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

            Alert.alert(
                'Oops',
                'Error Code:' + submit_new_address_status_code + '\n' +'There is something wrong with the server! Try again later!',
              [
                {text: 'OK'},
              ],
            )

          }



        });

      }

    });
  }



  Submit_Order(Shopping_Cart, Shipping_Address){

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
          Shopping_Cart_Shipping_Info_Flag : false,

          Shipping_Address_Selection_Visible : false,

          Add_New_Shipping_Address_Visible : false,

          Choose_Province_Add_New_Shipping_Address_Visible : false,

          Choose_City_Add_New_Shipping_Address_Visible : false,

          Choose_District_Add_New_Shipping_Address_Visible : false,

          New_Province_Value: '',


          New_City_Value: '',


          New_Address_Name_Value: '',
          New_Address_Phone_Number_Value: '',
          New_Street_Value: '',
          New_District_Value: '',
        });
      }

      else {

        submitorder(User_ID, Shopping_Cart, Shipping_Address, (response) =>{

          const submit_order_code = response["StatusCode"]

          const Order_ID = response["ResponseText"]


          if (submit_order_code == 200) {

            Alert.alert(
              'Success',
              'Your Order : ' + Order_ID + ' has been submitted! \n Next you will be directed to payments!',
              [
                {text: 'OK', style: 'cancel', onPress: () =>{
                  this.props.navigation.navigate('Order_Confirmation', { Order_ID : Order_ID})
                }},
              ],
            )


          } else {

            Alert.alert(
              'Oops',
              'Error Code:' + submit_order_code + '\n' +'There is something wrong with the server! Try again later!',
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


  }



  Submit_Order_On_Press(Shopping_Cart_Product_List, Shipping_Address_Info){

    if (Shopping_Cart_Product_List.length <= 0) {

      Alert.alert(
          'Oops!',
          'There is nothing in your shopping cart! ',
        [
          {text: 'OK', style: 'cancel'}

        ],
      )

    }

    else if (Shipping_Address_Info == '') {

      Alert.alert(
          'Oops!',
          'There is no shipping info, please select shipping info! ',
        [
          {text: 'OK', style: 'cancel'}

        ],
      )

    }

    else {

      var Shopping_Cart_Confirm = ''

      var Warning_Flag = false

      var Warning_Message = 'The products: \n'

      console.log(Shopping_Cart_Product_List.length);

      for (var Product in Shopping_Cart_Product_List) {
        var TempProduct = Shopping_Cart_Product_List[Product]
        if (TempProduct.Products_Status == 0) {
          Warning_Flag = true
          Warning_Message = Warning_Message + TempProduct.Products_Name + '\n'
        }
        console.log(Shopping_Cart_Product_List[Product]);
        console.log('\n');
        Shopping_Cart_Confirm = Shopping_Cart_Confirm + TempProduct.Products_Name + ':' + TempProduct.Products_Units + '\n' + '----------' + '\n'

      }

      Warning_Message = Warning_Message + 'has no stock, it may takes few days for delievery'

      Total_Price = this.Calculate_Total_Price(Shopping_Cart_Product_List)

      Shopping_Cart_Confirm = Shopping_Cart_Confirm + 'Total Price: ' + Total_Price + '\n'

      const Shipping_Info = Shipping_Address_Info.Address_Name + '\n' + Shipping_Address_Info.Address_Phone_Number + '\n' + Shipping_Address_Info.Address_ID + '\n' + Shipping_Address_Info.Street + '\n' + Shipping_Address_Info.City + '\n' + Shipping_Address_Info.Province + '\n' + Shipping_Address_Info.District + '\n'

      console.log(Shopping_Cart_Confirm);

      Alert.alert(
        'Watch Out!',
        Warning_Message,
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Confirm', onPress: ()=>{

                  Alert.alert(
                    'Watch Out!',
                    'you are Submitting your order the item from the shopping cart! \n Order Detail: \n ' + Shopping_Cart_Confirm + ' \n Shipping Detail: \n' + Shipping_Info,
                    [
                      {text: 'Cancel', style: 'cancel'},
                      {text: 'Confirm', onPress: ()=>{
                        this.Submit_Order(Shopping_Cart_Product_List, Shipping_Address_Info);
                      } },

                    ],
                  )


          } },

        ],
      )




    }


    // End of Submit_Order_On_Press
  }

  // Next function will help calculate the total price of the shopping cart
  Calculate_Total_Price(Shopping_Cart_Product_List){
    Total_Price = 0
    for (var Product in Shopping_Cart_Product_List) {
      var TempProduct = Shopping_Cart_Product_List[Product]
      console.log(Shopping_Cart_Product_List[Product]);
      console.log('\n');
      Total_Price = Total_Price + TempProduct.Products_Units*TempProduct.Products_Price

    }

    return(Total_Price)
  }


  // Next function will show the total price of the shopping cart

  Show_Total_Price(Shopping_Cart_Product_List){
    if (Shopping_Cart_Product_List.length > 0) {
      Total_Price = this.Calculate_Total_Price(Shopping_Cart_Product_List)
      return(Total_Price)
    }
    else {
      return(0)
    }
  }

  // Next function will show the Deposit price of the shopping cart

  Show_Deposit_Price(Shopping_Cart_Product_List){
    if (Shopping_Cart_Product_List.length > 0) {
      Total_Price = this.Calculate_Total_Price(Shopping_Cart_Product_List)

      if (Total_Price > 50000) {
        console.log(Total_Price*0.2);
        return( (Total_Price*0.2).toFixed(0) )

      }
      else {
        return(Total_Price)
      }

    }
    else {
      return(0)
    }
  }


    Swipe_Out_Button(product){
      return(
        [{
          text: '删除',
          type: 'delete',
          onPress: (product)=> this.Delete_Item_On_Press(product),
        }]
      )
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

      Alert.alert(
        'Warning !',
        'Please Sign in to see the Shopping Cart!',
        [
          {text: 'Confirm', onPress: ()=>{
            this.props.navigation.navigate('User_Home');
          } },

        ],
      )

      return(
        <View>

        </View>
      )

    }


    else {


          return (


            <KeyboardAvoidingView keyboardVerticalOffset={60} behavior={'position'} >



              <TouchableOpacity  onPress = {() => this.Open_Shipping_Address_Selection_Modal()} activeOpacity={0.8} style={{backgroundColor: '#cbcbcb', height: '15%',  justifyContent: 'center', borderStyle: 'dotted', borderWidth: 2, borderColor: 'black',}}>

                <View style={ShoppingCartAddressExistStyle(!this.state.Shopping_Cart_Shipping_Info_Flag)}>

                <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, flexWrap:'wrap'}}>
                  <Text style={{fontSize: 20, }} >{this.state.Shopping_Cart_Shipping_Info.Address_Name}, </Text>
                  <Text style={{fontSize: 20}}>{this.state.Shopping_Cart_Shipping_Info.Address_Phone_Number}</Text>
                </View>

                <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, marginRight: 10, flexWrap:'wrap'}}>

                  <Text style={{fontSize: 16}} >{this.state.Shopping_Cart_Shipping_Info.Street}, {this.state.Shopping_Cart_Shipping_Info.City}, {this.state.Shopping_Cart_Shipping_Info.Province}, {this.state.Shopping_Cart_Shipping_Info.District}</Text>

                </View>

                </View>

                <View style={ShoppingCartAddressExistStyle(this.state.Shopping_Cart_Shipping_Info_Flag)}>

                  <Text style={{fontSize: 25} }>Choose a Shipping Address</Text>

                </View>

              </TouchableOpacity>

              {/* Main Feed for each product in the shopping cart */}

              <ScrollView refreshControl={ <RefreshControl onRefresh={this.OnRefresh.bind(this)} refreshing = {this.state.Refreshing_Flag} />} style={{backgroundColor: '#ededed', height: '77%', flexDirection:'column'}}>

                {
                  this.state.Shopping_Cart_Product_List.map((product, i) =>{
                    return(

                      <Swipeout key={i} style={{height:170, backgroundColor: 'white',  marginTop:5, marginBottom:5}} right={this.Swipe_Out_Button(product)} autoClose={true}>
                        <TouchableOpacity activeOpacity={1}  style={{width: '100%', backgroundColor: 'white', flexDirection:'row',}}>

                          <View style={{width: '40%'}}>
                            <Image
                              source={Product_Image[product.Products_Image_Dir]}
                              style={{height:'100%', width: '100%'}}/>
                          </View>

                          <View style={{width: '60%', flexDirection:'column', marginLeft: 10, marginTop:10, flexWrap:'wrap'}}>

                            <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5}}>
                              <Text style={{fontSize: 20}}>{product.Products_Name}(XXXXXXXXXXXXXXXXXXXXX)</Text>
                            </View>

                            <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5}}>
                              <Text style={{fontSize: 15}}>商品编号: {product.Products_Number} </Text>
                            </View>

                            <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5}}>
                              <Text style={{fontSize: 15, marginRight: 10}}>规格 : {product.Products_Spec}</Text>
                            </View>

                            <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5}}>
                              <Text style={{fontSize: 15}}>表色 : {product.Products_Color}</Text>
                            </View>

                            <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5}}>
                              <Text style={{fontSize: 15}}>价格 : {product.Products_Price}/千件</Text>
                            </View>


                            <View style={{flexDirection:'row', alignItems: 'center',}}>

                              <TouchableOpacity onPress = {() => this.Shopping_Cart_Quantity_Minus(product)}>
                                <Icon name='remove' />
                              </TouchableOpacity>

                              <TextInput

                                placeholderTextColor="black"

                                value={String(product.Products_Units)}

                                keyboardType={'numeric'}
                                style={{
                                  marginBottom: 5,
                                  marginTop:5,
                                  marginLeft:5,
                                  marginRight:5,
                                  borderWidth: 2,
                                  borderRadius: 5,
                                  width: 50}} />


                              <TouchableOpacity onPress = {() => this.Shopping_Cart_Quantity_Plus(product)}>
                                <Icon name='add' />
                              </TouchableOpacity>


                            </View>

                          </View>


                        </TouchableOpacity>
                      </Swipeout>

                    );
                  })
                }


              </ScrollView>




              <View style={{height: '8%', flexDirection:'row'}}>

                <View style={{height:'100%', backgroundColor: '#f3f670', width: '60%', flexDirection:'column'}}>
                  <Text style={{color: 'black', fontWeight:'bold', textAlign: 'left', fontSize: 17, marginLeft:5 }}> 总价: {this.Show_Total_Price(this.state.Shopping_Cart_Product_List)}</Text>


                  <Text style={{color: 'black', fontWeight:'bold', textAlign: 'left', fontSize: 17, marginLeft:5 }}> 定金: {this.Show_Deposit_Price(this.state.Shopping_Cart_Product_List)} </Text>
                </View>



                <TouchableOpacity onPress = {() => this.Submit_Order_On_Press(this.state.Shopping_Cart_Product_List, this.state.Shopping_Cart_Shipping_Info)} activeOpacity={0.5} style={{height:'100%', backgroundColor: '#79fcfc', width: '40%', flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: 'black', fontWeight:'bold', textAlign: 'center', fontSize: 20}}> 提交订单 </Text>
                </TouchableOpacity>

              </View>




              {/* Modals starts from here*/}


              <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.Shipping_Address_Selection_Visible}
                >

                <ScrollView>
                {
                  this.state.Shopping_Cart_Shipping_Address_List.map((Address, i) => {
                    return(
                      <TouchableOpacity onPress = {() => this.Choose_Shipping_Address(Address)} key={i} >
                        <View style={{

                            marginTop: 25,
                            borderWidth: 2,
                            justifyContent: 'center',
                            borderRadius: 10,

                          }}>
                          <Text>key : {i}</Text>
                          <Text>ID : {Address.Address_ID}</Text>
                          <Text>Name : {Address.Address_Name}</Text>
                          <Text>Phone : {Address.Address_Phone_Number}</Text>
                          <Text>Street : {Address.Street}</Text>
                          <Text>City : {Address.City}</Text>
                          <Text>Province : {Address.Province}</Text>
                          <Text>District : {Address.District}</Text>

                        </View>
                      </TouchableOpacity >


                    );
                  })
                }



                <View style = {{ marginTop: 25, marginBottom:10, borderWidth: 2, borderRadius: 10 }}>
                  <TouchableOpacity onPress = {() => this.Open_Add_New_Shipping_Address_Modal()}  >
                    <Text style={{ fontSize: 25, textAlign: 'center'} }>Enter New Address</Text>
                  </TouchableOpacity>

                </View>


                <View style = {{ marginTop: 25, marginBottom:10, borderWidth: 2, borderRadius: 10 }}>
                  <TouchableOpacity onPress = {() => this.Close_Shipping_Address_Selection_Modal()} >
                    <Text style={{ fontSize: 25, textAlign: 'center'} }>Cancel</Text>
                  </TouchableOpacity>

                </View>

                </ScrollView>




                {/* Here is the modal for Add new address */}

                <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.Add_New_Shipping_Address_Visible}

                  >
                  <View style={{
                    marginTop: 25,
                    justifyContent: 'center',
                  }}>

                  <Text style={{ marginTop: 10, fontSize: 25, textAlign: 'center'} }>Add New Address</Text>

                  </View>

                  <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
                    <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                      Name:
                    </Text>
                    <TextInput
                      value = {this.state.New_Address_Name_Value}
                      style={{
                        marginTop: 20,
                        height: '50%',
                        width: '50%',
                        borderWidth: 2,
                        borderRadius: 10,

                      }} onChangeText = {(text) => this.New_Address_Name_Handler(text)} autoCapitalize='none' />
                  </View>

                  <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
                    <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                      Phone:
                    </Text>
                    <TextInput
                      value = {this.state.New_Address_Phone_Number_Value}
                      style={{
                        marginTop: 20,
                        height: '50%',
                        width: '50%',
                        borderWidth: 2,
                        borderRadius: 10,

                      }} onChangeText = {(text) => this.New_Address_Phone_Number_Handler(text)} autoCapitalize='none' />
                  </View>

                  <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
                    <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                      Province:
                    </Text>

                    <TouchableOpacity style={{
                      marginTop: 20,
                      height: '50%',
                      width: '50%',
                      borderWidth: 2,
                      borderRadius: 10,
                    }} onPress={()=> this.Open_Choose_Province_Add_New_Shipping_Address_Modal()}>
                      <Text style={{fontSize: 20, textAlign: 'center'}}>{ShowProvinceName(this.state.New_Province_Value)}</Text>
                    </TouchableOpacity>

                  </View>

                  <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
                    <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                      City:
                    </Text>

                    <TouchableOpacity style={{
                      marginTop: 20,
                      height: '50%',
                      width: '50%',
                      borderWidth: 2,
                      borderRadius: 10,
                    }} onPress={()=> this.Open_Choose_City_Add_New_Shipping_Address_Modal()}>
                      <Text style={{fontSize: 20, textAlign: 'center'}}>{ShowCityName(this.state.New_City_Value)}</Text>
                    </TouchableOpacity>

                  </View>

                  <View style={{flex: 0.15, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
                    <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                      District:
                    </Text>
                    <TouchableOpacity style={{
                      marginTop: 20,
                      height: '50%',
                      width: '50%',
                      borderWidth: 2,
                      borderRadius: 10,
                    }} onPress={()=> this.Open_Choose_District_Add_New_Shipping_Address_Modal()}>
                      <Text style={{fontSize: 20, textAlign: 'center'}}>{ShowDistrictName(this.state.New_District_Value)}</Text>
                    </TouchableOpacity>
                  </View>


                  <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
                    <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                      Street:
                    </Text>
                    <TextInput
                      value = {this.state.New_Street_Value}
                      style={{
                        marginTop: 20,
                        height: '50%',
                        width: '50%',
                        borderWidth: 2,
                        borderRadius: 10,

                      }} onChangeText = {(text) => this.New_Street_Handler(text)} autoCapitalize='none' />
                  </View>

                  <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

                    <View style={{
                      marginTop: 25,
                      height: '50%',
                      width: '60%',
                      left: '85%',
                      borderWidth: 2,
                      justifyContent: 'center',
                      borderRadius: 10,

                    }}>

                    <TouchableOpacity onPress={() => this.Submit_New_Address_On_Press()}>
                      <Text style={{ fontSize: 25, textAlign: 'center'} }>提交</Text>
                    </TouchableOpacity>

                    </View>

                  </View>

                  <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

                    <View style={{

                      marginTop: 25,
                      height: '50%',
                      width: '60%',
                      left: '85%',
                      borderWidth: 2,
                      justifyContent: 'center',
                      borderRadius: 10,

                    }}>

                    <TouchableOpacity onPress={()=> this.Close_Add_New_Shipping_Address_Modal()}>
                      <Text style={{ fontSize: 25, textAlign: 'center'} }>取消</Text>
                    </TouchableOpacity>

                    </View>

                  </View>





                  {/* Start of Province Modal */}
                  <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.Choose_Province_Add_New_Shipping_Address_Visible} >

                  <View style={{
                    marginTop: 25,
                    justifyContent: 'center',
                  }}>

                  <Text style={{ fontSize: 25, textAlign: 'center'} }>Please Choose a Province</Text>

                  </View>

                  <FlatList
                    data={[
                      {key: 'zhejiang'},
                      {key: 'shanghai'},
                      {key: 'hebei'},
                      {key: 'anhui'},
                      {key: 'jiangxi'},
                      {key: 'jiangsu'},
                    ]}
                    renderItem={({item}) => {return(
                      <TouchableOpacity onPress={()=> this.New_Province_Handler(item)}>
                        <Text style={{
                        marginTop: 10,
                        borderWidth: 2,
                        justifyContent: 'center',
                        borderRadius: 10,
                        fontSize: 20,
                        textAlign: 'center'} }>{item.key}</Text>
                      </TouchableOpacity>
                    )} }
                    />


                  <View style={{
                  flex: 0.15,
                  flexDirection:'row',
                  backgroundColor:'grey',
                  justifyContent: 'center',}}>


                    <TouchableOpacity onPress={()=> this.Close_Choose_Province_Add_New_Shipping_Address_Modal()}>
                      <Text style={{
                      width:300,
                      marginTop: 10,
                      borderWidth: 2,
                      borderRadius: 10,
                      fontSize: 25,
                      textAlign: 'center'} }>取消</Text>
                    </TouchableOpacity>


                  </View>



                  </Modal>

                  {/* End of Choose province Modal input */}



                  {/* Start of City Modal */}
                  <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.Choose_City_Add_New_Shipping_Address_Visible} >

                  <View style={{
                    marginTop: 25,
                    justifyContent: 'center',
                  }}>

                  <Text style={{ fontSize: 25, textAlign: 'center'} }>Please Choose a City</Text>

                  </View>

                  <FlatList
                    data={GetCityForProvince(this.state.New_Province_Value)}
                    renderItem={({item}) => {return(
                      <TouchableOpacity onPress={()=> this.New_City_Handler(item)}>
                        <Text style={{
                        marginTop: 10,
                        borderWidth: 2,
                        justifyContent: 'center',
                        borderRadius: 10,
                        fontSize: 20,
                        textAlign: 'center'} }>{item.key}</Text>
                      </TouchableOpacity>
                    )} }
                    />


                  <View style={{
                  flex: 0.15,
                  flexDirection:'row',
                  backgroundColor:'grey',
                  justifyContent: 'center',}}>


                    <TouchableOpacity onPress={()=> this.Close_Choose_City_Add_New_Shipping_Address_Modal()}>
                      <Text style={{
                      width:300,
                      marginTop: 10,
                      borderWidth: 2,
                      borderRadius: 10,
                      fontSize: 25,
                      textAlign: 'center'} }>取消</Text>
                    </TouchableOpacity>


                  </View>



                  </Modal>
                {/*   End of Choose City Modal input */}


                  {/* Start of District Modal */}
                  <Modal
                  animationType="slide"
                  transparent={false}
                  visible={this.state.Choose_District_Add_New_Shipping_Address_Visible} >

                  <View style={{
                    marginTop: 25,
                    justifyContent: 'center',
                  }}>

                  <Text style={{ fontSize: 25, textAlign: 'center'} }>Please Choose a District</Text>

                  </View>

                  <FlatList
                    data={GetDistrictForCity(this.state.New_City_Value)}
                    renderItem={({item}) => {return(
                      <TouchableOpacity onPress={()=> this.New_District_Handler(item)}>
                        <Text style={{
                        marginTop: 10,
                        borderWidth: 2,
                        justifyContent: 'center',
                        borderRadius: 10,
                        fontSize: 20,
                        textAlign: 'center'} }>{item.key}</Text>
                      </TouchableOpacity>
                    )} }
                    />


                  <View style={{
                  flex: 0.15,
                  flexDirection:'row',
                  backgroundColor:'grey',
                  justifyContent: 'center',}}>


                    <TouchableOpacity onPress={()=> this.Close_Choose_District_Add_New_Shipping_Address_Modal()}>
                      <Text style={{
                      width:300,
                      marginTop: 10,
                      borderWidth: 2,
                      borderRadius: 10,
                      fontSize: 25,
                      textAlign: 'center'} }>取消</Text>
                    </TouchableOpacity>


                  </View>



                  </Modal>
                {/*   End of Choose District Modal input */}




                  {/* Here is the modal for Add new address */}
                </Modal>







              </Modal>





            </KeyboardAvoidingView>




          );
    }



  }
}
