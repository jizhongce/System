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

      NDP_Flag: true,

      SHP_Flag: false,

      NWP_Flag: false,

      ORC_Flag: false,

      ALL_Flag: false,


    };
  }


  NDP_Handler(){

    this.setState({

      NDP_Flag : true,

      SHP_Flag: false,

      NWP_Flag: false,

      ORC_Flag: false,

      ALL_Flag: false,

    });

  }

  SHP_Handler(){

    this.setState({

      SHP_Flag : true,

      NDP_Flag: false,

      NWP_Flag: false,

      ORC_Flag: false,

      ALL_Flag: false,

    });

  }

  NWP_Handler(){

    this.setState({

      NWP_Flag : true,

      SHP_Flag : false,

      NDP_Flag: false,

      ORC_Flag: false,

      ALL_Flag: false,

    });

  }

  ORC_Handler(){

    this.setState({

      ORC_Flag : true,

      NWP_Flag : false,

      SHP_Flag : false,

      NDP_Flag: false,

      ALL_Flag: false,

    });

  }

  ALL_Handler(){

    this.setState({

      ALL_Flag : true,

      ORC_Flag : false,

      NWP_Flag : false,

      SHP_Flag : false,

      NDP_Flag: false,

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
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 订 单 管 理 </Text>
            </View>



          </View>

          <View style={{height: '7%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingLeft: 5, paddingRight: 5, backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#e0e0e0'}}>

            <TouchableOpacity activeOpacity={0.8} onPress={() => this.NDP_Handler()} style={OrderButtonsExistStyle(this.state.NDP_Flag)}>

              <Text style={{fontSize: 17, paddingBottom: 5}}>全部订单</Text>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => this.SHP_Handler()} style={OrderButtonsExistStyle(this.state.SHP_Flag)}>

              <Text style={{fontSize: 17, paddingBottom: 5}}>代收定金</Text>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => this.NWP_Handler()} style={OrderButtonsExistStyle(this.state.NWP_Flag)}>

              <Text style={{fontSize: 17, paddingBottom: 5}}>代收货</Text>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => this.ORC_Handler()} style={OrderButtonsExistStyle(this.state.ORC_Flag)}>

              <Text style={{fontSize: 17, paddingBottom: 5}}>代付尾款</Text>

            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => this.ALL_Handler()} style={OrderButtonsExistStyle(this.state.ALL_Flag)}>

              <Text style={{fontSize: 17, paddingBottom: 5}}>已完成</Text>

            </TouchableOpacity>


          </View>

          <ScrollView style={{height: '82%', flexDirection: 'column', backgroundColor: 'white', }}>


            {/* 代付定金  */}
            <View style={{padding: 5, borderBottomWidth: 1, borderColor: '#e0e0e0', flexDirection: 'column'}}>

              <TouchableOpacity activeOpacity={0.8} style={{flexDirection: 'column', paddingBottom: 10}}>


                <View style={{height: 120, paddingBottom: 5, paddingTop: 5, flexDirection: 'row'}}>

                  <View style={{width: '30%', alignItems: 'center', justifyContent: 'center' }}>

                    <Image
                      source={require('../../../img/product1.jpg')}
                      style={{width: '90%', height: '100%'}}/>

                  </View>

                  <View style={{width: '65%', flexDirection: 'column'}}>

                    <View style={{flexWrap:'wrap'}}>
                      <Text style={{fontSize: 16}}>GB859-98XXXXXXXXXX</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>规格: 18 x 16</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>表色: 白色</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>数量: 1</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>价格: 8000</Text>
                    </View>

                  </View>

                </View>



                <View style={{height: 120, paddingBottom: 5, paddingTop: 5, flexDirection: 'row'}}>

                  <View style={{width: '30%', alignItems: 'center', justifyContent: 'center' }}>

                    <Image
                      source={require('../../../img/product1.jpg')}
                      style={{width: '90%', height: '100%'}}/>

                  </View>

                  <View style={{width: '65%', flexDirection: 'column'}}>

                    <View style={{flexWrap:'wrap'}}>
                      <Text style={{fontSize: 16}}>GB859-98XXXXXXXXXX</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>规格: 18 x 16</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>表色: 白色</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>数量: 1</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>价格: 8000</Text>
                    </View>

                  </View>

                </View>


              </TouchableOpacity>


              <View style={{paddingTop: 10, paddingBottom: 10, borderTopWidth: 1, borderColor: '#e0e0e0', flexDirection: 'row-reverse' }}>
                <Text style={{fontSize: 14}}>共<Text style={{fontSize: 16}}> 2 </Text>件产品, 合计: <Text style={{fontSize: 16}}>16000</Text> </Text>
              </View>

              <View style={{paddingTop: 10, paddingBottom: 5, borderTopWidth: 1, borderColor: '#e0e0e0', flexDirection: 'row-reverse' }}>

                <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                  <Text style={{fontSize: 14}}>取消订单</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                  <Text style={{fontSize: 14}}>支付定金</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                  <Text style={{fontSize: 14}}>查看订单</Text>
                </TouchableOpacity>


              </View>

            </View>
            {/* 代付定金  */}





            {/* 代收货  */}
            <View style={{padding: 5, borderBottomWidth: 1, borderColor: '#e0e0e0', flexDirection: 'column'}}>

              <TouchableOpacity activeOpacity={0.8} style={{flexDirection: 'column', paddingBottom: 10}}>


                <View style={{height: 120, paddingBottom: 5, paddingTop: 5, flexDirection: 'row'}}>

                  <View style={{width: '30%', alignItems: 'center', justifyContent: 'center' }}>

                    <Image
                      source={require('../../../img/product1.jpg')}
                      style={{width: '90%', height: '100%'}}/>

                  </View>

                  <View style={{width: '65%', flexDirection: 'column'}}>

                    <View style={{flexWrap:'wrap'}}>
                      <Text style={{fontSize: 16}}>GB859-98XXXXXXXXXX</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>规格: 18 x 16</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>表色: 白色</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>数量: 1</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>价格: 8000</Text>
                    </View>

                  </View>

                </View>



                <View style={{height: 120, paddingBottom: 5, paddingTop: 5, flexDirection: 'row'}}>

                  <View style={{width: '30%', alignItems: 'center', justifyContent: 'center' }}>

                    <Image
                      source={require('../../../img/product1.jpg')}
                      style={{width: '90%', height: '100%'}}/>

                  </View>

                  <View style={{width: '65%', flexDirection: 'column'}}>

                    <View style={{flexWrap:'wrap'}}>
                      <Text style={{fontSize: 16}}>GB859-98XXXXXXXXXX</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>规格: 18 x 16</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>表色: 白色</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>数量: 1</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>价格: 8000</Text>
                    </View>

                  </View>

                </View>


              </TouchableOpacity>


              <View style={{paddingTop: 10, paddingBottom: 10, borderTopWidth: 1, borderColor: '#e0e0e0', flexDirection: 'row-reverse' }}>
                <Text style={{fontSize: 14}}>共<Text style={{fontSize: 16}}> 2 </Text>件产品, 合计: <Text style={{fontSize: 16}}>16000</Text> </Text>
              </View>

              <View style={{paddingTop: 10, paddingBottom: 5, borderTopWidth: 1, borderColor: '#e0e0e0', flexDirection: 'row-reverse' }}>

                <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                  <Text style={{fontSize: 14}}>联系客服</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                  <Text style={{fontSize: 14}}>查看物流</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                  <Text style={{fontSize: 14}}>查看订单</Text>
                </TouchableOpacity>


              </View>

            </View>
            {/* 代收货  */}


            {/* 代付尾款  */}
            <View style={{padding: 5, borderBottomWidth: 1, borderColor: '#e0e0e0', flexDirection: 'column'}}>

              <TouchableOpacity activeOpacity={0.8} style={{flexDirection: 'column', paddingBottom: 10}}>


                <View style={{height: 120, paddingBottom: 5, paddingTop: 5, flexDirection: 'row'}}>

                  <View style={{width: '30%', alignItems: 'center', justifyContent: 'center' }}>

                    <Image
                      source={require('../../../img/product1.jpg')}
                      style={{width: '90%', height: '100%'}}/>

                  </View>

                  <View style={{width: '65%', flexDirection: 'column'}}>

                    <View style={{flexWrap:'wrap'}}>
                      <Text style={{fontSize: 16}}>GB859-98XXXXXXXXXX</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>规格: 18 x 16</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>表色: 白色</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>数量: 1</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>价格: 8000</Text>
                    </View>

                  </View>

                </View>



                <View style={{height: 120, paddingBottom: 5, paddingTop: 5, flexDirection: 'row'}}>

                  <View style={{width: '30%', alignItems: 'center', justifyContent: 'center' }}>

                    <Image
                      source={require('../../../img/product1.jpg')}
                      style={{width: '90%', height: '100%'}}/>

                  </View>

                  <View style={{width: '65%', flexDirection: 'column'}}>

                    <View style={{flexWrap:'wrap'}}>
                      <Text style={{fontSize: 16}}>GB859-98XXXXXXXXXX</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>规格: 18 x 16</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>表色: 白色</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>数量: 1</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>价格: 8000</Text>
                    </View>

                  </View>

                </View>


              </TouchableOpacity>


              <View style={{paddingTop: 10, paddingBottom: 10, borderTopWidth: 1, borderColor: '#e0e0e0', flexDirection: 'row-reverse' }}>
                <Text style={{fontSize: 14}}>共<Text style={{fontSize: 16}}> 2 </Text>件产品, 合计: <Text style={{fontSize: 16}}>16000</Text> </Text>
              </View>

              <View style={{paddingTop: 10, paddingBottom: 5, borderTopWidth: 1, borderColor: '#e0e0e0', flexDirection: 'row-reverse' }}>

                <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                  <Text style={{fontSize: 14}}>联系客服</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                  <Text style={{fontSize: 14}}>支付尾款</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                  <Text style={{fontSize: 14}}>查看订单</Text>
                </TouchableOpacity>


              </View>

            </View>
            {/* 代付尾款  */}


            {/* 已完成  */}
            <View style={{padding: 5, borderBottomWidth: 1, borderColor: '#e0e0e0', flexDirection: 'column'}}>

              <TouchableOpacity activeOpacity={0.8} style={{flexDirection: 'column', paddingBottom: 10}}>


                <View style={{height: 120, paddingBottom: 5, paddingTop: 5, flexDirection: 'row'}}>

                  <View style={{width: '30%', alignItems: 'center', justifyContent: 'center' }}>

                    <Image
                      source={require('../../../img/product1.jpg')}
                      style={{width: '90%', height: '100%'}}/>

                  </View>

                  <View style={{width: '65%', flexDirection: 'column'}}>

                    <View style={{flexWrap:'wrap'}}>
                      <Text style={{fontSize: 16}}>GB859-98XXXXXXXXXX</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>规格: 18 x 16</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>表色: 白色</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>数量: 1</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>价格: 8000</Text>
                    </View>

                  </View>

                </View>



                <View style={{height: 120, paddingBottom: 5, paddingTop: 5, flexDirection: 'row'}}>

                  <View style={{width: '30%', alignItems: 'center', justifyContent: 'center' }}>

                    <Image
                      source={require('../../../img/product1.jpg')}
                      style={{width: '90%', height: '100%'}}/>

                  </View>

                  <View style={{width: '65%', flexDirection: 'column'}}>

                    <View style={{flexWrap:'wrap'}}>
                      <Text style={{fontSize: 16}}>GB859-98XXXXXXXXXX</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>规格: 18 x 16</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>表色: 白色</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>数量: 1</Text>
                    </View>

                    <View style={{flexWrap:'wrap', paddingTop: 5}}>
                      <Text style={{fontSize: 14}}>价格: 8000</Text>
                    </View>

                  </View>

                </View>


              </TouchableOpacity>


              <View style={{paddingTop: 10, paddingBottom: 10, borderTopWidth: 1, borderColor: '#e0e0e0', flexDirection: 'row-reverse' }}>
                <Text style={{fontSize: 14}}>共<Text style={{fontSize: 16}}> 2 </Text>件产品, 合计: <Text style={{fontSize: 16}}>16000</Text> </Text>
              </View>

              <View style={{paddingTop: 10, paddingBottom: 5, borderTopWidth: 1, borderColor: '#e0e0e0', flexDirection: 'row-reverse' }}>

                <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                  <Text style={{fontSize: 14}}>联系客服</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                  <Text style={{fontSize: 14}}>删除订单</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={{borderWidth: 1, padding: 5, marginLeft: 5, marginRight: 5, borderRadius: 10}}>
                  <Text style={{fontSize: 14}}>查看订单</Text>
                </TouchableOpacity>


              </View>

            </View>
            {/* 已完成  */}






          </ScrollView>





      </View>









    )
  }
}
