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
import {OrderButtonsExistStyle, Product_Image, OrderTypeButtonsExistStyle, ErrorCodePrase} from '../../util.js';
import {getorder} from '../../server.js';
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



export default class User_Order_Board extends Component<{}> {

  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {

      Order_Type: null,

      Order_List: null,


    };
  }


  NDP_Handler(){

    const Order_Type = "NDP"

    this.User_Order_Board_Refresh(Order_Type);

  }

  PRO_Handler(){

    const Order_Type = "PRO"

    this.User_Order_Board_Refresh(Order_Type);

  }

  NWP_Handler(){

    const Order_Type = "NWP"

    this.User_Order_Board_Refresh(Order_Type);

  }

  ORC_Handler(){

    const Order_Type = "ORC"

    this.User_Order_Board_Refresh(Order_Type);

  }

  ALL_Handler(){

    const Order_Type = "ALL"

    this.User_Order_Board_Refresh(Order_Type);

  }


  User_Order_Board_Refresh(Order_Type){

    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.props.navigation.navigate('User_Home');

      }

      else {

        getorder(User_ID, Order_Type, (response) => {
          const get_order_status_code = response["StatusCode"]
          const Orders = response["ResponseText"]


          if (get_order_status_code == 200 || get_order_status_code == 618) {

            // next create array to store the order
            var Order_List = []
            for (var Order in Orders) {

              Order_List.push(Orders[Order])

            }


            this.setState({
              Order_List: Order_List,
              Order_Type : Order_Type,
            })


          } else {

            const errormsg = ErrorCodePrase(get_order_status_code)[1]

            const title = ErrorCodePrase(get_order_status_code)[0]

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

    });


  }



  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });

    const { params } = this.props.navigation.state;
    const Order_Type = params ? params.Order_Type : null;


    this.User_Order_Board_Refresh(Order_Type)




  }






  render() {

    if (this.state.Order_List == null) {

      return(
        <View>
          <Text>loading</Text>
        </View>
      )

    } else {

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

                <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>

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
                <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 订 单 管 理 </Text>
              </View>


            </View>

            <View style={{height: '7%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5, backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#e0e0e0'}}>

              <TouchableOpacity activeOpacity={0.8} onPress={() => this.ALL_Handler()} style={OrderButtonsExistStyle(this.state.Order_Type == "ALL")}>

                <Text style={{fontSize: 17, paddingBottom: 5}}>全部订单</Text>

              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={() => this.NDP_Handler()} style={OrderButtonsExistStyle(this.state.Order_Type == "NDP")}>

                <Text style={{fontSize: 17, paddingBottom: 5}}>代收定金</Text>

              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={() => this.PRO_Handler()} style={OrderButtonsExistStyle(this.state.Order_Type == "PRO")}>

                <Text style={{fontSize: 17, paddingBottom: 5}}>代收货</Text>

              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={() => this.NWP_Handler()} style={OrderButtonsExistStyle(this.state.Order_Type == "NWP")}>

                <Text style={{fontSize: 17, paddingBottom: 5}}>代付尾款</Text>

              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={() => this.ORC_Handler()} style={OrderButtonsExistStyle(this.state.Order_Type == "ORC")}>

                <Text style={{fontSize: 17, paddingBottom: 5}}>已完成</Text>

              </TouchableOpacity>


            </View>

            <ScrollView style={{height: '82%', flexDirection: 'column', backgroundColor: 'white', }}>


              {
                this.state.Order_List.map((order, i) => {



                  return(

                    <View key={i} style={{padding: 5, borderBottomWidth: 1, borderColor: '#e0e0e0', flexDirection: 'column'}}>

                      <TouchableOpacity onPress={()=> this.props.navigation.navigate('User_Single_Order_Board', {Order_ID: order.Order_ID, Order_Type: this.state.Order_Type})} activeOpacity={0.8} style={{flexDirection: 'column', paddingBottom: 10}}>

                        {
                          order.Product_List.map((product, i) => {



                            return(

                              <View key={i} style={{height: 120, paddingBottom: 5, paddingTop: 5, flexDirection: 'row'}}>

                                <View style={{width: '30%', alignItems: 'center', justifyContent: 'center' }}>

                                  <Image
                                    source={Product_Image[product.Products_Image_Dir]}
                                    style={{width: '90%', height: '100%'}}/>

                                </View>

                                <View style={{width: '65%', flexDirection: 'column'}}>

                                  <View style={{flexWrap:'wrap'}}>
                                    <Text style={{fontSize: 16}}>{product.Products_Name}</Text>
                                  </View>

                                  <View style={{flexWrap:'wrap', paddingTop: 5}}>
                                    <Text style={{fontSize: 14}}>规格: {product.Products_Spec}</Text>
                                  </View>

                                  <View style={{flexWrap:'wrap', paddingTop: 5}}>
                                    <Text style={{fontSize: 14}}>表色: {product.Products_Color}</Text>
                                  </View>

                                  <View style={{flexWrap:'wrap', paddingTop: 5}}>
                                    <Text style={{fontSize: 14}}>数量: {product.Products_Units}</Text>
                                  </View>

                                  <View style={{flexWrap:'wrap', paddingTop: 5}}>
                                    <Text style={{fontSize: 14}}>价格: {product.Products_Price}</Text>
                                  </View>

                                </View>

                              </View>

                            );



                          })
                        }

                      </TouchableOpacity>


                      <View style={{paddingTop: 10, paddingBottom: 10, borderTopWidth: 1, borderColor: '#e0e0e0', flexDirection: 'row-reverse' }}>
                        <Text style={{fontSize: 14}}>共<Text style={{fontSize: 16}}> {order.Product_List.length} </Text>件产品, 合计: <Text style={{fontSize: 16}}>{order.Order_Total_Price}</Text> </Text>
                      </View>



                      <View style={OrderTypeButtonsExistStyle(order.Order_Status == "NDP")}>

                        <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                          <Text style={{fontSize: 14}}>取消订单</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                          <Text style={{fontSize: 14}}>支付定金</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('User_Single_Order_Board', {Order_ID: order.Order_ID, Order_Type: this.state.Order_Type})} activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                          <Text style={{fontSize: 14}}>查看订单</Text>
                        </TouchableOpacity>


                      </View>



                      <View style={OrderTypeButtonsExistStyle(order.Order_Status == "PRO" || order.Order_Status == "SHP" || order.Order_Status == "PCK" || order.Order_Status == "REV")}>

                        <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                          <Text style={{fontSize: 14}}>联系客服</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                          <Text style={{fontSize: 14}}>查看物流</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('User_Single_Order_Board', {Order_ID: order.Order_ID, Order_Type: this.state.Order_Type})} activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                          <Text style={{fontSize: 14}}>查看订单</Text>
                        </TouchableOpacity>


                      </View>


                      <View style={OrderTypeButtonsExistStyle(order.Order_Status == "NWP")}>

                        <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                          <Text style={{fontSize: 14}}>联系客服</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                          <Text style={{fontSize: 14}}>支付尾款</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('User_Single_Order_Board', {Order_ID: order.Order_ID, Order_Type: this.state.Order_Type})} activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                          <Text style={{fontSize: 14}}>查看订单</Text>
                        </TouchableOpacity>


                      </View>


                      <View style={OrderTypeButtonsExistStyle(order.Order_Status == "ORC")}>

                        <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                          <Text style={{fontSize: 14}}>联系客服</Text>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                          <Text style={{fontSize: 14}}>删除订单</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('User_Single_Order_Board', {Order_ID: order.Order_ID, Order_Type: this.state.Order_Type})} activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                          <Text style={{fontSize: 14}}>查看订单</Text>
                        </TouchableOpacity>


                      </View>




                    </View>


                  );
                })
              }



            </ScrollView>



        </View>






      )

    }


  }
}
