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
import { Icon } from 'react-native-elements';
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

class Shopping_Cart_Header extends React.Component {
  render() {
    return (
      <View>

        <Status_Bar />

        <View style={{
            height: 50,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }} >



          <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}>购    物    车</Text>



        </View>

      </View>

    );
  }
}


export default class Home2 extends Component<{}> {

  static navigationOptions = {
    header: <Shopping_Cart_Header />,
}

  constructor(props) {
    super(props);
    this.state = {
      isVisible : true,
      quantity: 1,

    };
  }

  closeModal(){
    this.setState({
      isVisible : false
    });
  }


  Swipe_Out_Button(){
    return(
      [{
        text: '删除',
        type: 'delete',
        onPress: ()=>{},
      }]
    )
  }



  render() {

    return(

      <KeyboardAvoidingView keyboardVerticalOffset={60} behavior={'position'} >


        <TouchableOpacity activeOpacity={0.8} style={{backgroundColor: '#cbcbcb', height: '15%',  justifyContent: 'center', borderStyle: 'dotted', borderWidth: 2, borderColor: 'black',}}>

          <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, flexWrap:'wrap'}}>
            <Text style={{fontSize: 20, }} >hardware company, </Text>
            <Text style={{fontSize: 20}}>15000000000</Text>
          </View>

          <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, marginRight: 10, flexWrap:'wrap'}}>

            <Text style={{fontSize: 16}} >21 West End Ave, New York, New York, 325000</Text>

          </View>

        </TouchableOpacity>

        {/* Main Feed for each product in the shopping cart */}

        <ScrollView style={{backgroundColor: '#ededed', height: '77%', flexDirection:'column'}}>

          <Swipeout style={{height:170, backgroundColor: 'white',  marginTop:5, marginBottom:5}} right={this.Swipe_Out_Button()} autoClose={true}>
            <View style={{width: '100%', backgroundColor: 'white', flexDirection:'row',}}>

              <View style={{width: '40%'}}>
                <Image
                  source={require('../../../img/product1.jpg')}
                  style={{height:'100%', width: '100%'}}/>
              </View>

              <View style={{width: '60%', flexDirection:'column', marginLeft: 10, marginTop:10, flexWrap:'wrap'}}>

                <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5}}>
                  <Text style={{fontSize: 20}}>GB846-82(XXXXXXXXXXXXXXXXXXXXX)</Text>
                </View>

                <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5}}>
                  <Text style={{fontSize: 15}}>商品编号: P5547384 </Text>
                </View>

                <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5}}>
                  <Text style={{fontSize: 15, marginRight: 10}}>规格 : 32 X 12</Text>
                </View>

                <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5}}>
                  <Text style={{fontSize: 15}}>表色 : yellow</Text>
                </View>

                <View style={{flexWrap:'wrap', flexDirection:'row', marginRight: 5}}>
                  <Text style={{fontSize: 15}}>价格 : 5000/千件</Text>
                </View>


                <View style={{flexDirection:'row', alignItems: 'center',}}>

                  <TouchableOpacity>
                    <Icon name='remove' />
                  </TouchableOpacity>

                  <TextInput

                    placeholderTextColor="black"

                    placeholder={String(this.state.quantity)}
                    keyboardType={'numeric'}
                    style={{
                      marginBottom: 5,
                      marginTop:5,
                      marginLeft:5,
                      marginRight:5,
                      borderWidth: 2,
                      borderRadius: 5,
                      width: 50}} />


                  <TouchableOpacity>
                    <Icon name='add' />
                  </TouchableOpacity>


                </View>

              </View>


            </View>
          </Swipeout>


        </ScrollView>




        <View style={{height: '8%', flexDirection:'row'}}>

          <View style={{height:'100%', backgroundColor: '#f3f670', width: '60%', flexDirection:'row', flexWrap:'wrap',alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={{color: 'black', fontWeight:'bold', textAlign: 'center', fontSize: 17, marginLeft:5 }}> 总价: 80000 </Text>

            <Text style={{color: 'black', fontWeight:'bold', textAlign: 'center', fontSize: 17, marginRight:5 }}> 定金: 8000 </Text>
          </View>



          <TouchableOpacity activeOpacity={0.5} style={{height:'100%', backgroundColor: '#79fcfc', width: '40%', flexDirection:'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: 'black', fontWeight:'bold', textAlign: 'center', fontSize: 20}}> 提交订单 </Text>
          </TouchableOpacity>

        </View>







      </KeyboardAvoidingView>









    )
  }
}
