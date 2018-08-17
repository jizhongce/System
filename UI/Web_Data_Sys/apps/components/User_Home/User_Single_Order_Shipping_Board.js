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
import {StatusPrase, FactoryPrase, ShowPhoneNumber} from '../../util.js';
import {getsingleordershipping} from '../../server.js';
import { Icon, Header } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Modal from "react-native-modal";
import MapView from 'react-native-maps';
import { Marker, Polyline, Callout } from 'react-native-maps';
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



export default class User_Single_Order_Shipping_Board extends Component<{}> {

  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {

      Order_Shipping_Info : null,

    };
  }


  User_Single_Order_Shipping_Board_Refresh(){

    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.props.navigation.navigate('User_Home');

      }

      else {

        const { params } = this.props.navigation.state;
        const Order_ID = params ? params.Order_ID : null;

        getsingleordershipping(User_ID, Order_ID, (response) => {
          const get_single_order_shipping_status_code = response["StatusCode"]
          const Order_Shipping_Info = response["ResponseText"]

          console.log(Order_Shipping_Info);

          if (get_single_order_shipping_status_code == 200) {

            this.setState({
              Order_Shipping_Info : Order_Shipping_Info,
            });


          } else {

            const errormsg = ErrorCodePrase(get_single_order_shipping_status_code)[1]

            const title = ErrorCodePrase(get_single_order_shipping_status_code)[0]

            Alert.alert(
              title,
              errormsg,
              [
                {text: 'OK', style: 'cancel', onPress: ()=>{
                  this.props.navigation.goBack()
                }},
              ],
            )

          }


        });

      }

    });


  }


  Tracking_Board(Order_Status){

    switch (Order_Status) {
      case 'NDP':
        return(
          <View style={{padding: 5, width: '40%', borderWidth: 1, borderRadius: 10, backgroundColor: 'rgba(250, 250, 250, 0.85)', position: 'absolute', top: 5, left: 5}}>
            <Text style={{fontSize: 16, lineHeight: 25, padding: 5, fontWeight: 'bold'}}>      订单未收到定金，暂时无法获取物流信息</Text>
          </View>
        )
        break;


      case 'PRO':
        return(
          <View style={{padding: 5, width: '40%', borderWidth: 1, borderRadius: 10, backgroundColor: 'rgba(250, 250, 250, 0.85)', position: 'absolute', top: 5, left: 5}}>
            <Text style={{fontSize: 16, lineHeight: 25, padding: 5, fontWeight: 'bold'}}>      订单正在处理中，暂时无法获取物流信息</Text>
          </View>
        )
        break;


      case 'PCK':
        return(
          <View style={{padding: 5, width: '40%', borderWidth: 1, borderRadius: 10, backgroundColor: 'rgba(250, 250, 250, 0.85)', position: 'absolute', top: 5, left: 5}}>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>订单状态: {StatusPrase(Order_Status)}</Text>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>发货仓库: {FactoryPrase(this.state.Order_Shipping_Info.Order_Info.Order_Factory)}</Text>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>预计到达时间: 发货后显示</Text>
          </View>
        )
        break;


      case 'SHP':
        return(
          <View style={{padding: 5, width: '40%', borderWidth: 1, borderRadius: 10, backgroundColor: 'rgba(250, 250, 250, 0.85)', position: 'absolute', top: 5, left: 5}}>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>订单状态: {StatusPrase(Order_Status)}</Text>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>发货仓库: {FactoryPrase(this.state.Order_Shipping_Info.Order_Info.Order_Factory)}</Text>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>预计到达时间: 两天后</Text>
          </View>
        )
        break;


      case 'REV':
        return(
          <View style={{padding: 5, width: '40%', borderWidth: 1, borderRadius: 10, backgroundColor: 'rgba(250, 250, 250, 0.85)', position: 'absolute', top: 5, left: 5}}>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>订单状态: {StatusPrase(Order_Status)}</Text>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>发货仓库: {FactoryPrase(this.state.Order_Shipping_Info.Order_Info.Order_Factory)}</Text>
          </View>
        )
        break;


      case 'NWP':
        return(
          <View style={{padding: 5, width: '40%', borderWidth: 1, borderRadius: 10, backgroundColor: 'rgba(250, 250, 250, 0.85)', position: 'absolute', top: 5, left: 5}}>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>订单状态: {StatusPrase(Order_Status)}</Text>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>发货仓库: {FactoryPrase(this.state.Order_Shipping_Info.Order_Info.Order_Factory)}</Text>
          </View>
        )
        break;


      case 'ORC':
        return(
          <View style={{padding: 5, width: '40%', borderWidth: 1, borderRadius: 10, backgroundColor: 'rgba(250, 250, 250, 0.85)', position: 'absolute', top: 5, left: 5}}>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>订单状态: {StatusPrase(Order_Status)}</Text>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>发货仓库: {FactoryPrase(this.state.Order_Shipping_Info.Order_Info.Order_Factory)}</Text>
          </View>
        )
        break;


      case 'CAN':
        return(
          <View style={{padding: 5, width: '40%', borderWidth: 1, borderRadius: 10, backgroundColor: 'rgba(250, 250, 250, 0.85)', position: 'absolute', top: 5, left: 5}}>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>订单状态: {StatusPrase(Order_Status)}</Text>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>发货仓库: {FactoryPrase(this.state.Order_Shipping_Info.Order_Info.Order_Factory)}</Text>
          </View>
        )
        break;


      default:
        return(
          <View style={{padding: 5, width: '40%', borderWidth: 1, borderRadius: 10, backgroundColor: 'rgba(250, 250, 250, 0.85)', position: 'absolute', top: 5, left: 5}}>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>订单状态: </Text>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>发货仓库: </Text>
            <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>预计到达时间: </Text>
          </View>
        )
        break;

    }

  }


  Map_Board(Order_Status){

    switch (Order_Status) {
      case 'NDP':
        return(
          <MapView
            style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
            zoomEnabled={true}
            region={{
              latitude: parseFloat(this.state.Order_Shipping_Info.Shipping_Info.Latitude),
              longitude: parseFloat(this.state.Order_Shipping_Info.Shipping_Info.Longitude),
              latitudeDelta: 5,
              longitudeDelta: 5,
            }} >

            <Marker
              coordinate={{
                latitude: parseFloat(this.state.Order_Shipping_Info.Shipping_Info.Latitude),
                longitude: parseFloat(this.state.Order_Shipping_Info.Shipping_Info.Longitude),
              }}
              >

              <Image style={{width: 40, height: 40}} source={require('../../../img/Marker.png')} />

                <Callout>
                  <View style={{width: 120}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>收货地址:</Text>
                      <Text style={{fontSize: 13}}>{this.state.Order_Shipping_Info.Shipping_Info.Address_Name}</Text>
                      <Text style={{fontSize: 13}}>{ShowPhoneNumber(this.state.Order_Shipping_Info.Shipping_Info.Address_Phone_Number)}</Text>
                      <Text style={{fontSize: 13}}>{this.state.Order_Shipping_Info.Shipping_Info.Province}{this.state.Order_Shipping_Info.Shipping_Info.City}{this.state.Order_Shipping_Info.Shipping_Info.District}{this.state.Order_Shipping_Info.Shipping_Info.Street}</Text>
                  </View>
                </Callout>

            </Marker>

          </MapView>
        )

        break;


      default:
        return(
          <MapView
            style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
            zoomEnabled={true}
            region={{
              latitude: (parseFloat(this.state.Order_Shipping_Info.Order_Info.Factory_Latitude) + parseFloat(this.state.Order_Shipping_Info.Shipping_Info.Latitude))/2.0,
              longitude: (parseFloat(this.state.Order_Shipping_Info.Order_Info.Factory_Longitude) + parseFloat(this.state.Order_Shipping_Info.Shipping_Info.Longitude))/2.0,
              latitudeDelta: 5,
              longitudeDelta: 5,
            }} >

            <Marker
              coordinate={{
                latitude: parseFloat(this.state.Order_Shipping_Info.Order_Info.Factory_Latitude),
                longitude: parseFloat(this.state.Order_Shipping_Info.Order_Info.Factory_Longitude),
              }}
              >

              <Image style={{width: 40, height: 40}} source={require('../../../img/Marker.png')} />
              <Callout>
                <View style={{width: 130}}>
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>发货仓库:</Text>
                  <Text>{FactoryPrase(this.state.Order_Shipping_Info.Order_Info.Order_Factory)}</Text>

                </View>
              </Callout>

            </Marker>

            <Marker
              coordinate={{
                latitude: parseFloat(this.state.Order_Shipping_Info.Shipping_Info.Latitude),
                longitude: parseFloat(this.state.Order_Shipping_Info.Shipping_Info.Longitude),
              }}
              >

              <Image style={{width: 40, height: 40}} source={require('../../../img/Marker.png')} />

                <Callout>
                  <View style={{width: 120}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>收货地址:</Text>
                      <Text style={{fontSize: 13}}>{this.state.Order_Shipping_Info.Shipping_Info.Address_Name}</Text>
                      <Text style={{fontSize: 13}}>{ShowPhoneNumber(this.state.Order_Shipping_Info.Shipping_Info.Address_Phone_Number)}</Text>
                      <Text style={{fontSize: 13}}>{this.state.Order_Shipping_Info.Shipping_Info.Province}{this.state.Order_Shipping_Info.Shipping_Info.City}{this.state.Order_Shipping_Info.Shipping_Info.District}{this.state.Order_Shipping_Info.Shipping_Info.Street}</Text>
                  </View>
                </Callout>

            </Marker>

            <Polyline
              coordinates={[
                { latitude: parseFloat(this.state.Order_Shipping_Info.Order_Info.Factory_Latitude), longitude: parseFloat(this.state.Order_Shipping_Info.Order_Info.Factory_Longitude) },
                { latitude: parseFloat(this.state.Order_Shipping_Info.Shipping_Info.Latitude), longitude: parseFloat(this.state.Order_Shipping_Info.Shipping_Info.Longitude) }
              ]}
              strokeColor='black'
              strokeWidth={2}
              />


          </MapView>
        )

        break;

    }
  }





  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });
    this.props.navigation.addListener('willFocus', ()=>{



      this.User_Single_Order_Shipping_Board_Refresh()


    });


  }




  render() {

    if (this.state.Order_Shipping_Info == null) {

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
                    <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 物 流 详 情 </Text>
                  </View>

                </View>

                <View style={{height: '89%'}}>

                  {
                    this.Map_Board(this.state.Order_Shipping_Info.Order_Info.Order_Status)
                  }


                  {
                    this.Tracking_Board(this.state.Order_Shipping_Info.Order_Info.Order_Status)
                  }


                </View>


            </View>





          )

    }

  }
}
