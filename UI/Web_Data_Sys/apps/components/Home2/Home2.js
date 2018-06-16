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
  ScrollView,
  AsyncStorage,
  RefreshControl,
  Modal,
  TouchableHighlight,
  Picker,
  FlatList
} from 'react-native';
import NavigationBar from 'react-native-navbar';

import Status_Bar from '../../Status_Bar.js';


class Product_Home_Header extends React.Component {
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



export default class Home2 extends Component<{}> {

  static navigationOptions = {
    header: null,
}


  constructor(props) {
    super(props);
    this.state = {

    };
  }


  render() {

    return(


      <ScrollView >



        {/*start  */}

        <View style={{flexDirection:'row', justifyContent: 'space-between', flexWrap: 'wrap'}}>


          
        </View>









        {/*end  */}



      </ScrollView>






    )
  }
}
