import requests
import hashlib
import json

def LOG_IN(USERNAME, PASSWORD):
    '''
    THIS FUNCTION WILL SEND THE HTTP REQUEST TO THE SERVER AND WAIT FOR THE RESPONSE
    Here LOG_IN is parameters passed into the url and the HEADER will include the information
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
    return((RESPONSE.status_code,RESPONSE.json()))



def Error_Code_Handler(STATUS_CODE):
    if STATUS_CODE == 405:
        print('\nNo Such User, Please Sign up or Log in with another account!\n')
    elif STATUS_CODE == 406:
        print('\nUser already exist, Please Log in or Sign up with another user name!\n')
    elif STATUS_CODE == 407:
        print('\nThe Phone Number already exist, Please Sign up with another phone number!\n')
    else:
        print('\nThere is an error!\n')