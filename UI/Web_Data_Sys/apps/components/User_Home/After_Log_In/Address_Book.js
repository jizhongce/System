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
import {ErrorCodePrase, AddNewAddressCheck, ShowCityName, ShowProvinceName, ShowDistrictName, GetCityForProvince, GetDistrictForCity} from '../../../util.js';
import {getaddressbook, addnewaddress, deleteaddress, editaddress} from '../../../server.js';
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
  Modal,
  FlatList
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

    // Start from here is add new address
    New_Total_Modal_Visible: false,
    New_City_Modal_Visible: false,
    New_Province_Modal_Visible: false,
    New_District_Modal_Visible: false,


    New_Province_Value: '',


    New_City_Value: '',


    New_Address_Name_Value: '',
    New_Address_Phone_Number_Value: '',
    New_Street_Value: '',
    New_District_Value: '',

    // Start from here is edit address
    Edit_Total_Modal_Visible: false,
    Edit_City_Modal_Visible: false,
    Edit_Province_Modal_Visible: false,
    Edit_District_Modal_Visible: false,


    Edit_Province_Value: '',


    Edit_City_Value: '',


    Edit_Address_Name_Value: '',
    Edit_Address_Phone_Number_Value: '',
    Edit_Street_Value: '',
    Edit_District_Value: '',
    Edit_Address_ID_Value: '',
  };
}

Open_Add_New_Address_Modal(){
  this.setState({
    New_Total_Modal_Visible: true,
  });
}

Close_Add_New_Address_Modal(){
  this.setState({
    New_Total_Modal_Visible: false,
    New_City_Modal_Visible: false,
    New_Province_Modal_Visible: false,
    New_District_Modal_Visible: false,

    New_Province_Value: '',


    New_City_Value: '',


    New_Address_Name_Value: '',
    New_Address_Phone_Number_Value: '',
    New_Street_Value: '',
    New_District_Value: ''
  });
}



// Add new address function start here
New_Street_Handler(text){
  this.setState({
    New_Street_Value: text
  });
}



New_Address_Name_Handler(text){
  this.setState({
    New_Address_Name_Value: text
  });
}



New_Address_Phone_Number_Handler(text){
  this.setState({
    New_Address_Phone_Number_Value: text
  });
}


//Province choose function

New_Open_Choose_Province_Modal(){
  this.setState({
    New_Province_Modal_Visible: true
  });
}

New_Close_Choose_Province_Modal(){
  this.setState({
    New_Province_Modal_Visible: false
  });
}

New_Province_Handler(item){
  this.setState({
    New_Province_Value: item.key,

    New_Province_Modal_Visible: false,


    New_City_Value: '',


    New_Street_Value: '',
    New_District_Value: ''
  });
}



//City choose function

New_Open_Choose_City_Modal(){

  if (this.state.New_Province_Value == '') {
    Alert.alert(
      'Oops',
      'Please Choose a province first',
      [
        {text: 'OK'},
      ],
    )
  }
  else {
    this.setState({
      New_City_Modal_Visible: true
    });
  }


}

New_Close_Choose_City_Modal(){
  this.setState({
    New_City_Modal_Visible: false
  });
}


New_City_Handler(item){
  this.setState({
    New_City_Value: item.key,
    New_City_Modal_Visible: false,

    New_Street_Value: '',
    New_District_Value: ''
  });
}

//District choose function

New_Open_Choose_District_Modal(){

  if (this.state.New_City_Value == '') {
    Alert.alert(
      'Oops',
      'Please Choose a City first',
      [
        {text: 'OK'},
      ],
    )
  }
  else {
    this.setState({
      New_District_Modal_Visible: true
    });
  }


}

New_Close_Choose_District_Modal(){
  this.setState({
    New_District_Modal_Visible: false
  });
}


New_District_Handler(item){
  this.setState({
    New_District_Value: item.key,
    New_District_Modal_Visible: false,

    New_Street_Value: '',
  });
}



