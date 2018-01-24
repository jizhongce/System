import requests
import hashlib

def LOG_IN(USERNAME, PASSWORD):
    '''
    Here LOG_IN is parameters passed into the url and the HEADER will include the information
    '''
    LOG_IN = {'User_Name' : USERNAME, 'Password' : PASSWORD}
    HEARDER = {'Content-Type' : 'application/json;charset=UTF-8'}
    RESPONSE = requests.get('http://localhost:8080/log_in', headers=HEARDER ,params = LOG_IN)
    return((RESPONSE.status_code,RESPONSE.json()))

# payload = {'username': 'jizhongce', 'password': 'jizhongce123123'}
# 
# r = requests.get('http://localhost:8080/log_in', params=payload)
# 
# print(r.url)
# 
# 
# print(r.json())


def Error_Code_Handler(STATUS_CODE):
    if STATUS_CODE == 405:
        print('\nNo Such User, Please Sign up or Log in with another account!\n')
    else:
        print('\nThere is an error!\n')