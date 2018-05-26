import urllib.parse
import mysql.connector
import uuid
from SMS_utli import SendSMS
from random import randint
import passlib.hash
import re
import ErrorCode


# # This is urlParse function
# def UrlParse(url):
#
#     '''
#     This is the method to parse the url passed into the function
#     and return an dictionary that indicates each parts
#     '''
#
#     # First get the path
#     path = urllib.parse.urlparse(url).path
#     # Then get the query
#     query = urllib.parse.urlparse(url).query
#
#     return({'path' : path, 'query' : urllib.parse.parse_qs(query)})
#
# # End of UrlParse


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

    return(str(UserID))


# End of create uuid



# Start of Log In

def Log_In(username, password):
    '''
    This is the method to connect the database and check the username and password,
    if it is existed, then we get the user id and return back
    else we send back bad error code

    Condition:
    1. username not exist
        -CODE: NO_SUCH_USER_CODE
        -DATA: 0

    2. password not correct
        -CODE: WORNG_PASSWORD_CODE
        -DATA: 0

    3. Phone not verified
        -CODE: PHONE_NOT_VERIFIED_CODE
        -DATA: PHONENUM

    4. Phone verified, log in success
        -CODE: SUCCESS_CODE
        -DATA: USERID


    '''

    STATUS = ErrorCode.SUCCESS_CODE

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
        STATUS = ErrorCode.NO_SUCH_USER_CODE

    else:
        (USERID, PASSWORD, PHONENUM, VERIFIED, ) = QUERYLIST[0]

        if passlib.hash.sha256_crypt.verify(password, PASSWORD):
            if VERIFIED:
                DATA = USERID
            else:
                STATUS = ErrorCode.PHONE_NOT_VERIFIED_CODE
                DATA = PHONENUM

        else:
            STATUS = ErrorCode.WORNG_PASSWORD_CODE

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)

# End of Log In



# Password Schame check function

def Pass_Schame_Check(Password):
    return(bool(re.search(r'[A-Z]',Password)) and bool(re.search(r'[0-9]',Password)) and len(Password) >= 6 and not bool(re.search(r'\s',Password)))

# End of Pass_Schame_Check

# Phone number check function

def Phone_Schame_Check(Phonenum):
    return(len(Phonenum) == 11 and bool(Phonenum.isdigit))

# End of Phone_Schame_Check

# Start of create shopping cart id

def CreateShoppingCartID():
    '''
    This is function to create unique shopping cart id
    '''

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    while True:
        ShoppingCartID = uuid.uuid4()

        QUERYSQL = ('SELECT * FROM Shopping_Cart_User WHERE Shopping_Cart_ID = \'{}\' ').format(ShoppingCartID)

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if not QUERYLIST:
            break

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(str(ShoppingCartID))


# End of create shopping cart id


# # Start of create address id
#
# def CreateAddressID():
#     '''
#     This is function to create unique address id
#     '''
#
#     CONNECTIONS = mysql.connector.connect(user='root',
#     password='jizhongce123',
#     host='127.0.0.1',
#     database='Web_Data')
#
#     CURSOR = CONNECTIONS.cursor(buffered=True)
#
#     while True:
#         AddressID = uuid.uuid4()
#
#         QUERYSQL = ('SELECT * FROM Address WHERE Address_ID = \'{}\' ').format(AddressID)
#
#         CURSOR.execute(QUERYSQL)
#
#         QUERYLIST = CURSOR.fetchall()
#
#         if not QUERYLIST:
#             break
#
#     CURSOR.close()
#
#     CONNECTIONS.commit()
#
#     CONNECTIONS.close()
#
#     return(str(AddressID))
#
#
# # End of create address id

# Start of Sign Up

