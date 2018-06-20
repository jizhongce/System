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
import {Product_Image, GetDistrictForCity} from '../../util.js';
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


import Status_Bar from '../../Status_Bar.js';

class Shopping_Cart_Header extends React.Component {
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

class Shopping_Cart_Shipping_Selection_Header extends React.Component {
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



          <Text style={{fontSize: 20, color: 'black', fontWeight:'bold'}}>收 货 地 址</Text>



        </View>

      </View>

    );
  }
}


export default class Home2 extends Component<{}> {

  static navigationOptions = {
    header: <Shopping_Cart_Header />,
}

  constructor(props) {
    super(props);
    this.state = {
      isVisible : true,
      quantity: 1,

      Modal_Visible: false,
      Modal_Second_Visible: false,
      Modal_Third_Visible: false,
      Modal_City_Visible: false,
      language: '',

    };
  }

  closeModal(){
    this.setState({
      Modal_Visible : false
    });
  }

  openModal(){
    this.setState({
      Modal_Visible : true
    });
  }

  closeSecondModal(){
    this.setState({
      Modal_Second_Visible : false
    });
  }

  openSecondModal(){
    this.setState({
      Modal_Second_Visible : true
    });
  }

  closeThirdModal(){
    this.setState({
      Modal_Third_Visible : false
    });
  }

  openThirdModal(){
    this.setState({
      Modal_Third_Visible : true
    });
  }

  closeCityModal(){
    this.setState({
      Modal_City_Visible: false
    });
  }

  openCityModal(){
    this.setState({
      Modal_City_Visible: true,
    });
  }


  Swipe_Out_Button(){
    return(
      [{
        text: '删除',
        type: 'delete',
        onPress: ()=>{},
      }]
    )
  }




  render() {

    return(

      <KeyboardAvoidingView keyboardVerticalOffset={60} behavior={'position'} >


        <TouchableOpacity onPress={()=> this.openModal()} activeOpacity={0.8} style={{backgroundColor: '#cbcbcb', height: '15%',  justifyContent: 'center', borderStyle: 'dotted', borderWidth: 2, borderColor: 'black',}}>

          <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, flexWrap:'wrap'}}>
            <Text style={{fontSize: 20, }} >hardware company, </Text>
            <Text style={{fontSize: 20}}>15000000000</Text>
          </View>

          <View style={{flexDirection:'row', alignItems: 'center', marginLeft: 10, marginRight: 10, flexWrap:'wrap'}}>

            <Text style={{fontSize: 16}} >21 West End Ave, New York, New York, 325000</Text>

          </View>

        </TouchableOpacity>


        <View style={{height: '77%',  justifyContent: 'center'}}>

        </View>


        <Modal
         isVisible={this.state.Modal_Visible}
         backdropColor={"black"}
         backdropOpacity={0.5}
         backdropTransitionInTiming={500}
         backdropTransitionOutTiming={500}
         animationOutTiming={500}
         animationInTiming={500}
         onBackdropPress={() => this.setState({ Modal_Visible: false })}
         style={{justifyContent: "center", alignItems: "center",}}

       >
         <View style={{
           height: '90%',
           width: '100%',
           backgroundColor: '#ffffff',
           borderRadius: 5,
           borderColor: "rgba(0, 0, 0, 0.1)"}}>



