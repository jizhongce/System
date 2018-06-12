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
import {ShoppingCartAddressExistStyle, PraseCityValue, PraseProvinceValue, ShowProvinceName, ShowCityName, GetCityForProvince, AddNewAddressCheck} from '../../util.js';
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
  FlatList
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class Shopping_Cart_Home extends Component<{}> {


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

      New_Province_Value: '',
      New_Province_Key: '',

      New_City_Value: '',
      New_City_Key: '',

      New_Street_Value: '',
      New_Post_Code_Value: '',


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

          New_Province_Value: '',
          New_Province_Key: '',

          New_City_Value: '',
          New_City_Key: '',

          New_Street_Value: '',
          New_Post_Code_Value: '',

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
                  Refreshing_Flag : false,

                  Shopping_Cart_Shipping_Info : '',
                  Shopping_Cart_Shipping_Info_Flag : false,

                  Shipping_Address_Selection_Visible : false,

                  Add_New_Shipping_Address_Visible : false,

                  Choose_Province_Add_New_Shipping_Address_Visible : false,

                  Choose_City_Add_New_Shipping_Address_Visible : false,

                  New_Province_Value: '',
                  New_Province_Key: '',

                  New_City_Value: '',
                  New_City_Key: '',

                  New_Street_Value: '',
                  New_Post_Code_Value: '',

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
            Shopping_Cart_Shipping_Info_Flag : false,

            Shipping_Address_Selection_Visible : false,

            Add_New_Shipping_Address_Visible : false,

            Choose_Province_Add_New_Shipping_Address_Visible : false,

            Choose_City_Add_New_Shipping_Address_Visible : false,

            New_Province_Value: '',
            New_Province_Key: '',

            New_City_Value: '',
            New_City_Key: '',

            New_Street_Value: '',
            New_Post_Code_Value: '',

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
            Shopping_Cart_Shipping_Info_Flag : false,
            Shipping_Address_Selection_Visible : false,

            Add_New_Shipping_Address_Visible : false,

            Choose_Province_Add_New_Shipping_Address_Visible : false,

            Choose_City_Add_New_Shipping_Address_Visible : false,

            New_Province_Value: '',
            New_Province_Key: '',

            New_City_Value: '',
            New_City_Key: '',

            New_Street_Value: '',
            New_Post_Code_Value: '',
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
          Shopping_Cart_Shipping_Info_Flag : false,

          Shipping_Address_Selection_Visible : false,

          Add_New_Shipping_Address_Visible : false,

          Choose_Province_Add_New_Shipping_Address_Visible : false,

          Choose_City_Add_New_Shipping_Address_Visible : false,

          New_Province_Value: '',
          New_Province_Key: '',

          New_City_Value: '',
          New_City_Key: '',

          New_Street_Value: '',
          New_Post_Code_Value: '',
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
      New_Province_Value: item.Value,
      New_Province_Key: item.key,

      Choose_Province_Add_New_Shipping_Address_Visible: false,

      New_City_Value: '',
      New_City_Key: '',

      New_Street_Value: '',
      New_Post_Code_Value: ''
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
      New_City_Value: item.Value,
      New_City_Key: item.key,
      Choose_City_Add_New_Shipping_Address_Visible: false,

      New_Street_Value: '',
      New_Post_Code_Value: ''
    });
  }


  New_Post_Code_Handler(text){
    this.setState({
      New_Post_Code_Value: text
    });
  }

  New_Street_Handler(text){
    this.setState({
      New_Street_Value: text
    });
  }



  //Here is function for submit the new Address

  Submit_New_Address_On_Press(){
    if (this.state.New_Province_Value == '' || this.state.New_City_Value == '' || this.state.New_Street_Value == '' ||  this.state.New_Post_Code_Value == '' || isNaN(this.state.New_Post_Code_Value) == true) {

      Alert.alert(
        'Oops',
        AddNewAddressCheck(this.state.New_Province_Value, this.state.New_City_Value, this.state.New_Street_Value, this.state.New_Post_Code_Value),
        [
          {text: 'OK'},
        ],
      )

    } else {

      const New_Address = this.state.New_Province_Value + '\n' + this.state.New_City_Value + '\n' + this.state.New_Street_Value + '\n' +  this.state.New_Post_Code_Value

      Alert.alert(
        'Watch Out!',
        'you are adding new address! \n Address Detail: \n ' + New_Address,
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Confirm', onPress: ()=>{
            this.Submit_New_Address(this.state.New_Province_Value, this.state.New_City_Value, this.state.New_Street_Value, this.state.New_Post_Code_Value)
          }},

        ],
      )


    }
  }


  // Submit new address function
  Submit_New_Address(Province, City, Street, Post_Code){
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
          Province: Province,
          City: City,
          Street: Street,
          Post_Code: Post_Code
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

                  New_Province_Value: '',
                  New_Province_Key: '',

                  New_City_Value: '',
                  New_City_Key: '',

                  New_Street_Value: '',
                  New_Post_Code_Value: ''

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

          New_Province_Value: '',
          New_Province_Key: '',

          New_City_Value: '',
          New_City_Key: '',

          New_Street_Value: '',
          New_Post_Code_Value: '',
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
                  this.Refresh_Shopping_Cart()
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

      console.log(Shopping_Cart_Product_List.length);

      for (var Product in Shopping_Cart_Product_List) {
        var TempProduct = Shopping_Cart_Product_List[Product]
        console.log(Shopping_Cart_Product_List[Product]);
        console.log('\n');
        Shopping_Cart_Confirm = Shopping_Cart_Confirm + TempProduct.Product_Spec + ':' + TempProduct.Product_Units + '\n' + '----------' + '\n'

      }

      const Shipping_Info = Shipping_Address_Info.Address_ID + '\n' + Shipping_Address_Info.Street + '\n' + Shipping_Address_Info.City + '\n' + Shipping_Address_Info.Province + '\n' + Shipping_Address_Info.Post_Code + '\n'

      console.log(Shopping_Cart_Confirm);
      Alert.alert(
        'Watch Out!',
        'you are Submitting your order the item from the shopping cart! \n Order Detail: \n ' + Shopping_Cart_Confirm + 'Shipping Detail: \n' + Shipping_Info,
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Confirm', onPress: ()=>{
            this.Submit_Order(Shopping_Cart_Product_List, Shipping_Address_Info);
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
              <Text style={{ fontSize: 25, textAlign: 'center', marginTop: 25,} }>Product List</Text>
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

                <TouchableOpacity onPress = {() => this.Open_Shipping_Address_Selection_Modal()} >
                  <View style={ShoppingCartAddressExistStyle(!this.state.Shopping_Cart_Shipping_Info_Flag)}>
                    <Text>ID : {this.state.Shopping_Cart_Shipping_Info.Address_ID}</Text>
                    <Text>Street : {this.state.Shopping_Cart_Shipping_Info.Street}</Text>
                    <Text>City : {PraseCityValue(this.state.Shopping_Cart_Shipping_Info.City)}</Text>
                    <Text>Province : {PraseProvinceValue(this.state.Shopping_Cart_Shipping_Info.Province)}</Text>
                    <Text>Post Code : {this.state.Shopping_Cart_Shipping_Info.Post_Code}</Text>
                  </View>
                </TouchableOpacity>

                  <View style={ShoppingCartAddressExistStyle(this.state.Shopping_Cart_Shipping_Info_Flag)}>
                    <TouchableOpacity onPress = {() => this.Open_Shipping_Address_Selection_Modal()} >
                      <Text style={{fontSize: 25} }>Choose a Shipping Address</Text>
                    </TouchableOpacity>

                  </View>

                </View>



              <TouchableOpacity onPress = {() => this.Submit_Order_On_Press(this.state.Shopping_Cart_Product_List, this.state.Shopping_Cart_Shipping_Info)}>
                <Text style={{fontSize: 25, textAlign: 'center'} }>Submit the Order</Text>
              </TouchableOpacity>




              {/* Here is the Modal for the shipping address selection */}

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
                          <Text>Street : {Address.Street}</Text>
                          <Text>City : {PraseCityValue(Address.City)}</Text>
                          <Text>Province : {PraseProvinceValue(Address.Province)}</Text>
                          <Text>Post Code : {Address.Post_Code}</Text>

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
                      Province:
                    </Text>

                    <TouchableOpacity style={{
                      marginTop: 20,
                      height: '50%',
                      width: '50%',
                      borderWidth: 2,
                      borderRadius: 10,
                    }} onPress={()=> this.Open_Choose_Province_Add_New_Shipping_Address_Modal()}>
                      <Text style={{fontSize: 20, textAlign: 'center'}}>{ShowProvinceName(this.state.New_Province_Key)}</Text>
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
                      <Text style={{fontSize: 20, textAlign: 'center'}}>{ShowCityName(this.state.New_City_Key)}</Text>
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

                  <View style={{flex: 0.15, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
                    <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                      Post Code:
                    </Text>
                    <TextInput
                      value = {this.state.New_Post_Code_Value}
                      style={{
                        marginTop: 20,
                        height: '50%',
                        width: '50%',
                        borderWidth: 2,
                        borderRadius: 10,

                      }} onChangeText = {(text) => this.New_Post_Code_Handler(text)} autoCapitalize='none' />
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
                      {key: '浙江', Value: 'zhejiang'},
                      {key: '上海市', Value: 'shanghai'},
                      {key: '河北', Value: 'hebei'},
                      {key: '安徽', Value: 'anhui'},
                      {key: '江西', Value: 'jiangxi'},
                      {key: '江苏', Value: 'jiangsu'},
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




                  {/* Here is the modal for Add new address */}
                </Modal>







              </Modal>












            </ScrollView>


          );
    }



  }
}
