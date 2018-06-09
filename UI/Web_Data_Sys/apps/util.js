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


export function FavoriteExistStyle(Existed) {
  if (Existed == true) {

    return({display: 'none'})

  } else {
    return({})
  }

}


export function AddNewAddressCheck(Street_Value, City_Value, Province_Value, Post_Code_Value) {
  console.log();
  if (Street_Value == '') {
    return('Street Value is empty, please check again!')
  }
  else if (City_Value == '') {
    return('City Value is empty, please check again!')
  }
  else if (Province_Value == '') {
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


export function CreateParametersForRequest(Parameter_Name, Parameter) {
  return(Parameter_Name + "=" +  Parameter)
}
