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
import {ShoppingCartAddressExistStyle, ShowPhoneNumber, PraseCityValue, ShowProvinceName, ShowCityName, ShowDistrictName, GetCityForProvince, AddNewAddressCheck, Product_Image, GetDistrictForCity, GetProvince, DropDownHolder} from '../../util.js';
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

import Status_Bar from '../Status_Bar.js';

export default class Shopping_Cart_Home extends Component<{}> {


    static navigationOptions = {
      header: null
  }


  constructor(props) {
    super(props);
    this.state = {
      User_Flag : true,
      Shopping_Cart_Product_List : [],

      Shopping_Cart_Shipping_Info : '',
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
          Shopping_Cart_Product_List : [],



          Shopping_Cart_Shipping_Info : '',
          Shopping_Cart_Shipping_Info_Flag : false,

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

            const { params } = this.props.navigation.state;
            const Shipping_Address_Info = params ? params.Shipping_Address_Info : null;


            console.log(Shipping_Address_Info);

            if (Shipping_Address_Info == null) {

              this.setState({
                User_Flag : true,
                Shopping_Cart_Product_List : Shopping_Cart_Product_List,
                Refreshing_Flag : false,

                Shopping_Cart_Shipping_Info : '',
                Shopping_Cart_Shipping_Info_Flag : false,

              }, ()=>{
                // console.log(this.state.Shopping_Cart_Shipping_Address_List);
              });


            }

            else {

              this.setState({
                User_Flag : true,
                Shopping_Cart_Product_List : Shopping_Cart_Product_List,
                Refreshing_Flag : false,

                Shopping_Cart_Shipping_Info : Shipping_Address_Info,
                Shopping_Cart_Shipping_Info_Flag : true,

              }, ()=>{
                // console.log(this.state.Shopping_Cart_Shipping_Address_List);
              });


            }


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


            Shopping_Cart_Shipping_Info : '',
            Shopping_Cart_Shipping_Info_Flag : false,

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


            Shopping_Cart_Shipping_Info : '',
            Shopping_Cart_Shipping_Info_Flag : false,

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

          Shopping_Cart_Shipping_Info : '',
          Shopping_Cart_Shipping_Info_Flag : false,

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



  Submit_Order(Shopping_Cart, Shipping_Address){

    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.setState({
          User_Flag : false,
          Shopping_Cart_Product_List : [],


          Shopping_Cart_Shipping_Info : '',
          Shopping_Cart_Shipping_Info_Flag : false,

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
            <View>

              <Status_Bar />

            </View>



          </View>

      )

    }

    else if (this.state.Shopping_Cart_Product_List.length == 0) {

      return(
        <View >

          <Status_Bar />

          <View style={{
              height: '8%',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 1,
            }} >


            <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}>购    物    车</Text>


          </View>



          <TouchableOpacity onPress={() => this.props.navigation.navigate('Shopping_Cart_Choose_Address_Board') } activeOpacity={0.8} style={{backgroundColor: 'white', height: '15%',  justifyContent: 'center', borderStyle: 'dotted', borderWidth: 2, borderColor: 'black',}}>

            <View style={ShoppingCartAddressExistStyle(!this.state.Shopping_Cart_Shipping_Info_Flag)}>

            <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, flexWrap:'wrap'}}>
              <Text style={{fontSize: 20, }} >{this.state.Shopping_Cart_Shipping_Info.Address_Name}, </Text>
              <Text style={{fontSize: 20}}>{ShowPhoneNumber(this.state.Shopping_Cart_Shipping_Info.Address_Phone_Number)}</Text>
            </View>

            <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, marginRight: 10, flexWrap:'wrap'}}>

              <Text style={{fontSize: 16}} >{this.state.Shopping_Cart_Shipping_Info.Street}, {this.state.Shopping_Cart_Shipping_Info.City}, {this.state.Shopping_Cart_Shipping_Info.Province}, {this.state.Shopping_Cart_Shipping_Info.District}</Text>

            </View>

            </View>

            <View style={ShoppingCartAddressExistStyle(this.state.Shopping_Cart_Shipping_Info_Flag)}>

              <Text style={{fontSize: 20} }> 请 选 择 一 个 地 址 </Text>

            </View>

          </TouchableOpacity>

