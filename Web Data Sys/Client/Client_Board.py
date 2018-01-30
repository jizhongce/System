from Client_utli import LOG_IN, SIGN_UP, Error_Code_Handler, SEND_VERIFY_CODE
import getch

'''
First will Enter the system with welcome center:
1. Log in
2. Sign up (Phone verify)
3. Change the password (With Phone verify)
'''

'''
class style:
   BOLD = '\033[1m'
   END = '\033[0m'
   OTHER = '\033[1;32;40m'
'''
USER_ID = 0

print('\033[1m' + 'Welcome to HardWare Trading System Platform!\n' + '\033[0m')
print('\nVersion 0.0.1\n')
print('\n(This System is still under developing, please contact developer to use)\n')


while True:

    print('1. Log In \n2. Sign Up \n3. Change Password\n4. View DashBoard(Not Ready)\n')

    SELECTION = getch.getch()

    if SELECTION == '1':
        '''
        HERE ASK FOR THE USERNAME AND PASSWORD
        THEN PASSED IN TO LOG IN FUNCTION,
        THEN FUNCTION RETURN THE STATUS AND USER
        '''

        print('Log In is selected!')
        USER_NAME = input('\nUser Name: ')
        PASSWORD = input('\nPassword :')
        (RESPONSE_STATUS, RESPONSE_DATA) = LOG_IN(USER_NAME, PASSWORD)
        if RESPONSE_STATUS == 200:
            USER_ID = RESPONSE_DATA
            break
        else:
            # Here create a new function to handle the error code
            Error_Code_Handler(RESPONSE_STATUS)

    elif SELECTION == '2':
        '''
        HERE ASK FOR SIGN IN USERNAME, PASSWORD AND PHONE NUMBER,
        THEN PASSED INTO SIGN UP FUNCTION, AFTER SERVER CHECK THE USERNAME AND PHONE NUMBER,
        ASK FOR THE VERIF THE PHONE NUMBER.
        '''
        print('Sign Up is selected!')
        USER_NAME = input('\nUser Name : ')
        PASSWORD = input('\nPassword : ')
        PHONE_NUMBER = input('\nPhone Number : ')
        RESPONSE_STATUS = SIGN_UP(USER_NAME, PASSWORD, PHONE_NUMBER)
        if RESPONSE_STATUS == 200:
            VERIFY_CODE = input('\nPlease Input the 6-digits Verify Code:\n')
            (RESPONSE_STATUS, RESPONSE_DATA) = SEND_VERIFY_CODE(PHONE_NUMBER, VERIFY_CODE)

            if RESPONSE_STATUS == 200:
                USER_ID = RESPONSE_DATA
                break
            else:
                Error_Code_Handler(RESPONSE_STATUS)
        else:
            # Here create a new function to handle the error code
            Error_Code_Handler(RESPONSE_STATUS)

    else:
        print('Wrong number is selected, please select again!')


print(USER_ID)

print('sign in correctly!')

# payload = {'username': 'jizhongce', 'password': 'jizhongce123123'}
#
# r = requests.get('http://localhost:8080/log_in', params=payload)
#
# print(r.url)
#
#
# print(r.json())
