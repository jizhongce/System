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
import {ErrorCodePrase, AddNewAddressCheck} from '../../../util.js';
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
  RefreshControl,
  Modal
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
    Refreshing_Flag : false,
    modalvisible: false,
    Street_Value: '',
    City_Value: '',
    Province_Value: '',
    Post_Code_Value: ''
  };
}

Open_Add_New_Address_Modal(){
  this.setState({
    modalvisible: true,
  });
}

Close_Add_New_Address_Modal(){
  this.setState({
    modalvisible: false,
    Street_Value: '',
    City_Value: '',
    Province_Value: '',
    Post_Code_Value: ''
  });
}



// Add new address function start here
Street_Handler(text){
  this.setState({
    Street_Value: text
  });
}

City_Handler(text){
  this.setState({
    City_Value: text
  });
}


Province_Handler(text){
  this.setState({
    Province_Value: text
  });
}

Post_Code_Handler(text){
  this.setState({
    Post_Code_Value: text
  });
}

Submit_New_Address_On_Press(){
  if (this.state.Street_Value == '' || this.state.City_Value == '' || this.state.Province_Value == '' || this.state.Post_Code_Value == '' || isNaN(this.state.Post_Code_Value) == true) {

    Alert.alert(
      'Oops',
      AddNewAddressCheck(this.state.Street_Value, this.state.City_Value, this.state.Province_Value, this.state.Post_Code_Value),
      [
        {text: 'OK'},
      ],
    )

  } else {

    const New_Address = this.state.Street_Value + '\n' + this.state.City_Value + '\n' + this.state.Province_Value + '\n' + this.state.Post_Code_Value

    Alert.alert(
      'Watch Out!',
      'you are adding new address! \n Address Detail: \n ' + New_Address,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Confirm' },

      ],
    )


  }
}



// Refresh function start here

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
            Refreshing_Flag : false,
            modalvisible: false,
            Street_Value: '',
            City_Value: '',
            Province_Value: '',
            Post_Code_Value: ''
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

Address_Book_On_Refresh(){
  this.setState({
    Refreshing_Flag : true
  },
  () => {this.Refresh_Address_Book()}
);
}


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
       <ScrollView
         refreshControl={
         <RefreshControl
           refreshing = {this.state.Refreshing_Flag}
           onRefresh={this.Address_Book_On_Refresh.bind(this)}
         />
       }
         style={{flex: 1}} >

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

         <TouchableOpacity onPress={()=> this.Open_Add_New_Address_Modal()}>
           <Text style={{ fontSize: 25, textAlign: 'center'} }>Add Another Address</Text>
         </TouchableOpacity>

         </View>

         {/* Start of Modal*/}
           <Modal
             animationType="slide"
             transparent={false}
             visible={this.state.modalvisible}

             >
             <View style={{
               marginTop: 25,
               justifyContent: 'center',
             }}>

             <Text style={{ fontSize: 25, textAlign: 'center'} }>Add Another Address</Text>

             </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 Street:
               </Text>
               <TextInput style={{
                 marginTop: 20,
                 height: '50%',
                 width: '50%',
                 borderWidth: 2,
                 borderRadius: 10,

               }} onChangeText = {(text) => this.Street_Handler(text)} autoCapitalize='none' />
             </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 City:
               </Text>
               <TextInput style={{
                 marginTop: 20,
                 height: '50%',
                 width: '50%',
                 borderWidth: 2,
                 borderRadius: 10,

               }} onChangeText = {(text) => this.City_Handler(text)} autoCapitalize='none' />
             </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 Province:
               </Text>
               <TextInput style={{
                 marginTop: 20,
                 height: '50%',
                 width: '50%',
                 borderWidth: 2,
                 borderRadius: 10,

               }} onChangeText = {(text) => this.Province_Handler(text)} autoCapitalize='none' />
             </View>

             <View style={{flex: 0.15, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 Post Code:
               </Text>
               <TextInput style={{
                 marginTop: 20,
                 height: '50%',
                 width: '50%',
                 borderWidth: 2,
                 borderRadius: 10,

               }} onChangeText = {(text) => this.Post_Code_Handler(text)} autoCapitalize='none' />
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

               <TouchableOpacity onPress={() => this.Submit_New_Address_On_Press()}>
                 <Text style={{ fontSize: 25, textAlign: 'center'} }>提交</Text>
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

               <TouchableOpacity onPress={()=> this.Close_Add_New_Address_Modal()}>
                 <Text style={{ fontSize: 25, textAlign: 'center'} }>取消</Text>
               </TouchableOpacity>

               </View>

             </View>


           </Modal>


       </ScrollView>

     )


  }
}
