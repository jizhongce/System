import React, { Component } from 'react';
import {
  StatusBar,
  View,
  TouchableOpacity,
  Text
} from 'react-native';

import Status_Bar from '../../Status_Bar.js';


export default class Product_Home_Header extends React.Component {
  render() {
    return (
      <View>

        <Status_Bar />

        <View style={{
            height: 50,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }} >

          <View >
            <TouchableOpacity>
              <Text style={{marginLeft:5}}>搜索</Text>
            </TouchableOpacity>
          </View>



          <View >
          <Text>产品列表</Text>
          </View>

          <View >
            <TouchableOpacity>
              <Text style={{marginRight:5}}>Message</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>

    );
  }
}