             <View style={{paddingLeft: 10, paddingRight: 10, height:'8%', backgroundColor: 'red', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", }}>

               <Text style={{fontSize: 20}}>收 货 地 址</Text>

               <TouchableOpacity onPress={() => this.closeModal()} style={{}}>
                 <Icon name='clear' />
               </TouchableOpacity>

             </View>


             <ScrollView style={{height:'84%', backgroundColor: 'transparent'}}>


               <Swipeout style={{marginTop:5, backgroundColor: '#ffffff'}} right={this.Swipe_Out_Button()} autoClose={true}>

                 <TouchableOpacity activeOpacity={1} style={{borderStyle: 'dotted', flexDirection: 'row', borderWidth: 2, borderColor: 'black',}}>
                   <View style={{width: '80%', marginLeft: 10, marginRight: 10,}}>
                     <View style={{flexDirection:'row', alignItems: 'center',  flexWrap:'wrap'}}>
                       <Text style={{fontSize: 20, }} >Company name 1, </Text>
                       <Text style={{fontSize: 20}}>15000000000</Text>
                     </View>

                     <View style={{flexDirection:'row', alignItems: 'center', flexWrap:'wrap'}}>

                       <Text style={{fontSize: 16}} >21 West End Ave, New York, New York, 325000</Text>

                     </View>
                   </View>

                   <TouchableOpacity onPress={() => this.openThirdModal()} activeOpacity={0.5} style={{width: '20%', alignItems: 'center', justifyContent: "center", }}>
                     <Icon name='edit' />
                   </TouchableOpacity>
                 </TouchableOpacity>

               </Swipeout>




             </ScrollView>


             <View style={{height:'8%', justifyContent: "center", alignItems: "center", backgroundColor:'transparent'}}>
               <TouchableOpacity activeOpacity={0.5} onPress={() => this.openSecondModal()}
                 style={{
                   height: '70%',
                   width: '70%',
                   backgroundColor: 'white',
                   borderRadius: 10, borderColor: "black", borderWidth: 1 ,
                   justifyContent: "center", alignItems: "center",
                   shadowOffset:{  width: 0,  height: 5,  }, shadowColor: 'black', shadowOpacity: 0.5,
                 }}>
                 <Text style={{fontSize: 20}}> 添 加 新 地 址 </Text>
               </TouchableOpacity>

             </View>


         </View>




         {/* New */}

         <Modal
          isVisible={this.state.Modal_Second_Visible}
          backdropColor={"black"}
          backdropOpacity={0.5}
          backdropTransitionInTiming={500}
          backdropTransitionOutTiming={500}
          animationOutTiming={500}
          animationInTiming={500}
          onBackdropPress={() => this.setState({ Modal_Second_Visible: false })}
          style={{justifyContent: "center", alignItems: "center",}}

        >
          <View style={{
            height: '60%',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: 5,
            borderColor: "rgba(0, 0, 0, 0.1)"}}>



              <View style={{paddingLeft: 10, paddingRight: 10, height:'10%', backgroundColor: 'red', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", }}>

                <Text style={{fontSize: 20}}>添 加 收 货 地 址</Text>

                <TouchableOpacity onPress={() => this.closeSecondModal()} style={{}}>
                  <Icon name='clear' />
                </TouchableOpacity>

              </View>


              <View style={{height:'80%', backgroundColor: 'transparent', flexDirection: 'column',}}>

                <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, }}>
                  <Text style={{fontSize:15, marginRight: 5,}}>收件地址名字:</Text>
                  <TextInput style={{
                      marginLeft: 5,
                      width:150,
                      borderRadius: 5,
                      borderColor: "black",
                      borderWidth: 1
                    }} />

                </View>

                <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, }}>
                  <Text style={{fontSize:15, marginRight: 5,}}>收件地址电话号码:</Text>
                  <TextInput style={{
                      marginLeft: 5,
                      width:150,
                      borderRadius: 5,
                      borderColor: "black",
                      borderWidth: 1
                    }} />

                </View>

                <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 10, marginLeft: 10, flexWrap:'wrap' }}>


                  <Text style={{fontSize:15, marginRight: 5,}}>所在地区: </Text>
                  <TouchableOpacity onPress={()=>this.openCityModal()} >
                    <Text style={{fontSize:15, marginRight: 5, borderColor: "black", borderWidth: 1}}> 省 份 </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={{fontSize:15, marginRight: 5, borderColor: "black", borderWidth: 1}}> 城 市 </Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text style={{fontSize:15, marginRight: 5, borderColor: "black", borderWidth: 1}}> 地 区 </Text>
                  </TouchableOpacity>


                </View>

                <View style={{flexDirection: 'column', marginTop: 10, marginBottom: 10, marginLeft: 10, }}>
                  <Text style={{fontSize:15, marginRight: 5,}}>详细地址:</Text>
                  <TextInput multiline = {true} numberOfLines = {3}
                    style={{
                      height:50,
                      marginRight: 5,
                      borderRadius: 5,
                      borderColor: "black",
                      borderWidth: 1
                    }} />

                </View>



              </View>

              <View style={{height:'10%', justifyContent: "center", alignItems: "center", backgroundColor:'transparent'}}>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.closeSecondModal()}
                  style={{
                    height: '70%',
                    width: '70%',
                    backgroundColor: 'white',
                    borderRadius: 10, borderColor: "black", borderWidth: 1 ,
                    justifyContent: "center", alignItems: "center",
                    shadowOffset:{  width: 0,  height: 5,  }, shadowColor: 'black', shadowOpacity: 0.5,
                  }}>
                  <Text style={{fontSize: 20}}> 提 交 新 收 货 地 址 </Text>
                </TouchableOpacity>

              </View>


          </View>


          {/* New City Choose */}
          <Modal
           isVisible={this.state.Modal_City_Visible}
           backdropColor={"black"}
           backdropOpacity={0.5}
           backdropTransitionInTiming={500}
           backdropTransitionOutTiming={500}
           animationOutTiming={500}
           animationInTiming={500}
           onBackdropPress={() => this.setState({ Modal_City_Visible: false })}
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
               selectedValue={this.state.language}
               style={{ height: '100%', width: '100%' }}
               onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue}, ()=>{console.log(this.state.language);})}>
               {
                 GetDistrictForCity('City').map((District, i)=>{
                   return(
                     <Picker.Item key={i} label= {District.key} value={District.key} />
                   );
                 })
               }
             </Picker>



           </View>


         </Modal>

         {/* New City Choose */}

         

        </Modal>



       </Modal>










      </KeyboardAvoidingView>









    )
  }
}
