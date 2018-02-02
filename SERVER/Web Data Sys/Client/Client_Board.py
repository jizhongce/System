from Client_utli import LOG_IN, SIGN_UP, Error_Code_Handler, SEND_VERIFY_CODE, PASS_CHANGE_USER, CHANGE_PASS, PHONE_CHANGE_USER, CHANGE_PHONE, CHANGE_PHONE_UNVERIFIED
import getch
import getpass
import ErrorCode

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

    print('1. Log In \n2. Sign Up \n3. Change Password\n4. Change Phone Number\n5. View DashBoard(Not Ready)\n')

    SELECTION = getch.getch()

    if SELECTION == '1':
        '''
        HERE ASK FOR THE USERNAME AND PASSWORD
        THEN PASSED IN TO LOG IN FUNCTION,
        THEN FUNCTION RETURN THE STATUS AND USER
        '''

        print('Log In is selected!')
        USER_NAME = input('\nUser Name: ')
        PASSWORD = getpass.getpass('\nPassword : ')
        (RESPONSE_STATUS, RESPONSE_DATA) = LOG_IN(USER_NAME, PASSWORD)
        if RESPONSE_STATUS == ErrorCode.SUCCESS_CODE:
            USER_ID = RESPONSE_DATA
            break

        elif RESPONSE_STATUS == ErrorCode.PHONE_NOT_VERIFIED_CODE:
            PHONE_NUMBER = RESPONSE_DATA
            print('\nThe Phone has not been Verified\n')
            FAKEPHONE = PHONE_NUMBER[0:3] + '*****' + PHONE_NUMBER[len(PHONE_NUMBER)-3:len(PHONE_NUMBER)]
            VERIFY_CODE = input('\nPlease Input the 6-digits Verify Code send to {} :\n'.format(FAKEPHONE))
            (RESPONSE_STATUS, RESPONSE_DATA) = SEND_VERIFY_CODE(PHONE_NUMBER, VERIFY_CODE)
            if RESPONSE_STATUS == ErrorCode.SUCCESS_CODE:
                USER_ID = RESPONSE_DATA
                break
            else:
                Error_Code_Handler(RESPONSE_STATUS)

        else:
            # Here create a new function to handle the error code
            Error_Code_Handler(RESPONSE_STATUS)

    elif SELECTION == '2':
        '''
        HERE ASK FOR SIGN UP USERNAME, PASSWORD AND PHONE NUMBER,
        THEN PASSED INTO SIGN UP FUNCTION, AFTER SERVER CHECK THE USERNAME AND PHONE NUMBER,
        ASK FOR THE VERIF THE PHONE NUMBER.
        '''
        print('Sign Up is selected!')
        USER_NAME = input('\nUser Name : ')
        print('\nPassword should at least contain one Number, one Captial letter and 6 characters and no space\n')
        PASSWORD = getpass.getpass('\nPassword : ')
        PHONE_NUMBER = input('\nPhone Number : ')
        RESPONSE_STATUS = SIGN_UP(USER_NAME, PASSWORD, PHONE_NUMBER)
        if RESPONSE_STATUS == ErrorCode.SUCCESS_CODE:
            FAKEPHONE = PHONE_NUMBER[0:3] + '*****' + PHONE_NUMBER[len(PHONE_NUMBER)-3:len(PHONE_NUMBER)]
            VERIFY_CODE = input('\nPlease Input the 6-digits Verify Code send to {} :\n'.format(FAKEPHONE))
            (RESPONSE_STATUS, RESPONSE_DATA) = SEND_VERIFY_CODE(PHONE_NUMBER, VERIFY_CODE)

            if RESPONSE_STATUS == ErrorCode.SUCCESS_CODE:
                USER_ID = RESPONSE_DATA
                break
            else:
                Error_Code_Handler(RESPONSE_STATUS)
        else:
            # Here create a new function to handle the error code
            Error_Code_Handler(RESPONSE_STATUS)


    elif SELECTION == '3':
        '''
        HERE ASK FOR THE USER NAME WHICH NEED TO CHANGE THE PASSWORD FOR
        THEN ASK FOR THE VERIFY CODE THAT SEND TO ASSOCIATED PHONE
        THEN ASK FOR INPUTTING NEW PASSWORD
        '''
        print('Change Password is selected!')
        USER_NAME = input('\nPlease Input User Name : ')
        # Here call PASS_CHANGE_USER function which return STATUS CODE AND DATA
        (RESPONSE_STATUS, RESPONSE_DATA) = PASS_CHANGE_USER(USER_NAME)
        if RESPONSE_STATUS == ErrorCode.SUCCESS_CODE:
            PHONE_NUMBER = RESPONSE_DATA
            FAKEPHONE = PHONE_NUMBER[0:3] + '*****' + PHONE_NUMBER[len(PHONE_NUMBER)-3:len(PHONE_NUMBER)]
            VERIFY_CODE = input('\nPlease Input the 6-digits Verify Code send to {} :\n'.format(FAKEPHONE))
            (RESPONSE_STATUS, RESPONSE_DATA) = SEND_VERIFY_CODE(PHONE_NUMBER, VERIFY_CODE)
            if RESPONSE_STATUS == ErrorCode.SUCCESS_CODE:
                USERID = RESPONSE_DATA
                # Here we call change the password and then update
                print('\nPassword should at least contain one Number, one Captial letter and 6 characters and no space\n')
                NEW_PASSWORD = getpass.getpass('\nPlease enter new Password : ')
                (RESPONSE_STATUS) = CHANGE_PASS(USERID, NEW_PASSWORD)
                if RESPONSE_STATUS == ErrorCode.SUCCESS_CODE:
                    print('\nYour password has been changed!\nPlease use new password to sign in!\n')
                else:
                    Error_Code_Handler(RESPONSE_STATUS)
            else:
                Error_Code_Handler(RESPONSE_STATUS)

        else:
            Error_Code_Handler(RESPONSE_STATUS)


    elif SELECTION == '4':
        '''
        HERE ASK FOR THE USER NAME WHICH NEED TO CHANGE THE PHONENUM FOR
        THEN ASK FOR THE VERIFY CODE THAT SEND TO ASSOCIATED PHONE
        THEN ASK FOR INPUTTING NEW PASSWORD
        '''
        print('Change Phone Number is selected!')
        USER_NAME = input('\nPlease Input User Name : ')
        # Here call PASS_CHANGE_USER function which return STATUS CODE AND DATA
        (RESPONSE_STATUS, RESPONSE_DATA) = PHONE_CHANGE_USER(USER_NAME)

        if RESPONSE_STATUS == ErrorCode.SUCCESS_CODE:
            PHONE_NUMBER = RESPONSE_DATA
            FAKEPHONE = PHONE_NUMBER[0:3] + '*****' + PHONE_NUMBER[len(PHONE_NUMBER)-3:len(PHONE_NUMBER)]
            VERIFY_CODE = input('\nPlease Input the 6-digits Verify Code send to {} :\n'.format(FAKEPHONE))
            (RESPONSE_STATUS, RESPONSE_DATA) = SEND_VERIFY_CODE(PHONE_NUMBER, VERIFY_CODE)
            if RESPONSE_STATUS == ErrorCode.SUCCESS_CODE:
                USERID = RESPONSE_DATA
                # Here we call change the password and then update
                print('\nPlease Enter the Phone Number:\n')
                NEW_PHONE = input('\nNew Phone Number : ')
                (RESPONSE_STATUS, RESPONSE_DATA) = CHANGE_PHONE(USERID, NEW_PHONE)
                if RESPONSE_STATUS == ErrorCode.SUCCESS_CODE:
                    PHONE_NUMBER = RESPONSE_DATA
                    print(PHONE_NUMBER)
                    print('\nThe Phone has not been Verified\n')
                    FAKEPHONE = PHONE_NUMBER[0:3] + '*****' + PHONE_NUMBER[len(PHONE_NUMBER)-3:len(PHONE_NUMBER)]
                    VERIFY_CODE = input('\nPlease Input the 6-digits Verify Code send to {} :\n'.format(FAKEPHONE))
                    (RESPONSE_STATUS, RESPONSE_DATA) = SEND_VERIFY_CODE(PHONE_NUMBER, VERIFY_CODE)
                    if RESPONSE_STATUS == ErrorCode.SUCCESS_CODE:
                        print('\nYour phone number has been changed!\nPlease sign in again!\n')
                    else:
                        Error_Code_Handler(RESPONSE_STATUS)
                else:
                    Error_Code_Handler(RESPONSE_STATUS)
            else:
                Error_Code_Handler(RESPONSE_STATUS)

        elif RESPONSE_STATUS == ErrorCode.PHONE_NOT_VERIFIED_CODE:
            USERID = RESPONSE_DATA
            print('\nThe Phone is not verified!\n')
            PASSWORD = getpass.getpass('\nPlease enter password : ')
            NEW_PHONE = input('\nNew Phone Number : ')
            (RESPONSE_STATUS, RESPONSE_DATA) = CHANGE_PHONE_UNVERIFIED(USERID, NEW_PHONE, PASSWORD)
            if RESPONSE_STATUS == ErrorCode.SUCCESS_CODE:
                PHONE_NUMBER = RESPONSE_DATA
                print('\nThe Phone has not been Verified\n')
                FAKEPHONE = PHONE_NUMBER[0:3] + '*****' + PHONE_NUMBER[len(PHONE_NUMBER)-3:len(PHONE_NUMBER)]
                VERIFY_CODE = input('\nPlease Input the 6-digits Verify Code send to {} :\n'.format(FAKEPHONE))
                (RESPONSE_STATUS, RESPONSE_DATA) = SEND_VERIFY_CODE(PHONE_NUMBER, VERIFY_CODE)
                if RESPONSE_STATUS == ErrorCode.SUCCESS_CODE:
                    print('\nYour phone number has been changed!\nPlease sign in again!\n')
                else:
                    Error_Code_Handler(RESPONSE_STATUS)

            else:
                Error_Code_Handler(RESPONSE_STATUS)




        else:
            Error_Code_Handler(RESPONSE_STATUS)






    # elif SELECTION == '3':
    #     '''
    #     HERE ASK FOR THE USER NAME WHICH NEED TO CHANGE THE PASSWORD FOR
    #     THEN ASK FOR THE VERIFY CODE THAT SEND TO ASSOCIATED PHONE
    #     THEN ASK FOR INPUTTING NEW PASSWORD
    #     '''
    #     print('Change Password is selected!')
    #     USER_NAME = input('\nPlease Input User Name : ')
    #     # Here call PASS_CHANGE_USER function which return STATUS CODE AND DATA
    #     (RESPONSE_STATUS, RESPONSE_DATA) = PASS_CHANGE_USER(USER_NAME)
    #
    #     if RESPONSE_STATUS == 200:
    #         PHONE_NUMBER = RESPONSE_DATA
    #         FAKEPHONE = PHONE_NUMBER[0:3] + '*****' + PHONE_NUMBER[len(PHONE_NUMBER)-3:len(PHONE_NUMBER)]
    #         VERIFY_CODE = input('\nPlease Input the 6-digits Verify Code send to {} :\n'.format(FAKEPHONE))
    #         (RESPONSE_STATUS, RESPONSE_DATA) = SEND_VERIFY_CODE(PHONE_NUMBER, VERIFY_CODE)
    #
    #         if RESPONSE_STATUS == 200:
    #             USER_ID = RESPONSE_DATA
    #             print('\nPassword should at least contain one Number, one Captial letter and 6 characters and no space\n')
    #             NEW_PASSWORD = getpass.getpass('\nPlease enter new Password : ')
    #             (RESPONSE_STATUS) = CHANGE_PASS(USERID, NEW_PASSWORD)
    #             if RESPONSE_STATUS == 200:
    #                 print('\nYour password has been changed!\nPlease use new password to sign in!\n')
    #             else:
    #                 Error_Code_Handler(RESPONSE_STATUS)
    #
    #         else:
    #             Error_Code_Handler(RESPONSE_STATUS)
    #
    #
    #     elif RESPONSE_STATUS == 405:
    #         USERID = RESPONSE_DATA
    #         print('\nPassword should at least contain one Number, one Captial letter and 6 characters and no space\n')
    #         NEW_PASSWORD = getpass.getpass('\nPlease enter new Password : ')
    #         (RESPONSE_STATUS) = CHANGE_PASS(USERID, NEW_PASSWORD)
    #         if RESPONSE_STATUS == 200:
    #             print('\nYour password has been changed!\nPlease use new password to sign in!\n')
    #         else:
    #             Error_Code_Handler(RESPONSE_STATUS)
    #
    #
    #     else:
    #         Error_Code_Handler(RESPONSE_STATUS)
    #
    #
    #
    #
    #
    #     print('{} : {}'.format(RESPONSE_STATUS, RESPONSE_DATA))
    #


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