def Sign_Up(username, password, phonenum, firstname, lastname):
    '''
    This is method for sign up, it first need to check the data base with username and phone number
    If the username is already exists, return the status code 406

    Condition:
    1. username is already exist
        -CODE: USER_EXIST_CODE
        -DATA: 0

    2. phone is already exist
        -CODE: PHONE_EXIST_CODE
        -DATA: 0

    3. password schema is not correct
        -CODE: WRONG_PASSWORD_SCHEMA_CODE
        -DATA: 0

    4. password schema is not correct
        -CODE: WRONG_PHONE_SCHEMA_CODE
        -DATA: 0

    5. sign up success
        -CODE: SUCCESS_CODE
        -DATA: USERID

    '''
    STATUS = ErrorCode.SUCCESS_CODE

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
            STATUS = ErrorCode.USER_EXIST_CODE

        elif User_Name != username and PhoneNum == phonenum:
            STATUS = ErrorCode.PHONE_EXIST_CODE

    else:

        if not Pass_Schame_Check(password):
            STATUS = ErrorCode.WRONG_PASSWORD_SCHEMA_CODE

        elif not Phone_Schame_Check(phonenum):
            STATUS = ErrorCode.WRONG_PHONE_SCHEMA_CODE

        else:
            CURSOR = CONNECTIONS.cursor(buffered=True)

            USERID = CreateUserID()

            SHOPPINGCARTID = CreateShoppingCartID()

            PASSWORD = passlib.hash.sha256_crypt.hash(password)

            QUERYSQL_USER = ('INSERT INTO Users(User_ID, User_Name, Password, PhoneNum, Verified) VALUES (\'{}\', \'{}\', \'{}\', \'{}\', FALSE);').format(USERID, username, PASSWORD, phonenum)

            QUERYSQL_SHOPPINGCART = ('INSERT INTO Shopping_Cart_User(User_ID, Shopping_Cart_ID) VALUES (\'{}\', \'{}\');').format(USERID, SHOPPINGCARTID)

            QUERYSQL_PROFILE = ('INSERT INTO Profiles(User_ID, First_Name, Last_Name, Level) VALUES (\'{}\', \'{}\', \'{}\', 1);').format(USERID, firstname, lastname)

            CURSOR.execute(QUERYSQL_USER)

            CURSOR.execute(QUERYSQL_SHOPPINGCART)

            CURSOR.execute(QUERYSQL_PROFILE)


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

    if STATUS == ErrorCode.SUCCESS_CODE:
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
    This is the function for verify the code, if it is same, return the status code SUCCESS_CODE and id
    if it is not same, then status code

    '''
    STATUS = ErrorCode.SUCCESS_CODE

    USERID = 0

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
        STATUS = ErrorCode.PHONENUM_NOT_CORRECT

    else:

        (TEMPCODE, User_ID, ) = QUERYLIST[0]

        if TEMPCODE == int(CODE):
            STATUS = ErrorCode.SUCCESS_CODE
            USERID = User_ID
            CURSOR = CONNECTIONS.cursor(buffered=True)

            QUERYSQL = ('UPDATE Users SET Verified = TRUE, TEMPCODE = NULL WHERE User_ID = \'{}\'; ').format(User_ID)

            CURSOR.execute(QUERYSQL)

        else:
            STATUS = ErrorCode.WRONG_VERIFY_CODE


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, USERID)


# End of Verify_Codes

# Start of Pass_Change_Get_User

def Pass_Change_Get_User(username):
    '''
    This is the function to get the user information for changing passowrd
    First it will check whether the username is exist or not
    If it is existed, then check the phone is verified or not

    Condition:
    1. username is already exist
        -CODE: NO_SUCH_USER_CODE
        -DATA: 0

    2. get phone number success
        -CODE: SUCCESS_CODE
        -DATA: PHONENUM

    '''

    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT User_ID, PhoneNum, Verified FROM Users WHERE User_Name = \'{}\' ').format(username)

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if not QUERYLIST:
        STATUS = ErrorCode.NO_SUCH_USER_CODE

    else:
        (USERID, PHONENUM, VERIFIED, ) = QUERYLIST[0]
        DATA = PHONENUM

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)



# End of Pass_Change_Get_User

# Start of Change_Pass

def Change_Pass(userid, newpassword):
    '''
    This is function to change the password, we should check the password schema

    Condition:
    1. password schema is not correct
    -CODE: WRONG_PASSWORD_SCHEMA_CODE
    -DATA: none

    2. change password success
    -CODE: SUCCESS_CODE
    -DATA: none

    3. database change error
    -CODE: DATABASE_CHANGE_PASSWORD_ERROR
    -DATA: none


    '''
    STATUS = ErrorCode.SUCCESS_CODE

    if not Pass_Schame_Check(newpassword):
        STATUS = ErrorCode.WRONG_PASSWORD_SCHEMA_CODE
    else:
        CONNECTIONS = mysql.connector.connect(user='root',
        password='jizhongce123',
        host='127.0.0.1',
        database='Web_Data')

        CURSOR = CONNECTIONS.cursor(buffered=True)

        PASSWORD = passlib.hash.sha256_crypt.hash(newpassword)

        UPDATEQUERY = ('UPDATE Users SET Password = \'{}\' WHERE User_ID = \'{}\';'.format(PASSWORD, userid))

        CURSOR.execute(UPDATEQUERY)

        CURSOR.close()

        CONNECTIONS.commit()

        CURSOR = CONNECTIONS.cursor(buffered=True)

        QUERYSQL = ('SELECT Password FROM Users WHERE User_ID = \'{}\' ').format(userid)

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if not QUERYLIST:
            STATUS = ErrorCode.DATABASE_CHANGE_PASSWORD_ERROR

        else:
            (PASSWORD, ) = QUERYLIST[0]

            if passlib.hash.sha256_crypt.verify(newpassword, PASSWORD):
                STATUS = ErrorCode.SUCCESS_CODE

            else:
                STATUS = ErrorCode.DATABASE_CHANGE_PASSWORD_ERROR


    return(STATUS)



# End of Change_Pass


# Start of Phone_Change_User
def Phone_Change_Log_In(username, password):
    '''
    This is the function to get the user information for changing phone number
    First it will check whether the username is exist or not
    If it is existed, then check the phone is verified or not

    Condition:
    1. username not exist
    -CODE: NO_SUCH_USER_CODE
    -DATA: 0

    2. password not correct
    -CODE: WORNG_PASSWORD_CODE
    -DATA: 0

    3. Phone not verified
    -CODE: PHONE_NOT_VERIFIED_CODE
    -DATA: USERID

    4. Phone verified, log in success
    -CODE: SUCCESS_CODE
    -DATA: PHONENUM

    '''
    STATUS = ErrorCode.SUCCESS_CODE

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
        STATUS = ErrorCode.NO_SUCH_USER_CODE

    else:
        (USERID, PASSWORD, PHONENUM, VERIFIED, ) = QUERYLIST[0]

        if passlib.hash.sha256_crypt.verify(password, PASSWORD):
            pass
            if VERIFIED:
                DATA = PHONENUM
            else:
                STATUS = ErrorCode.PHONE_NOT_VERIFIED_CODE
                DATA = USERID
        else:
            STATUS = ErrorCode.WORNG_PASSWORD_CODE


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of Phone_Change_User

# Start of Change_Phone

def Change_Phone(userid, newphone):
    '''
    This is function to change the phone, we should check the phone schema
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    if not Phone_Schame_Check(newphone):
        STATUS = ErrorCode.WRONG_PHONE_SCHEMA_CODE

    else:
        CONNECTIONS = mysql.connector.connect(user='root',
        password='jizhongce123',
        host='127.0.0.1',
        database='Web_Data')

        CURSOR = CONNECTIONS.cursor(buffered=True)

        QUERYSQL = ('SELECT User_ID, PhoneNum FROM Users WHERE User_ID = \'{}\' ').format(userid)

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if not QUERYLIST:
            STATUS = ErrorCode.DATABASE_CHANGE_PHONE_ERROR

        else:
            (USERID, PHONENUM, ) = QUERYLIST[0]
            if PHONENUM == newphone:
                STATUS = ErrorCode.SAME_PHONE_ERROR
            else:
                QUERYSQL = ('SELECT User_ID FROM Users WHERE PhoneNum = \'{}\' ').format(newphone)

                CURSOR.execute(QUERYSQL)

                QUERYLIST = CURSOR.fetchall()

                if QUERYLIST:

                    (USERID, ) = QUERYLIST[0]

                    if USERID != userid:

                        STATUS = ErrorCode.PHONE_EXIST_CODE

                    else:
                        STATUS = ErrorCode.SAME_PHONE_ERROR

                else:
                    UPDATEQUERY = ('UPDATE Users SET PhoneNum = \'{}\', Verified = FALSE WHERE User_ID = \'{}\';'.format(newphone, userid))

                    CURSOR.execute(UPDATEQUERY)

                    CURSOR.close()

                    CONNECTIONS.commit()

                    DATA = newphone

    CONNECTIONS.close()

    return(STATUS, DATA)



