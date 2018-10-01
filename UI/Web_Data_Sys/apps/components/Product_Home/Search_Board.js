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
import {SearchButtonExist, SearchOverlayExist, DropDownHolder, Product_Image, CancelExistStyle, SpecOptionShowStyle} from '../../util.js';
import {searchproduct} from '../../server.js';
import { Icon, Header } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Modal from "react-native-modal";
import MapView from 'react-native-maps';
import {Keyboard} from 'react-native';
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



export default class Search_Board extends Component<{}> {

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

      Search_Term_Cancel_Flag: true,

      Search_Overlay_Flag: true,

      History_Search: ['GB99888989 30X30', 'GB99', 'GB99 30X30', 'GB9989 30', 'P8877877', 'GB998888889 白色'],

      Recommandation_Search: ['GB99989 31X35 本色', 'GB99', 'GB99 16', 'GB76943 66', 'P8998877', 'GB9989 本色'],


    };
  }

  Search_Term_Handler(text){
    this.setState({
      Search_Term: text
    });
  }

  History_Recommandation_Search_Handler(Search_Term){
    this.Search_Handler(Search_Term)
  }


  Cancel_Button_Handler(){

    Keyboard.dismiss()

    if (this.state.Search_Flag == false) {

      this.props.navigation.goBack();

    } else {

      this.setState({
        Search_Button_Flag: true,
        Search_Overlay_Flag: false,
      });

    }

  }


  Search_Handler(Search_Term){

    searchproduct(Search_Term, (response) =>{
      const search_product_code = response["StatusCode"]
      const Products = response["ResponseText"]
      console.log(Products);

      if (search_product_code == 200) {

        this.setState({

          Search_Term: Search_Term,
          Search_Flag: true,
          Search_Overlay_Flag: false,
          Search_Button_Flag: true,
          Search_Result: Products,
          Search_Term_Cancel_Flag: true,

        });


      } else {

        DropDownHolder.getDropDown().alertWithType('error', 'Error!', search_product_code )

      }

    });

  }



  Search_Header(Search_Button_Flag){
    if (Search_Button_Flag == false) {

      return(

        <View style={{
            height: '8%',
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 5,
          }} >

          <View style={{
              height: '65%',
              width: '85%',
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 5,
              borderWidth: 1,
              borderRadius: 10,
            }} >

            <View style={{width: '10%', alignItems: 'center', justifyContent: 'center',}}>
              <Image style={{width: 24, height: 24}} source={require('../../../img/Search.png')} />
            </View>

            <TextInput
              style={{
                width: '80%',
                padding: 5,
              }}
              onFocus={() => this.setState({Search_Term_Cancel_Flag: false, Search_Button_Flag: false, Search_Overlay_Flag: true})}
              onBlur={() => this.setState({Search_Term_Cancel_Flag: true})}
              autoCapitalize='none'
              autoFocus={true}
              onChangeText = {(text) => this.Search_Term_Handler(text)}
              placeholder={'请输入产品名字，编号或者规格'}
              value={this.state.Search_Term}
              returnKeyType="search"
              onSubmitEditing={() => this.Search_Handler(this.state.Search_Term)}

              />

            <TouchableOpacity onPress={() => this.setState({Search_Term: ''})} style={[{width: '10%'}, CancelExistStyle(this.state.Search_Term_Cancel_Flag)]}>
              <Image style={{width: 20, height: 20}} source={require('../../../img/cancel.png')} />
            </TouchableOpacity>


          </View>

          <View style={{
              height: '100%',
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingRight: 5
            }} >


            <TouchableOpacity onPress={()=> this.Cancel_Button_Handler()}>

              <Text style={{fontSize: 18}}>取消</Text>

            </TouchableOpacity>
          </View>


        </View>


      )

    } else {

      return(

        <View style={{
            height: '8%',
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 5,
          }} >

          <View style={{
              height: '100%',
              width: '10%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingLeft: 5
            }} >

            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>

              <Image style={{width: 24, height: 24}} source={require('../../../img/back_arrow.png')} />

            </TouchableOpacity>

          </View>

          <View style={{
              height: '65%',
              width: '75%',
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 5,
              borderWidth: 1,
              borderRadius: 10,
            }} >

            <View style={{width: '10%', alignItems: 'center', justifyContent: 'center',}}>
              <Image style={{width: 24, height: 24}} source={require('../../../img/Search.png')} />
            </View>

            <TextInput
              style={{
                width: '80%',
                padding:5,
              }}
              onFocus={() => this.setState({Search_Term_Cancel_Flag: false, Search_Button_Flag: false, Search_Overlay_Flag: true})}
              onBlur={() => this.setState({Search_Term_Cancel_Flag: true})}
              autoCapitalize='none'
              onChangeText = {(text) => this.Search_Term_Handler(text)}
              placeholder={'请输入产品名字，编号或者规格'}
              value={this.state.Search_Term}
              returnKeyType="search"

              />

            <TouchableOpacity onPress={() => this.setState({Search_Term: ''})} style={[{width: '10%'}, CancelExistStyle(this.state.Search_Term_Cancel_Flag)]}>
              <Image style={{width: 20, height: 20}} source={require('../../../img/cancel.png')} />
            </TouchableOpacity>


          </View>

          <View style={{
              height: '100%',
              width: '15%',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              paddingRight: 5
            }} >


            <TouchableOpacity >

              <Image style={{width: 24, height: 24}} source={require('../../../img/fliter.png')} />

            </TouchableOpacity>
          </View>


        </View>


      )

    }
  }




  Result_Products(Search_Result){
    if (Search_Result.length == 0) {

      return(
        <View style={{alignItems: 'center', justifyContent: 'center'}}>

          <Text style={{fontSize: 20}}>抱歉，搜索没有任何结果</Text>

        </View>
      )

    } else {

      return(

        <View style={{flexDirection:'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>

          {
            Search_Result.map((Product, i) => {

              return(

                <TouchableOpacity key={i} activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : Product.Products_ID})}>

                  <Image
                    source={Product_Image[Product.Products_Image_Dir]}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : {Product.Products_Name}</Text>
                  <Text style={{}} >规格 : {Product.Products_Spec}</Text>
                  <Text style={{}} >表色 ： {Product.Products_Color}</Text>
                  <Text style={{}} >价格 ： {Product.Products_Price}</Text>

                </TouchableOpacity>


              );
            })
          }


        </View>



      )

    }
  }




  render() {

    return(

      <View>
        <Status_Bar />


            {this.Search_Header(this.state.Search_Button_Flag)}


          <ScrollView style={{height: '89%', backgroundColor: 'white'}}>



              {/* Search Result */}

              {this.Result_Products(this.state.Search_Result)}

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

                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} >

                  <Image
                    source={require('../../../img/product1.jpg')}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : GB846-85</Text>
                  <Text style={{}} >规格 : 32X55</Text>
                  <Text style={{}} >表色 ： 黑色</Text>
                  <Text style={{}} >价格 ： 23323</Text>


                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} >

                  <Image
                    source={require('../../../img/product1.jpg')}
                    style={{height:160, width:140, marginTop: 10 }}/>
                  <Text style={{}} >名称 : GB846-85</Text>
                  <Text style={{}} >规格 : 32X55</Text>
                  <Text style={{}} >表色 ： 黑色</Text>
                  <Text style={{}} >价格 ： 23323</Text>


                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} >

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



          {/* Search Overlay */}
          <ScrollView style={[SearchOverlayExist(this.state.Search_Overlay_Flag) , {position: 'absolute', left: 0, top: '11%', backgroundColor: 'white', height: '100%', width: '100%'}]}>

            <View style={{padding: 10, flexDirection: 'column'}}>

              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                <Text style={{fontSize: 16}}>历史搜索</Text>

                <TouchableOpacity activeOpacity={0.8} >
                  <Image style={{width: 16, height: 16}} source={require('../../../img/Trash_Bin.png')} />
                </TouchableOpacity>

              </View>


              <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 15}}>

                {
                  this.state.History_Search.map((Search_Term, i) => {

                    return(

                      <TouchableOpacity key={i} onPress={() => this.History_Recommandation_Search_Handler(Search_Term)} activeOpacity={0.8} style={{borderWidth: 1, borderRadius: 10, marginRight: 10, marginBottom: 10}}>
                        <Text style={{padding:5}}>{Search_Term}</Text>
                      </TouchableOpacity>


                    );
                  })
                }

              </View>




            </View>

            <View style={{padding: 10, flexDirection: 'column'}}>

              <View style={{flexDirection: 'row'}}>

                <Text style={{fontSize: 16}}>大家都在搜</Text>

              </View>


              <View style={{flexDirection: 'row', flexWrap: 'wrap', paddingTop: 15}}>

                {
                  this.state.Recommandation_Search.map((Search_Term, i) => {

                    return(

                      <TouchableOpacity key={i} onPress={() => this.History_Recommandation_Search_Handler(Search_Term)} activeOpacity={0.8} style={{borderWidth: 1, borderRadius: 10, marginRight: 10, marginBottom: 10}}>
                        <Text style={{padding:5}}>{Search_Term}</Text>
                      </TouchableOpacity>


                    );
                  })
                }

              </View>




            </View>


          </ScrollView>
          {/* Search Overlay */}





      </View>









    )
  }
}
