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
    return(' 城 市 ')
  } else {
    return(City_Value)
  }
}

// This function will help Province Modal to show the Province name
export function ShowProvinceName(Province_Value){
  if (Province_Value == '') {
    return(' 省 份 ')
  } else {
    return(Province_Value)
  }
}

// This function will help Province Modal to show the District name
export function ShowDistrictName(District_Value){
  if (District_Value == '') {
    return(' 地 区 ')
  } else {
    return(District_Value)
  }
}


// This fuction will help to get city for the province
export function GetCityForProvince(Province_Value){
  if (Province_Value == 'zhejiang') {
    return([
      {key: 'hangzhou'},
      {key: 'ningbo'},
      {key: 'wenzhou'},
      {key: 'zhoushan'},
      {key: 'jiaxing'},
      {key: 'huzhou'},
    ])
  }
  else if (Province_Value == 'hebei') {
    return([
      {key: 'hebei1'},
      {key: 'hebei2'},
      {key: 'hebei3'},
      {key: 'hebei4'},
    ])
  }
  else if (Province_Value == 'anhui') {
    return([
      {key: 'anhui1'},
      {key: 'anhui1'},
      {key: 'anhui1'},
      {key: 'anhui1'},
    ])
  }
  else if (Province_Value == 'jiangxi') {
    return([
      {key: 'jiangxi1'},
      {key: 'jiangxi2'},
      {key: 'jiangxi3'},
      {key: 'jiangxi4'},
    ])
  }
  else if (Province_Value == 'jiangsu') {
    return([
      {key: 'nanjing'},
      {key: 'suzhou'},
      {key: 'nantong'},
      {key: 'changzhou'},
    ])
  }
  else if (Province_Value == 'shanghai') {
    return([
      {key: 'shanghai'},
    ])
  }
  else {
    return([{key: Province_Value}])
  }
}

// This fuction will help to get District for the City
export function GetDistrictForCity(City_Value){
  return([
    {key: City_Value + '1'},
    {key: City_Value + '2'},
    {key: City_Value + '3'},
    {key: City_Value + '4'},
  ])
}






export function AddNewAddressCheck(Province_Value, City_Value, Street_Value, Post_Code_Value, Address_Name_Value, Address_Phone_Number_Value) {
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
  else if (Address_Name_Value == '') {
    return('Address Name Value is empty, please check again!')
  }
  else if (Address_Phone_Number_Value == '') {
    return('Address Phone Number Value is empty, please check again!')
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
