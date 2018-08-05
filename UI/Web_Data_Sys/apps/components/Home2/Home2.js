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


    };
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
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 订 单 详 情 </Text>
            </View>

          </View>

          <ScrollView style={{height: '82%', backgroundColor: 'white'}}>

            <View style={{height: 130, backgroundColor: '#fb6d59', flexDirection: 'row'}}>

              <View style={{flexDirection: 'column', width: '60%', justifyContent: 'center',}}>
                <Text style={{color: 'white', fontSize: 23, paddingLeft: 20, fontWeight:'bold'}}> 产品已经出库 </Text>
                <Text style={{color: 'white', fontSize: 15, paddingLeft: 20, fontWeight:'bold'}}> 预计到达时间:7天 </Text>
              </View>

              <View style={{flexDirection: 'column', width: '40%', justifyContent: 'center', alignItems: 'center',}}>

                <Image style={{height: '65%', width: '65%'}} source={require('../../../img/SHP_Status.png')} />

              </View>



            </View>

            <View style={{ backgroundColor: 'white', flexDirection: 'row', paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderTopWidth: 1, borderColor: '#cfcfcf'}}>

              <View style={{width: '10%', borderRightWidth: 1, borderColor: '#cfcfcf', justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{}} source={require('../../../img/Marker.png')} />
              </View>

              <View style={{paddingLeft: 15, width: '90%', borderRightWidth: 1, borderColor: '#cfcfcf', flexWrap: 'wrap'}}>

                <Text style={{fontSize: 16,  paddingBottom: 2}}>哈地位公司, 1888888888</Text>
                <Text style={{fontSize: 14, paddingTop: 2}}>浙江省温州市鹿城区江滨路779号</Text>

              </View>

            </View>

            <View style={{height: 150, backgroundColor: 'white', marginTop: 10, borderBottomWidth: 1, borderColor: '#cfcfcf', flexDirection: 'row'}}>

              <View style={{width: '35%', justifyContent: 'center', alignItems: 'center'}}>

                <Image style={{height: '80%', width: '80%'}} source={require('../../../img/product1.jpg')} />

              </View>

              <View style={{width: '65%', justifyContent: 'center', flexDirection: 'column'}}>

                <Text style={{paddingBottom: 1, paddingLeft: 5, fontSize: 18}}>GB-88686XXXXXXX</Text>
                <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>产品编号: P866676</Text>
                <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>规格: 34 X 56</Text>
                <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>表色: 黑色</Text>
                <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>价格: 3000</Text>
                <Text style={{paddingBottom: 1, paddingTop: 1, paddingLeft: 5, fontSize: 13}}>数量: 1</Text>


              </View>


            </View>

            <View style={{paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: '#cfcfcf', flexDirection: 'row-reverse' }}>
              <Text style={{fontSize: 14}}>共<Text style={{fontSize: 16}}> 1 </Text>件产品, 合计: <Text style={{fontSize: 16}}>2000</Text> </Text>
            </View>


          </ScrollView>

          <View style={{height: '7%', backgroundColor: 'white', flexDirection: 'row-reverse', borderTopWidth: 1, borderColor: '#cfcfcf', paddingTop: 10, paddingBottom: 10}}>

            <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 10, borderRadius: 10}}>
              <Text style={{fontSize: 14}}>联系客服</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 10, marginRight: 5, borderRadius: 10}}>
              <Text style={{fontSize: 14}}>查看物流</Text>
            </TouchableOpacity>


          </View>


      </View>









    )
  }
}
