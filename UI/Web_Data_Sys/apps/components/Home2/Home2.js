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
import {Product_Image} from '../../util.js';
import { Icon } from 'react-native-elements'
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
  Modal,
  TouchableHighlight,
  Picker,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';
import NavigationBar from 'react-native-navbar';


import Status_Bar from '../../Status_Bar.js';



export default class Home2 extends Component<{}> {

  static navigationOptions = ({ navigation }) => {


    return {
      title: 'GB874-83' ,
    }

  };


  constructor(props) {
    super(props);
    this.state = {
      isVisible : true
    };
  }

  closeModal(){
    this.setState({
      isVisible : false
    });
  }


  render() {

    return(

      <KeyboardAvoidingView keyboardVerticalOffset={60} behavior={'position'} >

        <ScrollView style={{backgroundColor: 'white', height:'92%'}}>



          {/*start  */}

          <View style={{backgroundColor: 'white'}}>


              <Image
                source={Product_Image['Product_1']}
                style={{width: '100%', height: 200}}/>

              <View style={{marginTop:10, marginLeft:5, marginRight:5, flexDirection:'row', justifyContent: 'space-between',}}>
                <View>
                  <Text>商品名称: P5547384 </Text>
                </View>

                <TouchableOpacity activeOpacity={0.5}>
                  <Icon name='favorite-border' />
                </TouchableOpacity>


              </View>

              <View style={{marginTop:5, marginLeft:5, marginBottom: 10}}>

                <Text style={{fontSize: 25, textAlign: 'left',}}>GB846-82(XXXXXXXXXXXXXXXXXXXXX)</Text>

              </View>

              <View style={{marginTop:5, marginLeft:5, marginRight:5, marginBottom: 5, flexDirection:'row', justifyContent: 'space-between',}}>

                <Text style={{fontSize: 15}}>规格 : 55 X 66</Text>
                <Text style={{fontSize: 15}}>表色 : yellow</Text>
                <Text style={{fontSize: 15}}>加工处理 : yellow</Text>

              </View>

              <View style={{marginTop:5, marginLeft:5, marginBottom: 5}}>

                <Text style={{fontSize: 15, textAlign: 'left',}}>库存状况 : 订货</Text>

              </View>

              <View style={{marginTop:10, marginLeft:5, marginRight:5, marginBottom: 5, flexDirection:'row', justifyContent: 'space-between',}}>

                <Text style={{fontSize: 15, color: 'red', fontWeight:'bold'}}>红本价格:</Text>
                <Text style={{fontSize: 15, color: 'red', fontWeight:'bold'}}>5000/千件</Text>



              </View>

              <View style={{marginTop:5, marginLeft:5, marginRight:5, marginBottom: 10, flexDirection:'row', justifyContent: 'space-between',}}>

                <Text style={{fontSize: 15, color: 'blue', fontWeight:'bold'}}>蓝本价格:</Text>
                <Text style={{fontSize: 15, color: 'blue', fontWeight:'bold'}}>5000/千件</Text>

              </View>




          </View>




          {/*end  */}



        </ScrollView>

        <View style={{height:'8%',  flexDirection:'row', alignItems: 'center'}}>

          <View style={{width:'50%', height:'100%',flexDirection:'row', alignItems: 'center', backgroundColor: 'grey'}}>

            <TouchableOpacity activeOpacity={0.5} style={{ marginBottom: 5,marginTop:5, marginLeft:5, marginRight:5}}>
              <Icon name='add' />
            </TouchableOpacity>

            <TextInput keyboardType={'numeric'} style={{
                marginBottom: 5,
                marginTop:5,
                marginLeft:5,
                marginRight:5,
                borderWidth: 2,
                borderRadius: 5,
                width: 50}} />

            <TouchableOpacity activeOpacity={0.5} style={{marginBottom: 5,marginTop:5, marginLeft:5, marginRight:5}}>
              <Icon name='remove' />
            </TouchableOpacity>

            <Text style={{ color: 'black', fontWeight:'bold', marginBottom: 5,marginTop:5}}>/千件</Text>
          </View>


          <TouchableOpacity activeOpacity={0.5} style={{width:'25%', height:'100%', backgroundColor: '#fb5252', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontWeight:'bold', textAlign: 'center'}}>加入购物车</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5} style={{width:'25%', height:'100%', backgroundColor: '#e9fb52', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'black', fontWeight:'bold', textAlign: 'center', }}>立即购买</Text>
          </TouchableOpacity>



        </View>





      </KeyboardAvoidingView>









    )
  }
}
