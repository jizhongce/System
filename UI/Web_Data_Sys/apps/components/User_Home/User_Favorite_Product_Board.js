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
import {DropDownHolder, Product_Image} from '../../util.js';
import {getfavoriteproduct, deleteFromfavoriteproduct, addToshoppingcart} from '../../server.js';
import { Icon, Header } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Modal from "react-native-modal";
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
  ScrollView,
  AsyncStorage,
  RefreshControl,
  TouchableHighlight,
  Picker,
  FlatList,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import NavigationBar from 'react-native-navbar';


import Status_Bar from '../Status_Bar.js';



export default class User_Favorite_Product_Board extends Component<{}> {

  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {

      Favorite_Products: null,

      Product_Quantity : 1,

      Product_Quantity_Modal_Visible: false,

      Temp_Product_Info: null,


    };
  }

  Open_Product_Quantity_Modal(Product){

    this.setState({
      Temp_Product_Info: Product,
      Product_Quantity_Modal_Visible: true
    });

  }


  Close_Product_Quantity_Modal(){

    this.setState({
      Temp_Product_Info: null,
      Product_Quantity_Modal_Visible: false,
      Product_Quantity : 1,
    });

  }

  Product_Quantity_Handler(text){

    this.setState({
      Product_Quantity : text
    });

  }

  Product_Quantity_Add(){

    this.setState({
      Product_Quantity : this.state.Product_Quantity + 1
    });

  }

  Product_Quantity_Minus(){

    if (this.state.Product_Quantity <= 1) {

      Alert.alert(
        '注意!',
        '产品数量不能小于1！',
        [
          {text: '知道啦！', style: 'cancel'},
        ],
      )

      this.setState({
        Product_Quantity : 1
      });

    } else {

      this.setState({
        Product_Quantity : this.state.Product_Quantity - 1
      });

    }

  }

  Delete_From_Favorite_Product(Product){

    AsyncStorage.getItem('User_ID', (err, result) =>{

      const User_ID = result

      if(User_ID == null) {
        console.log(result);
        DropDownHolder.getDropDown().alertWithType('error', 'Error!', 'please log in first' )

      }


      else {

        deleteFromfavoriteproduct(User_ID, Product.Products_ID, (response) => {
          const delete_from_favorite_product_status_code = response["StatusCode"]
          const statusText = response["ResponseText"]


          if (delete_from_favorite_product_status_code == 200) {

            DropDownHolder.getDropDown().alertWithType('info', 'Success!', 'Item ' + Product.Products_Name + ' has been removed from favorite list!' )

            this.Refresh_User_Favorite_Product_Board()

          }

          else {

            DropDownHolder.getDropDown().alertWithType('error', 'Error Code: ' + delete_from_favorite_product_status_code + '!', delete_from_favorite_product_status_code )


            this.props.navigation.navigate('User_Home');

          }

        });

      }


    });

  }



  Add_To_Shopping_Cart(){
    const TempProduct = {
      ProductID : this.state.Temp_Product_Info.Products_ID,
      ProductStatus : this.state.Temp_Product_Info.Products_Status,
      ProductSpec : this.state.Temp_Product_Info.Products_Spec,
      ProductPrice : this.state.Temp_Product_Info.Products_Price,
      ProductUnits : this.state.Product_Quantity
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


              DropDownHolder.getDropDown().alertWithType('info', 'Success!', 'Item ' + this.state.Temp_Product_Info.Products_Name + ' has been added!' )


              this.Refresh_User_Favorite_Product_Board()


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




  Delete_From_Favorite_Product_On_Press(Product){

    Alert.alert(
      '注意!',
      '您正在取消关注产品： \n' + Product.Products_Name,
      [
        {text: '取消', style: 'cancel'},
        {text: '确定', onPress: ()=>{
          this.Delete_From_Favorite_Product(Product)
        }},

      ],
    )

  }



  Refresh_User_Favorite_Product_Board(){

    AsyncStorage.getItem('User_ID', (err, result) => {

      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        DropDownHolder.getDropDown().alertWithType('error', 'Error!', '登录出错，请先登录！' )

        this.props.navigation.navigate('User_Home');


      }

      else {

        // Next we need to getfavoriteproduct function to get the favorite product of the user

        getfavoriteproduct(User_ID, (response) => {

          const get_favorite_product_code = response["StatusCode"]

          const Favorite_Products = response["ResponseText"]

          if (get_favorite_product_code == 200 || get_favorite_product_code == 617) {

            // next create array to store the products object
            var Favorite_Product_List = []

            for (var product in Favorite_Products) {
              console.log(Favorite_Products[product]);
              Favorite_Product_List.push(Favorite_Products[product])
            }

            this.setState({
              Favorite_Products : Favorite_Product_List,

              Product_Quantity : 1,

              Product_Quantity_Modal_Visible: false,

              Temp_Product_Info: null,


            });
            // End of if statement in getfavoriteproduct
          }

          else {


            DropDownHolder.getDropDown().alertWithType('error', 'Error Code: ' + get_favorite_product_code + '!', get_favorite_product_code )


            this.props.navigation.navigate('User_Home');

          }

        });


      }

    });


  }


  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });

      this.Refresh_User_Favorite_Product_Board()


  }




  render() {

    if (this.state.Favorite_Products == null) {

      return(

        <View>
          <Text>Loading</Text>
        </View>

      )

    }

    else if (this.state.Favorite_Products.length == 0) {

      return(
        <View>
          <Status_Bar />

            <View style={{
                height: '8%',
                backgroundColor: 'white',
                flexDirection: 'row',
                borderBottomWidth: 1,
              }} >

              <View style={{
                  height: '100%',
                  width: '30%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginLeft: 5
                }} >

                <TouchableOpacity onPress = {()=> this.props.navigation.goBack()}>

                  <Image style={{width: 24, height: 24}} source={require('../../../img/back_arrow.png')} />

                </TouchableOpacity>
              </View>

              <View style={{
                  height: '100%',
                  width: '40%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row'
                }} >
                <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 我 的 收 藏 </Text>
              </View>



            </View>


            <View style={{backgroundColor: 'white', height: '89%', alignItems: 'center', justifyContent: 'center'}}>


                <TouchableOpacity onPress = {() => this.props.navigation.navigate('Product_Home')} activeOpacity={0.5} style={{borderWidth: 1, borderRadius: 5, borderColor: "#c9cdcb"}}>
                  <Text style={{color: 'black', fontWeight:'bold', textAlign: 'center', fontSize: 20}}> 马 上 去 逛 逛 </Text>

                </TouchableOpacity>



            </View>



        </View>


      )

    }

    else {

    }

    return(

      <View>
        <Status_Bar />

          <View style={{
              height: '8%',
              backgroundColor: 'white',
              flexDirection: 'row',
              borderBottomWidth: 1,
            }} >

            <View style={{
                height: '100%',
                width: '30%',
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: 5
              }} >

              <TouchableOpacity onPress = {()=> this.props.navigation.goBack()}>

                <Image style={{width: 24, height: 24}} source={require('../../../img/back_arrow.png')} />

              </TouchableOpacity>
            </View>

            <View style={{
                height: '100%',
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }} >
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 我 的 收 藏 </Text>
            </View>



          </View>


          <ScrollView style={{backgroundColor: 'white', height: '89%'}}>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>

              {
                this.state.Favorite_Products.map((product, i) => {
                  return(

                    <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : product.Products_ID})} key={i} style={{width:'100%' , height: 170, borderColor: '#dedede', borderWidth: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop:10, marginBottom: 10, paddingTop:10, paddingBottom: 10, paddingLeft: 10,}}>

                      <View style={{width: '35%'}}>
                        <Image
                          source={Product_Image[product.Products_Image_Dir]}
                          style={{height:'100%', width: '100%'}} />
                      </View>



                      <View style={{width: '55%', flexDirection:'column', marginLeft: 10, marginTop:10, flexWrap:'wrap'}}>

                        <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5, marginBottom: 10}}>
                          <Text style={{fontSize: 20}}>{product.Products_Name}</Text>
                        </View>

                        <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5, marginBottom: 5}}>
                          <Text style={{fontSize: 15}}>商品编号: {product.Products_Number} </Text>
                        </View>

                        <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5, marginBottom: 5}}>
                          <Text style={{fontSize: 15, marginRight: 10}}>规格 : {product.Products_Spec}</Text>
                        </View>

                        <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5, marginBottom: 5}}>
                          <Text style={{fontSize: 15}}>表色 : {product.Products_Color}</Text>
                        </View>

                        <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5, marginBottom: 5}}>
                          <Text style={{fontSize: 15}}>价格 : {product.Products_Price}/千件</Text>
                        </View>



                      </View>

                      <View style={{width: '10%', flexDirection: 'column'}}>


                        <View style={{height: '50%', paddingTop: 5}}>

                          <TouchableOpacity onPress={() => this.Delete_From_Favorite_Product_On_Press(product)} activeOpacity={0.5} >
                            <Image style={{width: 27, height: 27}} source={require('../../../img/favorite.png')} />
                          </TouchableOpacity>

                        </View>

                        <View style={{height: '50%', flexDirection: 'column-reverse', paddingBottom: 5}}>

                          <TouchableOpacity onPress={() => this.Open_Product_Quantity_Modal(product)} activeOpacity={0.5}>
                            <Image style={{width: 27, height: 27}} source={require('../../../img/shopping_cart.png')} />
                          </TouchableOpacity>


                        </View>


                      </View>

                    </TouchableOpacity>


                  );
                })
              }


              </View>


              <Modal
               isVisible={this.state.Product_Quantity_Modal_Visible}
               backdropColor={"black"}
               backdropOpacity={0.5}
               backdropTransitionInTiming={500}
               backdropTransitionOutTiming={500}
               animationOutTiming={500}
               animationInTiming={500}
               onBackdropPress={() => this.Close_Product_Quantity_Modal()}
               style={{justifyContent: "center", alignItems: "center",}}

             >
               <View style={{
                 height: '20%',
                 width: '90%',
                 backgroundColor: '#ffffff',
                 borderRadius: 5,

                 borderColor: "rgba(0, 0, 0, 0.1)",
                 flexDirection: 'column'
               }}>


               <View style={{flexDirection:'row-reverse', marginTop: 5, marginLeft: 5}}>

                 <TouchableOpacity onPress={() => this.Close_Product_Quantity_Modal()} >
                   <Image style={{width: 24, height: 24}} source={require('../../../img/clear.png')} />
                 </TouchableOpacity>


               </View>

               <View style={{flexDirection: 'row', marginTop: 10, justifyContent: "center", alignItems: "center",}}>

                 <TouchableOpacity onPress={() => this.Product_Quantity_Minus()} activeOpacity={0.5} style={{marginRight: 5}}>
                   <Image style={{width: 24, height: 24}} source={require('../../../img/minus.png')} />
                 </TouchableOpacity>

                 <TextInput
                   placeholder={String(this.state.Product_Quantity)}
                   placeholderTextColor="black"
                   onChangeText={(text) => this.Product_Quantity_Handler(text)}
                   value={String(this.state.Product_Quantity)}
                   keyboardType={'numeric'}
                   style={{
                     height: 20,
                     borderWidth: 2,
                     borderRadius: 5,
                     width: 60}} />

                  <TouchableOpacity onPress={() => this.Product_Quantity_Add()} activeOpacity={0.5} style={{marginLeft: 5}} >
                   <Image style={{width: 24, height: 24}} source={require('../../../img/plus.png')} />
                  </TouchableOpacity>


               </View>

               <View style={{flexDirection: 'row', marginTop: 10, justifyContent: "center", alignItems: "center",}}>

                 <TouchableOpacity
                   onPress={() => this.Add_To_Shopping_Cart()}
                   activeOpacity={0.5}
                   style={{
                     borderWidth: 1,
                     borderRadius: 10,
                     padding: 4
                   }}
                   >

                   <Text style={{fontSize: 17}}> 加 入 购 物 车 </Text>

                 </TouchableOpacity>

               </View>



               </View>






             </Modal>





          </ScrollView>






      </View>





    )
  }
}
