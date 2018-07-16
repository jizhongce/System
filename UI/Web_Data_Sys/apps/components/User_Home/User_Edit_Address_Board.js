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
import {CancelExistStyle, ShowProvinceName, ShowDistrictName, ShowCityName, GetProvince, GetCityForProvince, GetDistrictForCity, DropDownHolder, AddNewAddressCheck, ShowPhoneNumber} from '../../util.js';
import {editaddress} from '../../server.js';
import { Icon, Header } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Modal from "react-native-modal";
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
  TouchableHighlight,
  Picker,
  FlatList,
  KeyboardAvoidingView
} from 'react-native';
import NavigationBar from 'react-native-navbar';


import Status_Bar from '../Status_Bar.js';



export default class User_Edit_Address_Board extends Component<{}> {

  static navigationOptions = {
    header: null
}

  constructor(props) {
    super(props);
    this.state = {

      Address_Name_Cancel_Flag: true,

      Address_Phone_Number_Cancel_Flag: true,

      Address_Street_Cancel_Flag: true,

      Address_ID: '',

      Address_Name: '',

      Address_Phone_Number: '',

      Address_Province: '',

      Address_City: '',

      Address_District: '',

      Address_Street: '',

      Province_Modal_Visible: false,

      City_Modal_Visible: false,

      District_Modal_Visible: false,




    };
  }


  Address_Name_Handler(text){
    this.setState({
      Address_Name: text
    });
  }


  Address_Phone_Number_Handler(text){
    this.setState({
      Address_Phone_Number: text
    });
  }


  Address_Street_Handler(text){
    this.setState({
      Address_Street: text
    });
  }

  Address_Province_Handler(item){
    this.setState({
      Address_Province: item,

      Address_City: '',

      Address_Street: '',
      Address_District: ''

    });
  }


  Address_City_Handler(item){
    this.setState({
      Address_City: item,

      Address_Street: '',
      Address_District: ''

    });
  }


  Address_District_Handler(item){
    this.setState({
      Address_District: item,

      Address_Street: '',

    });
  }


  Close_Province_Modal(){
    this.setState({
      Province_Modal_Visible: false,
    });
  }


  Open_Province_Modal(){
    this.setState({
      Province_Modal_Visible: true,
    });
  }


  Close_City_Modal(){

    this.setState({
      City_Modal_Visible: false,
    });


  }


  Open_City_Modal(){

    if (this.state.Address_Province == '') {

      DropDownHolder.getDropDown().alertWithType('error', 'Error!', '请选择一个省份！' )

    } else {
      this.setState({
        City_Modal_Visible: true,
      });
    }

  }


  Close_District_Modal(){
    this.setState({
      District_Modal_Visible: false,
    });
  }


  Open_District_Modal(){

    if (this.state.Address_City == '') {

      DropDownHolder.getDropDown().alertWithType('error', 'Error!', '请选择一个城市！' )

    } else {
      this.setState({
        District_Modal_Visible: true,
      });
    }

  }


  //Here is function for submit the new Address

