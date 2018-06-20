/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


/*

const NavTitle = {
title: 'hardword',
};


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
import React, { Component } from 'react';
import {ErrorCodePrase, PraseCityValue, PraseProvinceValue, OrderStatusCheck} from '../../util.js';
import {getsingleorder} from '../../server.js';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  TabBarIOS,
  Button,
  Alert,
  AsyncStorage,
  RefreshControl
} from 'react-native';
import NavigationBar from 'react-native-navbar';


export default class Order_Confirmation extends Component<{}> {


  static navigationOptions = ({ navigation }) => {

    return {
      title: 'Confirmation',
    }

  };

constructor(props) {
  super(props);
  this.state = {
    Order_Basic_Info: '',
    Order_Shipping_Info: '',
    Order_Products_List: [],
    Refreshing_Flag : false
  };
}


Refresh_Single_Order(){

  const { params } = this.props.navigation.state;
  const Order_ID = params ? params.Order_ID : null;

  if (Order_ID == null) {

    Alert.alert(
      'Oops',
      'There is something wrong with the Order!',
      [
        {text: 'OK', onPress: ()=>{
          this.props.navigation.navigate('Order_List');
        }},
      ],
    )

  } else {

    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      // Here we may need to add one more level security to check the user
      if (User_ID == null) {

        Alert.alert(
            'Oops',
            'There is something wrong with the log in!',
          [
            {text: 'OK', onPress: ()=>{
              this.props.navigation.navigate('User_Home');
            }},
          ],
        )

      }

      else {

        getsingleorder(Order_ID, (response) => {

          const get_single_order_code = response["StatusCode"]

          const Order_Info = response["ResponseText"]

          if (get_single_order_code == 200) {

            const Order_Basic_Info = Order_Info["Basic_Info"]
            const Order_Shipping_Info = Order_Info["Shipping_Info"]
            const Order_Products_List = Order_Info["Product_List"]

            console.log(Order_Basic_Info);
            console.log(Order_Shipping_Info);
            console.log(Order_Products_List);

            this.setState({
              Order_Basic_Info: Order_Basic_Info,
              Order_Shipping_Info: Order_Shipping_Info,
              Order_Products_List: Order_Products_List,
              Refreshing_Flag : false
            });


          }

          else {

            Alert.alert(
                'Oops',
                'Error Code:' + get_single_order_code + '\n' +'There is something wrong with the server! Try again later!',
              [
                {text: 'OK', onPress: ()=>{
                  AsyncStorage.removeItem('User_ID', (error) => {
                    if (error) {
                      console.log(error);
                    }

                    this.props.navigation.navigate('User_Home');

                  });

                }},
              ],
            )




          }

          //  End of getuserorder
        });


      }

    });




  }



}

Single_Order_On_Refresh(){
  this.setState({
    Refreshing_Flag : true
  },
  () => {this.Refresh_Single_Order()}
);
}



Show_Payment_Due_Amount(Order_Total_Price){
  if (Order_Total_Price < 50000) {

    return(
      <View style={{
          flex: 0.2,
          marginTop: 25,
          borderWidth: 2,
          justifyContent: 'center',
          borderRadius: 10,
          marginBottom: 25,

        }}>
        <Text style={{ fontSize: 25, textAlign: 'center'} }>The Payment Due Amount: {Order_Total_Price} </Text>
      </View>

    )


  } else {

    return(
      <View style={{
          flex: 0.2,
          marginTop: 25,
          borderWidth: 2,
          justifyContent: 'center',
          borderRadius: 10,
          marginBottom: 25,

        }}>
        <Text style={{ fontSize: 25, textAlign: 'center'} }>The Payment Due Amount: {Order_Total_Price*0.2} </Text>
      </View>


    )


  }
}


Payment_Method_Check(Payment_Method){
  if (Payment_Method == 0) {

    return(

      <View>

        <Text style={{ fontSize: 25, textAlign: 'center', backgroundColor:'white'} }>Please Choose the Payment method:</Text>


          <TouchableOpacity style={{marginTop:10, marginBottom:10, borderWidth: 2, borderRadius: 10}}>
            <Text style={{fontSize: 25, textAlign: 'center'} }>Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop:10, marginBottom:10, borderWidth: 2, borderRadius: 10}}>
            <Text style={{fontSize: 25, textAlign: 'center'} }>Alipay</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop:10, marginBottom:10, borderWidth: 2, borderRadius: 10}}>
            <Text style={{fontSize: 25, textAlign: 'center'} }>WeChatPay</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop:10, marginBottom:10, borderWidth: 2, borderRadius: 10}}>
            <Text style={{fontSize: 25, textAlign: 'center'} }>ApplePay</Text>
          </TouchableOpacity>

      </View>
    )

  } else {

    return(
      <View>

          <Text style={{ fontSize: 25, textAlign: 'center', backgroundColor:'white'} }>Payment method: {Payment_Method}</Text>

      </View>
    )

  }
}


OrderStatusCheck(Order_Status, Payment_Method) {
  if (Order_Status == 1) {

    this.Show_Payment_Due_Amount(this.state.Order_Basic_Info.Order_Total_Price);
    this.Payment_Method_Check(Payment_Method);



  }

}



componentWillMount(){
  //AsyncStorage.clear()
  // AsyncStorage.setItem('UID123', 'hello', () => {
  //
  // });

  this.props.navigation.addListener('willFocus', ()=>{

    this.Refresh_Single_Order()

  });


}


   render() {

     return(
       <ScrollView
         refreshControl={
         <RefreshControl
           refreshing = {this.state.Refreshing_Flag}
           onRefresh={this.Single_Order_On_Refresh.bind(this)}
         />
       }

         style={{flex: 1}} >

         {/* Basic Info*/}
         <Text style={{ fontSize: 25, textAlign: 'center', backgroundColor:'white'} }>Order Info:</Text>
         <View style={{backgroundColor:'white'}}>

             <View style={{
                 flex: 0.15,
                 marginTop: 25,
                 borderWidth: 2,
                 justifyContent: 'center',
                 borderRadius: 10,

               }}>

               <Text>Order ID : {this.state.Order_Basic_Info.Order_ID}</Text>
               <Text>Status : {this.state.Order_Basic_Info.Order_Status}</Text>
               <Text>Payment Method : {this.state.Order_Basic_Info.Order_Payment_Method_Status}</Text>
               <Text>Total Price : {this.state.Order_Basic_Info.Order_Total_Price}</Text>
               <Text>Order Time : {this.state.Order_Basic_Info.Order_Time}</Text>
             </View>


         </View>

         {/* Shipping Info*/}
         <Text style={{ fontSize: 25, textAlign: 'center', backgroundColor:'white'} }>Shipping Info:</Text>
         <View style={{backgroundColor:'white'}}>

             <View style={{
                 flex: 0.15,
                 marginTop: 25,
                 borderWidth: 2,
                 justifyContent: 'center',
                 borderRadius: 10,

               }}>

               <Text>Address ID : {this.state.Order_Shipping_Info.Address_ID}</Text>
               <Text>Street : {this.state.Order_Shipping_Info.Street}</Text>
               <Text>City : {this.state.Order_Shipping_Info.City}</Text>
               <Text>Province : {this.state.Order_Shipping_Info.Province}</Text>
               <Text>Post Code : {this.state.Order_Shipping_Info.Post_Code}</Text>
             </View>


         </View>

         {/* Product list*/}
         <Text style={{ fontSize: 25, textAlign: 'center', backgroundColor:'white'} }>Product List:</Text>
         <View style={{backgroundColor:'white'}}>
           {
             this.state.Order_Products_List.map((product, i) => {
               return(
                   <View key={i} style={{
                       flex: 0.15,
                       marginTop: 25,
                       borderWidth: 2,
                       justifyContent: 'center',
                       borderRadius: 10,

                     }}>
                     <Text>key : {i}</Text>
                     <Text>ID : {product.Products_ID}</Text>
                     <Text>Name : {product.Products_Name}</Text>
                     <Text>Number : {product.Products_Number}</Text>
                     <Text>Specification : {product.Products_Spec}</Text>
                     <Text>Color : {product.Products_Color}</Text>
                     <Text>Status : {product.Products_Status}</Text>
                     <Text>Price : {product.Products_Price}</Text>
                     <Text>Units : {product.Products_Units}</Text>
                   </View>

               );
             })
           }
         </View>

         {
           this.OrderStatusCheck(this.state.Order_Basic_Info.Order_Status, this.state.Order_Basic_Info.Order_Payment_Method_Status)
         }



       </ScrollView>

     )

  }
}