// Submit new address function
Submit_New_Address(Address_Name, Address_Phone_Number, Province, City, Street, District){
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
      const New_Address = {
        Address_Name: Address_Name,
        Address_Phone_Number: Address_Phone_Number,
        Province: Province,
        City: City,
        Street: Street,
        District: District
      }

      addnewaddress(User_ID, New_Address, (response) =>{
        const submit_new_address_status_code = response["StatusCode"]
        const statusText = response["ResponseText"]


        if (submit_new_address_status_code == 200) {

          Alert.alert(
              'Success',
              'Your new address has been added into address book!',
            [
              {text: 'OK', onPress: ()=>{
                this.Refresh_Address_Book();
              }},
            ],
          )

        } else {

          Alert.alert(
              'Oops',
              'Error Code:' + submit_new_address_status_code + '\n' +'There is something wrong with the server! Try again later!',
            [
              {text: 'OK'},
            ],
          )

        }



      });

    }

  });
}



Submit_New_Address_On_Press(){
  if (this.state.New_Address_Name_Value == '' || this.state.New_Address_Phone_Number_Value == '' || this.state.New_Province_Value == '' || this.state.New_City_Value == '' || this.state.New_Street_Value == '' ||  this.state.New_District_Value == '') {

    Alert.alert(
      'Oops',
      AddNewAddressCheck(this.state.New_Province_Value, this.state.New_City_Value, this.state.New_Street_Value, this.state.New_District_Value, this.state.New_Address_Name_Value, this.state.New_Address_Phone_Number_Value),
      [
        {text: 'OK'},
      ],
    )

  } else {

    const New_Address = this.state.New_Address_Name_Value + '\n' + this.state.New_Address_Phone_Number_Value + '\n'  + this.state.New_Province_Value + '\n' + this.state.New_City_Value + '\n' + this.state.New_Street_Value + '\n' +  this.state.New_District_Value

    Alert.alert(
      'Watch Out!',
      'you are adding new address! \n Address Detail: \n ' + New_Address,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Confirm', onPress: ()=>{
          this.Submit_New_Address(this.state.New_Address_Name_Value, this.state.New_Address_Phone_Number_Value, this.state.New_Province_Value, this.state.New_City_Value, this.state.New_Street_Value, this.state.New_District_Value)
        }},

      ],
    )


  }
}


Delete_Address(Address){
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
      const Address_ID = Address.Address_ID

      deleteaddress(User_ID, Address_ID, (response) =>{
        const delete_address_status_code = response["StatusCode"]
        const statusText = response["ResponseText"]


        if (delete_address_status_code == 200) {

          Alert.alert(
              'Success',
              'Your address has been Deleted!',
            [
              {text: 'OK', onPress: ()=>{
                this.Refresh_Address_Book();
              }},
            ],
          )

        }

        else if (delete_address_status_code == 624) {

          Alert.alert(
              'Oops',
              'Error Code:' + delete_address_status_code + '\n' +'There is something wrong with the server! Try again later!',
            [
              {text: 'OK'},
            ],
          )

        }

        else {

          Alert.alert(
              'Oops',
              'There is something wrong with the server! Try again later!',
            [
              {text: 'OK'},
            ],
          )

        }



      });

    }

  });

}




Delete_Address_On_Press(Address){

  const Delete_Address = Address.Address_ID + '\n' + Address.Address_Name + '\n' + Address.Address_Phone_Number + '\n' + Address.Street + '\n' + Address.City + '\n' +  Address.Province + '\n' +  Address.District

  Alert.alert(
    'Watch Out!',
    'you are adding new address! \n Address Detail: \n ' + Delete_Address,
    [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Confirm', onPress: ()=>{
        this.Delete_Address(Address)
      }},

    ],
  )
}






// Edit Address function start here

Open_Edit_Address_Modal(Address){
  this.setState({
    Edit_Total_Modal_Visible: true,

    Edit_Province_Value: Address.Province,


    Edit_City_Value: Address.City,


    Edit_Address_Name_Value: Address.Address_Name,
    Edit_Address_Phone_Number_Value: Address.Address_Phone_Number,
    Edit_Street_Value: Address.Street,
    Edit_District_Value: Address.District,
    Edit_Address_ID_Value: Address.Address_ID,
  });
}



Close_Edit_Address_Modal(){
  this.setState({
    Edit_Total_Modal_Visible: false,
    Edit_City_Modal_Visible: false,
    Edit_Province_Modal_Visible: false,
    Edit_District_Modal_Visible: false,


    Edit_Province_Value: '',


    Edit_City_Value: '',


    Edit_Address_Name_Value: '',
    Edit_Address_Phone_Number_Value: '',
    Edit_Street_Value: '',
    Edit_District_Value: '',
    Edit_Address_ID_Value: '',
  });
}


