const NO_SUCH_USER_CODE = 601

const WORNG_PASSWORD_CODE = 602

const  PHONE_NOT_VERIFIED_CODE = 603

const  USER_EXIST_CODE = 604

const  PHONE_EXIST_CODE = 605

const  WRONG_PASSWORD_SCHEMA_CODE = 606

const  WRONG_PHONE_SCHEMA_CODE = 607

const  WRONG_VERIFY_CODE = 608

const  PHONENUM_NOT_CORRECT = 609

const  DATABASE_CHANGE_PASSWORD_ERROR = 610

const  DATABASE_CHANGE_PHONE_ERROR = 611

const  SAME_PHONE_ERROR = 612



const City_Dict = {
  "hangzhou" : "杭州",
  "ningbo" : "宁波",
  "wenzhou" : "温州",
  "zhoushan" : "舟山",
  "jiaxing" : "嘉兴",
  "huzhou" : "湖州",

  "hebei1" : "河北1",
  "hebei2" : "河北2",
  "hebei3" : "河北3",
  "hebei4" : "河北4",

  "anhui1" : "安徽1",
  "anhui2" : "安徽2",
  "anhui3" : "安徽3",
  "anhui4" : "安徽4",

  "jiangxi1" : "江西1",
  "jiangxi2" : "江西2",
  "jiangxi3" : "江西3",
  "jiangxi4" : "江西4",

  "nanjing" : "南京" ,
  "suzhou" : "苏州" ,
  "nantong" : "南通",
  "changzhou" : "常州" ,

  "shanghai" : '上海市'

}

const Province_Dict = {
  "shanghai" : '上海市',

  "zhejiang" : '浙江',

  "hebei" : '河北',

  "anhui" : '安徽',

  "jiangxi" : '江西',

  "jiangsu" : '江苏'

}



export const Product_Image = {
  'Product_1' : require('../img/product1.jpg')
}



export function ErrorCodePrase(code) {

  var message = ''
  var title = ''

  switch (code) {
    case NO_SUCH_USER_CODE:
      title = 'Log In Error'
      message = 'No Such User, Please Log in with another account!'
      break;

    case WORNG_PASSWORD_CODE:
      title = 'Log In Error'
      message = 'The Password is not correct, Please Log in with correct Password!'
      break;

    case USER_EXIST_CODE:
      message = 'User already exist, Please Log in or Sign up with another user name!'
      break;

    case PHONE_EXIST_CODE:
      message = 'The Phone Number already exist, Please Sign up with another phone number!'
      break;

    case WRONG_PASSWORD_SCHEMA_CODE:
      message = 'The Password Schema is not correct, Please follow the password requirement!'
      break;

    case WRONG_PHONE_SCHEMA_CODE:
      message = 'The Phone Schema is not correct, Please enter correct phone!'
      break;

    case WRONG_VERIFY_CODE:
      message = 'The Verification Code is not correct or the code is expried, Please enter again or request again!'
      break;

    case PHONENUM_NOT_CORRECT:
      message = 'The Phone Number is Wrong!'
      break;

    case DATABASE_CHANGE_PASSWORD_ERROR:
      message = 'There is error in database change password, Please try again!'
      break;

    case DATABASE_CHANGE_PHONE_ERROR:
      message = 'There is error in database change phone, Please try again!'
      break;

    default:
      message = 'Error'

  }

  return([title, message])

}


export function ShoppingCartAddressExistStyle(Address_Info_Flag) {
  if (Address_Info_Flag == true) {

    return({display: 'none'})

  } else {
    return({})
  }

}


export function FavoriteExistStyle(Existed) {
  if (Existed == true) {

    return({display: 'none'})

  } else {
    return({})
  }

}

// Start from here we prase the add new address selection

// This function will help City Modal to show the City name
export function ShowCityName(City_Value){
  if (City_Value == '') {
    return('Choose City')
  } else {
    return(City_Value)
  }
}

// This function will help Province Modal to show the Province name
export function ShowProvinceName(Province_Value){
  if (Province_Value == '') {
    return('Choose Province')
  } else {
    return(Province_Value)
  }
}

// This fuction will help to get city for the province
export function GetCityForProvince(Province_Value){
  if (Province_Value == 'zhejiang') {
    return([
      {key: '杭州', Value: 'hangzhou'},
      {key: '宁波', Value: 'ningbo'},
      {key: '温州', Value: 'wenzhou'},
      {key: '舟山', Value: 'zhoushan'},
      {key: '嘉兴', Value: 'jiaxing'},
      {key: '湖州', Value: 'huzhou'},
    ])
  }
  else if (Province_Value == 'hebei') {
    return([
      {key: '河北1', Value: 'hebei1'},
      {key: '河北2', Value: 'hebei2'},
      {key: '河北3', Value: 'hebei3'},
      {key: '河北4', Value: 'hebei4'},
    ])
  }
  else if (Province_Value == 'anhui') {
    return([
      {key: '安徽1', Value: 'anhui1'},
      {key: '安徽2', Value: 'anhui2'},
      {key: '安徽3', Value: 'anhui3'},
      {key: '安徽4', Value: 'anhui4'},
    ])
  }
  else if (Province_Value == 'jiangxi') {
    return([
      {key: '江西1', Value: 'jiangxi1'},
      {key: '江西2', Value: 'jiangxi2'},
      {key: '江西3', Value: 'jiangxi3'},
      {key: '江西4', Value: 'jiangxi4'},
    ])
  }
  else if (Province_Value == 'jiangsu') {
    return([
      {key: '南京', Value: 'nanjing'},
      {key: '苏州', Value: 'suzhou'},
      {key: '南通', Value: 'nantong'},
      {key: '常州', Value: 'changzhou'},
    ])
  }
  else if (Province_Value == 'shanghai') {
    return([
      {key: '上海市', Value: 'shanghai'},
    ])
  }
  else {
    return([{key: Province_Value}])
  }
}


export function PraseCityValue(City_Value){
  return(City_Dict[City_Value])
}

export function PraseProvinceValue(Province_Value){
  return(Province_Dict[Province_Value])
}



export function AddNewAddressCheck(Province_Value, City_Value, Street_Value, Post_Code_Value) {
  if (Province_Value == '') {
    return('Province Value is empty, please check again!')
  }

  else if (City_Value == '') {
    return('City Value is empty, please check again!')
  }

  else if (Street_Value == '') {
    return('Street Value is empty, please check again!')
  }

  else if (Province_Value == 'Choose Province') {
    return('Province Value is empty, please check again!')
  }
  else if (Post_Code_Value == '') {
    return('Post Code Value is empty, please check again!')
  }
  else if (isNaN(Post_Code_Value)) {
    return('Post Code Value has wrong schema, please check again!')
  }
  else {
    return('Something is wrong, please check again!')
  }

}

export class DropDownHolder {
    static dropDown;

    static setDropDown(dropDown) {
        this.dropDown = dropDown;
    }

    static getDropDown() {
        return this.dropDown;
    }
}



export function StockStatusCheck(Product_Status) {
  if (Product_Status == 1) {
    return('有库存')
  }

  else{
    return('无库存，需订货')
  }

}


export function CreateParametersForRequest(Parameter_Name, Parameter) {
  return(Parameter_Name + "=" +  Parameter)
}
