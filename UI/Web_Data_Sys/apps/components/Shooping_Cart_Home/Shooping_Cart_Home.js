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
  AsyncStorage,
  ScrollView
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class Shooping_Cart_Home extends Component<{}> {



  constructor(props) {
    super(props);
    this.state = {
      User_Flag : true,
      Shopping_Cart : []
    };
  }

  componentWillMount(){
    //AsyncStorage.clear()
    // AsyncStorage.setItem('UID123', 'hello', () => {
    //
    // });
    this.props.navigation.addListener('willFocus', ()=>{

      AsyncStorage.multiGet(['User_ID','Shopping_Cart'], (err, result) => {
        var User_ID = result[0][1]
        var Shopping_Cart = result[1][1]

        if (User_ID == null) {
          this.setState({
            User_Flag : false,
          });
        }
        else {

          console.log(JSON.parse(Shopping_Cart));
          console.log(typeof(JSON.parse(Shopping_Cart)));
          this.setState({
            User_Flag : true,
            Shopping_Cart : JSON.parse(Shopping_Cart)
          });
          console.log(this.state.Shopping_Cart);

        }

      });
    });


  }

  render() {

    if (this.state.User_Flag == false) {
      return (
        <View style={{flex: 1}} >



          {/*start  */}

          <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

            <Text style={{ fontSize: 25, textAlign: 'center'} }>Please log in first to see the shopping cart</Text>

          </View>




          {/*end  */}



        </View>


      );
    }




    else {


          return (
            <ScrollView style={{flex: 1}} style={{flex: 1}} >



              {/*start  */}
              {
                this.state.Shopping_Cart.map((product, i) =>{
                  return(
                    <View key={i} style={{
                      flex: 0.2,
                      marginTop: 25,
                      borderWidth: 2,
                      justifyContent: 'center',
                      borderRadius: 10,

                    }}>
                      <Text>key : {i}</Text>
                      <Text>ID : {product.ProductID}</Text>
                      <Text>Status : {product.ProductStatus}</Text>
                      <Text>Specification : {product.ProductSpec}</Text>
                      <Text>Price : {product.ProductPrice}</Text>
                      <Text>Units : {product.ProductUnits}</Text>
                    </View>
                  );
                })
              }
              {/*end  */}



            </ScrollView>


          );
    }



  }
}
