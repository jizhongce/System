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
import {PaymentPrase, ShowPhoneNumber, Product_Image, SingleOrderButtonsExistStyle, SingleOrderStatusExistStyle} from '../../util.js';
import {getsingleorder} from '../../server.js';
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



export default class User_Single_Order_Board extends Component<{}> {

  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {

      Order_Info: null,
      Order_Type: null,

    };
  }


  User_Single_Order_Board_Refresh(){

    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.props.navigation.navigate('User_Home');

      }

      else {

        const { params } = this.props.navigation.state;
        const Order_ID = params ? params.Order_ID : null;
        const Order_Type = params ? params.Order_Type : null;

        getsingleorder(User_ID, Order_ID, (response) => {
          const get_single_order_status_code = response["StatusCode"]
          const Order_Info = response["ResponseText"]

          console.log(Order_Info);

          if (get_single_order_status_code == 200) {

            this.setState({
              Order_Info: Order_Info,
              Order_Type: Order_Type
            })


          } else {

            const errormsg = ErrorCodePrase(get_single_order_status_code)[1]

            const title = ErrorCodePrase(get_single_order_status_code)[0]

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

      this.User_Single_Order_Board_Refresh()


  }




  render() {

    if (this.state.Order_Info == null) {

      return(
        <View>
          <Text>Loading</Text>
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

                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>

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
                    <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 订 单 详 情 </Text>
                  </View>

                </View>

                <ScrollView style={{height: '82%', backgroundColor: 'white'}}>

                  <View style={SingleOrderStatusExistStyle(this.state.Order_Info.Basic_Info.Order_Status == "NDP")}>

                    <View style={{flexDirection: 'column', width: '60%', justifyContent: 'center',}}>
                      <Text style={{color: 'white', fontSize: 23, paddingLeft: 20, fontWeight:'bold'}}> 等待支付定金 </Text>
                      <Text style={{color: 'white', fontSize: 15, paddingLeft: 20, fontWeight:'bold'}}> 剩余支付时间: 24 小时 </Text>
                    </View>

                    <View style={{flexDirection: 'column', width: '40%', justifyContent: 'center', alignItems: 'center',}}>

                      <Image style={{height: '65%', width: '65%'}} source={require('../../../img/NDP_NWP_Status.png')} />

                    </View>

                  </View>


                  <View style={SingleOrderStatusExistStyle(this.state.Order_Info.Basic_Info.Order_Status == "PRO")}>

                    <View style={{flexDirection: 'column', width: '60%', justifyContent: 'center',}}>
                      <Text style={{color: 'white', fontSize: 23, paddingLeft: 20, fontWeight:'bold'}}> 订单正在处理 </Text>
                      <Text style={{color: 'white', fontSize: 15, paddingLeft: 20, fontWeight:'bold'}}> 订单处理时间: 12 小时 </Text>
                    </View>

                    <View style={{flexDirection: 'column', width: '40%', justifyContent: 'center', alignItems: 'center',}}>

                      <Image style={{height: '65%', width: '65%'}} source={require('../../../img/PRO_Status.png')} />

                    </View>

                  </View>


                  <View style={SingleOrderStatusExistStyle(this.state.Order_Info.Basic_Info.Order_Status == "PCK")}>

                    <View style={{flexDirection: 'column', width: '60%', justifyContent: 'center',}}>
                      <Text style={{color: 'white', fontSize: 23, paddingLeft: 20, fontWeight:'bold'}}> 产品正在包装出库 </Text>
                      <Text style={{color: 'white', fontSize: 15, paddingLeft: 20, fontWeight:'bold'}}> 预计到达时间: 2 天 </Text>
                    </View>

                    <View style={{flexDirection: 'column', width: '40%', justifyContent: 'center', alignItems: 'center',}}>

                      <Image style={{height: '65%', width: '65%'}} source={require('../../../img/PCK_Status.png')} />

                    </View>

                  </View>


                  <View style={SingleOrderStatusExistStyle(this.state.Order_Info.Basic_Info.Order_Status == "SHP")}>

                    <View style={{flexDirection: 'column', width: '60%', justifyContent: 'center',}}>
                      <Text style={{color: 'white', fontSize: 23, paddingLeft: 20, fontWeight:'bold'}}> 产品已经出库 </Text>
                      <Text style={{color: 'white', fontSize: 15, paddingLeft: 20, fontWeight:'bold'}}> 预计到达时间: 2 天 </Text>
                    </View>

                    <View style={{flexDirection: 'column', width: '40%', justifyContent: 'center', alignItems: 'center',}}>

                      <Image style={{height: '65%', width: '65%'}} source={require('../../../img/SHP_Status.png')} />

                    </View>

                  </View>


                  <View style={SingleOrderStatusExistStyle(this.state.Order_Info.Basic_Info.Order_Status == "REV")}>

                    <View style={{flexDirection: 'column', width: '60%', justifyContent: 'center',}}>
                      <Text style={{color: 'white', fontSize: 23, paddingLeft: 20, fontWeight:'bold'}}> 产品已签收 </Text>
                      <Text style={{color: 'white', fontSize: 15, paddingLeft: 20, fontWeight:'bold'}}> 等待支付尾款 </Text>
                    </View>

                    <View style={{flexDirection: 'column', width: '40%', justifyContent: 'center', alignItems: 'center',}}>

                      <Image style={{height: '65%', width: '65%'}} source={require('../../../img/REV_Status.png')} />

                    </View>

                  </View>


                  <View style={SingleOrderStatusExistStyle(this.state.Order_Info.Basic_Info.Order_Status == "NWP")}>

                    <View style={{flexDirection: 'column', width: '60%', justifyContent: 'center',}}>
                      <Text style={{color: 'white', fontSize: 23, paddingLeft: 20, fontWeight:'bold'}}> 等待支付尾款 </Text>
                      <Text style={{color: 'white', fontSize: 15, paddingLeft: 20, fontWeight:'bold'}}> 剩余支付时间: 5 天 </Text>
                    </View>

                    <View style={{flexDirection: 'column', width: '40%', justifyContent: 'center', alignItems: 'center',}}>

                      <Image style={{height: '65%', width: '65%'}} source={require('../../../img/NDP_NWP_Status.png')} />

                    </View>

                  </View>


                  <View style={SingleOrderStatusExistStyle(this.state.Order_Info.Basic_Info.Order_Status == "ORC")}>

                    <View style={{flexDirection: 'column', width: '60%', justifyContent: 'center',}}>
                      <Text style={{color: 'white', fontSize: 23, paddingLeft: 20, fontWeight:'bold'}}> 订单已完成 </Text>
                    </View>

                    <View style={{flexDirection: 'column', width: '40%', justifyContent: 'center', alignItems: 'center',}}>

                      <Image style={{height: '65%', width: '65%'}} source={require('../../../img/ORC_Status.png')} />

                    </View>

                  </View>


                  <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: 'white', flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#cfcfcf'}}>

                    <View style={{width: '10%', borderRightWidth: 1, borderColor: '#cfcfcf', justifyContent: 'center', alignItems: 'center'}}>
                      <Image style={{}} source={require('../../../img/Marker.png')} />
                    </View>

                    <View style={{paddingLeft: 15, width: '90%', borderRightWidth: 1, borderColor: '#cfcfcf', flexWrap: 'wrap'}}>

                      <Text style={{fontSize: 16,  paddingBottom: 2}}>{this.state.Order_Info.Shipping_Info.Address_Name}, {ShowPhoneNumber(this.state.Order_Info.Shipping_Info.Address_Phone_Number)}</Text>
                      <Text style={{fontSize: 14, paddingTop: 2}}>{this.state.Order_Info.Shipping_Info.Province} {this.state.Order_Info.Shipping_Info.City} {this.state.Order_Info.Shipping_Info.District} {this.state.Order_Info.Shipping_Info.Street}</Text>

                    </View>

                  </TouchableOpacity>

                  {
                    this.state.Order_Info.Product_List.map((product, i) => {

                      return(

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : product.Products_ID})} key={i} style={{height: 150, backgroundColor: 'white', marginTop: 10, borderBottomWidth: 1, borderColor: '#cfcfcf', flexDirection: 'row'}}>

                          <View style={{width: '35%', justifyContent: 'center', alignItems: 'center'}}>

                            <Image style={{height: '80%', width: '80%'}} source={Product_Image[product.Products_Image_Dir]} />

                          </View>

                          <View style={{width: '65%', justifyContent: 'center', flexDirection: 'column'}}>

                            <Text style={{paddingBottom: 1, paddingLeft: 5, fontSize: 18}}>{product.Products_Name}</Text>
                            <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>产品编号: {product.Products_Number}</Text>
                            <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>规格: {product.Products_Spec}</Text>
                            <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>表色: {product.Products_Color}</Text>
                            <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>价格: {product.Products_Price}</Text>
                            <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>数量: {product.Products_Units}</Text>


                          </View>


                        </TouchableOpacity>


                      );
                    })


                  }


                  <View style={{paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#cfcfcf', flexDirection: 'row-reverse' }}>
                    <Text style={{fontSize: 14}}>共<Text style={{fontSize: 16}}> {this.state.Order_Info.Product_List.length} </Text>件产品, 合计: <Text style={{fontSize: 16}}>{this.state.Order_Info.Basic_Info.Order_Total_Price}</Text> </Text>
                  </View>

                  <View style={{paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#cfcfcf', flexDirection: 'column' }}>
                    <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>支付方式: {PaymentPrase(this.state.Order_Info.Basic_Info.Order_Payment_Method)}</Text>
                    <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>已支付金额: {this.state.Order_Info.Basic_Info.Order_Paid_Price}</Text>
                    <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>待支付金额: {this.state.Order_Info.Basic_Info.Order_Total_Price - this.state.Order_Info.Basic_Info.Order_Paid_Price}</Text>
                    <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>订单提交时间: {this.state.Order_Info.Basic_Info.Order_Time}</Text>
                  </View>


                </ScrollView>

                <View style={SingleOrderButtonsExistStyle(this.state.Order_Info.Basic_Info.Order_Status == "NDP")}>

                  <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 10, borderRadius: 10}}>
                    <Text style={{fontSize: 14}}>联系客服</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 10, borderRadius: 10}}>
                    <Text style={{fontSize: 14}}>取消订单</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 10, marginRight: 5, borderRadius: 10}}>
                    <Text style={{fontSize: 14}}>支付定金</Text>
                  </TouchableOpacity>

                </View>

                <View style={SingleOrderButtonsExistStyle(this.state.Order_Info.Basic_Info.Order_Status == "PRO" || this.state.Order_Info.Basic_Info.Order_Status == "SHP" || this.state.Order_Info.Basic_Info.Order_Status == "PCK" || this.state.Order_Info.Basic_Info.Order_Status == "REV")}>

                  <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 10, borderRadius: 10}}>
                    <Text style={{fontSize: 14}}>联系客服</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 10, marginRight: 5, borderRadius: 10}}>
                    <Text style={{fontSize: 14}}>查看物流</Text>
                  </TouchableOpacity>

                </View>

                <View style={SingleOrderButtonsExistStyle(this.state.Order_Info.Basic_Info.Order_Status == "NWP")}>

                  <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 10, borderRadius: 10}}>
                    <Text style={{fontSize: 14}}>联系客服</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 10, marginRight: 5, borderRadius: 10}}>
                    <Text style={{fontSize: 14}}>支付尾款</Text>
                  </TouchableOpacity>

                </View>

                <View style={SingleOrderButtonsExistStyle(this.state.Order_Info.Basic_Info.Order_Status == "ORC")}>

                  <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 10, borderRadius: 10}}>
                    <Text style={{fontSize: 14}}>联系客服</Text>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 10, marginRight: 5, borderRadius: 10}}>
                    <Text style={{fontSize: 14}}>申请退货</Text>
                  </TouchableOpacity>

                </View>


            </View>



          )

    }

  }
}
