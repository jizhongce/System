import urllib.parse
import mysql.connector


'''
200 - SUCCESS

405 - NO SUCH USER

406 - USER ALREADY EXIST

407 - THE PHONE NUMBER IS ALREADY SIGNED UP
'''

def UrlParse(url):
    
    '''
    This is the method to parse the url passed into the function
    and return an dictionary that indicates each parts
    '''

    # First get the path
    path = urllib.parse.urlparse(url).path
    # Then get the query
    query = urllib.parse.urlparse(url).query

    return({'path' : path, 'query' : urllib.parse.parse_qs(query)})


def Log_In(username, password):
    '''
    This is the method to connect the database and check the username and password,
    if it is existed, then we get the user id and return back
    else we send back bad error code
    '''
    
    STATUS = 200
    
    USERID = 0
    
    CONNECTIONS = mysql.connector.connect(user='root', 
    password='jizhongce123', 
    host='127.0.0.1', 
    database='Web_Data')
    
    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT User_ID FROM Users WHERE User_Name = \'{}\' ').format(username)

    CURSOR.execute(QUERYSQL)
    
    QUERYLIST = CURSOR.fetchall()
    
    if not QUERYLIST:
        STATUS = 405
    
    else:
        (USERID,) = QUERYLIST[0]
        
    CURSOR.close()
    
    CONNECTIONS.commit()
    
    CONNECTIONS.close()
    
    return(STATUS, USERID)
    

def Sign_Up(username, password, phonenum):
    '''
    This is method for sign up, it first need to check the data base with username and phone number
    If the username is already exists, return the status code 406
    '''
    STATUS = 200
    
    USERID = 0
    
    salt = '1'

    CONNECTIONS = mysql.connector.connect(user='root', 
    password='jizhongce123', 
    host='127.0.0.1', 
    database='Web_Data')
    
    CURSOR = CONNECTIONS.cursor(buffered=True)
    
    #First, we should check whether the User_Name and PhoneNum is already exist in the database
    
    QUERYSQL = ('SELECT User_Name,PhoneNum FROM Users WHERE User_Name = \'{}\' OR PhoneNum = \'{}\' ').format(username, phonenum)
    
    CURSOR.execute(QUERYSQL)
    
    QUERYLIST = CURSOR.fetchall()
    
    CURSOR.close()
    
    CONNECTIONS.commit()
    
    if QUERYLIST:
        (User_Name, PhoneNum, ) = QUERYLIST[0]
        if User_Name == username:
            STATUS = 406
        
        elif User_Name != username and PhoneNum == phonenum:
            STATUS = 407
    
    else:
        
        CURSOR = CONNECTIONS.cursor(buffered=True)
        
        QUERYSQL = ('INSERT INTO Users(User_Name, Password, Password_Salt, PhoneNum) VALUES (\'{}\', \'{}\', \'{}\', \'{}\');').format(username, password, salt, phonenum)
        
        CURSOR.execute(QUERYSQL)
        
        USERID = CURSOR.lastrowid
        
    CURSOR.close()
    
    CONNECTIONS.commit()
    
    CONNECTIONS.close()
    
    return(STATUS, USERID)