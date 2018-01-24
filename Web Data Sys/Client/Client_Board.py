from Client_utli import LOG_IN, Error_Code_Handler
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
        '''HERE ASK FOR THE USERNAME AND PASSWORD
        THEN PASSED IN TO LOG IN FUNCTION,
        THEN FUNCTION RETURN THE STATUS AND USER'''
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
