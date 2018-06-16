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
import {getuserprofile, getfavoriteproduct, getuserorder} from '../../server.js';
import {ErrorCodePrase} from '../../util.js';
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


export default class User_Home extends Component<{}> {



  static navigationOptions = {
    header: null,
}

constructor(props) {
  super(props);
  this.state = {
    User_Flag : false,
    Refreshing_Flag : false,
    User_Profile: ''

  };
}


sign_out(){
  AsyncStorage.removeItem('User_ID', (error) => {
    if (error) {
      console.log(error);
    }

    this.props.navigation.navigate('User_Home');

  });
}

Refresh_User_Info(){
  AsyncStorage.getItem('User_ID', (err, result) => {
    var User_ID = result
    console.log(User_ID);

    if (User_ID == null) {
      this.setState({
        User_Flag : false,
        Refreshing_Flag : false
      });
    }

    else {

      getuserprofile(User_ID, (response) => {

        const get_profile_code = response["StatusCode"]

        const Profile = response["ResponseText"]


        if (get_profile_code == 200) {

          this.setState({
            User_Flag : true,
            User_Profile : Profile,
            Refreshing_Flag : false
          });

        } else {

          var errormsg = ErrorCodePrase(get_profile_code)[1]

          var title = ErrorCodePrase(get_profile_code)[0]

          console.log(ErrorCodePrase(get_profile_code))

          Alert.alert(
              title,
              errormsg,
            [
              {text: 'OK', style: 'cancel', onPress: ()=>{
                this.sign_out()
              }},
            ],
          )




        }


        // Get User Profile End
      });

    }

  });
}

User_Home_On_Refresh(){
  this.setState({
    Refreshing_Flag : true
  },
  () => {this.Refresh_User_Info()}
);
}


componentWillMount(){
  //AsyncStorage.clear()
  // AsyncStorage.setItem('UID123', 'hello', () => {
  //
  // });

  this.props.navigation.addListener('willFocus', ()=>{

    this.Refresh_User_Info()

  });


}


   render() {

    if (this.state.User_Flag == false) {
      return (
        <ScrollView style={{flex: 1}} >


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

        </ScrollView>


      );

    }
    else {

          return (
            <ScrollView
              refreshControl={
              <RefreshControl
                refreshing = {this.state.Refreshing_Flag}
                onRefresh={this.User_Home_On_Refresh.bind(this)}
              />
            }
              style={{flex: 1}} >



              {/*start  */}

              <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

                  <Text style={{ fontSize: 25, textAlign: 'center'} }>User ID: {this.state.User_Profile.User_ID}</Text>

              </View>

              <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

                  <Text style={{ fontSize: 25, textAlign: 'center'} }>First Name: {this.state.User_Profile.First_Name}</Text>

              </View>

              <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

                  <Text style={{ fontSize: 25, textAlign: 'center'} }>Last Name: {this.state.User_Profile.Last_Name}</Text>

              </View>

              <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>

                  <Text style={{ fontSize: 25, textAlign: 'center'} }>Level: {this.state.User_Profile.Level}</Text>

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

                <TouchableOpacity onPress={()=> { this.sign_out()} }>
                  <Text style={{ fontSize: 25, textAlign: 'center'} }>Sign Out</Text>
                  </TouchableOpacity>

                </View>

              </View>


              {/* Favorite Product List  */}
              <View style={{
                backgroundColor:'grey',
                flex: 0.15,
                marginTop: 25,
                borderWidth: 2,
                justifyContent: 'center',
                borderRadius: 10
              }}>

              <TouchableOpacity onPress = {() => this.props.navigation.navigate('Favorite_Products_List')}>
                <Text style={{ fontSize: 25, textAlign: 'center'} }>Favorite Product List</Text>
              </TouchableOpacity>

              </View>

              {/*end  */}


              {/* Order List  */}
              <View style={{
                backgroundColor:'grey',
                flex: 0.15,
                marginTop: 25,
                borderWidth: 2,
                justifyContent: 'center',
                borderRadius: 10
              }}>

              <TouchableOpacity onPress = {() => this.props.navigation.navigate('Order_List')}>
                <Text style={{ fontSize: 25, textAlign: 'center'} }>Order List</Text>
              </TouchableOpacity>


              </View>

              {/*end  */}


              {/* Address Book  */}
              <View style={{
                backgroundColor:'grey',
                flex: 0.15,
                marginTop: 25,
                borderWidth: 2,
                justifyContent: 'center',
                borderRadius: 10
              }}>

              <TouchableOpacity onPress = {() => this.props.navigation.navigate('Address_Book')}>
                <Text style={{ fontSize: 25, textAlign: 'center'} }>Address Book</Text>
              </TouchableOpacity>

              </View>

              {/*end  */}



            </ScrollView>


          );

    }


  }
}
