import React, { Component } from 'react';
import {
  StatusBar,
  View
} from 'react-native';

export default class Status_Bar extends React.Component {
  render() {
    return (

        <View style={{height: 20, backgroundColor: 'white'}}>
          <StatusBar />

        </View>

    );
  }
}