// Add new address function start here
Edit_Street_Handler(text){
  this.setState({
    Edit_Street_Value: text
  });
}


// Add new address function start here
Edit_Address_Name_Handler(text){
  this.setState({
    Edit_Address_Name_Value: text
  });
}

// Add new address function start here
Edit_Address_Phone_Number_Handler(text){
  this.setState({
    Edit_Address_Phone_Number_Value: text
  });
}


//Edit Province choose function

Edit_Open_Choose_Province_Modal(){
  this.setState({
    Edit_Province_Modal_Visible: true
  });
}

Edit_Close_Choose_Province_Modal(){
  this.setState({
    Edit_Province_Modal_Visible: false
  });
}

Edit_Province_Handler(item){
  this.setState({
    Edit_Province_Value: item.key,

    Edit_Province_Modal_Visible: false,


    Edit_City_Value: '',


    Edit_Street_Value: '',
    Edit_District_Value: ''
  });
}



//City choose function

Edit_Open_Choose_City_Modal(){

  if (this.state.Edit_Province_Value == '') {
    Alert.alert(
      'Oops',
      'Please Choose a province first',
      [
        {text: 'OK'},
      ],
    )
  }
  else {
    this.setState({
      Edit_City_Modal_Visible: true
    });
  }


}

Edit_Close_Choose_City_Modal(){
  this.setState({
    Edit_City_Modal_Visible: false
  });
}


Edit_City_Handler(item){
  this.setState({
    Edit_City_Value: item.key,
    Edit_City_Modal_Visible: false,

    Edit_Street_Value: '',
    Edit_District_Value: ''
  });
}


//District choose function

Edit_Open_Choose_District_Modal(){

  if (this.state.Edit_City_Value == '') {
    Alert.alert(
      'Oops',
      'Please Choose a City first',
      [
        {text: 'OK'},
      ],
    )
  }
  else {
    this.setState({
      Edit_District_Modal_Visible: true
    });
  }


}

Edit_Close_Choose_District_Modal(){
  this.setState({
    Edit_District_Modal_Visible: false
  });
}


Edit_District_Handler(item){
  this.setState({
    Edit_District_Value: item.key,
    Edit_District_Modal_Visible: false,

    Edit_Street_Value: '',
  });
}


Submit_Edit_Address(Address_Name, Address_Phone_Number, Address_ID, Province, City, Street, District){
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
      const New_Address = {
        Address_Name: Address_Name,
        Address_Phone_Number: Address_Phone_Number,
        Address_ID: Address_ID,
        Province: Province,
        City: City,
        Street: Street,
        District: District
      }

      editaddress(User_ID, New_Address, (response) =>{
        const edit_address_status_code = response["StatusCode"]
        const statusText = response["ResponseText"]


        if (edit_address_status_code == 200) {

          Alert.alert(
              'Success',
              'Your address has been updated!',
            [
              {text: 'OK', onPress: ()=>{
                this.Refresh_Address_Book();
              }},
            ],
          )

        } else {

          Alert.alert(
              'Oops',
              'Error Code:' + edit_address_status_code + '\n' +'There is something wrong with the server! Try again later!',
            [
              {text: 'OK'},
            ],
          )

        }



      });

    }

  });

}




