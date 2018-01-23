from Client_utli import LOG_IN

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


print('\033[1m' + 'Welcome to HardWare Trading System Platform!\n' + '\033[0m')
print('\nVersion 0.0.1\n')
print('\n(This System is still under developing, please contact developer to use)\n')

SELECTION = input('1. Log In \n2. Sign Up \n3. Change Password\n4. View DashBoard(Not Ready)\n')

while True:
    if SELECTION == '1':
        '''HERE ASK FOR THE USERNAME AND PASSWORD
        THEN PASSED IN TO LOG IN FUNCTION,
        THEN FUNCTION RETURN THE STATUS AND USER'''
        USER_NAME = input('\nUser Name: ')
        PASSWORD = input('\nPassword :')
        LOG_IN(USER_NAME, PASSWORD)
        


# payload = {'username': 'jizhongce', 'password': 'jizhongce123123'}
# 
# r = requests.get('http://localhost:8080/log_in', params=payload)
# 
# print(r.url)
# 
# 
# print(r.json())
