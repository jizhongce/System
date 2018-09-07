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
import {getAllproducts} from '../../server.js';
import {Product_Image, StockStatusCheck, FliterOverlayExist, FliterPriceSliderExist, FliterOptionStyle, Stock_Status_Prase} from '../../util.js';
import React, { Component } from 'react';
import Status_Bar from '../Status_Bar.js';
import {Divider} from 'react-native-elements';
import DropdownAlert from 'react-native-dropdownalert';
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
  Slider
} from 'react-native';


export default class Product_Home extends Component<{}> {


  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {
      products : [],
      Flitered_Products: [],
      Refreshing_Flag: false,

      Fliter_Flag: false,

      Price_Low_Limit: 1000,
      Price_High_Limit: 10000,
      Price_Lowest_Limit: 1000,
      Price_Highest_Limit: 10000,
      Price_Low_Flag: false,
      Price_High_Flag: false,

      Stock_Option: [0, 1],
      Stock_Flag: [false, false],

      Spec_Option: ['45X65', '33X33', '8X15', '32X32', '32X12', '3X25', '32X55'],
      Spec_Flag: [false, false, false, false, false, false, false],

      Color_Option: ['本色', '黑色', '灰色', '黄色'],
      Color_Flag: [false, false, false, false],

    };
  }

  Stock_Option_Handler(Index){

    Stock_Flag = this.state.Stock_Flag
    Stock_Flag[Index] = !Stock_Flag[Index]

    this.setState({
      Stcok_Flag : Stock_Flag
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
    var Spec_Flag = new Array(this.state.Spec_Option.length)
    Spec_Flag.fill(false);
    var Color_Flag = new Array(this.state.Color_Option.length)
    Color_Flag.fill(false);

    this.setState({
      Stock_Flag: Stcok_Flag,

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

    var Price_High_Limit = this.state.Price_High_Limit

    var Price_Low_Limit = this.state.Price_Low_Limit

    // Next for each product, we need to fliter the product

    const Original_Products = this.state.products

    var Result_Product_List = []

    for (var product in Original_Products) {

      // First we need check the Spec

      if (Spec_Result_List.indexOf(Original_Products[product].Products_Spec) > -1) {

        // Second we need check Stock

        if (Stock_Result_List.indexOf(Original_Products[product].Products_Status) > -1) {

          // Third we need check color

          if (Color_Result_List.indexOf(Original_Products[product].Products_Color) > -1) {

            // Forth we need check price
            if (Original_Products[product].Products_Price >= Price_Low_Limit && Original_Products[product].Products_Price <= Price_High_Limit) {

              Result_Product_List.push(Original_Products[product])

            }


          }


        }


      }


    }

    this.setState({
      Flitered_Products : Result_Product_List
    });


  }



  // moreproduct(){
  //   this.setState({
  //     products : []
  //   });
  // }
  // onScrollEndDrag={() => this.moreproduct()}
  //

  // Here we need to create a new function to find the price limit

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
    var Spec_Option = []
    var Stock_Option = []
    var Color_Option_Flag = []
    var Spec_Option_Flag = []
    var Stock_Option_Flag = []
    for (var product in Products) {
      if (Color_Option.indexOf(Products[product].Products_Color) == -1) {

        Color_Option.push(Products[product].Products_Color)
        Color_Option_Flag.push(false)

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

    return({"Color_Option" : Color_Option, "Color_Option_Flag": Color_Option_Flag, "Spec_Option" : Spec_Option, "Spec_Option_Flag": Spec_Option_Flag, "Stock_Option" : Stock_Option, "Stock_Option_Flag": Stock_Option_Flag})
  }

  Refresh_All_Product(){
    getAllproducts((response) =>{
      const get_all_products_code = response["StatusCode"]
      const Products = response["ResponseText"]
      console.log(Products);

      if (get_all_products_code == 200) {

        Price_Limit = this.Product_Price_Limit_Finder(Products)

        Fliter_Options = this.Product_Fliter_Option_Finder(Products)

        console.log(Fliter_Options);


        this.setState({
          products : Products,
          Flitered_Products: Products,
          Refreshing_Flag: false,
          Fliter_Flag: false,
          Price_Low_Flag: false,
          Price_High_Flag: false,
          Price_Low_Limit: Price_Limit[0]-1000,
          Price_High_Limit: Price_Limit[1]+1000,
          Price_Lowest_Limit: Price_Limit[0]-1000,
          Price_Highest_Limit: Price_Limit[1]+1000,

          Stock_Option: Fliter_Options.Stock_Option,
          Stock_Flag: Fliter_Options.Stock_Option_Flag,

          Spec_Option: Fliter_Options.Spec_Option,
          Spec_Flag: Fliter_Options.Spec_Option_Flag,

          Color_Option: Fliter_Options.Color_Option,
          Color_Flag: Fliter_Options.Color_Option_Flag,


        });
      }

    });
  }


  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });
    this.props.navigation.addListener('willFocus', ()=>{

      this.Refresh_All_Product()

    });



  }

  render() {
    return (

      <View>

        {/* Header  */}

        <Status_Bar />

        <View style={{
            height: '8%',
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
          }} >

          <View style={{width: '15%', justifyContent: 'center', alignItems: 'center',}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Search_Board')}>
              <Image style={{width: 25, height: 25}} source={require('../../../img/Search.png')} />
            </TouchableOpacity>
          </View>


          <View style={{width: '70%', justifyContent: 'center', alignItems: 'center',}}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Home2')}>
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}>产品列表</Text>
            </TouchableOpacity>

          </View>

          <View style={{width: '15%', justifyContent: 'center', alignItems: 'center',}}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({Fliter_Flag: true})}>
              <Image style={{width: 25, height: 25}} source={require('../../../img/fliter.png')} />
            </TouchableOpacity>
          </View>

        </View>
        {/* Header  */}

        {/* Main Feed */}
        <ScrollView style={{backgroundColor: 'white', height: '89%'}}>

          <View style={{flexDirection:'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>


            {
              this.state.Flitered_Products.map((product, i) => {

                console.log();

                return(


                  <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}} key={i} onPress={() => this.props.navigation.navigate('Single_Product_Home',{ Products_ID : product.Products_ID})}>

                    <Image
                      source={Product_Image[product.Products_Image_Dir]}
                      style={{height:160, width:140, marginTop: 10 }}/>
                    <Text style={{}} >名称 : {product.Products_Name}</Text>
                    <Text style={{}} >规格 : {product.Products_Spec}</Text>
                    <Text style={{}} >表色 ： {product.Products_Color}</Text>
                    <Text style={{}} >价格 ： {product.Products_Price}</Text>


                  </TouchableOpacity>


                );
              })
            }



          </View>

          {/* Suggestion Header */}
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

          {/* Suggestion */}

          <View style={{marginTop:10, flexDirection:'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>


            <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}}>

              <Image
                source={require('../../../img/product1.jpg')}
                style={{height:160, width:140, marginTop: 10 }}/>
              <Text style={{}} >名称 : GB846-82</Text>
              <Text style={{}} >规格 : 55 X 66</Text>
              <Text style={{}} >表色 ： yellow</Text>
              <Text style={{}} >价格 ： 5000</Text>


            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}}>

              <Image
                source={require('../../../img/product1.jpg')}
                style={{height:160, width:140, marginTop: 10 }}/>
              <Text style={{}} >名称 : GB846-82</Text>
              <Text style={{}} >规格 : 55 X 66</Text>
              <Text style={{}} >表色 ： yellow</Text>
              <Text style={{}} >价格 ： 5000</Text>


            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} style={{justifyContent: 'center', alignItems: 'center', width: '50%', borderWidth: 1, borderColor: 'grey', flexDirection:'column', backgroundColor:'white', marginBottom: 5}}>

              <Image
                source={require('../../../img/product1.jpg')}
                style={{height:160, width:140, marginTop: 10 }}/>
              <Text style={{}} >名称 : GB846-82</Text>
              <Text style={{}} >规格 : 55 X 66</Text>
              <Text style={{}} >表色 ： yellow</Text>
              <Text style={{}} >价格 ： 5000</Text>


            </TouchableOpacity>



          </View>


        </ScrollView>

        {/* Main Feed */}

        {/* Fliter Layover */}

        <View style={[FliterOverlayExist(this.state.Fliter_Flag) ,{height: '100%', width: '100%', position: 'absolute', right: 0, top: '3%', flexDirection: 'row'}]}>

          <TouchableOpacity activeOpacity={1} onPress={() => this.setState({Fliter_Flag: false})} style={{width: '40%', backgroundColor: 'rgba(0, 0, 0, 0.63)'}}>


          </TouchableOpacity>

          <View style={{height: '97%', width: '60%', backgroundColor: 'white', justifyContent: 'center', alignItems: 'center',}}>

            <ScrollView ref="Fliter" style={{height: '90%', width: '100%',flexDirection: 'column'}}>

              <View style={{padding: 10, borderBottomWidth: 1, borderColor: '#f5f5f5'}}>
                <Text style={{fontSize: 18}}>规 格</Text>
              </View>

              <View style={{padding: 10, flexDirection: 'row', flexWrap: 'wrap'}}>

                {
                  this.state.Spec_Option.map((Spec_Option, i) => {

                    return(

                      <TouchableOpacity onPress={() => this.Spec_Option_Handler(i)} key={i}  activeOpacity={1} style={[FliterOptionStyle(this.state.Spec_Flag[i]), {padding: 10, borderWidth: 1, borderRadius: 5, margin: 5}]}>
                        <Text style={{fontSize: 15}}>{Spec_Option}</Text>
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
                    <Text style={{fontSize: 13}}>{this.state.Price_Low_Limit}</Text>
                  </TouchableOpacity>

                  <Divider style={{ backgroundColor: 'black', height: 1, width: '20%' }} />

                  <TouchableOpacity activeOpacity={1} onPress={() => this.Price_High_Limit_Slider_Handler()} style={{width: '30%' ,padding:10 , borderWidth: 1, borderRadius:5, justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{fontSize: 13}}>{this.state.Price_High_Limit}</Text>
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











    );
  }
}
