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
  Alert
} from 'react-native';
import NavigationBar from 'react-native-navbar';


export default class User_Home extends Component<{}> {



  static navigationOptions = {
    header: null,
}

  render() {
    const { params } = this.props.navigation.state;
    const Id = params ? params.Id : null;


    if (Id == null) {
      return (
        <View style={{flex: 1}} >


          <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

            <View style={{

              marginTop: 25,
              height: '50%',
              width: '60%',
              left: '85%',
              borderWidth: 2,
              justifyContent: 'center',
              borderRadius: 10,

            }}>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Log_In_Board')}>
              <Text style={{ fontSize: 25, textAlign: 'center'} }>登     录</Text>
            </TouchableOpacity>

            </View>

          </View>

          <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

            <View style={{

              marginTop: 25,
              height: '50%',
              width: '60%',
              left: '85%',
              borderWidth: 2,
              justifyContent: 'center',
              borderRadius: 10,

            }}>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Sign_Up_Board')}>
              <Text style={{ fontSize: 25, textAlign: 'center'} }>注     册</Text>
            </TouchableOpacity>

            </View>

          </View>

          <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

            <View style={{

              marginTop: 25,
              height: '50%',
              width: '60%',
              left: '85%',
              borderWidth: 2,
              justifyContent: 'center',
              borderRadius: 10,

            }}>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Pass_Change_Board')}>
              <Text style={{ fontSize: 25, textAlign: 'center'} }>修 改 密 码</Text>
            </TouchableOpacity>

            </View>

          </View>

          <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

            <View style={{

              marginTop: 25,
              height: '50%',
              width: '60%',
              left: '85%',
              borderWidth: 2,
              justifyContent: 'center',
              borderRadius: 10,

            }}>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Phone_Change_Board')}>
              <Text style={{ fontSize: 25, textAlign: 'center'} }>修 改 手 机</Text>
            </TouchableOpacity>

            </View>

          </View>

        </View>


      );

    }
    else {

          return (
            <View style={{flex: 1}} >



              {/*start  */}

              <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

                  <Text style={{ fontSize: 25, textAlign: 'center'} }>{Id}</Text>

              </View>

              {/*end  */}



            </View>


          );

    }


  }
}