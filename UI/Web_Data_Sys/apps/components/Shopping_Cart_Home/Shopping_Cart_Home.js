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
import {getshoppingcart, getaddressbook, shoppingcartquantitychange, deletefromshoppingcart, addnewaddress, deleteaddress, editaddress, submitorder} from '../../server.js';
import {ShoppingCartAddressExistStyle, PraseCityValue, ShowProvinceName, ShowCityName, ShowDistrictName, GetCityForProvince, AddNewAddressCheck, Product_Image, GetDistrictForCity, GetProvince, DropDownHolder} from '../../util.js';
import Shopping_Cart_Home_Header from './Shopping_Cart_Home_Header.js';
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
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
  Picker,
  AsyncStorage,
  ScrollView,
  RefreshControl,
  FlatList,
  KeyboardAvoidingView,

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


      Edit_Shipping_Address_Visible : false,

      Choose_Province_Edit_Shipping_Address_Visible : false,

      Choose_City_Edit_Shipping_Address_Visible : false,

      Choose_District_Edit_Shipping_Address_Visible : false,

      Edit_Province_Value: '',


      Edit_City_Value: '',


      Edit_Address_Name_Value: '',
      Edit_Address_Phone_Number_Value: '',
      Edit_Street_Value: '',
      Edit_District_Value: '',



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


          Edit_Shipping_Address_Visible : false,

          Choose_Province_Edit_Shipping_Address_Visible : false,

          Choose_City_Edit_Shipping_Address_Visible : false,

          Choose_District_Edit_Shipping_Address_Visible : false,

          Edit_Province_Value: '',


          Edit_City_Value: '',


          Edit_Address_Name_Value: '',
          Edit_Address_Phone_Number_Value: '',
          Edit_Street_Value: '',
          Edit_District_Value: '',



          Refreshing_Flag : false
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

              Shopping_Cart_Product_List.push(Products[product])
            }


            getaddressbook(User_ID, (response) => {

              const get_address_book_code = response["StatusCode"]

              const Address_Book = response["ResponseText"]

              if (get_address_book_code == 200 || get_address_book_code == 622) {

                var Address_Book_List = []

                for (var Address in Address_Book) {

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

                    Edit_Shipping_Address_Visible : false,

                    Choose_Province_Edit_Shipping_Address_Visible : false,

                    Choose_City_Edit_Shipping_Address_Visible : false,

                    Choose_District_Edit_Shipping_Address_Visible : false,

                    Edit_Province_Value: '',


                    Edit_City_Value: '',


                    Edit_Address_Name_Value: '',
                    Edit_Address_Phone_Number_Value: '',
                    Edit_Street_Value: '',
                    Edit_District_Value: '',

                  }, ()=>{
                    // console.log(this.state.Shopping_Cart_Shipping_Address_List);
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

                    Edit_Shipping_Address_Visible : false,

                    Choose_Province_Edit_Shipping_Address_Visible : false,

                    Choose_City_Edit_Shipping_Address_Visible : false,

                    Choose_District_Edit_Shipping_Address_Visible : false,

                    Edit_Province_Value: '',


                    Edit_City_Value: '',


                    Edit_Address_Name_Value: '',
                    Edit_Address_Phone_Number_Value: '',
                    Edit_Street_Value: '',
                    Edit_District_Value: '',

                  }, ()=>{
                    // console.log(this.state.Shopping_Cart_Shipping_Address_List);
                  });

                }




              } else {

                var errormsg = ErrorCodePrase(get_address_book_code)[1]

                var title = ErrorCodePrase(get_address_book_code)[0]

                // console.log(ErrorCodePrase(get_address_book_code))


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


            Edit_Shipping_Address_Visible : false,

            Choose_Province_Edit_Shipping_Address_Visible : false,

            Choose_City_Edit_Shipping_Address_Visible : false,

            Choose_District_Edit_Shipping_Address_Visible : false,

            Edit_Province_Value: '',


            Edit_City_Value: '',


            Edit_Address_Name_Value: '',
            Edit_Address_Phone_Number_Value: '',
            Edit_Street_Value: '',
            Edit_District_Value: '',



            Refreshing_Flag : false
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


      DropDownHolder.getDropDown().alertWithType('error', 'Sorry!', 'Requested quantity less than 1! ' )


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


            Edit_Shipping_Address_Visible : false,

            Choose_Province_Edit_Shipping_Address_Visible : false,

            Choose_City_Edit_Shipping_Address_Visible : false,

            Choose_District_Edit_Shipping_Address_Visible : false,

            Edit_Province_Value: '',


            Edit_City_Value: '',


            Edit_Address_Name_Value: '',
            Edit_Address_Phone_Number_Value: '',
            Edit_Street_Value: '',
            Edit_District_Value: '',



            Refreshing_Flag : false
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


          Edit_Shipping_Address_Visible : false,

          Choose_Province_Edit_Shipping_Address_Visible : false,

          Choose_City_Edit_Shipping_Address_Visible : false,

          Choose_District_Edit_Shipping_Address_Visible : false,

          Edit_Province_Value: '',


          Edit_City_Value: '',


          Edit_Address_Name_Value: '',
          Edit_Address_Phone_Number_Value: '',
          Edit_Street_Value: '',
          Edit_District_Value: '',



          Refreshing_Flag : false
        });


      }

      else {

        // console.log(Product);

        const Products_ID = Product.Products_ID

        deletefromshoppingcart(User_ID, Products_ID, (response) =>{

          const delete_from_shopping_cart_code = response["StatusCode"]

          const Products = response["ResponseText"]

          if (delete_from_shopping_cart_code == 200) {

            DropDownHolder.getDropDown().alertWithType('success', 'Success!', 'Item has been deleted from the shopping cart! ' )

            this.Refresh_Shopping_Cart()

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
      New_Province_Value: item,

      New_City_Value: '',


      New_Street_Value: '',
      New_District_Value: ''
    });
  }

  // Next is choosing the city
  Open_Choose_City_Add_New_Shipping_Address_Modal(){
    if (this.state.New_Province_Value == '') {


      Alert.alert(
        'Error!',
        'Please Choose a province first! ',
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
      New_City_Value: item,

      New_Street_Value: '',
      New_District_Value: ''
    });
  }

  // Next is choosing the District
  Open_Choose_District_Add_New_Shipping_Address_Modal(){
    if (this.state.New_City_Value == '') {

      Alert.alert(
        'Error! !',
        'Please Choose a city first!',
        [
          {text: 'Confirm'},

        ],
      )

    }
    else {
      this.setState({
        Choose_District_Add_New_Shipping_Address_Visible : true
      });
    }


  }

  Close_Choose_District_Add_New_Shipping_Address_Modal(){
    this.setState({
      Choose_District_Add_New_Shipping_Address_Visible : false
    });
  }

  New_District_Handler(item){
    this.setState({
      New_District_Value: item,
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
        'Error!',
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

        this.setState({

          User_Flag : false,
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


          Edit_Shipping_Address_Visible : false,

          Choose_Province_Edit_Shipping_Address_Visible : false,

          Choose_City_Edit_Shipping_Address_Visible : false,

          Choose_District_Edit_Shipping_Address_Visible : false,

          Edit_Province_Value: '',


          Edit_City_Value: '',


          Edit_Address_Name_Value: '',
          Edit_Address_Phone_Number_Value: '',
          Edit_Street_Value: '',
          Edit_District_Value: '',



          Refreshing_Flag : false
        });


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
                  // console.log(Address_Book[Address]);
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
                  New_District_Value: '',

                  Edit_Shipping_Address_Visible : false,

                  Choose_Province_Edit_Shipping_Address_Visible : false,

                  Choose_City_Edit_Shipping_Address_Visible : false,

                  Choose_District_Edit_Shipping_Address_Visible : false,

                  Edit_Province_Value: '',


                  Edit_City_Value: '',


                  Edit_Address_Name_Value: '',
                  Edit_Address_Phone_Number_Value: '',
                  Edit_Street_Value: '',
                  Edit_District_Value: '',

                }, ()=>{
                  //DropDownHolder.getDropDown().alertWithType('success', 'Success!', 'The New Address has been added !' )
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



  Delete_Address(Address){
    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.setState({
          User_Flag : false,
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


          Edit_Shipping_Address_Visible : false,

          Choose_Province_Edit_Shipping_Address_Visible : false,

          Choose_City_Edit_Shipping_Address_Visible : false,

          Choose_District_Edit_Shipping_Address_Visible : false,

          Edit_Province_Value: '',


          Edit_City_Value: '',


          Edit_Address_Name_Value: '',
          Edit_Address_Phone_Number_Value: '',
          Edit_Street_Value: '',
          Edit_District_Value: '',



          Refreshing_Flag : false
        });


      }

      else {
        const Address_ID = Address.Address_ID

        deleteaddress(User_ID, Address_ID, (response) =>{
          const delete_address_status_code = response["StatusCode"]
          const statusText = response["ResponseText"]


          if (delete_address_status_code == 200) {

            getaddressbook(User_ID, (response) => {

              const get_address_book_code = response["StatusCode"]

              const Address_Book = response["ResponseText"]

              if (get_address_book_code == 200 || get_address_book_code == 622) {

                var Address_Book_List = []

                for (var Address in Address_Book) {
                  // console.log(Address_Book[Address]);
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
                  New_District_Value: '',

                  Edit_Shipping_Address_Visible : false,

                  Choose_Province_Edit_Shipping_Address_Visible : false,

                  Choose_City_Edit_Shipping_Address_Visible : false,

                  Choose_District_Edit_Shipping_Address_Visible : false,

                  Edit_Province_Value: '',


                  Edit_City_Value: '',


                  Edit_Address_Name_Value: '',
                  Edit_Address_Phone_Number_Value: '',
                  Edit_Street_Value: '',
                  Edit_District_Value: '',

                }, ()=>{
                  //DropDownHolder.getDropDown().alertWithType('success', 'Success!', 'The New Address has been deleted !' )
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

          }

          else if (delete_address_status_code == 624) {

            Alert.alert(
                'Oops',
                'Error Code:' + delete_address_status_code + '\n' +'There is something wrong with the server! Try again later!',
              [
                {text: 'OK'},
              ],
            )

          }

          else {

            Alert.alert(
                'Oops',
                'There is something wrong with the server! Try again later!',
              [
                {text: 'OK'},
              ],
            )

          }



        });

      }

    });

  }




  Delete_Address_On_Press(Address){

    const Delete_Address = Address.Address_ID + '\n' + Address.Address_Name + '\n' + Address.Address_Phone_Number + '\n' + Address.Street + '\n' + Address.City + '\n' +  Address.Province + '\n' +  Address.District

    Alert.alert(
      'Watch Out!',
      'you are adding new address! \n Address Detail: \n ' + Delete_Address,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Confirm', onPress: ()=>{
          this.Delete_Address(Address)
        }},

      ],
    )
  }





  // Edit Address function start here

  Open_Edit_Address_Modal(Address){
    this.setState({
      Edit_Shipping_Address_Visible: true,

      Edit_Province_Value: Address.Province,


      Edit_City_Value: Address.City,


      Edit_Address_Name_Value: Address.Address_Name,
      Edit_Address_Phone_Number_Value: Address.Address_Phone_Number,
      Edit_Street_Value: Address.Street,
      Edit_District_Value: Address.District,
      Edit_Address_ID_Value: Address.Address_ID,
    });
  }


  Close_Edit_Address_Modal(){
    this.setState({
      Edit_Shipping_Address_Visible: false,
      Choose_City_Edit_Shipping_Address_Visible: false,
      Choose_Province_Edit_Shipping_Address_Visible: false,
      Choose_District_Edit_Shipping_Address_Visible: false,


      Edit_Province_Value: '',


      Edit_City_Value: '',


      Edit_Address_Name_Value: '',
      Edit_Address_Phone_Number_Value: '',
      Edit_Street_Value: '',
      Edit_District_Value: '',
      Edit_Address_ID_Value: '',
    });
  }


  // Add new address function start here
  Edit_Street_Handler(text){
    this.setState({
      Edit_Street_Value: text
    });
  }


  // Add new address function start here
  Edit_Address_Name_Handler(text){
    this.setState({
      Edit_Address_Name_Value: text
    });
  }

  // Add new address function start here
  Edit_Address_Phone_Number_Handler(text){
    this.setState({
      Edit_Address_Phone_Number_Value: text
    });
  }


  //Edit Province choose function

  Edit_Open_Choose_Province_Modal(){
    this.setState({
      Choose_Province_Edit_Shipping_Address_Visible: true
    });
  }

  Edit_Close_Choose_Province_Modal(){
    this.setState({
      Choose_Province_Edit_Shipping_Address_Visible: false
    });
  }

  Edit_Province_Handler(item){
    this.setState({
      Edit_Province_Value: item,


      Edit_City_Value: '',


      Edit_Street_Value: '',
      Edit_District_Value: ''
    });
  }



  //City choose function

  Edit_Open_Choose_City_Modal(){

    if (this.state.Edit_Province_Value == '') {

      Alert.alert(
        'Error!',
        'Please Choose a province first !',
        [
          {text: 'OK'},

        ],
      )

    }
    else {
      this.setState({
        Choose_City_Edit_Shipping_Address_Visible: true
      });
    }


  }

  Edit_Close_Choose_City_Modal(){
    this.setState({
      Choose_City_Edit_Shipping_Address_Visible: false
    });
  }


  Edit_City_Handler(item){
    this.setState({
      Edit_City_Value: item,

      Edit_Street_Value: '',
      Edit_District_Value: ''
    });
  }


  //District choose function

  Edit_Open_Choose_District_Modal(){

    if (this.state.Edit_City_Value == '') {

      Alert.alert(
        'Error!',
        'Please Choose a City first !',
        [
          {text: 'OK'},

        ],
      )

    }
    else {
      this.setState({
        Choose_District_Edit_Shipping_Address_Visible: true
      });
    }


  }

  Edit_Close_Choose_District_Modal(){
    this.setState({
      Choose_District_Edit_Shipping_Address_Visible: false
    });
  }


  Edit_District_Handler(item){
    this.setState({
      Edit_District_Value: item,

      Edit_Street_Value: '',
    });
  }



  Submit_Edit_Address(Address_Name, Address_Phone_Number, Address_ID, Province, City, Street, District){
    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.setState({
          User_Flag : false,
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


          Edit_Shipping_Address_Visible : false,

          Choose_Province_Edit_Shipping_Address_Visible : false,

          Choose_City_Edit_Shipping_Address_Visible : false,

          Choose_District_Edit_Shipping_Address_Visible : false,

          Edit_Province_Value: '',


          Edit_City_Value: '',


          Edit_Address_Name_Value: '',
          Edit_Address_Phone_Number_Value: '',
          Edit_Street_Value: '',
          Edit_District_Value: '',



          Refreshing_Flag : false
        });


      }

      else {
        const New_Address = {
          Address_Name: Address_Name,
          Address_Phone_Number: Address_Phone_Number,
          Address_ID: Address_ID,
          Province: Province,
          City: City,
          Street: Street,
          District: District
        }

        editaddress(User_ID, New_Address, (response) =>{
          const edit_address_status_code = response["StatusCode"]
          const statusText = response["ResponseText"]


          if (edit_address_status_code == 200) {

            getaddressbook(User_ID, (response) => {

              const get_address_book_code = response["StatusCode"]

              const Address_Book = response["ResponseText"]

              if (get_address_book_code == 200 || get_address_book_code == 622) {

                var Address_Book_List = []

                for (var Address in Address_Book) {
                  // console.log(Address_Book[Address]);
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
                  New_District_Value: '',

                  Edit_Shipping_Address_Visible : false,

                  Choose_Province_Edit_Shipping_Address_Visible : false,

                  Choose_City_Edit_Shipping_Address_Visible : false,

                  Choose_District_Edit_Shipping_Address_Visible : false,

                  Edit_Province_Value: '',


                  Edit_City_Value: '',


                  Edit_Address_Name_Value: '',
                  Edit_Address_Phone_Number_Value: '',
                  Edit_Street_Value: '',
                  Edit_District_Value: '',

                }, ()=>{
                  // DropDownHolder.getDropDown().alertWithType('success', 'Success!', 'The Address has been changed !' )
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
                'Error Code:' + edit_address_status_code + '\n' +'There is something wrong with the server! Try again later!',
              [
                {text: 'OK'},
              ],
            )

          }



        });

      }

    });

  }




  Submit_Edit_Address_On_Press(){
    if (this.state.Edit_Address_Name_Value == '' || this.state.Edit_Address_Phone_Number_Value == '' || this.state.Edit_Province_Value == '' || this.state.Edit_City_Value == '' || this.state.Edit_Street_Value == '' ||  this.state.Edit_District_Value == '') {

      Alert.alert(
        'Error!',
        AddNewAddressCheck(this.state.Edit_Province_Value, this.state.Edit_City_Value, this.state.Edit_Street_Value, this.state.Edit_District_Value, this.state.Edit_Address_Name_Value, this.state.Edit_Address_Phone_Number_Value),
        [
          {text: 'OK'},

        ],
      )



    } else {


      this.Submit_Edit_Address(this.state.Edit_Address_Name_Value, this.state.Edit_Address_Phone_Number_Value, this.state.Edit_Address_ID_Value, this.state.Edit_Province_Value, this.state.Edit_City_Value, this.state.Edit_Street_Value, this.state.Edit_District_Value)


    }
  }





  Submit_Order(Shopping_Cart, Shipping_Address){

    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.setState({
          User_Flag : false,
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


          Edit_Shipping_Address_Visible : false,

          Choose_Province_Edit_Shipping_Address_Visible : false,

          Choose_City_Edit_Shipping_Address_Visible : false,

          Choose_District_Edit_Shipping_Address_Visible : false,

          Edit_Province_Value: '',


          Edit_City_Value: '',


          Edit_Address_Name_Value: '',
          Edit_Address_Phone_Number_Value: '',
          Edit_Street_Value: '',
          Edit_District_Value: '',



          Refreshing_Flag : false
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
                  this.props.navigation.navigate('Cashier_Home', { Order_ID : Order_ID})
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

      DropDownHolder.getDropDown().alertWithType('error', 'Error!', 'There is nothing in your shopping cart! ' );

    }

    else if (Shipping_Address_Info == '') {

      DropDownHolder.getDropDown().alertWithType('error', 'Error!', 'There is no shipping info, please select shipping info! ' );


    }

    else {

      var Shopping_Cart_Confirm = ''

      var Warning_Flag = false

      var Warning_Message = 'The products: \n'

      // console.log(Shopping_Cart_Product_List.length);

      for (var Product in Shopping_Cart_Product_List) {
        var TempProduct = Shopping_Cart_Product_List[Product]
        if (TempProduct.Products_Status == 0) {
          Warning_Flag = true
          Warning_Message = Warning_Message + TempProduct.Products_Name + '\n'
        }
        // console.log(Shopping_Cart_Product_List[Product]);
        // console.log('\n');
        Shopping_Cart_Confirm = Shopping_Cart_Confirm + TempProduct.Products_Name + ':' + TempProduct.Products_Units + '\n' + '----------' + '\n'

      }

      Warning_Message = Warning_Message + 'has no stock, it may takes few days for delievery'

      Total_Price = this.Calculate_Total_Price(Shopping_Cart_Product_List)

      Shopping_Cart_Confirm = Shopping_Cart_Confirm + 'Total Price: ' + Total_Price + '\n'

      const Shipping_Info = Shipping_Address_Info.Address_Name + '\n' + Shipping_Address_Info.Address_Phone_Number + '\n' + Shipping_Address_Info.Address_ID + '\n' + Shipping_Address_Info.Street + '\n' + Shipping_Address_Info.City + '\n' + Shipping_Address_Info.Province + '\n' + Shipping_Address_Info.District + '\n'

      // console.log(Shopping_Cart_Confirm);

      if (Warning_Flag == true) {
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
      } else {

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

      }






    }


    // End of Submit_Order_On_Press
  }

  // Next function will help calculate the total price of the shopping cart
  Calculate_Total_Price(Shopping_Cart_Product_List){
    Total_Price = 0
    for (var Product in Shopping_Cart_Product_List) {
      var TempProduct = Shopping_Cart_Product_List[Product]
      // console.log(Shopping_Cart_Product_List[Product]);
      // console.log('\n');
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
        // console.log(Total_Price*0.2);
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


    Product_Swipe_Out_Button(product){
      return(
        [{
          text: '删除',
          type: 'delete',
          onPress: ()=> this.Delete_Item_On_Press(product),
        }]
      )
    }


    Address_Swipe_Out_Button(Address){
      return(
        [{
          text: '删除',
          type: 'delete',
          onPress: ()=> this.Delete_Address_On_Press(Address),
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
        'Watch Out!',
        '您尚未登录，请先登录以便查询购物车！',
        [
          {text: '前往登录', onPress: ()=>{
            this.props.navigation.navigate('User_Home')
          } },

        ],
      )


      return(




          <View style={{backgroundColor: '#ededed'}}>



          </View>

      )

    }

    else if (this.state.Shopping_Cart_Product_List.length == 0) {

      return(
        <View>

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

          <View style={{backgroundColor: '#ededed', height: '77%', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>

            <TouchableOpacity onPress = {() => this.props.navigation.navigate('Product_Home')} activeOpacity={0.5} style={{borderWidth: 1, borderRadius: 5, borderColor: "#c9cdcb"}}>
              <Text style={{color: 'black', fontWeight:'bold', textAlign: 'center', fontSize: 20}}> 马 上 去 选 购 产 品 </Text>

            </TouchableOpacity>


          </View>


          <View style={{height: '8%', flexDirection:'row'}}>

            <View style={{height:'100%', backgroundColor: '#f3f670', width: '60%', flexDirection:'column'}}>
              <Text style={{color: 'black', fontWeight:'bold', textAlign: 'left', fontSize: 17, marginLeft:5 }}> 总价: {this.Show_Total_Price(this.state.Shopping_Cart_Product_List)}</Text>


              <Text style={{color: 'black', fontWeight:'bold', textAlign: 'left', fontSize: 17, marginLeft:5 }}> 定金: {this.Show_Deposit_Price(this.state.Shopping_Cart_Product_List)} </Text>
            </View>



            <TouchableOpacity onPress = {() => this.Submit_Order_On_Press(this.state.Shopping_Cart_Product_List, this.state.Shopping_Cart_Shipping_Info)} activeOpacity={0.5} style={{height:'100%', backgroundColor: '#79fcfc', width: '40%', flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'black', fontWeight:'bold', textAlign: 'center', fontSize: 20}}> 提交订单 </Text>
            </TouchableOpacity>

          </View>



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

                      <Swipeout key={i} style={{height:170, backgroundColor: 'white',  marginTop:5, marginBottom:5}} right={this.Product_Swipe_Out_Button(product)} autoClose={true}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Shopping_Cart_Single_Product_Home',{ Products_ID : product.Products_ID, Products_Name : product.Products_Name})} activeOpacity={1}  style={{width: '100%', backgroundColor: 'white', flexDirection:'row',}}>

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



              <Modal
               isVisible={this.state.Shipping_Address_Selection_Visible}
               backdropColor={"black"}
               backdropOpacity={0.5}
               backdropTransitionInTiming={500}
               backdropTransitionOutTiming={500}
               animationOutTiming={500}
               animationInTiming={500}
               onBackdropPress={() => this.Close_Shipping_Address_Selection_Modal()}
               style={{justifyContent: "center", alignItems: "center",}}

             >
               <View style={{
                 height: '90%',
                 width: '100%',
                 backgroundColor: '#ffffff',
                 borderRadius: 5,
                 borderColor: "rgba(0, 0, 0, 0.1)"}}>



                   <View style={{paddingLeft: 10, paddingRight: 10, height:'8%', backgroundColor: 'red', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", }}>

                     <Text style={{fontSize: 20}}>收 货 地 址</Text>

                     <TouchableOpacity onPress={() => this.Close_Shipping_Address_Selection_Modal()} style={{}}>
                       <Icon name='clear' />
                     </TouchableOpacity>

                   </View>


                   <ScrollView style={{height:'84%', backgroundColor: 'transparent'}}>


                     {
                       this.state.Shopping_Cart_Shipping_Address_List.map((Address, i) => {
                         return(

                           <Swipeout key={i} style={{marginTop:5, backgroundColor: '#ffffff'}} right={this.Address_Swipe_Out_Button(Address)} autoClose={true}>

                             <TouchableOpacity onPress = {() => this.Choose_Shipping_Address(Address)} activeOpacity={1} style={{borderStyle: 'dotted', flexDirection: 'row', borderWidth: 2, borderColor: 'black',}}>
                               <View style={{width: '80%', marginLeft: 10, marginRight: 10,}}>
                                 <View style={{flexDirection:'row', alignItems: 'center',  flexWrap:'wrap'}}>
                                   <Text style={{fontSize: 20, }} >{Address.Address_Name}, </Text>
                                   <Text style={{fontSize: 20}}>{Address.Address_Phone_Number}</Text>
                                 </View>

                                 <View style={{flexDirection:'row', alignItems: 'center', flexWrap:'wrap'}}>

                                   <Text style={{fontSize: 16}} >{Address.Street}, {Address.District}, {Address.City}, {Address.Province}</Text>

                                 </View>
                               </View>

                               <TouchableOpacity onPress={() => this.Open_Edit_Address_Modal(Address)} activeOpacity={0.5} style={{width: '20%', alignItems: 'center', justifyContent: "center", }}>
                                 <Icon name='edit' />
                               </TouchableOpacity>
                             </TouchableOpacity>

                           </Swipeout>


                         );
                       })
                     }

                   </ScrollView>


                   <View style={{height:'8%', justifyContent: "center", alignItems: "center", backgroundColor:'transparent'}}>
                     <TouchableOpacity activeOpacity={0.5} onPress={() => this.Open_Add_New_Shipping_Address_Modal()}
                       style={{
                         height: '70%',
                         width: '70%',
                         backgroundColor: 'white',
                         borderRadius: 10, borderColor: "black", borderWidth: 1 ,
                         justifyContent: "center", alignItems: "center",
                         shadowOffset:{  width: 0,  height: 5,  }, shadowColor: 'black', shadowOpacity: 0.5,
                       }}>
                       <Text style={{fontSize: 20}}> 添 加 新 地 址 </Text>
                     </TouchableOpacity>

                   </View>


               </View>




               {/* New */}

               <Modal
                isVisible={this.state.Add_New_Shipping_Address_Visible}
                backdropColor={"black"}
                backdropOpacity={0.5}
                backdropTransitionInTiming={500}
                backdropTransitionOutTiming={500}
                animationOutTiming={500}
                animationInTiming={500}
                onBackdropPress={() => this.Close_Add_New_Shipping_Address_Modal()}
                style={{justifyContent: "center", alignItems: "center",}}

              >
                <View style={{
                  height: '60%',
                  width: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: 5,
                  borderColor: "rgba(0, 0, 0, 0.1)"}}>



                    <View style={{paddingLeft: 10, paddingRight: 10, height:'10%', backgroundColor: 'red', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", }}>

                      <Text style={{fontSize: 20}}>添 加 收 货 地 址</Text>

                      <TouchableOpacity onPress={() => this.Close_Add_New_Shipping_Address_Modal()} style={{}}>
                        <Icon name='clear' />
                      </TouchableOpacity>

                    </View>


                    <View style={{height:'80%', backgroundColor: 'transparent', flexDirection: 'column',}}>

                      <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, }}>
                        <Text style={{fontSize:15, marginRight: 5,}}>收件地址名字:</Text>
                        <TextInput
                          onChangeText = {(text) => this.New_Address_Name_Handler(text)}
                          autoCapitalize='none'
                          value = {this.state.New_Address_Name_Value}
                          style={{
                            marginLeft: 5,
                            width:150,
                            borderRadius: 5,
                            borderColor: "black",
                            borderWidth: 1
                          }} />

                      </View>

                      <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, }}>
                        <Text style={{fontSize:15, marginRight: 5,}}>收件地址电话号码:</Text>
                        <TextInput
                          value = {this.state.New_Address_Phone_Number_Value}
                          onChangeText = {(text) => this.New_Address_Phone_Number_Handler(text)}
                          keyboardType={'phone-pad'}
                          autoCapitalize='none'
                          style={{
                            marginLeft: 5,
                            width:150,
                            borderRadius: 5,
                            borderColor: "black",
                            borderWidth: 1
                          }} />

                      </View>

                      <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, flexWrap:'wrap' }}>


                        <Text style={{fontSize:15, marginRight: 5,}}>所在地区: </Text>
                        <TouchableOpacity onPress={()=>this.Open_Choose_Province_Add_New_Shipping_Address_Modal()} >
                          <Text style={{fontSize:15, marginRight: 5, borderColor: "black", borderWidth: 1}}>{ShowProvinceName(this.state.New_Province_Value)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.Open_Choose_City_Add_New_Shipping_Address_Modal()} >
                          <Text style={{fontSize:15, marginRight: 5, borderColor: "black", borderWidth: 1}}>{ShowCityName(this.state.New_City_Value)}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.Open_Choose_District_Add_New_Shipping_Address_Modal()} >
                          <Text style={{fontSize:15, marginRight: 5, borderColor: "black", borderWidth: 1}}>{ShowDistrictName(this.state.New_District_Value)}</Text>
                        </TouchableOpacity>


                      </View>

                      <View style={{flexDirection: 'column', marginTop: 10, marginBottom: 10, marginLeft: 10, }}>
                        <Text style={{fontSize:15, marginRight: 5,}}>详细地址:</Text>
                        <TextInput
                          numberOfLines = {3}
                          value = {this.state.New_Street_Value}
                          onChangeText = {(text) => this.New_Street_Handler(text)}
                          autoCapitalize='none'
                          style={{
                            height:50,
                            marginRight: 5,
                            borderRadius: 5,
                            borderColor: "black",
                            borderWidth: 1
                          }} />

                      </View>



                    </View>

                    <View style={{height:'10%', justifyContent: "center", alignItems: "center", backgroundColor:'transparent'}}>
                      <TouchableOpacity activeOpacity={0.5} onPress={() => this.Submit_New_Address_On_Press()}
                        style={{
                          height: '70%',
                          width: '70%',
                          backgroundColor: 'white',
                          borderRadius: 10, borderColor: "black", borderWidth: 1 ,
                          justifyContent: "center", alignItems: "center",
                          shadowOffset:{  width: 0,  height: 5,  }, shadowColor: 'black', shadowOpacity: 0.5,
                        }}>
                        <Text style={{fontSize: 20}}> 提 交 新 收 货 地 址 </Text>
                      </TouchableOpacity>

                    </View>


                </View>


                {/* New Province Choose */}
                <Modal
                 isVisible={this.state.Choose_Province_Add_New_Shipping_Address_Visible}
                 backdropColor={"black"}
                 backdropOpacity={0.5}
                 backdropTransitionInTiming={500}
                 backdropTransitionOutTiming={500}
                 animationOutTiming={500}
                 animationInTiming={500}
                 onBackdropPress={() => this.Close_Choose_Province_Add_New_Shipping_Address_Modal()}
                 style={{justifyContent: "center", alignItems: "center",}}

               >
                 <View style={{
                   height: '30%',
                   width: '50%',
                   backgroundColor: '#ffffff',
                   borderRadius: 5,
                   justifyContent: "center", alignItems: "center",
                   borderColor: "rgba(0, 0, 0, 0.1)"}}>


                   <Picker
                     selectedValue={this.state.New_Province_Value}
                     style={{ height: '100%', width: '100%' }}
                     onValueChange={(itemValue, itemIndex) => this.New_Province_Handler(itemValue)}>
                     {
                       GetProvince().map((Province, i)=>{
                         return(
                           <Picker.Item key={i} label= {Province.key} value={Province.key} />
                         );
                       })
                     }
                   </Picker>



                 </View>


               </Modal>

               {/* New Province Choose */}


                {/* New City Choose */}
                <Modal
                 isVisible={this.state.Choose_City_Add_New_Shipping_Address_Visible}
                 backdropColor={"black"}
                 backdropOpacity={0.5}
                 backdropTransitionInTiming={500}
                 backdropTransitionOutTiming={500}
                 animationOutTiming={500}
                 animationInTiming={500}
                 onBackdropPress={() => this.Close_Choose_City_Add_New_Shipping_Address_Modal()}
                 style={{justifyContent: "center", alignItems: "center",}}

               >
                 <View style={{
                   height: '30%',
                   width: '50%',
                   backgroundColor: '#ffffff',
                   borderRadius: 5,
                   justifyContent: "center", alignItems: "center",
                   borderColor: "rgba(0, 0, 0, 0.1)"}}>


                   <Picker
                     selectedValue={this.state.New_City_Value}
                     style={{ height: '100%', width: '100%' }}
                     onValueChange={(itemValue, itemIndex) => this.New_City_Handler(itemValue)}>
                     {
                       GetCityForProvince(this.state.New_Province_Value).map((City, i)=>{
                         return(
                           <Picker.Item key={i} label= {City.key} value={City.key} />
                         );
                       })
                     }
                   </Picker>



                 </View>


               </Modal>

               {/* New CIty Choose */}


                {/* New District Choose */}
                <Modal
                 isVisible={this.state.Choose_District_Add_New_Shipping_Address_Visible}
                 backdropColor={"black"}
                 backdropOpacity={0.5}
                 backdropTransitionInTiming={500}
                 backdropTransitionOutTiming={500}
                 animationOutTiming={500}
                 animationInTiming={500}
                 onBackdropPress={() => this.Close_Choose_District_Add_New_Shipping_Address_Modal()}
                 style={{justifyContent: "center", alignItems: "center",}}

               >
                 <View style={{
                   height: '30%',
                   width: '50%',
                   backgroundColor: '#ffffff',
                   borderRadius: 5,
                   justifyContent: "center", alignItems: "center",
                   borderColor: "rgba(0, 0, 0, 0.1)"}}>


                   <Picker
                     selectedValue={this.state.New_District_Value}
                     style={{ height: '100%', width: '100%' }}
                     onValueChange={(itemValue, itemIndex) => this.New_District_Handler(itemValue)}>
                     {
                       GetDistrictForCity(this.state.New_City_Value).map((District, i)=>{
                         return(
                           <Picker.Item key={i} label= {District.key} value={District.key} />
                         );
                       })
                     }
                   </Picker>



                 </View>


               </Modal>

               {/* New District Choose */}



              </Modal>
              {/* New Address */}




              {/* Edit */}

              <Modal
                isVisible={this.state.Edit_Shipping_Address_Visible}
                backdropColor={"black"}
                backdropOpacity={0.5}
                backdropTransitionInTiming={500}
                backdropTransitionOutTiming={500}
                animationOutTiming={500}
                animationInTiming={500}
                onBackdropPress={() => this.Close_Edit_Address_Modal()}
                style={{justifyContent: "center", alignItems: "center",}}

                >
                <View style={{
                    height: '60%',
                    width: '100%',
                    backgroundColor: '#ffffff',
                    borderRadius: 5,
                    borderColor: "rgba(0, 0, 0, 0.1)"}}>



                    <View style={{paddingLeft: 10, paddingRight: 10, height:'10%', backgroundColor: 'red', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", }}>

                      <Text style={{fontSize: 20}}>修 改 收 货 地 址</Text>

                      <TouchableOpacity onPress={() => this.Close_Edit_Address_Modal()} style={{}}>
                        <Icon name='clear' />
                      </TouchableOpacity>

                    </View>


                    <View style={{height:'80%', backgroundColor: 'transparent', flexDirection: 'column',}}>

                      <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, }}>
                        <Text style={{fontSize:15, marginRight: 5,}}>收件地址名字:</Text>
                        <TextInput
                          onChangeText = {(text) => this.Edit_Address_Name_Handler(text)}
                          autoCapitalize='none'
                          value = {this.state.Edit_Address_Name_Value}
                          style={{
                            marginLeft: 5,
                            width:150,
                            borderRadius: 5,
                            borderColor: "black",
                            borderWidth: 1
                          }} />

                        </View>

                        <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, }}>
                          <Text style={{fontSize:15, marginRight: 5,}}>收件地址电话号码:</Text>

                          <TextInput
                            value = {this.state.Edit_Address_Phone_Number_Value}
                            onChangeText = {(text) => this.Edit_Address_Phone_Number_Handler(text)}
                            keyboardType={'phone-pad'}
                            autoCapitalize='none'
                            style={{
                              marginLeft: 5,
                              width:150,
                              borderRadius: 5,
                              borderColor: "black",
                              borderWidth: 1
                            }} />



                        </View>

                          <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, flexWrap:'wrap' }}>


                            <Text style={{fontSize:15, marginRight: 5,}}>所在地区: </Text>
                            <TouchableOpacity onPress={()=>this.Edit_Open_Choose_Province_Modal()} >
                              <Text style={{fontSize:15, marginRight: 5, borderColor: "black", borderWidth: 1}}>{ShowProvinceName(this.state.Edit_Province_Value)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.Edit_Open_Choose_City_Modal()} >
                              <Text style={{fontSize:15, marginRight: 5, borderColor: "black", borderWidth: 1}}>{ShowCityName(this.state.Edit_City_Value)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.Edit_Open_Choose_District_Modal()} >
                              <Text style={{fontSize:15, marginRight: 5, borderColor: "black", borderWidth: 1}}>{ShowDistrictName(this.state.Edit_District_Value)}</Text>
                            </TouchableOpacity>


                          </View>

                          <View style={{flexDirection: 'column', marginTop: 10, marginBottom: 10, marginLeft: 10, }}>
                            <Text style={{fontSize:15, marginRight: 5,}}>详细地址:</Text>
                            <TextInput
                              numberOfLines = {3}
                              value = {this.state.Edit_Street_Value}
                              onChangeText = {(text) => this.Edit_Street_Handler(text)}
                              autoCapitalize='none'
                              style={{
                                height:50,
                                marginRight: 5,
                                borderRadius: 5,
                                borderColor: "black",
                                borderWidth: 1
                              }} />

                          </View>



                          </View>

                          <View style={{height:'10%', justifyContent: "center", alignItems: "center", backgroundColor:'transparent'}}>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => this.Submit_Edit_Address_On_Press()}
                              style={{
                                height: '70%',
                                width: '70%',
                                backgroundColor: 'white',
                                borderRadius: 10, borderColor: "black", borderWidth: 1 ,
                                justifyContent: "center", alignItems: "center",
                                shadowOffset:{  width: 0,  height: 5,  }, shadowColor: 'black', shadowOpacity: 0.5,
                              }}>
                              <Text style={{fontSize: 20}}> 提 交 修 改 收 货 地 址 </Text>
                            </TouchableOpacity>

                          </View>


                        </View>


                        {/* Edit Province Choose */}
                        <Modal
                          isVisible={this.state.Choose_Province_Edit_Shipping_Address_Visible}
                          backdropColor={"black"}
                          backdropOpacity={0.5}
                          backdropTransitionInTiming={500}
                          backdropTransitionOutTiming={500}
                          animationOutTiming={500}
                          animationInTiming={500}
                          onBackdropPress={() => this.Edit_Close_Choose_Province_Modal()}
                          style={{justifyContent: "center", alignItems: "center",}}

                          >
                          <View style={{
                              height: '30%',
                              width: '50%',
                              backgroundColor: '#ffffff',
                              borderRadius: 5,
                              justifyContent: "center", alignItems: "center",
                              borderColor: "rgba(0, 0, 0, 0.1)"}}>


                              <Picker
                                selectedValue={this.state.Edit_Province_Value}
                                style={{ height: '100%', width: '100%' }}
                                onValueChange={(itemValue, itemIndex) => this.Edit_Province_Handler(itemValue)}>
                                {
                                  GetProvince().map((Province, i)=>{
                                    return(
                                      <Picker.Item key={i} label= {Province.key} value={Province.key} />
                                    );
                                  })
                                }
                              </Picker>



                            </View>


                          </Modal>

                          {/* Edit Province Choose */}


                          {/* Edit City Choose */}
                          <Modal
                            isVisible={this.state.Choose_City_Edit_Shipping_Address_Visible}
                            backdropColor={"black"}
                            backdropOpacity={0.5}
                            backdropTransitionInTiming={500}
                            backdropTransitionOutTiming={500}
                            animationOutTiming={500}
                            animationInTiming={500}
                            onBackdropPress={() => this.Edit_Close_Choose_City_Modal()}
                            style={{justifyContent: "center", alignItems: "center",}}

                            >
                            <View style={{
                                height: '30%',
                                width: '50%',
                                backgroundColor: '#ffffff',
                                borderRadius: 5,
                                justifyContent: "center", alignItems: "center",
                                borderColor: "rgba(0, 0, 0, 0.1)"}}>


                                <Picker
                                  selectedValue={this.state.Edit_City_Value}
                                  style={{ height: '100%', width: '100%' }}
                                  onValueChange={(itemValue, itemIndex) => this.Edit_City_Handler(itemValue)}>
                                  {
                                    GetCityForProvince(this.state.Edit_Province_Value).map((City, i)=>{
                                      return(
                                        <Picker.Item key={i} label= {City.key} value={City.key} />
                                      );
                                    })
                                  }
                                </Picker>



                              </View>


                            </Modal>

                            {/* Edit CIty Choose */}


                            {/* Edit District Choose */}
                            <Modal
                              isVisible={this.state.Choose_District_Edit_Shipping_Address_Visible}
                              backdropColor={"black"}
                              backdropOpacity={0.5}
                              backdropTransitionInTiming={500}
                              backdropTransitionOutTiming={500}
                              animationOutTiming={500}
                              animationInTiming={500}
                              onBackdropPress={() => this.Edit_Close_Choose_District_Modal()}
                              style={{justifyContent: "center", alignItems: "center",}}

                              >
                              <View style={{
                                  height: '30%',
                                  width: '50%',
                                  backgroundColor: '#ffffff',
                                  borderRadius: 5,
                                  justifyContent: "center", alignItems: "center",
                                  borderColor: "rgba(0, 0, 0, 0.1)"}}>


                                  <Picker
                                    selectedValue={this.state.Edit_District_Value}
                                    style={{ height: '100%', width: '100%' }}
                                    onValueChange={(itemValue, itemIndex) => this.Edit_District_Handler(itemValue)}>
                                    {
                                      GetDistrictForCity(this.state.Edit_City_Value).map((District, i)=>{
                                        return(
                                          <Picker.Item key={i} label= {District.key} value={District.key} />
                                        );
                                      })
                                    }
                                  </Picker>



                                </View>


                              </Modal>

                              {/* Edit District Choose */}



                            </Modal>
                            {/* Edit Address */}








             </Modal>
             {/* Shipping info selection */}



            </KeyboardAvoidingView>




          );
    }



  }
}
