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
import {SearchButtonExist, SearchOverlayExist, DropDownHolder, Product_Image, CancelExistStyle, SpecOptionShowStyle, FliterOverlayExist, FliterOptionStyle, Stock_Status_Prase, FliterPriceSliderExist} from '../../util.js';
import {searchproduct} from '../../server.js';
import { Icon, Header, Divider } from 'react-native-elements';
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
  KeyboardAvoidingView,
  Slider
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

      Fliter_Flag: false,

      Search_Flag: false,

      Search_Term_Cancel_Flag: true,

      Search_Overlay_Flag: true,

      History_Search: ['GB99888989 30X30', 'GB99', 'GB99 30X30', 'GB9989 30', 'P8877877', 'GB998888889 白色'],

      Recommandation_Search: ['GB99989 31X35 本色', 'GB99', 'GB99 16', 'GB76943 66', 'P8998877', 'GB9989 本色'],


      Flitered_Products: [],

      Price_Low_Limit: 1000,
      Price_High_Limit: 10000,
      Price_Lowest_Limit: '',
      Price_Highest_Limit: '',
      Price_Low_Flag: false,
      Price_High_Flag: false,

      Stock_Option: '',
      Stock_Flag: '',

      Spec_Option: '',
      Spec_Flag: '',

      Spec_show: 0,
      Spec_Show_Flag: false,

      Color_Option: '',
      Color_Flag: '',

      Category_Option: '',
      Category_Flag: '',


    };
  }

  // fliter handler start from here


    Stock_Option_Handler(Index){

      Stock_Flag = this.state.Stock_Flag
      Stock_Flag[Index] = !Stock_Flag[Index]

      this.setState({
        Stcok_Flag : Stock_Flag
      }, () =>{this.Update_Product()});

    }

    Category_Option_Handler(Index){

      Category_Flag = this.state.Category_Flag
      Category_Flag[Index] = !Category_Flag[Index]

      this.setState({
        Category_Flag : Category_Flag
      }, () =>{this.Update_Product()});

    }

    Color_Option_Handler(Index){

      var Color_Flag = this.state.Color_Flag
      Color_Flag[Index] = !Color_Flag[Index]

      this.setState({
        Color_Flag : Color_Flag
      }, () =>{this.Update_Product()});

    }

    Spec_Option_Handler(Index){

      var Spec_Flag = this.state.Spec_Flag
      Spec_Flag[Index] = !Spec_Flag[Index]

      this.setState({
        Spec_Flag : Spec_Flag
      }, () =>{this.Update_Product()});

    }


    Price_Low_Limit_Slider_Handler(){
      this.setState({
        Price_Low_Flag: true,
        Price_High_Flag: false,
      }, () => this.refs.Fliter.scrollToEnd());
    }

    Price_High_Limit_Slider_Handler(){
      this.setState({
        Price_Low_Flag: false,
        Price_High_Flag: true,
      }, () => this.refs.Fliter.scrollToEnd());
    }

    Price_Low_Limit_Handler(text){
      this.setState({
        Price_Low_Limit: text
      }, () =>{this.Update_Product()});
    }

    Price_High_Limit_Handler(text){
      this.setState({
        Price_High_Limit: text
      }, () =>{this.Update_Product()});
    }


    Fliter_Reset(){

      var Stcok_Flag = new Array(this.state.Stock_Option.length)
      Stcok_Flag.fill(false);
      var Category_Flag = new Array(this.state.Category_Option.length)
      Category_Flag.fill(false);
      var Spec_Flag = new Array(this.state.Spec_Option.length)
      Spec_Flag.fill(false);
      var Color_Flag = new Array(this.state.Color_Option.length)
      Color_Flag.fill(false);

      this.setState({
        Stock_Flag: Stcok_Flag,

        Category_Flag: Category_Flag,

        Spec_Flag: Spec_Flag,

        Color_Flag: Color_Flag,

        Price_Low_Limit: this.state.Price_Lowest_Limit,

        Price_High_Limit: this.state.Price_Highest_Limit,

      }, () =>{this.Update_Product()});
    }


    Fliter_Submit(){
      this.setState({
        Fliter_Flag: false,
      }, () =>{this.Update_Product()});
    }



      Spec_Option_Show_More_Handler(){

        this.setState({
          Spec_show: Fliter_Options.Spec_Option.length,
          Spec_Show_Flag: true,
        });

      }


      Spec_Option_Show_Less_Handler(){

        this.setState({
          Spec_show: Fliter_Options.Spec_Option.length < 5 ? Fliter_Options.Spec_Option.length : 5,
          Spec_Show_Flag: false,
        });

      }



        Match_Fliter_List(Fliter_Option_List, Fliter_Flag_List){

          var Result_Fliter_List = []

          for (var i = 0; i < Fliter_Flag_List.length; i++) {
            if (Fliter_Flag_List[i] == true) {
              Result_Fliter_List.push(Fliter_Option_List[i])
            }
          }

          if (Result_Fliter_List.length == 0) {

            Result_Fliter_List = Fliter_Option_List

          }

          return(Result_Fliter_List)

        }


        Update_Product(){

          // First we need to Match for each Fliter
          var Spec_Result_List = this.Match_Fliter_List(this.state.Spec_Option, this.state.Spec_Flag)

          var Stock_Result_List = this.Match_Fliter_List(this.state.Stock_Option, this.state.Stock_Flag)

          var Color_Result_List = this.Match_Fliter_List(this.state.Color_Option, this.state.Color_Flag)

          var Category_Result_List = this.Match_Fliter_List(this.state.Category_Option, this.state.Category_Flag)

          var Price_High_Limit = this.state.Price_High_Limit

          var Price_Low_Limit = this.state.Price_Low_Limit

          // Next for each product, we need to fliter the product

          const Original_Products = this.state.Search_Result

          var Result_Product_List = []

          for (var product in Original_Products) {

            // First we need check the Spec

            if (Spec_Result_List.indexOf(Original_Products[product].Products_Spec) > -1) {

              // Second we need check Stock

              if (Stock_Result_List.indexOf(Original_Products[product].Products_Status) > -1) {

                // Third we need check color

                if (Color_Result_List.indexOf(Original_Products[product].Products_Color) > -1) {


                  if (Category_Result_List.indexOf(Original_Products[product].Products_Category) > -1) {

                    // Forth we need check price
                    if (Original_Products[product].Products_Price >= Price_Low_Limit && Original_Products[product].Products_Price <= Price_High_Limit) {

                      Result_Product_List.push(Original_Products[product])

                    }



                  }



                }


              }


            }


          }

          this.setState({
            Flitered_Products : Result_Product_List
          });


        }



        Product_Price_Limit_Finder(Products){
          var Temp_Min = Products[0].Products_Price
          var Temp_Max = Products[0].Products_Price
          for (var product in Products) {
            if (Products[product].Products_Price <= Temp_Min) {

              Temp_Min = Products[product].Products_Price

            }

            else if (Products[product].Products_Price >= Temp_Max) {

              Temp_Max = Products[product].Products_Price

            }
          }

          return([Temp_Min, Temp_Max])
        }

        // Here we need to create a new function to find the price limit

        Product_Fliter_Option_Finder(Products){
          var Color_Option = []
          var Category_Option = []
          var Spec_Option = []
          var Stock_Option = []
          var Color_Option_Flag = []
          var Category_Option_Flag = []
          var Spec_Option_Flag = []
          var Stock_Option_Flag = []
          for (var product in Products) {
            if (Color_Option.indexOf(Products[product].Products_Color) == -1) {

              Color_Option.push(Products[product].Products_Color)
              Color_Option_Flag.push(false)

            }

            if (Category_Option.indexOf(Products[product].Products_Category) == -1) {

              Category_Option.push(Products[product].Products_Category)
              Category_Option_Flag.push(false)

            }

            if (Spec_Option.indexOf(Products[product].Products_Spec) == -1) {

              Spec_Option.push(Products[product].Products_Spec)
              Spec_Option_Flag.push(false)

            }

            if (Stock_Option.indexOf(Products[product].Products_Status) == -1) {

              Stock_Option.push(Products[product].Products_Status)
              Stock_Option_Flag.push(false)

            }

          }

          return({"Color_Option" : Color_Option, "Color_Option_Flag": Color_Option_Flag, "Spec_Option" : Spec_Option, "Spec_Option_Flag": Spec_Option_Flag, "Stock_Option" : Stock_Option, "Stock_Option_Flag": Stock_Option_Flag, "Category_Option": Category_Option, "Category_Option_Flag": Category_Option_Flag})
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

        Price_Limit = this.Product_Price_Limit_Finder(Products)

        Price_Low_Limit = Price_Limit[0]-1000

        if (Price_Low_Limit < 0) {

          Price_Low_Limit = 1

        }

        console.log(Price_Low_Limit);

        Fliter_Options = this.Product_Fliter_Option_Finder(Products)

        console.log(Fliter_Options);

        this.setState({

          Search_Term: Search_Term,
          Search_Flag: true,
          Search_Overlay_Flag: false,
          Search_Button_Flag: true,
          Search_Result: Products,
          Search_Term_Cancel_Flag: true,

          Flitered_Products : Products,

          Fliter_Flag: false,
          Price_Low_Flag: false,
          Price_High_Flag: false,
          Price_Low_Limit: Price_Low_Limit,
          Price_High_Limit: Price_Limit[1]+1000,
          Price_Lowest_Limit: Price_Low_Limit,
          Price_Highest_Limit: Price_Limit[1]+1000,

          Stock_Option: Fliter_Options.Stock_Option,
          Stock_Flag: Fliter_Options.Stock_Option_Flag,

          Category_Option: Fliter_Options.Category_Option,
          Category_Flag: Fliter_Options.Category_Option_Flag,

          Spec_Option: Fliter_Options.Spec_Option,
          Spec_Flag: Fliter_Options.Spec_Option_Flag,

          Spec_show: Fliter_Options.Spec_Option.length < 5 ? Fliter_Options.Spec_Option.length: 5,
          Spec_Show_Flag: false,

          Color_Option: Fliter_Options.Color_Option,
          Color_Flag: Fliter_Options.Color_Option_Flag,

        } , () =>{console.log(this.state);});


      } else {

        DropDownHolder.getDropDown().alertWithType('error', 'Error!', search_product_code )

      }

    });

  }



  Search_Header(Search_Button_Flag){
    if (Search_Button_Flag == false) {

      {() =>{console.log(this.state);}}

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


            <TouchableOpacity onPress={() => this.setState({Fliter_Flag: true})}>

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
            this.state.Flitered_Products.map((Product, i) => {

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

    if (this.state.Price_Lowest_Limit == '' || this.state.Price_Highest_Limit == '' || this.state.Stock_Option == '' || this.state.Stock_Flag == '' || this.state.Spec_Option == '' || this.state.Spec_Flag == '' || this.state.Color_Option == '' || this.state.Color_Flag == '') {


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


      );


    }

    else {

      console.log(this.state);


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

                {/* Fliter Layover */}

                <View style={[FliterOverlayExist(this.state.Fliter_Flag) ,{height: '100%', width: '100%', position: 'absolute', right: 0, top: '3%', flexDirection: 'row'}]}>

                  <TouchableOpacity activeOpacity={1} onPress={() => this.setState({Fliter_Flag: false})} style={{width: '40%', backgroundColor: 'rgba(0, 0, 0, 0.63)'}}>


                  </TouchableOpacity>

                  <View style={{height: '97%', width: '60%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',}}>

                    <ScrollView ref="Fliter" style={{height: '90%', width: '100%',flexDirection: 'column'}}>
                      <View style={{padding: 10, borderBottomWidth: 1, borderColor: '#f5f5f5'}}>
                        <Text style={{fontSize: 18}}>规 格</Text>
                      </View>

                      <View >

                        <View style={{padding: 10, flexDirection: 'row', flexWrap: 'wrap', width: '100%'}}>


                          {

                            this.state.Spec_Option.slice(0,this.state.Spec_show).map((Spec_Option, i) => {

                              return(

                                <TouchableOpacity onPress={() => this.Spec_Option_Handler(i)} key={i}  activeOpacity={1} style={[FliterOptionStyle(this.state.Spec_Flag[i]), {padding: 10, borderWidth: 1, borderRadius: 5, margin: 5}]}>
                                  <Text style={{fontSize: 15}}>{Spec_Option}</Text>
                                </TouchableOpacity>


                              );
                            })
                          }

                        </View>

                        <TouchableOpacity onPress={() => this.Spec_Option_Show_More_Handler()} style={[SpecOptionShowStyle(!this.state.Spec_Show_Flag) ,{padding: 10, flexDirection: 'row-reverse'}]}>
                          <Text style={{fontSize: 15}}>更多</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.Spec_Option_Show_Less_Handler()} style={[SpecOptionShowStyle(this.state.Spec_Show_Flag) ,{padding: 10, flexDirection: 'row-reverse'}]}>
                          <Text style={{fontSize: 15}}>收起</Text>
                        </TouchableOpacity>


                      </View>




                      <View style={{padding: 10, borderBottomWidth: 1, borderColor: '#f5f5f5'}}>
                        <Text style={{fontSize: 18}}>类 别</Text>
                      </View>

                      <View style={{padding: 10, flexDirection: 'row', flexWrap: 'wrap'}}>


                        {
                          this.state.Category_Option.map((Category_Option, i) => {

                            return(

                              <TouchableOpacity onPress={() => this.Category_Option_Handler(i)} key={i} activeOpacity={1} style={[FliterOptionStyle(this.state.Category_Flag[i]), {padding: 10, borderWidth: 1, borderRadius: 5, margin: 5}]}>
                                <Text style={{fontSize: 15}}>{Category_Option}</Text>
                              </TouchableOpacity>


                            );
                          })
                        }

                      </View>



                      <View style={{padding: 10, borderBottomWidth: 1, borderColor: '#f5f5f5'}}>
                        <Text style={{fontSize: 18}}>颜 色</Text>
                      </View>

                      <View style={{padding: 10, flexDirection: 'row', flexWrap: 'wrap'}}>


                        {
                          this.state.Color_Option.map((Color_Option, i) => {

                            return(

                              <TouchableOpacity onPress={() => this.Color_Option_Handler(i)} key={i} activeOpacity={1} style={[FliterOptionStyle(this.state.Color_Flag[i]), {padding: 10, borderWidth: 1, borderRadius: 5, margin: 5}]}>
                                <Text style={{fontSize: 15}}>{Color_Option}</Text>
                              </TouchableOpacity>


                            );
                          })
                        }

                      </View>


                      <View style={{padding: 10, borderBottomWidth: 1, borderColor: '#f5f5f5'}}>
                        <Text style={{fontSize: 18}}>库 存</Text>
                      </View>

                      <View style={{padding: 10, flexDirection: 'row', flexWrap: 'wrap'}}>


                        {
                          this.state.Stock_Option.map((Stock_Option, i) => {

                            return(

                              <TouchableOpacity onPress={() => this.Stock_Option_Handler(i)} key={i} activeOpacity={1} style={[FliterOptionStyle(this.state.Stock_Flag[i]), {padding: 10, borderWidth: 1, borderRadius: 5, margin: 5}]}>
                                <Text style={{fontSize: 15}}>{Stock_Status_Prase(Stock_Option)}</Text>
                              </TouchableOpacity>


                            );
                          })
                        }

                      </View>

                      <View style={{padding: 10, borderBottomWidth: 1, borderColor: '#f5f5f5'}}>
                        <Text style={{fontSize: 18}}>价 格 区 间</Text>
                      </View>

                      <View style={{padding: 10, flexDirection: 'column',}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 15}}>

                          <TouchableOpacity activeOpacity={1} onPress={() => this.Price_Low_Limit_Slider_Handler()} style={{width: '30%' ,padding:10 ,borderWidth: 1, borderRadius:5, justifyContent: 'center', alignItems: 'center',}}>
                            <Text style={{fontSize: 12}}>{this.state.Price_Low_Limit}</Text>
                          </TouchableOpacity>

                          <Divider style={{ backgroundColor: 'black', height: 1, width: '20%' }} />

                          <TouchableOpacity activeOpacity={1} onPress={() => this.Price_High_Limit_Slider_Handler()} style={{width: '30%' ,padding:10 , borderWidth: 1, borderRadius:5, justifyContent: 'center', alignItems: 'center',}}>
                            <Text style={{fontSize: 12}}>{this.state.Price_High_Limit}</Text>
                          </TouchableOpacity>

                        </View>

                        {/* slider 1 */}
                        <View style={FliterPriceSliderExist(this.state.Price_Low_Flag)}  >
                          <Slider
                            minimumValue={this.state.Price_Lowest_Limit}
                            maximumValue={this.state.Price_Highest_Limit}
                            minimumTrackTintColor='black'
                            maximumTrackTintColor='black'
                            value={this.state.Price_Low_Limit}
                            step={1}
                            onValueChange= {(text) => this.Price_Low_Limit_Handler(text)}
                            />
                          <Text style={{fontSize: 13, paddingTop: 5}}>请滑动调整价格下限</Text>
                        </View>
                        {/* slider 1 */}

                        {/* slider 2 */}
                        <View style={FliterPriceSliderExist(this.state.Price_High_Flag)} >
                          <Slider
                            minimumValue={this.state.Price_Low_Limit}
                            maximumValue={this.state.Price_Highest_Limit}
                            minimumTrackTintColor='black'
                            maximumTrackTintColor='black'
                            value={this.state.Price_High_Limit}
                            step={1}
                            onValueChange= {(text) => this.Price_High_Limit_Handler(text)}
                            />
                          <Text style={{fontSize: 13, paddingTop: 5}}>请滑动调整价格上限</Text>
                        </View>

                        {/* slider 2 */}

                      </View>

                    </ScrollView>

                    <View style={{height: '10%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

                      <TouchableOpacity activeOpacity={1} onPress={() => this.Fliter_Submit()} style={{width: '40%', borderWidth: 1, borderRadius: 5, padding: 5, marginRight:5, justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{fontSize: 18}}>提 交</Text>
                      </TouchableOpacity>

                      <TouchableOpacity activeOpacity={1} onPress={() => this.Fliter_Reset()} style={{width: '40%', borderWidth: 1, borderRadius: 5, padding: 5, marginLeft:5, justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{fontSize: 18}}>重 置</Text>
                      </TouchableOpacity>

                    </View>

            </View>




          </View>



          {/* Fliter Layover */}




            </View>









          )

    }

  }
}
