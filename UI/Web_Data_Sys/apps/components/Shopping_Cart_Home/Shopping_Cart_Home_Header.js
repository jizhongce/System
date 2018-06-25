import Status_Bar from '../Status_Bar.js';

import React, { Component } from 'react';
import {
  StatusBar,
  View,
  TouchableOpacity,
  Text
} from 'react-native';



export default class Shopping_Cart_Home_Header extends React.Component {
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
