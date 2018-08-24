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
import {SearchButtonExist} from '../../util.js';
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

      Search_Term: '',
      Search_Button_Flag: false,
      Search_Result: [],
      Search_Flag: false,

    };
  }

  Search_Term_Handler(text){
    this.setState({
      Search_Term: text
    });
  }

  Search_Button_Handler(){

    if (this.state.Search_Result.length == 0) {

      this.setState({
        Search_Button_Flag: false,
      });

    } else {

      this.setState({
        Search_Button_Flag: true,
      });

    }


  }


  render() {

    return(

      <View>
        <Status_Bar />

          <View style={{
              height: '8%',
              backgroundColor: 'white',
              flexDirection: 'row',
            }} >

            <View style={{
                height: '100%',
                width: '10%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                paddingLeft: 5
              }} >

              <TouchableOpacity onPress={()=> this.props.navigation.goBack()}>

                <Image style={{width: 24, height: 24}} source={require('../../../img/back_arrow.png')} />

              </TouchableOpacity>

            </View>

            <View style={{
                height: '100%',
                width: '75%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }} >

              <TextInput
                style={{
                  width: '100%',
                  borderWidth: 1,
                  borderRadius: 10,
                  padding:5,
                }}
                onFocus={() => this.setState({ Search_Button_Flag: false})}
                onBlur={() => this.Search_Button_Handler()}
                autoCapitalize='none'
                onChangeText = {(text) => this.Search_Term_Handler(text)}
                placeholder={'请输入产品名字，编号或者规格'}
                value={this.state.Search_Term}

                />

            </View>

            <View style={{
                height: '100%',
                width: '15%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                paddingRight: 5
              }} >

              <TouchableOpacity style={SearchButtonExist(!this.state.Search_Button_Flag)} onPress={()=> this.Search_Button_Handler()}>

                <Image style={{width: 24, height: 24}} source={require('../../../img/fliter.png')} />

              </TouchableOpacity>


              <TouchableOpacity style={SearchButtonExist(this.state.Search_Button_Flag)} onPress={()=> this.Search_Button_Handler()}>

                <Text style={{fontSize: 16}}>搜索</Text>

              </TouchableOpacity>
            </View>

          </View>

          <ScrollView style={{height: '89%', backgroundColor: 'white'}}>

              {/* No search result found */}

              {/*
                <View style={{alignItems: 'center', justifyContent: 'center'}}>

                  <Text style={{fontSize: 20}}>抱歉，搜索没有任何结果</Text>

                </View>

                */}

              {/* No search result found */}




              {/* Search Result */}
              <View style={{flexDirection:'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>

                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : product.Products_ID})}>

                  <Image
                    source={require('../../../img/product1.jpg')}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : GB846-85</Text>
                  <Text style={{}} >规格 : 32X55</Text>
                  <Text style={{}} >表色 ： 黑色</Text>
                  <Text style={{}} >价格 ： 23323</Text>


                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : product.Products_ID})}>

                  <Image
                    source={require('../../../img/product1.jpg')}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : GB846-85</Text>
                  <Text style={{}} >规格 : 32X55</Text>
                  <Text style={{}} >表色 ： 黑色</Text>
                  <Text style={{}} >价格 ： 23323</Text>


                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : product.Products_ID})}>

                  <Image
                    source={require('../../../img/product1.jpg')}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : GB846-85</Text>
                  <Text style={{}} >规格 : 32X55</Text>
                  <Text style={{}} >表色 ： 黑色</Text>
                  <Text style={{}} >价格 ： 23323</Text>


                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : product.Products_ID})}>

                  <Image
                    source={require('../../../img/product1.jpg')}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : GB846-85</Text>
                  <Text style={{}} >规格 : 32X55</Text>
                  <Text style={{}} >表色 ： 黑色</Text>
                  <Text style={{}} >价格 ： 23323</Text>


                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : product.Products_ID})}>

                  <Image
                    source={require('../../../img/product1.jpg')}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : GB846-85</Text>
                  <Text style={{}} >规格 : 32X55</Text>
                  <Text style={{}} >表色 ： 黑色</Text>
                  <Text style={{}} >价格 ： 23323</Text>


                </TouchableOpacity>

              </View>
              {/* Search Result */}




              {/* Recommendation */}
              <View style={{marginBottom:10, marginTop:10, marginLeft:5, marginRight:5, flexDirection:'row', justifyContent: 'space-between',}}>

                <View
                  style={{
                    marginTop: 10,
                    borderTopColor: 'black',
                    borderTopWidth: 1,
                    width: '30%'
                  }}
                  />

                <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}>热门产品</Text>

                <View
                  style={{
                    marginTop:10 ,
                    borderTopColor: 'black',
                    borderTopWidth: 1,
                    width: '30%'
                  }}
                  />
              </View>


              <View style={{flexDirection:'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>

                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : product.Products_ID})}>

                  <Image
                    source={require('../../../img/product1.jpg')}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : GB846-85</Text>
                  <Text style={{}} >规格 : 32X55</Text>
                  <Text style={{}} >表色 ： 黑色</Text>
                  <Text style={{}} >价格 ： 23323</Text>


                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : product.Products_ID})}>

                  <Image
                    source={require('../../../img/product1.jpg')}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : GB846-85</Text>
                  <Text style={{}} >规格 : 32X55</Text>
                  <Text style={{}} >表色 ： 黑色</Text>
                  <Text style={{}} >价格 ： 23323</Text>


                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : product.Products_ID})}>

                  <Image
                    source={require('../../../img/product1.jpg')}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : GB846-85</Text>
                  <Text style={{}} >规格 : 32X55</Text>
                  <Text style={{}} >表色 ： 黑色</Text>
                  <Text style={{}} >价格 ： 23323</Text>


                </TouchableOpacity>


              </View>

              {/* Recommendation */}






          </ScrollView>



      </View>









    )
  }
}