# # Start of Change_Phone_Unverified
#
# def Change_Phone_Unverified(userid, newphone, password):
#     '''
#     This is function to change the phone, we should check the phone schema
#     '''
#     STATUS = ErrorCode.SUCCESS_CODE
#
#     DATA = 0
#
#     if not Phone_Schame_Check(newphone):
#         STATUS = ErrorCode.WRONG_PHONE_SCHEMA_CODE
#
#     else:
#         CONNECTIONS = mysql.connector.connect(user='root',
#         password='jizhongce123',
#         host='127.0.0.1',
#         database='Web_Data')
#
#         CURSOR = CONNECTIONS.cursor(buffered=True)
#
#         QUERYSQL = ('SELECT User_ID, Password, PhoneNum FROM Users WHERE User_ID = \'{}\' ').format(userid)
#
#         CURSOR.execute(QUERYSQL)
#
#         QUERYLIST = CURSOR.fetchall()
#
#         if not QUERYLIST:
#             STATUS = ErrorCode.DATABASE_CHANGE_PHONE_ERROR
#
#         else:
#             (USERID, PASSWORD, PHONENUM, ) = QUERYLIST[0]
#
#             if passlib.hash.sha256_crypt.verify(password, PASSWORD):
#                 if PHONENUM == newphone:
#                     STATUS = ErrorCode.SAME_PHONE_ERROR
#                 else:
#                     QUERYSQL = ('SELECT User_ID FROM Users WHERE PhoneNum = \'{}\' ').format(newphone)
#
#                     CURSOR.execute(QUERYSQL)
#
#                     QUERYLIST = CURSOR.fetchall()
#
#                     if QUERYLIST:
#
#                         (USERID, ) = QUERYLIST[0]
#
#                         if USERID != userid:
#
#                             STATUS = ErrorCode.PHONE_EXIST_CODE
#
#                         else:
#                             STATUS = ErrorCode.SAME_PHONE_ERROR
#
#                     else:
#                         UPDATEQUERY = ('UPDATE Users SET PhoneNum = \'{}\', Verified = FALSE WHERE User_ID = \'{}\';'.format(newphone, userid))
#
#                         CURSOR.execute(UPDATEQUERY)
#
#                         CURSOR.close()
#
#                         CONNECTIONS.commit()
#
#                         DATA = newphone
#
#
#             else:
#                 STATUS = ErrorCode.WORNG_PASSWORD_CODE
#
#     return(STATUS, DATA)
#
#
#
#
#
# # End of Change_Phone_Unverified


    #
    #     PASSWORD = passlib.hash.sha256_crypt.hash(newpassword)
    #
    #     UPDATEQUERY = ('UPDATE Users SET Password = \'{}\' WHERE User_ID = \'{}\';'.format(PASSWORD, userid))
    #
    #     CURSOR.execute(UPDATEQUERY)
    #
    #     CURSOR.close()
    #
    #     CONNECTIONS.commit()
    #
    #     CURSOR = CONNECTIONS.cursor(buffered=True)
    #
    #     QUERYSQL = ('SELECT Password FROM Users WHERE User_ID = \'{}\' ').format(userid)
    #
    #     CURSOR.execute(QUERYSQL)
    #
    #     QUERYLIST = CURSOR.fetchall()
    #
    #     if not QUERYLIST:
    #         STATUS = ErrorCode.DATABASE_CHANGE_PASSWORD_ERROR
    #
    #     else:
    #         (PASSWORD, ) = QUERYLIST[0]
    #
    #         if passlib.hash.sha256_crypt.verify(newpassword, PASSWORD):
    #             STATUS = ErrorCode.SUCCESS_CODE
    #
    #         else:
    #             STATUS = ErrorCode.DATABASE_CHANGE_PASSWORD_ERROR
    #
    #
    # return(STATUS)





