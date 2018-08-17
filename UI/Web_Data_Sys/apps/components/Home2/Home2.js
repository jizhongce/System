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
import {OrderButtonsExistStyle} from '../../util.js';
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



export default class Home2 extends Component<{}> {

  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {

      From_Lat : 120.677485,
      From_Lon : 28.017585,

      To_Lat : 121.488161,
      To_Lon : 31.207022,


    };
  }



    componentWillMount(){
      //AsyncStorage.clear()
      // AsyncStorage.setItem('UID123', 'hello', () => {
      //
      // });
      this.props.navigation.addListener('willFocus', ()=>{

        this.setState({
          From_Lon : 120.677485,
          From_Lat : 28.017585,

          To_Lon : 121.488161,
          To_Lat : 31.207022,
        });

      });


    }



  render() {

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

            <MapView
              style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
              zoomEnabled={true}
              region={{
                latitude: (this.state.From_Lat + this.state.To_Lat)/2.0,
                longitude: (this.state.From_Lon + this.state.To_Lon)/2.0,
                latitudeDelta: 4,
                longitudeDelta: 4,
              }} >

              <Marker
                coordinate={{
                  latitude: this.state.From_Lat,
                  longitude: this.state.From_Lon,
                }}
                >

                <Image style={{width: 40, height: 40}} source={require('../../../img/Marker.png')} />
                <Callout>
                  <View style={{width: 130}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>发货仓库</Text>
                    <Text>company11111</Text>

                  </View>
                </Callout>

              </Marker>

              <Marker
                coordinate={{
                  latitude: this.state.To_Lat,
                  longitude: this.state.To_Lon,
                }}
                >

                <Image style={{width: 40, height: 40}} source={require('../../../img/Marker.png')} />

                  <Callout>
                    <View style={{width: 120}}>
                      <Text style={{fontSize: 16, fontWeight: 'bold'}}>收货地址:</Text>
                        <Text style={{fontSize: 13}}>company11111</Text>
                        <Text style={{fontSize: 13}}>138xxxxx788</Text>
                        <Text style={{fontSize: 13}}>浙江省温州市江滨西路888号</Text>
                    </View>
                  </Callout>

              </Marker>

              <Polyline
                coordinates={[
                  { latitude: this.state.From_Lat, longitude: this.state.From_Lon },
                  { latitude: this.state.To_Lat, longitude: this.state.To_Lon }
                ]}
                strokeColor='black'
                strokeWidth={2}
                />


            </MapView>

            {/*

              <View style={{padding: 5, width: '40%', borderWidth: 1, borderRadius: 10, backgroundColor: 'rgba(250, 250, 250, 0.85)', position: 'absolute', top: 5, left: 5}}>
                <Text style={{fontSize: 16, lineHeight: 25, padding: 5, fontWeight: 'bold'}}>      订单正在处理中，暂时无法获取物流信息</Text>
              </View>

              */}

            <View style={{padding: 5, width: '40%', borderWidth: 1, borderRadius: 10, backgroundColor: 'rgba(250, 250, 250, 0.85)', position: 'absolute', top: 5, left: 5}}>
              <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>订单状态: 出库中</Text>
              <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>发货仓库: 江西哈地位仓库1</Text>
              <Text style={{fontSize: 16, padding: 2, fontWeight: 'bold'}}>预计到达时间: 发货后显示</Text>
            </View>





          </View>



      </View>









    )
  }
}