          <View style={{backgroundColor: '#ededed', height: '66%', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>

            <TouchableOpacity onPress = {() => this.props.navigation.navigate('Product_Home')} activeOpacity={0.5} style={{borderWidth: 1, borderRadius: 5, borderColor: "#c9cdcb"}}>
              <Text style={{color: 'black', fontWeight:'bold', textAlign: 'center', fontSize: 20}}> 马 上 去 选 购 产 品 </Text>

            </TouchableOpacity>


          </View>


          <View style={{height: '8%', flexDirection:'row', borderTopWidth: 1}}>

            <View style={{height:'100%', backgroundColor: 'white', width: '60%', flexDirection:'column', justifyContent: 'center', borderRightWidth: 1}}>
              <Text style={{color: 'black', fontWeight:'bold', textAlign: 'left', fontSize: 17, marginLeft:5 }}> 总价: {this.Show_Total_Price(this.state.Shopping_Cart_Product_List)}</Text>


              <Text style={{color: 'black', fontWeight:'bold', textAlign: 'left', fontSize: 17, marginLeft:5 }}> 定金: {this.Show_Deposit_Price(this.state.Shopping_Cart_Product_List)} </Text>
            </View>



            <TouchableOpacity onPress = {() => this.Submit_Order_On_Press(this.state.Shopping_Cart_Product_List, this.state.Shopping_Cart_Shipping_Info)} activeOpacity={0.5} style={{height:'100%', backgroundColor: 'white', width: '40%', flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{color: 'black', fontWeight:'bold', textAlign: 'center', fontSize: 20}}> 提交订单 </Text>
            </TouchableOpacity>

          </View>


        </View>
      )

    }


    else {


          return (

            <KeyboardAvoidingView behavior={'position'}>


              <Status_Bar />

              <View style={{
                  height: '8%',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                }} >


                <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}>购    物    车</Text>


              </View>


              <TouchableOpacity onPress={() => this.props.navigation.navigate('Shopping_Cart_Choose_Address_Board') } activeOpacity={0.8} style={{backgroundColor: 'white', height: '15%',  justifyContent: 'center', borderStyle: 'dotted', borderWidth: 2, borderColor: 'black', paddingTop: 5}}>

                <View style={ShoppingCartAddressExistStyle(!this.state.Shopping_Cart_Shipping_Info_Flag)}>

                <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, flexWrap:'wrap'}}>
                  <Text style={{fontSize: 20, }} >{this.state.Shopping_Cart_Shipping_Info.Address_Name}, </Text>
                  <Text style={{fontSize: 20}}>{ShowPhoneNumber(this.state.Shopping_Cart_Shipping_Info.Address_Phone_Number)}</Text>
                </View>

                <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, marginRight: 10, flexWrap:'wrap'}}>

                  <Text style={{fontSize: 16}} >{this.state.Shopping_Cart_Shipping_Info.Street}, {this.state.Shopping_Cart_Shipping_Info.City}, {this.state.Shopping_Cart_Shipping_Info.Province}, {this.state.Shopping_Cart_Shipping_Info.District}</Text>

                </View>

                </View>

                <View style={ShoppingCartAddressExistStyle(this.state.Shopping_Cart_Shipping_Info_Flag)}>

                  <Text style={{fontSize: 25} }> 请 选 择 一 个 地 址 </Text>

                </View>

              </TouchableOpacity>

              {/* Main Feed for each product in the shopping cart */}


              <ScrollView refreshControl={ <RefreshControl onRefresh={this.OnRefresh.bind(this)} refreshing = {this.state.Refreshing_Flag} />} style={{backgroundColor: '#ededed', height: '66%', flexDirection:'column'}}>

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
                              <Text style={{fontSize: 20}}>{product.Products_Name}</Text>
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


              <View style={{height: '8%', flexDirection:'row', borderTopWidth: 1}}>

                <View style={{height:'100%', backgroundColor: 'white', width: '60%', flexDirection:'column', justifyContent: 'center', borderRightWidth: 1}}>
                  <Text style={{color: 'black', fontWeight:'bold', textAlign: 'left', fontSize: 17, marginLeft:5 }}> 总价: {this.Show_Total_Price(this.state.Shopping_Cart_Product_List)}</Text>


                  <Text style={{color: 'black', fontWeight:'bold', textAlign: 'left', fontSize: 17, marginLeft:5 }}> 定金: {this.Show_Deposit_Price(this.state.Shopping_Cart_Product_List)} </Text>
                </View>



                <TouchableOpacity onPress = {() => this.Submit_Order_On_Press(this.state.Shopping_Cart_Product_List, this.state.Shopping_Cart_Shipping_Info)} activeOpacity={0.5} style={{height:'100%', backgroundColor: 'white', width: '40%', flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{color: 'black', fontWeight:'bold', textAlign: 'center', fontSize: 20}}> 提交订单 </Text>
                </TouchableOpacity>

              </View>



           </KeyboardAvoidingView>




          );
    }



  }
}