# End of Change_Phone

#
# # Start of Pass_Change_User
#
# def Pass_Change_Phone(username):
#     '''
#     This is the function to get the user information for changing passowrd
#     First it will check whether the username is exist or not
#     If it is existed, then check the phone is verified or not
#     CODE:
#
#     SUCCESS : USER EXIST, PHONE VERIFIED = 200
#
#     NO_SUCH_USER_CODE = 403
#
#     PHONE_NOT_VERIFIED_CODE = 405
#
#     '''
#     STATUS = SUCCESS_CODE
#
#     DATA = 0
#
#     CONNECTIONS = mysql.connector.connect(user='root',
#     password='jizhongce123',
#     host='127.0.0.1',
#     database='Web_Data')
#
#     CURSOR = CONNECTIONS.cursor(buffered=True)
#
#     QUERYSQL = ('SELECT User_ID, PhoneNum, Verified FROM Users WHERE User_Name = \'{}\' ').format(username)
#
#     CURSOR.execute(QUERYSQL)
#
#     QUERYLIST = CURSOR.fetchall()
#
#     if not QUERYLIST:
#         STATUS = NO_SUCH_USER_CODE
#
#     else:
#         (USERID, PHONENUM, VERIFIED, ) = QUERYLIST[0]
#         if VERIFIED:
#             DATA = PHONENUM
#         else:
#             STATUS = PHONE_NOT_VERIFIED_CODE
#             DATA = USERID
#
#     CURSOR.close()
#
#     CONNECTIONS.commit()
#
#     CONNECTIONS.close()
#
#     return(STATUS, DATA)
#
#
#
#
# # End of Pass_Change_User
#
#
#
# # Start of Change_Pass
#
# def Change_Pass(userid, newpassword):
#     '''
#     This is function to change the password, we should check the password schema
#     CODE:
#
#     WRONG_PASSWORD_SCHEMA_CODE = 408
#
#     SUCCESS = 200
#
#     DATABASE_CHANGE_PASSWORD_ERROR = 499
#
#     '''
#     STATUS = SUCCESS_CODE
#
#     if not Pass_Schame_Check(newpassword):
#         STATUS = WRONG_PASSWORD_SCHEMA_CODE
#     else:
#         CONNECTIONS = mysql.connector.connect(user='root',
#         password='jizhongce123',
#         host='127.0.0.1',
#         database='Web_Data')
#
#         CURSOR = CONNECTIONS.cursor(buffered=True)
#
#         PASSWORD = passlib.hash.sha256_crypt.hash(newpassword)
#
#         UPDATEQUERY = ('UPDATE Users SET Password = {} WHERE User_ID = \'{}\';'.format(PASSWORD, userid))
#
#         CURSOR.execute(UPDATEQUERY)
#
#         CURSOR.close()
#
#         CONNECTIONS.commit()
#
#         CURSOR = CONNECTIONS.cursor(buffered=True)
#
#         QUERYSQL = ('SELECT Password FROM Users WHERE User_ID = \'{}\' ').format(userid)
#
#         CURSOR.execute(QUERYSQL)
#
#         QUERYLIST = CURSOR.fetchall()
#
#         if not QUERYLIST:
#             STATUS = DATABASE_CHANGE_PASSWORD_ERROR
#
#         else:
#             (PASSWORD, ) = QUERYLIST[0]
#
#             if passlib.hash.sha256_crypt.verify(newpassword, PASSWORD):
#                 STATUS = SUCCESS_CODE
#
#             else:
#                 STATUS = DATABASE_CHANGE_PASSWORD_ERROR
#
#
#     return(STATUS)
#
#
#
# # End of Change_Pass



