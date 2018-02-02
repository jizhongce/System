import requests
import hashlib
import json
import ErrorCode

# # HASH FUNCTION
# def HASH_PASS(DATA):
#     return(hashlib.sha1(DATA.encode()).hexdigest())


def LOG_IN(USERNAME, PASSWORD):
    '''
    THIS FUNCTION WILL SEND THE HTTP REQUEST TO THE SERVER AND WAIT FOR THE RESPONSE
    Here LOG_IN is parameters passed into the url and the HEADER will include the information
    HERE USE SHA1 TO HASH THE PASSWORD
    '''
    LOG_IN = {'User_Name' : USERNAME, 'Password' : PASSWORD}
    HEARDER = {'Content-Type' : 'application/json;charset=UTF-8'}
    RESPONSE = requests.get('http://localhost:8080/log_in', headers=HEARDER ,data = json.dumps(LOG_IN))
    return((RESPONSE.status_code,RESPONSE.json()))

# payload = {'username': 'jizhongce', 'password': 'jizhongce123123'}
#
# r = requests.get('http://localhost:8080/log_in', params=payload)
#
# print(r.url)
#
#
# print(r.json())

def SIGN_UP(USERNAME, PASSWORD, PHONENUM):
    '''
    HERE SIGN_UP IS A FUNCTION THAT WILL SEND HTTP POST REQUEST FOR THE SERVER AND WAIT FOR THE RESPONSE_DATA
    '''
    SIGN_UP = {'User_Name' : USERNAME, 'Password' : PASSWORD, 'Phone_Number' : PHONENUM}
    HEARDER = {'Content-Type' : 'application/json;charset=UTF-8'}
    RESPONSE = requests.post('http://localhost:8080/sign_up', headers=HEARDER , data = json.dumps(SIGN_UP))
    return(RESPONSE.status_code)


def SEND_VERIFY_CODE(PHONENUM, CODE):
    '''
    HERE SEND_VERIFY_CODE IS A FUNCTION WILL SEND SERVER TO CHECK THE VERIFY CODE
    '''
    SEND_VERIFY_CODE = {'Phone_Number' : PHONENUM, 'TEMPCODE' : CODE}
    HEARDER = {'Content-Type' : 'application/json;charset=UTF-8'}
    RESPONSE = requests.get('http://localhost:8080/phone_verify', headers=HEARDER , data = json.dumps(SEND_VERIFY_CODE))
    return((RESPONSE.status_code,RESPONSE.json()))


def PASS_CHANGE_USER(USERNAME):
    '''
    HERE PASS_CHANGE_USER IS A FUNCTION WILL SEND SERVER TO CHECK GET THE INFORMATION FOR CHANGING PASSWORD
    '''
    PASS_CHANGE_USER = {'User_Name' : USERNAME}
    HEARDER = {'Content-Type' : 'application/json;charset=UTF-8'}
    RESPONSE = requests.get('http://localhost:8080/pass_change_user', headers=HEARDER , data = json.dumps(PASS_CHANGE_USER))
    return((RESPONSE.status_code,RESPONSE.json()))

def CHANGE_PASS(USERID, NEW_PASSWORD):
    '''
    HERE CHANGE_PASS IS A FUNCTION WILL SEND SERVER THE NEW PASSWORD AND USERID TO CHANGE THE PASSWORD
    '''
    CHANGE_PASS = {'User_ID' : USERID, 'New_Password' : NEW_PASSWORD}
    HEARDER = {'Content-Type' : 'application/json;charset=UTF-8'}
    RESPONSE = requests.post('http://localhost:8080/change_pass', headers=HEARDER , data = json.dumps(CHANGE_PASS))
    return(RESPONSE.status_code)

def PHONE_CHANGE_USER(USERNAME):
    '''
    HERE PASS_CHANGE_USER IS A FUNCTION WILL SEND SERVER TO CHECK GET THE INFORMATION FOR CHANGING PHONENUM
    '''
    PHONE_CHANGE_USER = {'User_Name' : USERNAME}
    HEARDER = {'Content-Type' : 'application/json;charset=UTF-8'}
    RESPONSE = requests.get('http://localhost:8080/phone_change_user', headers=HEARDER , data = json.dumps(PHONE_CHANGE_USER))
    return((RESPONSE.status_code,RESPONSE.json()))

