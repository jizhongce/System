import requests
import hashlib
import json

# HASH FUNCTION
def HASH_PASS(DATA):
    return(hashlib.sha1(DATA.encode()).hexdigest())


def LOG_IN(USERNAME, PASSWORD):
    '''
    THIS FUNCTION WILL SEND THE HTTP REQUEST TO THE SERVER AND WAIT FOR THE RESPONSE
    Here LOG_IN is parameters passed into the url and the HEADER will include the information
    HERE USE SHA1 TO HASH THE PASSWORD
    '''
    LOG_IN = {'User_Name' : USERNAME, 'Password' : HASH_PASS(PASSWORD)}
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
    SIGN_UP = {'User_Name' : USERNAME, 'Password' : HASH_PASS(PASSWORD), 'Phone_Number' : PHONENUM}
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




def Error_Code_Handler(STATUS_CODE):

    '''
    200 - SUCCESS


    SIGN IN ERROR
    -------------
    403 - NO SUCH USER

    404 - PASSWORD IS NOT CORRECT

    405 - PHONE IS NOT VERIFIED

    -------------

    SIGN UP ERROR
    -------------
    406 - USER ALREADY EXIST

    407 - THE PHONE NUMBER IS ALREADY SIGNED UP
    -------------

    VERIFY ERROR
    -------------
    409 - THE CODE IS NOT SAME OR THE CODE IS EXPIRED

    500 - THE PHONE NUMBER IS NOT CORRECT
    -------------
    '''

    if STATUS_CODE == 403:
        print('\nNo Such User, Please Sign up or Log in with another account!\n')

    elif STATUS_CODE == 404:
        print('\nThe Password is not correct, Please Log in with correct Password!\n')

    elif STATUS_CODE == 406:
        print('\nUser already exist, Please Log in or Sign up with another user name!\n')

    elif STATUS_CODE == 407:
        print('\nThe Phone Number already exist, Please Sign up with another phone number!\n')

    elif STATUS_CODE == 409:
        print('\nThe Verification Code is not correct or the code is expried, Please enter again or request again!\n')

    elif STATUS_CODE == 500:
        print('\nThe Phone Number is Wrong!\n')

    else:
        print('\n{}:There is an error!\n'.format(STATUS_CODE))