# Start the Get_All_Products function

def Get_All_Products():
    '''
    This is function to get all products from the database
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT * FROM Products')

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    Product_List = []

    if QUERYLIST:
        for product in QUERYLIST:
            (ProductID, ProductStatus, ProductSpec, ProductPrice) = product
            Product_List.append({"ProductID": ProductID, "ProductStatus": ProductStatus, "ProductSpec": ProductSpec, "ProductPrice": ProductPrice})

    return(STATUS, Product_List)



#End of the Get_All_Products function


# Start the Get_Shopping_Cart function

def Get_Shopping_Cart(userid):
    '''
    This is function to get all the items in the shopping cart
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT Products.Products_ID, Products.Products_Status, Products.Products_Spec, Products.Products_Price, Shopping_Cart.Products_Units FROM Products, Shopping_Cart, Shopping_Cart_User WHERE Shopping_Cart_User.User_ID = \'{}\' AND Shopping_Cart_User.Shopping_Cart_ID = Shopping_Cart.Shopping_Cart_ID AND Shopping_Cart.Products_ID = Products.Products_ID;'.format(userid))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    Product_List = []

    if QUERYLIST:
        for product in QUERYLIST:
            (ProductID, ProductStatus, ProductSpec, ProductPrice, ProductUnits) = product
            Product_List.append({"ProductID": ProductID, "ProductStatus": ProductStatus, "ProductSpec": ProductSpec, "ProductPrice": ProductPrice, "ProductUnits": ProductUnits})


    return(STATUS, Product_List)



