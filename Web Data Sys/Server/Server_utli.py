import urllib.parse
import mysql.connector
import uuid
from SMS_utli import SendSMS
from random import randint
import passlib.hash


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


# This is urlParse function
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

# End of UrlParse


# Start of create uuid

def CreateUserID():
    '''
    This is function to create unique id
    '''

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    while True:
        UserID = uuid.uuid4()

        QUERYSQL = ('SELECT User_ID FROM Users WHERE User_Name = \'{}\' ').format(UserID)

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if not QUERYLIST:
            break

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(UserID)


# End of create uuid


# Start of Log In

def Log_In(username, password):
    '''
    This is the method to connect the database and check the username and password,
    if it is existed, then we get the user id and return back
    else we send back bad error code

    403 - NO SUCH USER

    404 - PASSWORD IS NOT CORRECT

    405 - PHONE IS NOT VERIFIED
    '''

    STATUS = 200

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT User_ID, Password, PhoneNum, Verified FROM Users WHERE User_Name = \'{}\' ').format(username)

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if not QUERYLIST:
        STATUS = 403

    else:
        (USERID, PASSWORD, PHONENUM, VERIFIED, ) = QUERYLIST[0]

        if passlib.hash.sha256_crypt.verify(password, PASSWORD):
            if VERIFIED:
                DATA = USERID
            else:
                STATUS = 405
                DATA = PHONENUM

        else:
            STATUS = 404

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()
    
    return(STATUS, DATA)

# End of Log In


# Start of Sign Up

def Sign_Up(username, password, phonenum):
    '''
    This is method for sign up, it first need to check the data base with username and phone number
    If the username is already exists, return the status code 406
    '''
    STATUS = 200

    USERID = 0

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

        USERID = CreateUserID()

        PASSWORD = passlib.hash.sha256_crypt.hash(password)

        QUERYSQL = ('INSERT INTO Users(User_ID, User_Name, Password, PhoneNum, Verified) VALUES (\'{}\', \'{}\', \'{}\', \'{}\', FALSE);').format(USERID, username, PASSWORD, phonenum)

        CURSOR.execute(QUERYSQL)

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, USERID)

# End of Sign Up

# This fucntion RandCode

def RandCode():
    return(randint(100000, 999999))

# End of RandCode


# This the start of create SMS function

def ServerSMS(PhoneNum):
    VERIFY_CODE = 0
    # Then first we need to put the VERIFY_CODE into the database
    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    #First, we need to check whether the TEMPCODE is already exist in the database

    QUERYSQL = ('SELECT TEMPCODE FROM Users WHERE PhoneNum = \'{}\' ').format(PhoneNum)

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    CURSOR.close()

    CONNECTIONS.commit()

    (TEMPCODE, ) = QUERYLIST[0]

    if TEMPCODE != None:
        VERIFY_CODE = TEMPCODE

    # First create a VERIFY_CODE
    VERIFY_CODE = RandCode()

    CURSOR = CONNECTIONS.cursor(buffered=True)

    UPDATEQUERY = ('UPDATE Users SET TEMPCODE = {} WHERE PhoneNum = \'{}\';'.format(VERIFY_CODE, PhoneNum))

    CURSOR.execute(UPDATEQUERY)

    CURSOR.close()

    CONNECTIONS.commit()

    STATUS = SendSMS(PhoneNum, VERIFY_CODE)

    if STATUS == 200:
        CURSOR = CONNECTIONS.cursor(buffered=True)

        DELQUERY = ('CREATE EVENT {} ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 MINUTE DO UPDATE Users SET TEMPCODE = NULL WHERE PhoneNum = \'{}\'; '.format((str(RandCode())+'_delete_code'), PhoneNum))

        CURSOR.execute(DELQUERY)

        CURSOR.close()

        CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS)


# End of create SMS function


# Start of Verify_Code

def Verify_Code(PhoneNum, CODE):
    '''
    This is the function for verify the code, if it is same, return the status code 200 and id
    if it is not same, then status code

    409 - THE CODE IS NOT SAME OR CODE IS EXPIRED
    '''
    STATUS = 200

    USERID = 0

    print(PhoneNum)

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT TEMPCODE, User_ID FROM Users WHERE PhoneNum = \'{}\' ').format(PhoneNum)

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    CURSOR.close()

    CONNECTIONS.commit()

    if not QUERYLIST:
        STATUS = 500

    else:

        (TEMPCODE, User_ID, ) = QUERYLIST[0]

        if TEMPCODE == int(CODE):
            STATUS = 200
            USERID = User_ID
            CURSOR = CONNECTIONS.cursor(buffered=True)

            QUERYSQL = ('UPDATE Users SET Verified = TRUE, TEMPCODE = NULL WHERE User_ID = \'{}\'; ').format(User_ID)

            CURSOR.execute(QUERYSQL)

        else:
            STATUS = 409


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, USERID)


# End of Verify_Codes