def CHANGE_PHONE(USERID, NEW_PHONE):
    '''
    HERE CHANGE_PASS IS A FUNCTION WILL SEND SERVER THE NEW PHONE AND USERID TO CHANGE THE PHONE
    '''
    CHANGE_PHONE = {'User_ID' : USERID, 'New_Phone' : NEW_PHONE}
    HEARDER = {'Content-Type' : 'application/json;charset=UTF-8'}
    RESPONSE = requests.post('http://localhost:8080/change_phone', headers=HEARDER , data = json.dumps(CHANGE_PHONE))
    return((RESPONSE.status_code,RESPONSE.json()))

def CHANGE_PHONE_UNVERIFIED(USERID, NEW_PHONE, PASSWORD):
    '''
    HERE CHANGE_PHONE_UNVERIFIED IS A FUNCTION WILL SEND SERVER THE NEW PHONE AND USERID AND PASSWORD TO CHANGE THE PHONE
    '''
    CHANGE_PHONE_UNVERIFIED = {'User_ID' : USERID, 'New_Phone' : NEW_PHONE, 'Password' : PASSWORD}
    HEARDER = {'Content-Type' : 'application/json;charset=UTF-8'}
    RESPONSE = requests.post('http://localhost:8080/change_phone_unverified', headers=HEARDER , data = json.dumps(CHANGE_PHONE_UNVERIFIED))
    return((RESPONSE.status_code,RESPONSE.json()))


def Error_Code_Handler(STATUS_CODE):

    '''
    SUCCESS_CODE - SUCCESS - 200

    SIGN IN ERROR
    -------------
    601 - NO SUCH USER

    602 - PASSWORD IS NOT CORRECT

    603 - PHONE IS NOT VERIFIED

    -------------

    SIGN UP ERROR
    -------------
    604 - USER ALREADY EXIST

    605 - THE PHONE NUMBER IS ALREADY SIGNED UP

    606 - THE PASSWORD IS NOT CORRECT Schema

    607 - THE PHONE NUMBER IS NOT CORRECT SHCEMA
    -------------

    VERIFY ERROR
    -------------
    608 - THE CODE IS NOT SAME OR THE CODE IS EXPIRED

    609 - THE PHONE NUMBER IS NOT CORRECT
    -------------
    '''

    if STATUS_CODE == ErrorCode.NO_SUCH_USER_CODE:
        print('\nNo Such User, Please Sign up or Log in with another account!\n')

    elif STATUS_CODE == ErrorCode.WORNG_PASSWORD_CODE:
        print('\nThe Password is not correct, Please Log in with correct Password!\n')

    elif STATUS_CODE == ErrorCode.USER_EXIST_CODE:
        print('\nUser already exist, Please Log in or Sign up with another user name!\n')

    elif STATUS_CODE == ErrorCode.PHONE_EXIST_CODE:
        print('\nThe Phone Number already exist, Please Sign up with another phone number!\n')

    elif STATUS_CODE == ErrorCode.WRONG_PASSWORD_SCHEMA_CODE:
        print('\nThe Password Schema is not correct, Please follow the password requirement!\n')

    elif STATUS_CODE == ErrorCode.WRONG_PHONE_SCHEMA_CODE:
        print('\nThe Phone Schema is not correct, Please enter correct phone!\n')

    elif STATUS_CODE == ErrorCode.WRONG_VERIFY_CODE:
        print('\nThe Verification Code is not correct or the code is expried, Please enter again or request again!\n')

    elif STATUS_CODE == ErrorCode.PHONENUM_NOT_CORRECT:
        print('\nThe Phone Number is Wrong!\n')

    elif STATUS_CODE == ErrorCode.DATABASE_CHANGE_PASSWORD_ERROR:
        print('\nThere is error in database change password, Please try again!\n')

    elif STATUS_CODE == ErrorCode.DATABASE_CHANGE_PHONE_ERROR:
        print('\nThere is error in database change phone, Please try again!\n')

    else:
        print('\n{}:There is an error!\n'.format(STATUS_CODE))
