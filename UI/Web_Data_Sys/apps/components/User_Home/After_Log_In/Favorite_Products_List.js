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
import {getfavoriteproduct} from '../../../server.js';
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


export default class Favorite_Products_List extends Component<{}> {



  static navigationOptions = ()=> {
    return {
      title: 'Favorite Products List',
    }
}

constructor(props) {
  super(props);
  this.state = {
    Favorite_Products: [],
    Refreshing_Flag : false

  };
}


Refresh_Favorite_Products_List(){

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

      // Next we need to getfavoriteproduct function to get the favorite product of the user

      getfavoriteproduct(User_ID, (response) => {

        const get_favorite_product_code = response["StatusCode"]

        const Favorite_Products = response["ResponseText"]

        if (get_favorite_product_code == 200 || get_favorite_product_code == 617) {

          // next create array to store the products object
          var Favorite_Product_List = []

          for (var product in Favorite_Products) {
            console.log(Favorite_Products[product]);
            Favorite_Product_List.push(Favorite_Products[product])
          }

          this.setState({
            Favorite_Products : Favorite_Product_List,
            Refreshing_Flag : false
          });
          // End of if statement in getfavoriteproduct
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

          // End of else statement in getfavoriteproduct
        }

        // Get favorite product list End
      });


    }

  });


}



Favorite_Products_List_On_Refresh(){
  this.setState({
    Refreshing_Flag : true
  },
  () => {this.Refresh_Favorite_Products_List()}
);
}


componentWillMount(){
  //AsyncStorage.clear()
  // AsyncStorage.setItem('UID123', 'hello', () => {
  //
  // });

  this.props.navigation.addListener('willFocus', ()=>{

    this.Refresh_Favorite_Products_List()

  });


}


   render() {

     return(
       <ScrollView
         refreshControl={
         <RefreshControl
           refreshing = {this.state.Refreshing_Flag}
           onRefresh={this.Favorite_Products_List_On_Refresh.bind(this)}
         />
       }
         style={{flex: 1}} >

         <View style={{backgroundColor:'white'}}>
           {
             this.state.Favorite_Products.map((product, i) => {
               return(
                 <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('Favorite_Single_Product_Home', { Products_ID : product.Products_ID, Products_Name : product.Products_Name})}>
                   <View style={{
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
