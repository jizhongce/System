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
import {ErrorCodePrase} from '../../../util.js';
import {getuserorder} from '../../../server.js';
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


export default class Order_List extends Component<{}> {



  static navigationOptions = ()=> {
    return {
      title: 'Order List',
    }
}

constructor(props) {
  super(props);
  this.state = {
    Order_List: [],
    Refreshing_Flag : false
  };
}


Refresh_Order_List(){
  AsyncStorage.getItem('User_ID', (err, result) => {
    var User_ID = result
    console.log(User_ID);

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

      // Here we need to call the getuserorder function to get user's all order list
      getuserorder(User_ID, (response) => {

        const get_user_order_code = response["StatusCode"]

        const Orders = response["ResponseText"]

        if (get_user_order_code == 200 || get_user_order_code == 618) {


          // Next we need to create array to store the order list
          var Order_List = []

          for (var order in Orders) {
            console.log(Orders[order]);
            Order_List.push(Orders[order])
          }

          this.setState({
            Order_List: Order_List,
            Refreshing_Flag : false
          });

        }

        else {

          var errormsg = ErrorCodePrase(get_favorite_product_code)[1]

          var title = ErrorCodePrase(get_favorite_product_code)[0]

          console.log(ErrorCodePrase(get_favorite_product_code))

          Alert.alert(
            title,
            errormsg,
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

Order_List_On_Refresh(){
  this.setState({
    Refreshing_Flag : true
  },
  () => {this.Refresh_Order_List()}
);
}


componentWillMount(){
  //AsyncStorage.clear()
  // AsyncStorage.setItem('UID123', 'hello', () => {
  //
  // });

  this.props.navigation.addListener('willFocus', ()=>{

    this.Refresh_Order_List()

  });


}


   render() {

     return(
       <ScrollView
         refreshControl={
         <RefreshControl
           refreshing = {this.state.Refreshing_Flag}
           onRefresh={this.Order_List_On_Refresh.bind(this)}
         />
       }
         style={{flex: 1}} >

         <View style={{backgroundColor:'white'}}>
           {
             this.state.Order_List.map((order, i) => {
               return(
                 <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('Single_Order', { Order_ID : order.Order_ID})}>
                 <View style={{
                     flex: 0.15,
                     marginTop: 25,
                     borderWidth: 2,
                     justifyContent: 'center',
                     borderRadius: 10,

                   }}>
                   <Text>key : {i}</Text>
                   <Text>ID : {order.Order_ID}</Text>
                   <Text>Status : {order.Order_Status}</Text>
                   <Text>Payment Method : {order.Order_Payment_Method_Status}</Text>
                   <Text>Total Price : {order.Order_Total_Price}</Text>
                   <Text>Order Time : {order.Order_Time}</Text>
                   <Text>Address : {order.Order_Shipping_Address_ID}</Text>
                 </View>
                 </TouchableOpacity>


               );
             })
           }

         </View>

       </ScrollView>

     )


  }
}
