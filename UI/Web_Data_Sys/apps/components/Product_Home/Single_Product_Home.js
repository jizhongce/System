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
import React, { Component } from 'react';
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
  ScrollView
} from 'react-native';
import NavigationBar from 'react-native-navbar';

export default class Single_Product_Home extends Component<{}> {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.product.ProductSpec : 'wrong',
    }

  };




  constructor(props) {
    super(props);
    this.state = {
      product : ''
    };
  }

  componentWillMount(){
    const { params } = this.props.navigation.state;
    const product = params ? params.product : null;
    this.setState({
      product: product
    });
  }


  render() {
    return (
      <ScrollView style={{flex: 1}} >

        <View style={{
          flex: 0.15,
          marginTop: 25,
          borderWidth: 2,
          justifyContent: 'center',
          borderRadius: 10,

        }}>
        <Text>ID : {this.state.product.ProdcutID}</Text>
        <Text>Status : {this.state.product.ProductStatus}</Text>
        <Text>Specification : {this.state.product.ProductSpec}</Text>
        <Text>Price : {this.state.product.ProductPrice}</Text>
        </View>



      </ScrollView>






    );
  }
}