  Submit_Edit_Address_On_Press(){
    if (this.state.Address_Name == '' || this.state.Address_Phone_Number == '' || this.state.Address_Province == '' ||  this.state.Address_City == '' ||  this.state.Address_District == '' ||  this.state.Address_Street == '') {

      const Error_Message = AddNewAddressCheck(this.state.Address_Name, this.state.Address_Phone_Number, this.state.Address_Province, this.state.Address_City, this.state.Address_District, this.state.Address_Street)

      DropDownHolder.getDropDown().alertWithType('error', 'Error!', Error_Message )


    } else {

      const New_Address = this.state.Address_Name + '\n' + ShowPhoneNumber(this.state.Address_Phone_Number) + '\n' + this.state.Address_Province + '\n' + this.state.Address_City + '\n' + this.state.Address_District + '\n' +  this.state.Address_Street

      Alert.alert(
        '注意!',
        '您正在修改地址，新地址如下: \n ' + New_Address,
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Confirm', onPress: ()=>{
            this.Submit_Edit_Address(this.state.Address_ID, this.state.Address_Name, this.state.Address_Phone_Number, this.state.Address_Province, this.state.Address_City, this.state.Address_District, this.state.Address_Street)
          }},

        ],
      )


    }
  }


  Submit_Edit_Address(Address_ID, Address_Name, Address_Phone_Number, Address_Province, Address_City, Address_District, Address_Street){
    AsyncStorage.getItem('User_ID', (err, result) => {
      var User_ID = result
      console.log(User_ID);

      if (User_ID == null) {

        this.props.navigation.navigate('User_Home');

      }

      else {
        const New_Address = {
          Address_ID: Address_ID,
          Address_Name: Address_Name,
          Address_Phone_Number: Address_Phone_Number,
          Province: Address_Province,
          City: Address_City,
          District: Address_District,
          Street: Address_Street
        }

        editaddress(User_ID, New_Address, (response) =>{
          const edit_address_status_code = response["StatusCode"]


          if (edit_address_status_code == 200) {

            DropDownHolder.getDropDown().alertWithType('success', '修改成功!', '地址已经修改!' )

            this.props.navigation.goBack();

          } else {

            DropDownHolder.getDropDown().alertWithType('error', 'Error ' + edit_address_status_code + ' !', 'There is something wrong with server!' )

          }



        });

      }

    });
  }






  componentWillMount(){
    this.props.navigation.addListener('willFocus', ()=>{

      const { params } = this.props.navigation.state;
      const Address = params ? params.Address : null;

      this.setState({

        Address_ID: Address.Address_ID,

        Address_Name: Address.Address_Name,

        Address_Phone_Number: Address.Address_Phone_Number,

        Address_Province: Address.Province,

        Address_City: Address.City,

        Address_District: Address.District,

        Address_Street: Address.Street,

      });

    });


  }


  render() {

    return(

      <View>
        <Status_Bar />

          <View style={{
              height: '8%',
              backgroundColor: 'white',
              flexDirection: 'row',
              borderBottomWidth: 1,
            }} >

            <View style={{
                height: '100%',
                width: '30%',
                alignItems: 'center',
                flexDirection: 'row',
                marginLeft: 5
              }} >

              <TouchableOpacity onPress = {()=> this.props.navigation.goBack()}>

                <Image style={{width: 24, height: 24}} source={require('../../../img/back_arrow.png')} />

              </TouchableOpacity>
            </View>

            <View style={{
                height: '100%',
                width: '40%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row'
              }} >
              <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}> 修 改 地 址 </Text>
            </View>


          </View>


          <View style={{backgroundColor: 'white', height: '89%', flexDirection: 'column', alignItems: 'center',}}>

            <View style={{width: '100%', flexDirection: 'row', paddingLeft: 5, paddingBottom: 15, paddingTop: 15, alignItems: 'center', borderBottomWidth: 1, borderColor: '#dddddd'}}>

              <View style={{marginRight:10}}>
                <Text style={{fontSize: 16}}>地 址 名 字:</Text>
              </View>

              <View style={{}}>
                <TextInput
                  style={{
                    width: 230,
                    fontSize: 16,
                  }}
                  placeholder={'请输入地址名字'}
                  autoCapitalize='none'
                  onChangeText = {(text) => this.Address_Name_Handler(text)}
                  value={this.state.Address_Name}
                  onFocus={()=> this.setState({Address_Name_Cancel_Flag: false})}
                  onEndEditing={()=> this.setState({Address_Name_Cancel_Flag: true})}
                    />
              </View>

              <TouchableOpacity onPress={() => this.setState({Address_Name: ''})} style={CancelExistStyle(this.state.Address_Name_Cancel_Flag)}>
                <Image source={require('../../../img/cancel.png')} />
              </TouchableOpacity>


            </View>



            <View style={{width: '100%', flexDirection: 'row', paddingLeft: 5, paddingBottom: 10, paddingTop: 15, alignItems: 'center',  borderBottomWidth: 1, borderColor: '#dddddd'}}>

              <View style={{marginRight:10}}>
                <Text style={{fontSize: 16}}>联 系 方 式:</Text>
              </View>

              <View style={{}}>
                <TextInput
                  style={{
                    width: 230,
                    fontSize: 16,
                  }}
                  placeholder={'请输入手机号码'}
                  keyboardType={'phone-pad'}
                  autoCapitalize='none'
                  onChangeText = {(text) => this.Address_Phone_Number_Handler(text)}
                  value={this.state.Address_Phone_Number}
                  onFocus={()=> this.setState({Address_Phone_Number_Cancel_Flag: false, Address_Phone_Number: ''})}
                  onEndEditing={()=> this.setState({Address_Phone_Number_Cancel_Flag: true})}
                    />
              </View>

              <TouchableOpacity onPress={() => this.setState({Address_Phone_Number: ''})} style={CancelExistStyle(this.state.Address_Phone_Number_Cancel_Flag)}>
                <Image source={require('../../../img/cancel.png')} />
              </TouchableOpacity>

            </View>


            <View style={{width: '100%', flexDirection: 'row', paddingLeft: 5, paddingBottom: 10, paddingTop: 15, alignItems: 'center', borderBottomWidth: 1, borderColor: '#dddddd'}}>

              <View style={{marginRight:10}}>
                <Text style={{fontSize: 16}}>所 在 地 区:</Text>
              </View>

              <View style={{flexDirection: 'row'}}>

                <TouchableOpacity onPress={() => this.Open_Province_Modal()} style={{marginRight: 10, borderColor: "black", borderWidth: 1}}>
                  <Text style={{fontSize: 16}}>{ShowProvinceName(this.state.Address_Province)}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.Open_City_Modal()} style={{marginRight: 10, borderColor: "black", borderWidth: 1}}>
                  <Text style={{fontSize: 16}}>{ShowCityName(this.state.Address_City)}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.Open_District_Modal()} style={{marginRight: 10, borderColor: "black", borderWidth: 1}}>
                  <Text style={{fontSize: 16}}>{ShowDistrictName(this.state.Address_District)}</Text>
                </TouchableOpacity>


              </View>

            </View>

            <View style={{width: '100%', flexDirection: 'row', paddingLeft: 5, paddingBottom: 10, paddingTop: 15, borderBottomWidth: 1, alignItems: 'center', borderColor: '#dddddd'}}>

              <View style={{marginRight:10}}>
                <Text style={{fontSize: 16}}>详 细 地 址:</Text>
              </View>

              <View style={{}}>
                <TextInput
                  numberOfLines = {3}
                  multiline = {true}
                  autoCapitalize='none'
                  placeholder={'请输入详细地址'}
                  onChangeText = {(text) => this.Address_Street_Handler(text)}
                  value={this.state.Address_Street}
                  onFocus={()=> this.setState({Address_Street_Cancel_Flag: false})}
                  onEndEditing={()=> this.setState({Address_Street_Cancel_Flag: true})}
                  style={{
                    height: 60,
                    width: 230,
                    fontSize: 16,
                  }} />
              </View>

              <TouchableOpacity onPress={() => this.setState({Address_Street: ''})} style={CancelExistStyle(this.state.Address_Street_Cancel_Flag)}>
                <Image source={require('../../../img/cancel.png')} />
              </TouchableOpacity>

            </View>


            <TouchableOpacity
              style={{
                width: '70%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 5,
                marginTop: 20,
                paddingTop:10,
                paddingBottom: 10,
              }} onPress={() => this.Submit_Edit_Address_On_Press()}>

              <Text style={{justifyContent: 'center', alignItems: 'center', fontSize:20}}> 提 交 新 地 址 </Text>

            </TouchableOpacity>




          </View>


          {/* New Province Choose */}
          <Modal
           isVisible={this.state.Province_Modal_Visible}
           backdropColor={"black"}
           backdropOpacity={0.5}
           backdropTransitionInTiming={500}
           backdropTransitionOutTiming={500}
           animationOutTiming={500}
           animationInTiming={500}
           onBackdropPress={() => this.Close_Province_Modal()}
           style={{justifyContent: "center", alignItems: "center",}}

         >
           <View style={{
             height: '30%',
             width: '50%',
             backgroundColor: '#ffffff',
             borderRadius: 5,
             justifyContent: "center", alignItems: "center",
             borderColor: "rgba(0, 0, 0, 0.1)"}}>


             <Picker
               selectedValue={this.state.Address_Province}
               style={{ height: '100%', width: '100%' }}
               onValueChange={(itemValue, itemIndex) => this.Address_Province_Handler(itemValue)}>
               {
                 GetProvince().map((Province, i)=>{
                   return(
                     <Picker.Item key={i} label= {Province.key} value={Province.key} />
                   );
                 })
               }
             </Picker>



           </View>


         </Modal>

         {/* New Province Choose */}


          {/* New City Choose */}
          <Modal
           isVisible={this.state.City_Modal_Visible}
           backdropColor={"black"}
           backdropOpacity={0.5}
           backdropTransitionInTiming={500}
           backdropTransitionOutTiming={500}
           animationOutTiming={500}
           animationInTiming={500}
           onBackdropPress={() => this.Close_City_Modal()}
           style={{justifyContent: "center", alignItems: "center",}}

         >
           <View style={{
             height: '30%',
             width: '50%',
             backgroundColor: '#ffffff',
             borderRadius: 5,
             justifyContent: "center", alignItems: "center",
             borderColor: "rgba(0, 0, 0, 0.1)"}}>


             <Picker
               selectedValue={this.state.Address_City}
               style={{ height: '100%', width: '100%' }}
               onValueChange={(itemValue, itemIndex) => this.Address_City_Handler(itemValue)}>
               {
                 GetCityForProvince(this.state.Address_Province).map((City, i)=>{
                   return(
                     <Picker.Item key={i} label= {City.key} value={City.key} />
                   );
                 })
               }
             </Picker>



           </View>


         </Modal>

         {/* New City Choose */}


          {/* New District Choose */}
          <Modal
           isVisible={this.state.District_Modal_Visible}
           backdropColor={"black"}
           backdropOpacity={0.5}
           backdropTransitionInTiming={500}
           backdropTransitionOutTiming={500}
           animationOutTiming={500}
           animationInTiming={500}
           onBackdropPress={() => this.Close_District_Modal()}
           style={{justifyContent: "center", alignItems: "center",}}

         >
           <View style={{
             height: '30%',
             width: '50%',
             backgroundColor: '#ffffff',
             borderRadius: 5,
             justifyContent: "center", alignItems: "center",
             borderColor: "rgba(0, 0, 0, 0.1)"}}>


             <Picker
               selectedValue={this.state.Address_District}
               style={{ height: '100%', width: '100%' }}
               onValueChange={(itemValue, itemIndex) => this.Address_District_Handler(itemValue)}>
               {
                 GetDistrictForCity(this.state.Address_City).map((District, i)=>{
                   return(
                     <Picker.Item key={i} label= {District.key} value={District.key} />
                   );
                 })
               }
             </Picker>



           </View>


         </Modal>

         {/* New City Choose */}



      </View>





    )
  }
}