Submit_Edit_Address_On_Press(){
  if (this.state.Edit_Address_Name_Value == '' || this.state.Edit_Address_Phone_Number_Value == '' || this.state.Edit_Province_Value == '' || this.state.Edit_City_Value == '' || this.state.Edit_Street_Value == '' ||  this.state.Edit_District_Value == '') {

    Alert.alert(
      'Oops',
      AddNewAddressCheck(this.state.Edit_Province_Value, this.state.Edit_City_Value, this.state.Edit_Street_Value, this.state.Edit_District_Value, this.state.Edit_Address_Name_Value, this.state.Edit_Address_Phone_Number_Value),
      [
        {text: 'OK'},
      ],
    )

  } else {

    const Edit_Address = this.state.Edit_Address_Name_Value + '\n' + this.state.Edit_Address_Phone_Number_Value + '\n' + this.state.Edit_Address_ID_Value + '\n' + this.state.Edit_Province_Value + '\n' + this.state.Edit_City_Value + '\n' + this.state.Edit_Street_Value + '\n' +  this.state.Edit_District_Value

    Alert.alert(
      'Watch Out!',
      'you are changing address! \n Edited Address Detail: \n ' + Edit_Address,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Confirm', onPress: ()=>{
          this.Submit_Edit_Address(this.state.Edit_Address_Name_Value, this.state.Edit_Address_Phone_Number_Value, this.state.Edit_Address_ID_Value, this.state.Edit_Province_Value, this.state.Edit_City_Value, this.state.Edit_Street_Value, this.state.Edit_District_Value)
        }},

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

            New_Total_Modal_Visible: false,
            New_City_Modal_Visible: false,
            New_Province_Modal_Visible: false,
            New_District_Modal_Visible: false,
            New_Province_Value: '',


            New_Address_Name_Value: '',
            New_Address_Phone_Number_Value: '',
            New_City_Value: '',



            New_Street_Value: '',
            New_District_Value: '',

            Edit_Total_Modal_Visible: false,
            Edit_City_Modal_Visible: false,
            Edit_Province_Modal_Visible: false,
            Edit_District_Modal_Visible: false,


            Edit_Province_Value: '',


            Edit_City_Value: '',


            Edit_Address_Name_Value: '',
            Edit_Address_Phone_Number_Value: '',
            Edit_Street_Value: '',
            Edit_District_Value: '',
            Edit_Address_ID_Value: '',
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
                   <View key={i} style={{
                       flex: 0.15,
                       marginTop: 25,
                       borderWidth: 2,
                       justifyContent: 'center',
                       borderRadius: 10,

                     }}>
                     <Text>key : {i}</Text>
                     <Text>ID : {Address.Address_ID}</Text>
                     <Text>Name : {Address.Address_Name}</Text>
                     <Text>Phone : {Address.Address_Phone_Number}</Text>
                     <Text>Street : {Address.Street}</Text>
                     <Text>City : {Address.City}</Text>
                     <Text>Province : {Address.Province}</Text>
                     <Text>District : {Address.District}</Text>

                     <TouchableOpacity onPress={()=> this.Open_Edit_Address_Modal(Address)} >
                       <Text style={{marginTop:10, marginBottom:5, fontSize: 20, textAlign: 'center'} }>Edit Address</Text>
                     </TouchableOpacity>

                     <TouchableOpacity onPress={()=> this.Delete_Address_On_Press(Address)} >
                       <Text style={{marginTop:5, marginBottom:10, fontSize: 20, textAlign: 'center'} }>Delete Address</Text>
                     </TouchableOpacity>

                   </View>


               );
             })
           }
         </View>


         {/* start from here is editing */}

         {/* Start of Modal for total input*/}
           <Modal
             animationType="slide"
             transparent={false}
             visible={this.state.Edit_Total_Modal_Visible}

             >
             <View style={{
               marginTop: 25,
               justifyContent: 'center',
             }}>

             <Text style={{ fontSize: 25, textAlign: 'center'} }>Edit Address</Text>

             </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 Name:
               </Text>
               <TextInput
                 value = {this.state.Edit_Address_Name_Value}
                 style={{
                   marginTop: 20,
                   height: '50%',
                   width: '50%',
                   borderWidth: 2,
                   borderRadius: 10,

                 }} onChangeText = {(text) => this.Edit_Address_Name_Handler(text)} autoCapitalize='none' />
               </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 Phone:
               </Text>
               <TextInput
                 value = {this.state.Edit_Address_Phone_Number_Value}
                 style={{
                   marginTop: 20,
                   height: '50%',
                   width: '50%',
                   borderWidth: 2,
                   borderRadius: 10,

                 }} onChangeText = {(text) => this.Edit_Address_Phone_Number_Handler(text)} autoCapitalize='none' />
               </View>


             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 Province:
               </Text>

               <TouchableOpacity style={{
                 marginTop: 20,
                 height: '50%',
                 width: '50%',
                 borderWidth: 2,
                 borderRadius: 10,
               }} onPress={()=> this.Edit_Open_Choose_Province_Modal()}>
                 <Text style={{fontSize: 20, textAlign: 'center'}}>{ShowProvinceName(this.state.Edit_Province_Value)}</Text>
               </TouchableOpacity>

             </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 City:
               </Text>

               <TouchableOpacity style={{
                 marginTop: 20,
                 height: '50%',
                 width: '50%',
                 borderWidth: 2,
                 borderRadius: 10,
               }} onPress={()=> this.Edit_Open_Choose_City_Modal()}>
                 <Text style={{fontSize: 20, textAlign: 'center'}}>{ShowCityName(this.state.Edit_City_Value)}</Text>
               </TouchableOpacity>

             </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 District:
               </Text>

               <TouchableOpacity style={{
                 marginTop: 20,
                 height: '50%',
                 width: '50%',
                 borderWidth: 2,
                 borderRadius: 10,
               }} onPress={()=> this.Edit_Open_Choose_District_Modal()}>
                 <Text style={{fontSize: 20, textAlign: 'center'}}>{ShowCityName(this.state.Edit_District_Value)}</Text>
               </TouchableOpacity>

             </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 Street:
               </Text>
               <TextInput
                 value = {this.state.Edit_Street_Value}
                 style={{
                   marginTop: 20,
                   height: '50%',
                   width: '50%',
                   borderWidth: 2,
                   borderRadius: 10,

                 }} onChangeText = {(text) => this.Edit_Street_Handler(text)} autoCapitalize='none' />
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

               <TouchableOpacity onPress={()=> this.Submit_Edit_Address_On_Press()}>
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

               <TouchableOpacity onPress={()=> this.Close_Edit_Address_Modal()}>
                 <Text style={{ fontSize: 25, textAlign: 'center'} }>取消</Text>
               </TouchableOpacity>

               </View>

             </View>

             {/* edit form ends here*/}



             {/* Start of Province Modal */}
             <Modal
             animationType="slide"
             transparent={false}
             visible={this.state.Edit_Province_Modal_Visible} >

             <View style={{
               marginTop: 25,
               justifyContent: 'center',
             }}>

             <Text style={{ fontSize: 25, textAlign: 'center'} }>Please Choose a Province</Text>

             </View>

             <FlatList
               data={[
                 {key: 'zhejiang'},
                 {key: 'shanghai'},
                 {key: 'hebei'},
                 {key: 'anhui'},
                 {key: 'jiangxi'},
                 {key: 'jiangsu'},
               ]}
               renderItem={({item}) => {return(
                 <TouchableOpacity onPress={()=> this.Edit_Province_Handler(item)}>
                   <Text style={{
                   marginTop: 10,
                   borderWidth: 2,
                   justifyContent: 'center',
                   borderRadius: 10,
                   fontSize: 20,
                   textAlign: 'center'} }>{item.key}</Text>
                 </TouchableOpacity>
               )} }
               />


             <View style={{
             flex: 0.15,
             flexDirection:'row',
             backgroundColor:'grey',
             justifyContent: 'center',}}>


               <TouchableOpacity onPress={()=> this.Edit_Close_Choose_Province_Modal()}>
                 <Text style={{
                 width:300,
                 marginTop: 10,
                 borderWidth: 2,
                 borderRadius: 10,
                 fontSize: 25,
                 textAlign: 'center'} }>取消</Text>
               </TouchableOpacity>


             </View>



             </Modal>

             {/* End of Choose province Modal input */}



             {/* Start of City Modal */}
             <Modal
             animationType="slide"
             transparent={false}
             visible={this.state.Edit_City_Modal_Visible} >

             <View style={{
               marginTop: 25,
               justifyContent: 'center',
             }}>

             <Text style={{ fontSize: 25, textAlign: 'center'} }>Please Choose a City</Text>

             </View>

             <FlatList
               data={GetCityForProvince(this.state.Edit_Province_Value)}
               renderItem={({item}) => {return(
                 <TouchableOpacity onPress={()=> this.Edit_City_Handler(item)}>
                   <Text style={{
                   marginTop: 10,
                   borderWidth: 2,
                   justifyContent: 'center',
                   borderRadius: 10,
                   fontSize: 20,
                   textAlign: 'center'} }>{item.key}</Text>
                 </TouchableOpacity>
               )} }
               />


             <View style={{
             flex: 0.15,
             flexDirection:'row',
             backgroundColor:'grey',
             justifyContent: 'center',}}>


               <TouchableOpacity onPress={()=> this.Edit_Close_Choose_City_Modal()}>
                 <Text style={{
                 width:300,
                 marginTop: 10,
                 borderWidth: 2,
                 borderRadius: 10,
                 fontSize: 25,
                 textAlign: 'center'} }>取消</Text>
               </TouchableOpacity>


             </View>



             </Modal>
             {/* End of Choose City Modal input */}


             {/* Start of District Modal */}
             <Modal
             animationType="slide"
             transparent={false}
             visible={this.state.Edit_District_Modal_Visible} >

             <View style={{
               marginTop: 25,
               justifyContent: 'center',
             }}>

             <Text style={{ fontSize: 25, textAlign: 'center'} }>Please Choose a District</Text>

             </View>

             <FlatList
               data={GetDistrictForCity(this.state.Edit_City_Value)}
               renderItem={({item}) => {return(
                 <TouchableOpacity onPress={()=> this.Edit_District_Handler(item)}>
                   <Text style={{
                   marginTop: 10,
                   borderWidth: 2,
                   justifyContent: 'center',
                   borderRadius: 10,
                   fontSize: 20,
                   textAlign: 'center'} }>{item.key}</Text>
                 </TouchableOpacity>
               )} }
               />


             <View style={{
             flex: 0.15,
             flexDirection:'row',
             backgroundColor:'grey',
             justifyContent: 'center',}}>


               <TouchableOpacity onPress={()=> this.Edit_Close_Choose_District_Modal()}>
                 <Text style={{
                 width:300,
                 marginTop: 10,
                 borderWidth: 2,
                 borderRadius: 10,
                 fontSize: 25,
                 textAlign: 'center'} }>取消</Text>
               </TouchableOpacity>


             </View>



             </Modal>
             {/* End of Choose District Modal input */}



           </Modal>
           {/* End of Edit Modal input */}







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

         {/* Start of Modal for total input*/}
           <Modal
             animationType="slide"
             transparent={false}
             visible={this.state.New_Total_Modal_Visible}

             >
             <View style={{
               marginTop: 25,
               justifyContent: 'center',
             }}>

             <Text style={{ fontSize: 25, textAlign: 'center'} }>Add Another Address</Text>

             </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 Name:
               </Text>
               <TextInput
                 value = {this.state.New_Address_Name_Value}
                 style={{
                   marginTop: 20,
                   height: '50%',
                   width: '50%',
                   borderWidth: 2,
                   borderRadius: 10,

                 }} onChangeText = {(text) => this.New_Address_Name_Handler(text)} autoCapitalize='none' />
               </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 Phone:
               </Text>
               <TextInput
                 value = {this.state.New_Address_Phone_Number_Value}
                 style={{
                   marginTop: 20,
                   height: '50%',
                   width: '50%',
                   borderWidth: 2,
                   borderRadius: 10,

                 }} onChangeText = {(text) => this.New_Address_Phone_Number_Handler(text)} autoCapitalize='none' />
               </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 Province:
               </Text>

               <TouchableOpacity style={{
                 marginTop: 20,
                 height: '50%',
                 width: '50%',
                 borderWidth: 2,
                 borderRadius: 10,
               }} onPress={()=> this.New_Open_Choose_Province_Modal()}>
                 <Text style={{fontSize: 20, textAlign: 'center'}}>{ShowProvinceName(this.state.New_Province_Value)}</Text>
               </TouchableOpacity>

             </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 City:
               </Text>

               <TouchableOpacity style={{
                 marginTop: 20,
                 height: '50%',
                 width: '50%',
                 borderWidth: 2,
                 borderRadius: 10,
               }} onPress={()=> this.New_Open_Choose_City_Modal()}>
                 <Text style={{fontSize: 20, textAlign: 'center'}}>{ShowCityName(this.state.New_City_Value)}</Text>
               </TouchableOpacity>

             </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 District:
               </Text>

               <TouchableOpacity style={{
                 marginTop: 20,
                 height: '50%',
                 width: '50%',
                 borderWidth: 2,
                 borderRadius: 10,
               }} onPress={()=> this.New_Open_Choose_District_Modal()}>
                 <Text style={{fontSize: 20, textAlign: 'center'}}>{ShowDistrictName(this.state.New_District_Value)}</Text>
               </TouchableOpacity>

             </View>

             <View style={{flex: 0.1, flexDirection:'row',justifyContent: 'center',backgroundColor:'white'}}>
               <Text style={{width:100, marginTop: 25, fontSize: 20, fontWeight: 'bold', color: '#333333',}}>
                 Street:
               </Text>
               <TextInput
                 value = {this.state.New_Street_Value}
                 style={{
                   marginTop: 20,
                   height: '50%',
                   width: '50%',
                   borderWidth: 2,
                   borderRadius: 10,

                 }} onChangeText = {(text) => this.New_Street_Handler(text)} autoCapitalize='none' />
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



             {/* Start of Province Modal */}
             <Modal
             animationType="slide"
             transparent={false}
             visible={this.state.New_Province_Modal_Visible} >

             <View style={{
               marginTop: 25,
               justifyContent: 'center',
             }}>

             <Text style={{ fontSize: 25, textAlign: 'center'} }>Please Choose a Province</Text>

             </View>

             <FlatList
               data={[
                 {key: 'zhejiang'},
                 {key: 'shanghai'},
                 {key: 'hebei'},
                 {key: 'anhui'},
                 {key: 'jiangxi'},
                 {key: 'jiangsu'},
               ]}
               renderItem={({item}) => {return(
                 <TouchableOpacity onPress={()=> this.New_Province_Handler(item)}>
                   <Text style={{
                   marginTop: 10,
                   borderWidth: 2,
                   justifyContent: 'center',
                   borderRadius: 10,
                   fontSize: 20,
                   textAlign: 'center'} }>{item.key}</Text>
                 </TouchableOpacity>
               )} }
               />


             <View style={{
             flex: 0.15,
             flexDirection:'row',
             backgroundColor:'grey',
             justifyContent: 'center',}}>


               <TouchableOpacity onPress={()=> this.New_Close_Choose_Province_Modal()}>
                 <Text style={{
                 width:300,
                 marginTop: 10,
                 borderWidth: 2,
                 borderRadius: 10,
                 fontSize: 25,
                 textAlign: 'center'} }>取消</Text>
               </TouchableOpacity>


             </View>



             </Modal>

             {/* End of Choose province Modal input */}



             {/* Start of City Modal */}
             <Modal
             animationType="slide"
             transparent={false}
             visible={this.state.New_City_Modal_Visible} >

             <View style={{
               marginTop: 25,
               justifyContent: 'center',
             }}>

             <Text style={{ fontSize: 25, textAlign: 'center'} }>Please Choose a City</Text>

             </View>

             <FlatList
               data={GetCityForProvince(this.state.New_Province_Value)}
               renderItem={({item}) => {return(
                 <TouchableOpacity onPress={()=> this.New_City_Handler(item)}>
                   <Text style={{
                   marginTop: 10,
                   borderWidth: 2,
                   justifyContent: 'center',
                   borderRadius: 10,
                   fontSize: 20,
                   textAlign: 'center'} }>{item.key}</Text>
                 </TouchableOpacity>
               )} }
               />


             <View style={{
             flex: 0.15,
             flexDirection:'row',
             backgroundColor:'grey',
             justifyContent: 'center',}}>


               <TouchableOpacity onPress={()=> this.New_Close_Choose_City_Modal()}>
                 <Text style={{
                 width:300,
                 marginTop: 10,
                 borderWidth: 2,
                 borderRadius: 10,
                 fontSize: 25,
                 textAlign: 'center'} }>取消</Text>
               </TouchableOpacity>


             </View>



             </Modal>
             {/* End of Choose City Modal input */}





             {/* Start of District Modal */}
             <Modal
             animationType="slide"
             transparent={false}
             visible={this.state.New_District_Modal_Visible} >

             <View style={{
               marginTop: 25,
               justifyContent: 'center',
             }}>

             <Text style={{ fontSize: 25, textAlign: 'center'} }>Please Choose a District</Text>

             </View>

             <FlatList
               data={GetDistrictForCity(this.state.New_City_Value)}
               renderItem={({item}) => {return(
                 <TouchableOpacity onPress={()=> this.New_District_Handler(item)}>
                   <Text style={{
                   marginTop: 10,
                   borderWidth: 2,
                   justifyContent: 'center',
                   borderRadius: 10,
                   fontSize: 20,
                   textAlign: 'center'} }>{item.key}</Text>
                 </TouchableOpacity>
               )} }
               />


             <View style={{
             flex: 0.15,
             flexDirection:'row',
             backgroundColor:'grey',
             justifyContent: 'center',}}>


               <TouchableOpacity onPress={()=> this.New_Close_Choose_District_Modal()}>
                 <Text style={{
                 width:300,
                 marginTop: 10,
                 borderWidth: 2,
                 borderRadius: 10,
                 fontSize: 25,
                 textAlign: 'center'} }>取消</Text>
               </TouchableOpacity>


             </View>



             </Modal>
             {/* End of Choose City Modal input */}








             {/* End of total Modal input */}
           </Modal>














       </ScrollView>

     )


  }
}
