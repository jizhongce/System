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
import {getaddressbook} from '../../../server.js';
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


export default class Address_Book extends Component<{}> {



  static navigationOptions = ()=> {
    return {
      title: 'Address Book',
    }
}

constructor(props) {
  super(props);
  this.state = {
    Address_Book: [],
    Refreshing_Flag : false
  };
}

Refresh_Address_Book(){
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

      // Next we need call function to get all the address detail for the user
      getaddressbook(User_ID, (response) => {

        const get_address_book_code = response["StatusCode"]

        const Address_Book = response["ResponseText"]

        if (get_address_book_code == 200 || get_address_book_code == 622) {

          // next create array to store the products object
          var Address_Book_List = []

          for (var Address in Address_Book) {
            console.log(Address_Book[Address]);
            Address_Book_List.push(Address_Book[Address])
          }

          this.setState({
            Address_Book : Address_Book_List,
            Refreshing_Flag : false
          });
          // End of if statement in getfavoriteproduct
        }

        else {

          var errormsg = ErrorCodePrase(get_address_book_code)[1]

          var title = ErrorCodePrase(get_address_book_code)[0]

          console.log(ErrorCodePrase(get_address_book_code))


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
//
// User_Home_On_Refresh(){
//   this.setState({
//     Refreshing_Flag : true
//   },
//   () => {this.Refresh_User_Info()}
// );
// }
//
//
componentWillMount(){
  //AsyncStorage.clear()
  // AsyncStorage.setItem('UID123', 'hello', () => {
  //
  // });

  this.props.navigation.addListener('willFocus', ()=>{

    this.Refresh_Address_Book()

  });


}


   render() {

     return(
       <ScrollView style={{flex: 1}} >

         <View style={{backgroundColor:'white'}}>
           {
             this.state.Address_Book.map((Address, i) => {
               return(
                 <TouchableOpacity key={i}>
                   <View style={{
                       flex: 0.15,
                       marginTop: 25,
                       borderWidth: 2,
                       justifyContent: 'center',
                       borderRadius: 10,

                     }}>
                     <Text>key : {i}</Text>
                     <Text>ID : {Address.Address_ID}</Text>
                     <Text>Street : {Address.Street}</Text>
                     <Text>City : {Address.City}</Text>
                     <Text>Province : {Address.Province}</Text>
                     <Text>Post Code : {Address.Post_Code}</Text>
                   </View>
                 </TouchableOpacity>


               );
             })
           }
         </View>

         <View style={{
           backgroundColor:'grey',
           flex: 0.15,
           marginTop: 25,
           borderWidth: 2,
           justifyContent: 'center',
           borderRadius: 10
         }}>

         <TouchableOpacity>
           <Text style={{ fontSize: 25, textAlign: 'center'} }>Add Another Address</Text>
         </TouchableOpacity>

         </View>

       </ScrollView>

     )

    // if (this.state.User_Flag == false) {
    //   return (
    //     <ScrollView style={{flex: 1}} >
    //
    //
    //       <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>
    //
    //         <View style={{
    //
    //           marginTop: 25,
    //           height: '50%',
    //           width: '60%',
    //           left: '85%',
    //           borderWidth: 2,
    //           justifyContent: 'center',
    //           borderRadius: 10,
    //
    //         }}>
    //
    //         <TouchableOpacity onPress={() => this.props.navigation.navigate('Log_In_Board')}>
    //           <Text style={{ fontSize: 25, textAlign: 'center'} }>登     录</Text>
    //         </TouchableOpacity>
    //
    //         </View>
    //
    //       </View>
    //
    //       <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>
    //
    //         <View style={{
    //
    //           marginTop: 25,
    //           height: '50%',
    //           width: '60%',
    //           left: '85%',
    //           borderWidth: 2,
    //           justifyContent: 'center',
    //           borderRadius: 10,
    //
    //         }}>
    //
    //         <TouchableOpacity onPress={() => this.props.navigation.navigate('Sign_Up_Board')}>
    //           <Text style={{ fontSize: 25, textAlign: 'center'} }>注     册</Text>
    //         </TouchableOpacity>
    //
    //         </View>
    //
    //       </View>
    //
    //       <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>
    //
    //         <View style={{
    //
    //           marginTop: 25,
    //           height: '50%',
    //           width: '60%',
    //           left: '85%',
    //           borderWidth: 2,
    //           justifyContent: 'center',
    //           borderRadius: 10,
    //
    //         }}>
    //
    //         <TouchableOpacity onPress={() => this.props.navigation.navigate('Pass_Change_Board')}>
    //           <Text style={{ fontSize: 25, textAlign: 'center'} }>修 改 密 码</Text>
    //         </TouchableOpacity>
    //
    //         </View>
    //
    //       </View>
    //
    //       <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>
    //
    //         <View style={{
    //
    //           marginTop: 25,
    //           height: '50%',
    //           width: '60%',
    //           left: '85%',
    //           borderWidth: 2,
    //           justifyContent: 'center',
    //           borderRadius: 10,
    //
    //         }}>
    //
    //         <TouchableOpacity onPress={() => this.props.navigation.navigate('Phone_Change_Board')}>
    //           <Text style={{ fontSize: 25, textAlign: 'center'} }>修 改 手 机</Text>
    //         </TouchableOpacity>
    //
    //         </View>
    //
    //       </View>
    //
    //     </ScrollView>
    //
    //
    //   );
    //
    // }
    // else {
    //
    //       return (
    //         <ScrollView
    //           refreshControl={
    //           <RefreshControl
    //             refreshing = {this.state.Refreshing_Flag}
    //             onRefresh={this.User_Home_On_Refresh.bind(this)}
    //           />
    //         }
    //           style={{flex: 1}} >
    //
    //
    //
    //           {/*start  */}
    //
    //           <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>
    //
    //               <Text style={{ fontSize: 25, textAlign: 'center'} }>User ID: {this.state.User_Profile.User_ID}</Text>
    //
    //           </View>
    //
    //           <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>
    //
    //               <Text style={{ fontSize: 25, textAlign: 'center'} }>First Name: {this.state.User_Profile.First_Name}</Text>
    //
    //           </View>
    //
    //           <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>
    //
    //               <Text style={{ fontSize: 25, textAlign: 'center'} }>Last Name: {this.state.User_Profile.Last_Name}</Text>
    //
    //           </View>
    //
    //           <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>
    //
    //               <Text style={{ fontSize: 25, textAlign: 'center'} }>Level: {this.state.User_Profile.Level}</Text>
    //
    //           </View>
    //
    //           <View style={{flex: 0.15, flexDirection:'row',backgroundColor:'grey'}}>
    //
    //             <View style={{
    //
    //               marginTop: 25,
    //               height: '50%',
    //               width: '60%',
    //               left: '85%',
    //               borderWidth: 2,
    //               justifyContent: 'center',
    //               borderRadius: 10,
    //
    //             }}>
    //
    //             <TouchableOpacity onPress={()=> { this.sign_out()} }>
    //               <Text style={{ fontSize: 25, textAlign: 'center'} }>Sign Out</Text>
    //               </TouchableOpacity>
    //
    //             </View>
    //
    //           </View>
    //
    //           <View style={{backgroundColor:'green'}}>
    //             <Text style={{ fontSize: 25, textAlign: 'center'} }>Favorite Product</Text>
    //
    //             {
    //               this.state.Favorite_Products.map((product, i) => {
    //                 return(
    //                 <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('Favorite_Single_Product_Home', { Product_ID : product.Product_ID, Product_Spec : product.Product_Spec})}>
    //                   <View style={{
    //                       flex: 0.15,
    //                       marginTop: 25,
    //                       borderWidth: 2,
    //                       justifyContent: 'center',
    //                       borderRadius: 10,
    //
    //                     }}>
    //                     <Text>key : {i}</Text>
    //                     <Text>ID : {product.Product_ID}</Text>
    //                     <Text>Status : {product.Product_Status}</Text>
    //                     <Text>Specification : {product.Product_Spec}</Text>
    //                     <Text>Price : {product.Product_Price}</Text>
    //                   </View>
    //                 </TouchableOpacity>
    //
    //
    //                 );
    //               })
    //             }
    //           </View>
    //
    //           <View style={{backgroundColor:'white'}}>
    //             <Text style={{ fontSize: 25, textAlign: 'center'} }>Order List</Text>
    //               {
    //                 this.state.Order_List.map((order, i) => {
    //                   return(
    //
    //                     <View key={i} style={{
    //                         flex: 0.15,
    //                         marginTop: 25,
    //                         borderWidth: 2,
    //                         justifyContent: 'center',
    //                         borderRadius: 10,
    //
    //                       }}>
    //                       <Text>key : {i}</Text>
    //                       <Text>ID : {order.Order_ID}</Text>
    //                       <Text>Status : {order.Order_Status}</Text>
    //                       <Text>Order Time : {order.Order_Time}</Text>
    //                       <Text>Address : {order.Order_Shipping_Address_ID}</Text>
    //                     </View>
    //
    //
    //                   );
    //                 })
    //               }
    //
    //           </View>
    //
    //           <View style={{
    //             backgroundColor:'grey',
    //             flex: 0.15,
    //             marginTop: 25,
    //             borderWidth: 2,
    //             justifyContent: 'center',
    //             borderRadius: 10
    //           }}>
    //             <TouchableOpacity >
    //               <Text style={{ fontSize: 25, textAlign: 'center'} }>Address Book</Text>
    //             </TouchableOpacity>
    //             {/*  {
    //                 this.state.Order_List.map((order, i) => {
    //                   return(
    //
    //                     <View key={i} style={{
    //                         flex: 0.15,
    //                         marginTop: 25,
    //                         borderWidth: 2,
    //                         justifyContent: 'center',
    //                         borderRadius: 10,
    //
    //                       }}>
    //                       <Text>key : {i}</Text>
    //                       <Text>ID : {order.Order_ID}</Text>
    //                       <Text>Status : {order.Order_Status}</Text>
    //                       <Text>Order Time : {order.Order_Time}</Text>
    //                       <Text>Address : {order.Order_Shipping_Address_ID}</Text>
    //                     </View>
    //
    //
    //                   );
    //                 })
    //               }
    //               */}
    //           </View>
    //
    //           {/*end  */}
    //
    //
    //
    //         </ScrollView>
    //
    //
    //       );
    //
    // }


  }
}