# End of the Get_Shopping_Cart function

# Start of the helper function Check_Porduct_Units_Schema

def Check_Product_Units_Schema(Product_Units):
    '''
    Here we will change the product units into int, and if it can not be changed than the schema is wrong return -1
    else return the converted value
    '''
    try:
        return(int(Product_Units))
    except ValueError as e:
        return(-1)
        raise


# End of the helper function Check_Porduct_Units_Schema


# Start of the Add_To_Shopping_Cart function

def Add_To_Shopping_Cart(USER_ID, PRODUCT):
    '''
    This is function to add the product into the shopooing cart
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    if Check_Product_Units_Schema(PRODUCT['ProductUnits']) == -1:
        STATUS = ErrorCode.PRODUCT_SCHEMA_ERROR

        CURSOR.close()

        CONNECTIONS.commit()

        CONNECTIONS.close()

        return(STATUS, DATA)

    print(PRODUCT)

    Temp_Product_Units = Check_Product_Units_Schema(PRODUCT['ProductUnits'])

    Temp_Prodcut_ID = PRODUCT['ProductID']

    QUERYSQL = ('SELECT User_ID, Shopping_Cart_ID FROM Shopping_Cart_User WHERE User_ID = \'{}\' ;'.format(USER_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        (User_ID, Shopping_Cart_ID,) = QUERYLIST[0]

        QUERYSQL = ('SELECT * FROM Shopping_Cart WHERE Shopping_Cart_ID = \'{}\' ;'.format(Shopping_Cart_ID))

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if QUERYLIST:

            Prodcut_Exist_Flag = False
            for Product in QUERYLIST:
                print(Product)
                (Shopping_Cart_ID, Products_ID, Products_Units) = Product
                if Products_ID == Temp_Prodcut_ID:

                    new_Product_Units = Temp_Product_Units + Products_Units
                    # Here we need to update the value in the shopping cart with new units
                    QUERYSQL = ('UPDATE Shopping_Cart SET Products_Units = \'{}\' WHERE Shopping_Cart_ID = \'{}\' AND Products_ID = \'{}\';'.format(new_Product_Units, Shopping_Cart_ID, Products_ID))

                    CURSOR.execute(QUERYSQL)

                    Prodcut_Exist_Flag = True

                    break


            if Prodcut_Exist_Flag == False:
                QUERYSQL = ("INSERT INTO Shopping_Cart(Shopping_Cart_ID, Products_ID, Products_Units) VALUE (\'{}\', \'{}\', \'{}\');".format(Shopping_Cart_ID, Temp_Prodcut_ID, Temp_Product_Units))

                CURSOR.execute(QUERYSQL)

        else:
            QUERYSQL = ("INSERT INTO Shopping_Cart(Shopping_Cart_ID, Products_ID, Products_Units) VALUE (\'{}\', \'{}\', \'{}\');".format(Shopping_Cart_ID, Temp_Prodcut_ID, Temp_Product_Units))

            CURSOR.execute(QUERYSQL)


    # Here means the user has no shopping cart, which means there is an error during the sign up
    # Here we return the error code
    else:
        # Here we need to return the error with shopping cart SHOPPING_CART_ADDING_ERROR
        STATUS = ErrorCode.SHOPPING_CART_ADDING_ERROR

        CURSOR.close()

        CONNECTIONS.commit()

        CONNECTIONS.close()

        return(STATUS, DATA)


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)



# End of the Add_To_Shopping_Cart function


# Start of the Get_User_Profile function

def Get_User_Profile(USER_ID):
    '''
    This is function to get user profile and info
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT * FROM Profiles WHERE User_ID = \'{}\' ;'.format(USER_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        (User_ID, First_Name, Last_Name, Level) = QUERYLIST[0]
        DATA = {"User_ID": User_ID, "First_Name": First_Name, "Last_Name": Last_Name, "Level": Level}

    else:
        STATUS = ErrorCode.FETCH_PROFILE_ERROR
        DATA = 0

    return(STATUS, DATA)


# End of the Get_User_Profile function
