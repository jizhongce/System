import urllib.parse
import mysql.connector
import uuid
from SMS_utli import SendSMS
from GEO_utli import GetGEOCODE
from random import randint
import passlib.hash
import re
import ErrorCode
import datetime

#

# This is method to create a new date and time with string format

def CreateTimeNOW():
    return(datetime.datetime.now())

def CreateVerifyCodeTime():
    return(datetime.datetime.now() + datetime.timedelta(minutes=3))

def CompareVerifyCodeTime(TimeNow, TimeVerify):
    '''
    If TimeNow < TimeVerify, then return true, means verify success
    '''
    return(TimeNow < TimeVerify)



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

    return(str(UserID))


# End of create uuid



# Start of Log In

def Log_In(LOG_IN_PHONE_NUMBER, LOG_IN_PASSWORD):
    '''
    This is the method to connect the database and check the username and password,
    if it is existed, then we get the user id and return back
    else we send back bad error code

    Condition:
    1. Phone Number Not Exist
        -CODE: NO_SUCH_USER_CODE
        -DATA: 0

    2. password not correct
        -CODE: WORNG_PASSWORD_CODE
        -DATA: 0

    4. Log in success
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

    QUERYSQL = ('SELECT User_ID, Password, PhoneNum FROM Users WHERE PhoneNum = \'{}\' ').format(LOG_IN_PHONE_NUMBER)

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if not QUERYLIST:
        STATUS = ErrorCode.NO_SUCH_USER_CODE

    else:
        (USERID, PASSWORD, PHONENUM, ) = QUERYLIST[0]

        print(LOG_IN_PASSWORD)
        print(PASSWORD)

        if passlib.hash.sha256_crypt.verify(LOG_IN_PASSWORD, Decode_To_String(PASSWORD)):
            DATA = Decode_To_String(USERID)

        else:
            STATUS = ErrorCode.WORNG_PASSWORD_CODE

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)

# End of Log In




# Start of Send Verify Code

def Sign_Up_Send_Verify_Code(SIGN_UP_PHONE_NUMBER):
    '''
    This function is to send verify code to the client
    1. we need to add the phone number to the Phone_Numner_Verify_Code table

    '''

    STATUS = 0

    DATA = 0

    if not Phone_Schame_Check(SIGN_UP_PHONE_NUMBER):
        STATUS = ErrorCode.WRONG_PASSWORD_SCHEMA_CODE

    else:
        # # First create a VERIFY_CODE
        # VERIFY_CODE = RandCode()

        CONNECTIONS = mysql.connector.connect(user='root',
        password='jizhongce123',
        host='127.0.0.1',
        database='Web_Data')

        CURSOR = CONNECTIONS.cursor(buffered=True)

        QUERYSQL = ('SELECT * FROM Users WHERE PhoneNum = \'{}\' ').format(SIGN_UP_PHONE_NUMBER)

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if QUERYLIST:
            STATUS = ErrorCode.PHONE_EXIST_CODE

        else:
            # First create a VERIFY_CODE
            VERIFY_CODE = RandCode()

            STATUS = SendSMS(SIGN_UP_PHONE_NUMBER, VERIFY_CODE)


            if STATUS == 200:


                QUERYSQL = ('SELECT Phone_Number FROM Phone_Numner_Verify_Code WHERE Phone_Number = \'{}\' ').format(SIGN_UP_PHONE_NUMBER)

                CURSOR.execute(QUERYSQL)

                QUERYLIST = CURSOR.fetchall()

                if QUERYLIST:
                    QUERYSQL = ('UPDATE Phone_Numner_Verify_Code SET Verify_Code = \'{}\', Expiration_Time = \'{}\' WHERE Phone_Number = \'{}\'; ').format(VERIFY_CODE, CreateVerifyCodeTime(), SIGN_UP_PHONE_NUMBER)
                    CURSOR.execute(QUERYSQL)
                    STATUS = ErrorCode.SUCCESS_CODE


                else:
                    QUERYSQL = ('INSERT INTO Phone_Numner_Verify_Code(Phone_Number, Verify_Code, Expiration_Time) VALUES (\'{}\', \'{}\', \'{}\');').format(SIGN_UP_PHONE_NUMBER, VERIFY_CODE, CreateVerifyCodeTime())
                    CURSOR.execute(QUERYSQL)
                    STATUS = ErrorCode.SUCCESS_CODE


        CURSOR.close()

        CONNECTIONS.commit()

        CONNECTIONS.close()

    return(STATUS, DATA)

# End of Sign_Up_Send_Verify_Code



# Start of Change_Password_Send_Verify_Code

def Change_Password_Send_Verify_Code(CHANGE_PASSWORD_PHONE_NUMBER):
    '''
    This function is to send verify code to the client
    1. we need to check whether the phone is exist or not

    '''

    STATUS = 0

    DATA = 0

    if not Phone_Schame_Check(CHANGE_PASSWORD_PHONE_NUMBER):
        STATUS = ErrorCode.WRONG_PASSWORD_SCHEMA_CODE

    else:
        # # First create a VERIFY_CODE
        # VERIFY_CODE = RandCode()

        CONNECTIONS = mysql.connector.connect(user='root',
        password='jizhongce123',
        host='127.0.0.1',
        database='Web_Data')

        CURSOR = CONNECTIONS.cursor(buffered=True)

        QUERYSQL = ('SELECT * FROM Users WHERE PhoneNum = \'{}\' ').format(CHANGE_PASSWORD_PHONE_NUMBER)

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if QUERYLIST:
            # First create a VERIFY_CODE
            VERIFY_CODE = RandCode()

            STATUS = SendSMS(CHANGE_PASSWORD_PHONE_NUMBER, VERIFY_CODE)


            if STATUS == 200:


                QUERYSQL = ('SELECT Phone_Number FROM Phone_Numner_Verify_Code WHERE Phone_Number = \'{}\' ').format(CHANGE_PASSWORD_PHONE_NUMBER)

                CURSOR.execute(QUERYSQL)

                QUERYLIST = CURSOR.fetchall()

                if QUERYLIST:
                    QUERYSQL = ('UPDATE Phone_Numner_Verify_Code SET Verify_Code = \'{}\', Expiration_Time = \'{}\' WHERE Phone_Number = \'{}\'; ').format(VERIFY_CODE, CreateVerifyCodeTime(), CHANGE_PASSWORD_PHONE_NUMBER)
                    CURSOR.execute(QUERYSQL)
                    STATUS = ErrorCode.SUCCESS_CODE


                else:
                    QUERYSQL = ('INSERT INTO Phone_Numner_Verify_Code(Phone_Number, Verify_Code, Expiration_Time) VALUES (\'{}\', \'{}\', \'{}\');').format(CHANGE_PASSWORD_PHONE_NUMBER, VERIFY_CODE, CreateVerifyCodeTime())
                    CURSOR.execute(QUERYSQL)
                    STATUS = ErrorCode.SUCCESS_CODE


        else:
            STATUS = ErrorCode.NO_SUCH_USER_CODE


        CURSOR.close()

        CONNECTIONS.commit()

        CONNECTIONS.close()

    return(STATUS, DATA)

# End of Change_Password_Send_Verify_Code



# This fucntion RandCode

def RandCode():
    return(randint(100000, 999999))

# End of RandCode


# Password Schame check function

def Pass_Schame_Check(Password):
    return(bool(re.search(r'[A-Z]',Password)) and bool(re.search(r'[0-9]',Password)) and len(Password) >= 6 and not bool(re.search(r'\s',Password)))

# End of Pass_Schame_Check

# Phone number check function

def Phone_Schame_Check(Phonenum):

    PhoneNumberPrefix = ['130','131','132','133','134','135','136','137','138','139','150','151','152','153','156','158','159','170','183','182','185','186','188','189']

    return((Phonenum[:3] in PhoneNumberPrefix) and len(Phonenum) == 11 and bool(Phonenum.isdigit))

# End of Phone_Schame_Check

# Phone number check function

def Verify_Code_Schame_Check(Verify_Code):
    return(len(Verify_Code) == 6 and bool(Verify_Code.isdigit))

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


# Start of Sign Up

def Sign_Up(SIGN_UP_PHONE_NUMBER, SIGN_UP_PASSWORD, SIGN_UP_VERIFY_CODE):
    '''
    This is method for sign up, it first need to check the data base with username and phone number
    If the username is already exists, return the status code

    '''
    STATUS = 0

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    if not Pass_Schame_Check(SIGN_UP_PASSWORD):
        STATUS = ErrorCode.WRONG_PASSWORD_SCHEMA_CODE

    else:
        if not Phone_Schame_Check(SIGN_UP_PHONE_NUMBER):
            STATUS = ErrorCode.WRONG_PHONE_SCHEMA_CODE

        else:
            if not Verify_Code_Schame_Check(SIGN_UP_VERIFY_CODE):
                STATUS = ErrorCode.WRONG_VERIFY_CODE

            else:
                QUERYSQL = ('SELECT * FROM Phone_Numner_Verify_Code WHERE Phone_Number = \'{}\' '.format(SIGN_UP_PHONE_NUMBER))

                CURSOR.execute(QUERYSQL)

                QUERYLIST = CURSOR.fetchall()

                if QUERYLIST:
                    (Phone_Number, Verify_Code, Expiration_Time) = QUERYLIST[0]


                    if CompareVerifyCodeTime(datetime.datetime.now(), Expiration_Time):

                        if Verify_Code == int(SIGN_UP_VERIFY_CODE):
                            STATUS = ErrorCode.SUCCESS_CODE

                            USERID = CreateUserID()

                            SHOPPINGCARTID = CreateShoppingCartID()

                            USERNAME = 'JIZHONGCE'

                            PASSWORD = passlib.hash.sha256_crypt.hash(SIGN_UP_PASSWORD)

                            QUERYSQL_USER = ('INSERT INTO Users(User_ID, User_Name, Password, PhoneNum) VALUES (\'{}\', \'{}\', \'{}\', \'{}\');').format(USERID, USERNAME, PASSWORD, SIGN_UP_PHONE_NUMBER)

                            print(QUERYSQL_USER)

                            QUERYSQL_SHOPPINGCART = ('INSERT INTO Shopping_Cart_User(User_ID, Shopping_Cart_ID) VALUES (\'{}\', \'{}\');').format(USERID, SHOPPINGCARTID)

                            QUERYSQL_PROFILE = ('INSERT INTO Profiles(User_ID, Name, Level) VALUES (\'{}\', \'{}\', 1);').format(USERID, '')

                            CURSOR.execute(QUERYSQL_USER)

                            CURSOR.execute(QUERYSQL_SHOPPINGCART)

                            CURSOR.execute(QUERYSQL_PROFILE)

                            DATA = USERID

                        else:
                            STATUS = ErrorCode.WRONG_VERIFY_CODE


                    else:
                        STATUS = ErrorCode.VERIFY_CODE_EXPIRED


                else:
                    STATUS = ErrorCode.PHONENUM_NOT_CORRECT



    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)

# End of Sign Up




# Start of Change_Password

def Change_Password(CHANGE_PASSWORD_PHONE_NUMBER, CHANGE_PASSWORD_NEW_PASSWORD, CHANGE_PASSWORD_VERIFY_CODE):
    '''
    This is method for change password, it first need to check the data base with username and phone number
    If the username is already exists, return the status code

    '''
    STATUS = 0

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    if not Pass_Schame_Check(CHANGE_PASSWORD_NEW_PASSWORD):
        STATUS = ErrorCode.WRONG_PASSWORD_SCHEMA_CODE

    else:
        if not Phone_Schame_Check(CHANGE_PASSWORD_PHONE_NUMBER):
            STATUS = ErrorCode.WRONG_PHONE_SCHEMA_CODE

        else:
            if not Verify_Code_Schame_Check(CHANGE_PASSWORD_VERIFY_CODE):
                STATUS = ErrorCode.WRONG_VERIFY_CODE

            else:
                QUERYSQL = ('SELECT * FROM Phone_Numner_Verify_Code WHERE Phone_Number = \'{}\' ').format(CHANGE_PASSWORD_PHONE_NUMBER)

                CURSOR.execute(QUERYSQL)

                QUERYLIST = CURSOR.fetchall()

                if QUERYLIST:
                    (Phone_Number, Verify_Code, Expiration_Time) = QUERYLIST[0]

                    if CompareVerifyCodeTime(datetime.datetime.now(), Expiration_Time):

                        if Verify_Code == int(CHANGE_PASSWORD_VERIFY_CODE):
                            PASSWORD = passlib.hash.sha256_crypt.hash(CHANGE_PASSWORD_NEW_PASSWORD)

                            UPDATEQUERY = ('UPDATE Users SET Password = \'{}\' WHERE PhoneNum = \'{}\';'.format(PASSWORD, CHANGE_PASSWORD_PHONE_NUMBER))

                            CURSOR.execute(UPDATEQUERY)

                            STATUS = ErrorCode.SUCCESS_CODE

                        else:
                            STATUS = ErrorCode.WRONG_VERIFY_CODE


                    else:
                        STATUS = ErrorCode.VERIFY_CODE_EXPIRED


                else:
                    STATUS = ErrorCode.PHONENUM_NOT_CORRECT



    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)

# End of Change_Password



# Start of Get_User_Info

def Get_User_Info(USER_ID):
    '''
    This is the function which will get the Address list of specific user in the database
    '''
    STATUS = 0

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT User_ID, PhoneNum FROM Users WHERE User_ID = \'{}\';'.format(USER_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        (User_ID, Phone_Number) = QUERYLIST[0]
        DATA = {'User_ID': Decode_To_String(User_ID), 'Phone_Number': Decode_To_String(Phone_Number)}
        STATUS = ErrorCode.SUCCESS_CODE

    else:
        STATUS = ErrorCode.USER_EXIST_CODE
        DATA = 0

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of Get_User_Info



# Start of Get_All_Messages

def Get_All_Messages(USER_ID):
    '''
    This is the function which will get all messages of specific user in the database
    '''
    STATUS = 0

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT Messages.Message_ID, Messages.Message_Type, Messages.Message_Content, Messages.Message_Time, Messages.Message_Status  FROM Messages, Messages_User WHERE Messages.Message_ID = Messages_User.Message_ID AND Messages_User.User_ID = \'{}\' ORDER BY Messages.Message_Time DESC;'.format(USER_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    Unread_Price_Messages_Count = 0

    Unread_Customer_Service_Messages_Count = 0

    Unread_Account_Messages_Count = 0

    Unread_Shipping_Messages_Count = 0

    Price_Messages = list()

    Customer_Service_Messages = list()

    Account_Messages = list()

    Shipping_Messages = list()

    if QUERYLIST:

        for Message in QUERYLIST:

            (Message_ID, Message_Type, Message_Content, Message_Time, Message_Status) = Message

            if Message_Type == 1:

                if Message_Status == 0:

                    Unread_Price_Messages_Count = Unread_Price_Messages_Count + 1

                Price_Messages.append({'Message_ID' : Decode_To_String(Message_ID), 'Message_Type' : Decode_To_String(Message_Type), 'Message_Content' : Decode_To_String(Message_Content), 'Message_Time' : Message_Time.strftime("%Y/%m/%d"), 'Message_Status' : Decode_To_String(Message_Status)})

            elif Message_Type == 2:

                if Message_Status == 0:

                    Unread_Customer_Service_Messages_Count = Unread_Customer_Service_Messages_Count + 1

                Customer_Service_Messages.append({'Message_ID' : Decode_To_String(Message_ID), 'Message_Type' : Decode_To_String(Message_Type), 'Message_Content' : Decode_To_String(Message_Content), 'Message_Time' : Message_Time.strftime("%Y/%m/%d"), 'Message_Status' : Decode_To_String(Message_Status)})

            elif Message_Type == 3:

                if Message_Status == 0:

                    Unread_Account_Messages_Count = Unread_Account_Messages_Count + 1

                Account_Messages.append({'Message_ID' : Decode_To_String(Message_ID), 'Message_Type' : Decode_To_String(Message_Type), 'Message_Content' : Decode_To_String(Message_Content), 'Message_Time' : Message_Time.strftime("%Y/%m/%d"), 'Message_Status' : Decode_To_String(Message_Status)})

            elif Message_Type == 4:

                if Message_Status == 0:

                    Unread_Shipping_Messages_Count = Unread_Shipping_Messages_Count + 1

                Shipping_Messages.append({'Message_ID' : Decode_To_String(Message_ID), 'Message_Type' : Decode_To_String(Message_Type), 'Message_Content' : Decode_To_String(Message_Content), 'Message_Time' : Message_Time.strftime("%Y/%m/%d"), 'Message_Status' : Decode_To_String(Message_Status)})


    DATA = {'Unread_Price_Messages_Count': Unread_Price_Messages_Count, 'Unread_Customer_Service_Messages_Count' : Unread_Customer_Service_Messages_Count, 'Unread_Account_Messages_Count' : Unread_Account_Messages_Count, 'Unread_Shipping_Messages_Count': Unread_Shipping_Messages_Count, 'Price_Messages': Price_Messages, 'Customer_Service_Messages': Customer_Service_Messages, 'Account_Messages': Account_Messages, 'Shipping_Messages': Shipping_Messages}

    STATUS = ErrorCode.SUCCESS_CODE


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of Get_All_Messages



# Start of Get_Single_Message

def Get_Single_Message(USER_ID, MESSAGE_TYPE):
    '''
    This is the function which will get all messages of specific user in the database
    '''
    STATUS = 0

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    Messages = list()

    QUERYSQL = ('SELECT Messages.Message_ID, Messages.Message_Type, Messages.Message_Content, Messages.Message_Time, Messages.Message_Status  FROM Messages, Messages_User WHERE Messages.Message_ID = Messages_User.Message_ID AND Messages_User.User_ID = \'{}\' AND Messages.Message_Type = \'{}\' ORDER BY Messages.Message_Time DESC;'.format(USER_ID, MESSAGE_TYPE))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        for Message in QUERYLIST:
            (Message_ID, Message_Type, Message_Content, Message_Time, Message_Status) = Message
            Messages.append({'Message_ID' : Decode_To_String(Message_ID), 'Message_Type' : Decode_To_String(Message_Type), 'Message_Content' : Decode_To_String(Message_Content), 'Message_Time' :  Message_Time.strftime("%Y/%m/%d %H:%M:%S"), 'Message_Status' : Decode_To_String(Message_Status)})

            QUERYSQL = ('UPDATE Messages SET Message_Status = 1 WHERE Message_ID = \'{}\';'.format(Decode_To_String(Message_ID)))

            CURSOR.execute(QUERYSQL)

    DATA = Messages

    STATUS = ErrorCode.SUCCESS_CODE

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of Get_Single_Message




# Start of Change_User_Name

def Change_User_Name(USER_ID, NEW_NAME):
    '''
    This is the function will change the name of the user
    '''
    STATUS = 0

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT User_ID FROM Users WHERE User_ID = \'{}\';'.format(USER_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:

        UPDATEQUERY = ('UPDATE Profiles SET Name = \'{}\' WHERE User_ID = \'{}\';'.format(NEW_NAME, USER_ID))

        CURSOR.execute(UPDATEQUERY)

        STATUS = ErrorCode.SUCCESS_CODE


    else:
        STATUS = ErrorCode.NO_SUCH_USER_CODE
        DATA = 0


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of Change_User_Name



# Start of decode utf-8 function

def Decode_To_String(Data):
    if type(Data) == bytearray:
        return(Data.decode('utf-8'))

    else:
        return(Data)


# End of decode utf-8 function


# Start the Get_Products function

def Get_Products(Products_Index):
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

    QUERYSQL = ('SELECT * FROM Products LIMIT {}'.format((int(Products_Index)+5)))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    Product_List = []

    if QUERYLIST:
        for product in QUERYLIST:
            (Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) = product
            Product_List.append({"Products_ID": Decode_To_String(Products_ID), "Products_Name": Decode_To_String(Products_Name), "Products_Number": Decode_To_String(Products_Number), "Products_Spec": Decode_To_String(Products_Spec), "Products_Color": Decode_To_String(Products_Color), "Products_Status": Decode_To_String(Products_Status), "Products_Price": Decode_To_String(Products_Price), "Products_Image_Dir": Decode_To_String(Products_Image_Dir)})

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, Product_List)



#End of the Get_Products function


# Search function
def Search_Term_In_String(Search_Term_List, Search_String):
    Search_Flag = False
    for Search_Term in Search_Term_List:
        if Search_String.find(Search_Term) != -1:
            Search_Flag = True
    return(Search_Flag)

# Search function


# Start the Search_Product function

def Search_Product(Search_Term):
    '''
    This is function will search the product in the database to find the product which meets the requirements
    Before we connect to the database, we need to separate the search terms
    The main idea is we will combine the features of product into one string and then we search for each search term to find whether the product string contain the search term
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    Search_Term_List = Search_Term.split(' ')

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT * FROM Products')

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    Result_Product_List = []

    if QUERYLIST:
        for product in QUERYLIST:
            (Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) = product
            Search_String = Decode_To_String(Products_Name) + ' ' + Decode_To_String(Products_Number) + ' ' + Decode_To_String(Products_Spec) + ' ' + Decode_To_String(Products_Color)
            if Search_Term_In_String(Search_Term_List, Search_String):
                Result_Product_List.append({"Products_ID": Decode_To_String(Products_ID), "Products_Name": Decode_To_String(Products_Name), "Products_Number": Decode_To_String(Products_Number), "Products_Spec": Decode_To_String(Products_Spec), "Products_Color": Decode_To_String(Products_Color), "Products_Status": Decode_To_String(Products_Status), "Products_Price": Decode_To_String(Products_Price), "Products_Image_Dir": Decode_To_String(Products_Image_Dir)})

    else:
        STATUS = ErrorCode.NO_PRODUCT_ERROR


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, Result_Product_List)



#End of the Search_Product function


# Start the Get_Single_Product_Info function

def Get_Single_Product_Info(Product_ID):
    '''
    This is function to get single products from the database
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT * FROM Products WHERE Products_ID = \'{}\' '.format(Product_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        (Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) = QUERYLIST[0]
        DATA = {"Products_ID": Decode_To_String(Products_ID), "Products_Name": Decode_To_String(Products_Name), "Products_Number": Decode_To_String(Products_Number), "Products_Spec": Decode_To_String(Products_Spec), "Products_Color": Decode_To_String(Products_Color), "Products_Status": Decode_To_String(Products_Status), "Products_Price": Decode_To_String(Products_Price), "Products_Image_Dir": Decode_To_String(Products_Image_Dir)}

    else:
        STATUS = ErrorCode.NO_SUCH_PRODUCT_ERROR

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)



#End of the Get_Single_Product_Info function


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

    QUERYSQL = ('SELECT Products.Products_ID, Products.Products_Name, Products.Products_Number, Products.Products_Status, Products.Products_Spec, Products.Products_Color, Products.Products_Price, Products.Products_Image_Dir, Shopping_Cart.Products_Units FROM Products, Shopping_Cart, Shopping_Cart_User WHERE Shopping_Cart_User.User_ID = \'{}\' AND Shopping_Cart_User.Shopping_Cart_ID = Shopping_Cart.Shopping_Cart_ID AND Shopping_Cart.Products_ID = Products.Products_ID;'.format(userid))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    Product_List = []

    if QUERYLIST:
        for product in QUERYLIST:
            (Products_ID, Products_Name, Products_Number,  Products_Status, Products_Spec, Products_Color, Products_Price, Products_Image_Dir, ProductUnits) = product
            Product_List.append({"Products_ID":Decode_To_String(Products_ID), "Products_Name": Decode_To_String(Products_Name), "Products_Number": Decode_To_String(Products_Number), "Products_Spec": Decode_To_String(Products_Spec), "Products_Color": Decode_To_String(Products_Color), "Products_Status": Decode_To_String(Products_Status), "Products_Price": Decode_To_String(Products_Price), "Products_Image_Dir": Decode_To_String(Products_Image_Dir), "Products_Units": Decode_To_String(ProductUnits)})

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, Product_List)



# End of the Get_Shopping_Cart function


# Start the Shopping_Cart_Quantity_Change function

def Shopping_Cart_Quantity_Change(userid, product):
    '''
    This is function to change the quantity of item in the shopping cart
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT Shopping_Cart_ID FROM Shopping_Cart_User WHERE Shopping_Cart_User.User_ID = \'{}\' ;'.format(userid))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        (Shopping_Cart_ID,) = QUERYLIST[0]
        Product_ID = product['Products_ID']
        Product_Units = product['Products_Units']
        print(Shopping_Cart_ID)
        print(Product_ID)
        print(Product_Units)
        QUERYSQL = ('UPDATE Shopping_Cart SET Products_Units = \'{}\' WHERE Shopping_Cart_ID = \'{}\' AND Products_ID = \'{}\';'.format(Product_Units, Decode_To_String(Shopping_Cart_ID), Product_ID))
        CURSOR.execute(QUERYSQL)

    else:
        STATUS = ErrorCode.NO_SUCH_SHOPPING_CART_ERROR


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)



# End of the Shopping_Cart_Quantity_Change function



# Start the Delete_From_Shopping_Cart function

def Delete_From_Shopping_Cart(userid, productid):
    '''
    This is function to delete item in the shopping cart
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT Shopping_Cart_ID FROM Shopping_Cart_User WHERE Shopping_Cart_User.User_ID = \'{}\' ;'.format(userid))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        (Shopping_Cart_ID,) = QUERYLIST[0]

        print(Shopping_Cart_ID)

        QUERYSQL = ('DELETE FROM Shopping_Cart WHERE Shopping_Cart_ID = \'{}\' AND Products_ID = \'{}\';'.format(Decode_To_String(Shopping_Cart_ID), productid))
        CURSOR.execute(QUERYSQL)


    else:
        STATUS = ErrorCode.NO_SUCH_SHOPPING_CART_ERROR


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)



# End of the Delete_From_Shopping_Cart function



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

        QUERYSQL = ('SELECT * FROM Shopping_Cart WHERE Shopping_Cart_ID = \'{}\' AND Products_ID = \'{}\' ;'.format(Decode_To_String(Shopping_Cart_ID), Decode_To_String(Temp_Prodcut_ID)))

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if QUERYLIST:

            (Shopping_Cart_ID, Products_ID, Products_Units) = QUERYLIST[0]

            new_Product_Units = Temp_Product_Units + Decode_To_String(Products_Units)

            QUERYSQL = ('UPDATE Shopping_Cart SET Products_Units = \'{}\' WHERE Shopping_Cart_ID = \'{}\' AND Products_ID = \'{}\';'.format(new_Product_Units, Decode_To_String(Shopping_Cart_ID), Decode_To_String(Products_ID)))

            DATA = {"Products_Units": new_Product_Units}

            CURSOR.execute(QUERYSQL)
            #
            # Prodcut_Exist_Flag = False
            # for Product in QUERYLIST:
            #     print(Product)
            #     (Shopping_Cart_ID, Products_ID, Products_Units) = Product
            #     if Products_ID == Temp_Prodcut_ID:
            #
            #         new_Product_Units = Temp_Product_Units + Products_Units
            #         # Here we need to update the value in the shopping cart with new units
            #         QUERYSQL = ('UPDATE Shopping_Cart SET Products_Units = \'{}\' WHERE Shopping_Cart_ID = \'{}\' AND Products_ID = \'{}\';'.format(new_Product_Units, Shopping_Cart_ID, Products_ID))
            #
            #         CURSOR.execute(QUERYSQL)
            #
            #         Prodcut_Exist_Flag = True
            #
            #         break
            #
            #
            # if Prodcut_Exist_Flag == False:
            #     QUERYSQL = ("INSERT INTO Shopping_Cart(Shopping_Cart_ID, Products_ID, Products_Units) VALUE (\'{}\', \'{}\', \'{}\');".format(Shopping_Cart_ID, Temp_Prodcut_ID, Temp_Product_Units))
            #
            #     CURSOR.execute(QUERYSQL)

        else:
            QUERYSQL = ("INSERT INTO Shopping_Cart(Shopping_Cart_ID, Products_ID, Products_Units) VALUE (\'{}\', \'{}\', \'{}\');".format(Decode_To_String(Shopping_Cart_ID), Temp_Prodcut_ID, Temp_Product_Units))

            DATA = {"Products_Units": Temp_Product_Units}

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
        (User_ID, Name, Level) = QUERYLIST[0]
        DATA = {"User_ID": Decode_To_String(User_ID), "Name": Decode_To_String(Name), "Level": Decode_To_String(Level)}

    else:
        STATUS = ErrorCode.FETCH_PROFILE_ERROR
        DATA = 0

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of the Get_User_Profile function



# Start of the Add_To_Favorite_Product function

def Add_To_Favorite_Product(USER_ID, PRODUCT_ID):
    '''
    This is function to add the product into the favorite list
    we need to check whether it already existed in the list
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT * FROM Favorite_Products WHERE User_ID = \'{}\' AND Products_ID = \'{}\';'.format(USER_ID, PRODUCT_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        STATUS = ErrorCode.PRODUCT_EXISTED_FAVORITE_ERROR
        DATA = 0

    else:
        QUERYSQL = ("INSERT INTO Favorite_Products(User_ID, Products_ID) VALUE (\'{}\', \'{}\');".format(USER_ID, PRODUCT_ID))
        CURSOR.execute(QUERYSQL)

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of the Add_To_Favorite_Product function



# Start of the Get_Favorite_Product function

def Get_Favorite_Product(USER_ID):
    '''
    This is the function which will get the favorite product list of specific user in the database
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT Products.Products_ID, Products.Products_Name, Products.Products_Number, Products.Products_Spec, Products.Products_Color, Products.Products_Status, Products.Products_Price, Products.Products_Image_Dir FROM Products, Favorite_Products WHERE Favorite_Products.Products_ID = Products.Products_ID AND User_ID = \'{}\';'.format(USER_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    Favorite_Product_List = list()

    if QUERYLIST:
        for product in QUERYLIST:
            (Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) = product
            Favorite_Product_List.append({"Products_ID": Decode_To_String(Products_ID), "Products_Name": Decode_To_String(Products_Name), "Products_Number": Decode_To_String(Products_Number), "Products_Spec": Decode_To_String(Products_Spec), "Products_Color": Decode_To_String(Products_Color), "Products_Status": Decode_To_String(Products_Status), "Products_Price": Decode_To_String(Products_Price), "Products_Image_Dir": Decode_To_String(Products_Image_Dir)})

        DATA = Favorite_Product_List

    else:
        STATUS = ErrorCode.NO_FAVORITE_PRODUCT_EXIST_ERROR
        DATA = 0


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of the Get_Favorite_Product function



# Start of the Get_Order function

def Get_Order(USER_ID, ORDER_TYPE):
    '''
    This is the function which will get the order info in the database
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    if ORDER_TYPE == "ALL":

        QUERYSQL = ('SELECT Orders.Order_ID, Orders.Order_Status, Orders.Order_Total_Price FROM Orders_User, Orders WHERE Orders_User.Order_ID = Orders.Order_ID AND Orders_User.User_ID = \'{}\' ;'.format(USER_ID))

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        Order_List = list()

        if QUERYLIST:

            for Order in QUERYLIST:

                (Order_ID, Order_Status, Order_Total_Price) = Order

                QUERYSQL = ('SELECT Products.Products_ID, Products.Products_Name, Products.Products_Spec, Products.Products_Color, Products.Products_Image_Dir, Orders_Products.Products_Price, Orders_Products.Products_Units FROM Products, Orders_Products WHERE Orders_Products.Order_ID = \'{}\' AND Orders_Products.Products_ID = Products.Products_ID ;'.format(Decode_To_String(Order_ID)))

                CURSOR.execute(QUERYSQL)

                QUERYLIST = CURSOR.fetchall()

                Product_List = list()

                if QUERYLIST:

                    for product in QUERYLIST:

                        (Products_ID, Products_Name, Products_Spec, Products_Color, Products_Image_Dir, Products_Price, Products_Units) = product

                        Product_List.append({"Products_ID": Decode_To_String(Products_ID), "Products_Name": Decode_To_String(Products_Name), "Products_Spec": Decode_To_String(Products_Spec), "Products_Color": Decode_To_String(Products_Color), "Products_Price": Decode_To_String(Products_Price), "Products_Image_Dir": Decode_To_String(Products_Image_Dir), "Products_Units": Decode_To_String(Products_Units)})


                else:
                    STATUS = ErrorCode.NO_ORDER_EXIST_ERROR
                    DATA = 0


                Order_List.append({"Order_ID": Decode_To_String(Order_ID), "Order_Status": Decode_To_String(Order_Status), "Order_Total_Price": Decode_To_String(Order_Total_Price), "Product_List": Product_List})

                STATUS = ErrorCode.SUCCESS_CODE

                DATA = Order_List




        else:
            STATUS = ErrorCode.NO_ORDER_EXIST_ERROR
            DATA = 0


    elif ORDER_TYPE == "PRO":

        QUERYSQL = ('SELECT Orders.Order_ID, Orders.Order_Status, Orders.Order_Total_Price FROM Orders_User, Orders WHERE Orders_User.Order_ID = Orders.Order_ID AND Orders_User.User_ID = \'{}\' AND (Orders.Order_Status =  \'{}\' OR Orders.Order_Status =  \'{}\' OR Orders.Order_Status =  \'{}\' OR Orders.Order_Status =  \'{}\');'.format(USER_ID, ORDER_TYPE, 'SHP', 'PCK', 'REV'))

        print(QUERYSQL)

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        Order_List = list()

        if QUERYLIST:

            print(QUERYLIST)

            for Order in QUERYLIST:

                (Order_ID, Order_Status, Order_Total_Price) = Order

                QUERYSQL = ('SELECT Products.Products_ID, Products.Products_Name, Products.Products_Spec, Products.Products_Color, Products.Products_Image_Dir, Orders_Products.Products_Price, Orders_Products.Products_Units FROM Products, Orders_Products WHERE Orders_Products.Order_ID = \'{}\' AND Orders_Products.Products_ID = Products.Products_ID ;'.format(Decode_To_String(Order_ID)))

                CURSOR.execute(QUERYSQL)

                QUERYLIST = CURSOR.fetchall()

                Product_List = list()

                if QUERYLIST:

                    for product in QUERYLIST:

                        (Products_ID, Products_Name, Products_Spec, Products_Color, Products_Image_Dir, Products_Price, Products_Units) = product

                        Product_List.append({"Products_ID": Decode_To_String(Products_ID), "Products_Name": Decode_To_String(Products_Name), "Products_Spec": Decode_To_String(Products_Spec), "Products_Color": Decode_To_String(Products_Color), "Products_Price": Decode_To_String(Products_Price), "Products_Image_Dir": Decode_To_String(Products_Image_Dir), "Products_Units": Decode_To_String(Products_Units)})


                else:
                    STATUS = ErrorCode.NO_ORDER_EXIST_ERROR
                    DATA = 0


                Order_List.append({"Order_ID": Decode_To_String(Order_ID), "Order_Status": Decode_To_String(Order_Status), "Order_Total_Price": Decode_To_String(Order_Total_Price), "Product_List": Product_List})

                STATUS = ErrorCode.SUCCESS_CODE

                DATA = Order_List





        else:
            STATUS = ErrorCode.NO_ORDER_EXIST_ERROR
            DATA = 0



    else:

        QUERYSQL = ('SELECT Orders.Order_ID, Orders.Order_Status, Orders.Order_Total_Price FROM Orders_User, Orders WHERE Orders_User.Order_ID = Orders.Order_ID AND Orders_User.User_ID = \'{}\' AND Orders.Order_Status =  \'{}\' ;'.format(USER_ID, ORDER_TYPE))

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        Order_List = list()

        if QUERYLIST:

            for Order in QUERYLIST:

                (Order_ID, Order_Status, Order_Total_Price) = Order

                QUERYSQL = ('SELECT Products.Products_ID, Products.Products_Name, Products.Products_Spec, Products.Products_Color, Products.Products_Image_Dir, Orders_Products.Products_Price, Orders_Products.Products_Units FROM Products, Orders_Products WHERE Orders_Products.Order_ID = \'{}\' AND Orders_Products.Products_ID = Products.Products_ID ;'.format(Decode_To_String(Order_ID)))

                CURSOR.execute(QUERYSQL)

                QUERYLIST = CURSOR.fetchall()

                Product_List = list()

                if QUERYLIST:

                    for product in QUERYLIST:

                        (Products_ID, Products_Name, Products_Spec, Products_Color, Products_Image_Dir, Products_Price, Products_Units) = product

                        Product_List.append({"Products_ID": Decode_To_String(Products_ID), "Products_Name": Decode_To_String(Products_Name), "Products_Spec": Decode_To_String(Products_Spec), "Products_Color": Decode_To_String(Products_Color), "Products_Price": Decode_To_String(Products_Price), "Products_Image_Dir": Decode_To_String(Products_Image_Dir), "Products_Units": Decode_To_String(Products_Units)})


                else:
                    STATUS = ErrorCode.NO_ORDER_EXIST_ERROR
                    DATA = 0


                Order_List.append({"Order_ID": Decode_To_String(Order_ID), "Order_Status": Decode_To_String(Order_Status), "Order_Total_Price": Decode_To_String(Order_Total_Price), "Product_List": Product_List})

                STATUS = ErrorCode.SUCCESS_CODE

                DATA = Order_List



        else:
            STATUS = ErrorCode.NO_ORDER_EXIST_ERROR
            DATA = 0



    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)

# End of the Get_Order function



# Start of the Get_Single_Order function

def Get_Single_Order(User_ID, Order_ID):
    '''
    This is the function which will get the order info in the database
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT Orders.Order_ID, Orders.Order_Status, Orders.Order_Payment_Method, Orders.Order_Total_Price, Orders.Order_Paid_Price, Orders.Order_Time, Orders.Order_Shipping_Address_ID, Orders.Order_Factory FROM Orders_User, Orders WHERE Orders.Order_ID = Orders_User.Order_ID AND Orders_User.Order_ID = \'{}\' AND Orders_User.User_ID = \'{}\';'.format(Order_ID, User_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        (Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID, Order_Factory) = QUERYLIST[0]
        Basic_Info = {"Order_ID": Decode_To_String(Order_ID), "Order_Status": Decode_To_String(Order_Status), "Order_Payment_Method": Decode_To_String(Order_Payment_Method), "Order_Total_Price":Decode_To_String(Order_Total_Price), "Order_Paid_Price": Decode_To_String(Order_Paid_Price), "Order_Time": str(Order_Time), "Order_Factory" : Order_Factory}

        QUERYSQL = ('SELECT Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District, Latitude, Longitude FROM Address WHERE Address_ID = \'{}\';'.format(Decode_To_String(Order_Shipping_Address_ID)))

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if QUERYLIST:
            (Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District, Latitude, Longitude) = QUERYLIST[0]
            Shipping_Info = {"Address_ID": Decode_To_String(Address_ID), "Address_Name": Decode_To_String(Address_Name), "Address_Phone_Number": Decode_To_String(Address_Phone_Number), "Street": Decode_To_String(Street), "City": Decode_To_String(City), "Province": Decode_To_String(Province), 'District': Decode_To_String(District), 'Latitude': Decode_To_String(Latitude), 'Longitude': Decode_To_String(Longitude)}

            QUERYSQL = ('SELECT Products.Products_ID, Products.Products_Name, Products.Products_Number, Products.Products_Spec, Products.Products_Color, Orders_Products.Products_Price, Products.Products_Image_Dir,  Orders_Products.Products_Units FROM Products, Orders_Products WHERE Orders_Products.Order_ID = \'{}\' AND Orders_Products.Products_ID = Products.Products_ID ;'.format(Decode_To_String(Order_ID)))


            print(QUERYSQL)

            CURSOR.execute(QUERYSQL)

            QUERYLIST = CURSOR.fetchall()

            Product_List = list()

            if QUERYLIST:
                for product in QUERYLIST:
                    (Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Price, Products_Image_Dir, Product_Units) = product
                    Product_List.append({"Products_ID":Decode_To_String(Products_ID), "Products_Name": Decode_To_String(Products_Name), "Products_Number": Decode_To_String(Products_Number), "Products_Spec": Decode_To_String(Products_Spec), "Products_Color": Decode_To_String(Products_Color), "Products_Price": Decode_To_String(Products_Price), "Products_Image_Dir": Decode_To_String(Products_Image_Dir), "Products_Units": Decode_To_String(Product_Units)})

                Order_Info = {"Basic_Info": Decode_To_String(Basic_Info), "Shipping_Info": Decode_To_String(Shipping_Info), "Product_List": Decode_To_String(Product_List)}
                DATA = Order_Info

            else:
                STATUS = ErrorCode.ORDER_PRODUCTS_ERROR
                DATA = 0

        else:
            STATUS = ErrorCode.ORDER_SHIPPING_ADDRESS_ERROR
            DATA = 0

    else:
        STATUS = ErrorCode.NO_SUCH_ORDER_EXIST_ERROR
        DATA = 0

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of the Get_Single_Order function




# Start of the Get_Single_Order_Shipping function

def Get_Single_Order_Shipping(User_ID, Order_ID):
    '''
    This is the function which will get the order info in the database
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT Orders.Order_ID, Orders.Order_Status, Orders.Order_Factory, Orders.Factory_Latitude, Orders.Factory_Longitude, Address.Address_ID, Address.Address_Name, Address.Address_Phone_Number, Address.Street, Address.City, Address.Province, Address.District, Address.Latitude, Address.Longitude FROM Orders_User, Orders, Address WHERE Orders.Order_Shipping_Address_ID = Address.Address_ID AND Orders.Order_ID = Orders_User.Order_ID AND Orders_User.Order_ID = \'{}\' AND Orders_User.User_ID = \'{}\';'.format(Order_ID, User_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        (Order_ID, Order_Status, Order_Factory, Factory_Latitude, Factory_Longitude, Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District, Latitude, Longitude) = QUERYLIST[0]
        Order_Info = {'Order_ID' : Decode_To_String(Order_ID), 'Order_Status' : Decode_To_String(Order_Status), 'Order_Factory' : Decode_To_String(Order_Factory), 'Factory_Latitude' : Decode_To_String(Factory_Latitude), 'Factory_Longitude' : Decode_To_String(Factory_Longitude)}
        Shipping_Info = {'Address_ID' : Decode_To_String(Address_ID), 'Address_Name' : Decode_To_String(Address_Name), 'Address_Phone_Number' : Decode_To_String(Address_Phone_Number), 'Street' : Decode_To_String(Street), 'City' : Decode_To_String(City), 'Province' : Decode_To_String(Province), 'District' : Decode_To_String(District), 'Latitude' : Decode_To_String(Latitude), 'Longitude' : Decode_To_String(Longitude)}
        DATA = {'Order_Info': Order_Info, 'Shipping_Info': Shipping_Info}
        STATUS = ErrorCode.SUCCESS_CODE

    else:
        STATUS = ErrorCode.NO_SUCH_ORDER_EXIST_ERROR
        DATA = 0

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of the Get_Single_Order_Shipping function


# Start of the Get_Address_Book function

def Get_Address_Book(USER_ID):
    '''
    This is the function which will get the Address list of specific user in the database
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT Address.Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District, Latitude, Longitude FROM Address, Address_User  WHERE Address.Address_ID = Address_User.Address_ID AND Address_User.User_ID = \'{}\';'.format(USER_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    Address_Book = list()

    if QUERYLIST:
        for Address in QUERYLIST:
            (Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District, Latitude, Longitude) = Address
            Address_Book.append({"Address_ID": Decode_To_String(Address_ID), "Address_Name": Decode_To_String(Address_Name), "Address_Phone_Number": Decode_To_String(Address_Phone_Number), "Street": Decode_To_String(Street), "City": Decode_To_String(City), "Province": Decode_To_String(Province), "District": Decode_To_String(District), 'Latitude': Decode_To_String(Latitude), 'Longitude': Decode_To_String(Longitude)})

        DATA = Address_Book

    else:
        STATUS = ErrorCode.NO_ADDRESS_EXIST_ERROR
        DATA = 0


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of the Get_Address_Book function




# Start of the Check_Favorite_Exist function

def Check_Favorite_Exist(USER_ID, PRODUCT_ID):
    '''
    This will check whether the product is existed in database or not
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT * FROM Favorite_Products WHERE User_ID = \'{}\' AND Products_ID = \'{}\';'.format(USER_ID, PRODUCT_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        STATUS = ErrorCode.SUCCESS_CODE

    else:
        STATUS = ErrorCode.NO_SUCH_FAVORITE_PRODUCT_ERROR


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of the Check_Favorite_Exist function




# Start of the Delete_From_Favorite_Product function

def Delete_From_Favorite_Product(USER_ID, PRODUCT_ID):
    '''
    This will check whether the product is existed in database or not
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT * FROM Favorite_Products WHERE User_ID = \'{}\' AND Products_ID = \'{}\';'.format(USER_ID, PRODUCT_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        QUERYSQL = ('DELETE FROM Favorite_Products WHERE User_ID = \'{}\' AND Products_ID = \'{}\';'.format(USER_ID, PRODUCT_ID))

        CURSOR.execute(QUERYSQL)

        STATUS = ErrorCode.SUCCESS_CODE

    else:
        STATUS = ErrorCode.NO_SUCH_FAVORITE_PRODUCT_ERROR

    CURSOR.close()

    CONNECTIONS.commit()

    return(STATUS, DATA)


# End of the Delete_From_Favorite_Product function



# Start of create Address ID

def CreateAddressID():
    '''
    This is function to create unique shopping cart id
    '''

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    while True:
        AddressID = uuid.uuid4()

        QUERYSQL = ('SELECT * FROM Address WHERE Address_ID = \'{}\' ').format(AddressID)

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if not QUERYLIST:
            break

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(str(AddressID))


# End of create Address ID



# Start of the Add_New_Address function

def Add_New_Address(USER_ID, NEW_ADDRESS):
    '''
    This will add the new address into the address
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    New_Address_ID = CreateAddressID()

    New_Address_Name = NEW_ADDRESS['Address_Name']

    New_Address_Phone_Number = NEW_ADDRESS['Address_Phone_Number']

    New_Address_Street = NEW_ADDRESS['Street']

    New_Address_Province = NEW_ADDRESS['Province']

    New_Address_City = NEW_ADDRESS['City']

    New_Address_District = NEW_ADDRESS['District']

    New_Latitude = ''

    New_Longitude = ''

    New_Address_Lon_Lat = GetGEOCODE(New_Address_Province+New_Address_City+New_Address_District+New_Address_Street)

    if New_Address_Lon_Lat['infocode'] == '10000':
        print(New_Address_Lon_Lat)
        New_Latitude = New_Address_Lon_Lat['lat']
        New_Longitude = New_Address_Lon_Lat['lon']

    if not Phone_Schame_Check(New_Address_Phone_Number):
        STATUS = ErrorCode.WRONG_PHONE_SCHEMA_CODE
        DATA = 0

    else:

        QUERYSQL = ('INSERT INTO Address(Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District, Latitude, Longitude) VALUE (\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\');'.format(New_Address_ID, New_Address_Name, New_Address_Phone_Number, New_Address_Street, New_Address_City, New_Address_Province, New_Address_District, New_Latitude, New_Longitude))

        CURSOR.execute(QUERYSQL)

        CONNECTIONS.commit()

        QUERYSQL = ('INSERT INTO Address_User(User_ID, Address_ID) VALUE (\'{}\', \'{}\');'.format(USER_ID, New_Address_ID))

        CURSOR.execute(QUERYSQL)

        CURSOR.close()

        CONNECTIONS.commit()

        CONNECTIONS.close()



        DATA = {"Address_ID" : Decode_To_String(New_Address_ID), "Address_Name": Decode_To_String(New_Address_Name), "Address_Phone_Number": Decode_To_String(New_Address_Phone_Number), "Street" : Decode_To_String(New_Address_Street), "Province" : Decode_To_String(New_Address_Province), "City" : Decode_To_String(New_Address_City), "District" : Decode_To_String(New_Address_District), "Latitude" : Decode_To_String(New_Latitude), 'Longitude': Decode_To_String(New_Longitude)}
        STATUS = ErrorCode.SUCCESS_CODE

    return(STATUS, DATA)


# End of the Add_New_Address function



# Start of the Delete_Address function

def Delete_Address(USER_ID, ADDRESS_ID):
    '''
    This will delete the address into the address
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT * FROM Address, Address_User WHERE Address_User.Address_ID = \'{}\' AND Address_User.Address_ID = Address.Address_ID AND Address_User.User_ID = \'{}\' ;'.format(ADDRESS_ID, USER_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        QUERYSQL = ('DELETE FROM Address_User WHERE User_ID = \'{}\' AND Address_ID = \'{}\';'.format(USER_ID, ADDRESS_ID))

        CURSOR.execute(QUERYSQL)

        CONNECTIONS.commit()

        STATUS = ErrorCode.SUCCESS_CODE

    else:
        STATUS = ErrorCode.NO_SUCH_USER_IN_ADDRESS_ERROR

        CURSOR.close()

        CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of the Delete_Address function


# Start of the Edit_Address function

def Edit_Address(USER_ID, NEW_ADDRESS):
    '''
    This will change address into the address
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    Address_ID = NEW_ADDRESS['Address_ID']

    New_Address_Name = NEW_ADDRESS['Address_Name']

    New_Address_Phone_Number = NEW_ADDRESS['Address_Phone_Number']

    Address_Street = NEW_ADDRESS['Street']

    Address_Province = NEW_ADDRESS['Province']

    Address_City = NEW_ADDRESS['City']

    Address_District = NEW_ADDRESS['District']

    New_Latitude = ''

    New_Longitude = ''

    print(Address_Province)

    New_Address_Lon_Lat = GetGEOCODE(Address_Province+Address_City+Address_District+Address_Street)

    print(New_Address_Lon_Lat)

    if New_Address_Lon_Lat['infocode'] == '10000':
        New_Latitude = New_Address_Lon_Lat['lat']
        New_Longitude = New_Address_Lon_Lat['lon']

    QUERYSQL = ('SELECT * FROM Address WHERE Address_ID = \'{}\';'.format(Address_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        if not Phone_Schame_Check(New_Address_Phone_Number):
            STATUS = ErrorCode.WRONG_PHONE_SCHEMA_CODE
            DATA = 0

        else:
            QUERYSQL = ('UPDATE Address SET Address_Name = \'{}\', Address_Phone_Number = \'{}\', Street = \'{}\', City = \'{}\', Province = \'{}\', District = \'{}\', Latitude = \'{}\', Longitude = \'{}\' WHERE Address_ID = \'{}\';'.format(New_Address_Name, New_Address_Phone_Number, Address_Street, Address_City, Address_Province, Address_District, New_Latitude, New_Longitude, Address_ID))

            CURSOR.execute(QUERYSQL)

            CONNECTIONS.commit()

            STATUS = ErrorCode.SUCCESS_CODE


    else:
        STATUS = ErrorCode.NO_SUCH_ADDRESS_ERROR

        CURSOR.close()

        CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, DATA)


# End of the Edit_Address function





# Start of create Order id

def CreateOrderID():
    '''
    This is function to create unique Order id
    '''

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    while True:
        OrderID = uuid.uuid4()

        QUERYSQL = ('SELECT * FROM Orders WHERE Order_ID = \'{}\' ').format(OrderID)

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if not QUERYLIST:
            break

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(str(OrderID))


# End of create Order id




# Start of the Submit_Order function

def Submit_Order(USER_ID, SHOPPING_CART, SHIPPING_ADDRESS):
    '''
    This will submit the new order into the address
    There are couple things need to be done
    1. Create new order ID CreateOrderID
    2. Create new time CreateTimeNOW
    3. Insert into the order table
    4. Insert into the order user table
    5. Insert into the order product table
    6. Clear the Shopping_Cart table

    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    New_Order_ID = CreateOrderID()

    New_Time = CreateTimeNOW()

    Order_Status = 'NDP'

    Order_Payment_Method = 0

    Order_Paid_Price = 0

    Order_Shipping_Address_ID = SHIPPING_ADDRESS['Address_ID']

    Order_Total_Price = 0

    Order_Factory = 0

    for Product in SHOPPING_CART:
        Temp_Prodcut_Units = Product['Products_Units']
        Temp_Prodcut_Price = Product['Products_Price']
        Order_Total_Price = Order_Total_Price + Temp_Prodcut_Units*Temp_Prodcut_Price


    QUERYSQL = ('INSERT INTO Orders(Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID, Order_Factory) VALUE (\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\');'.format(New_Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, New_Time, Order_Shipping_Address_ID, Order_Factory))

    CURSOR.execute(QUERYSQL)

    CONNECTIONS.commit()

    QUERYSQL = ('INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\', \'{}\');'.format(USER_ID, New_Order_ID))

    CURSOR.execute(QUERYSQL)

    CONNECTIONS.commit()

    for Product in SHOPPING_CART:
        Temp_Prodcut_ID = Product['Products_ID']
        Temp_Prodcut_Units = Product['Products_Units']
        Temp_Prodcut_Price = Product['Products_Price']
        QUERYSQL = ('INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\', \'{}\', \'{}\', \'{}\');'.format(New_Order_ID, Temp_Prodcut_ID, Temp_Prodcut_Units, Temp_Prodcut_Price))

        CURSOR.execute(QUERYSQL)

    QUERYSQL = ('SELECT User_ID, Shopping_Cart_ID FROM Shopping_Cart_User WHERE User_ID = \'{}\' ;'.format(USER_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        (User_ID, Shopping_Cart_ID) = QUERYLIST[0]

        QUERYSQL = ('DELETE FROM Shopping_Cart WHERE Shopping_Cart_ID = \'{}\';'.format(Decode_To_String(Shopping_Cart_ID)))

        CURSOR.execute(QUERYSQL)

        DATA = New_Order_ID

    else:
        STATUS = ErrorCode.NO_SUCH_SHOPPING_CART_ERROR
        DATA = 0


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()


    return(STATUS, DATA)


# End of the Submit_Order function



# Start of the Deposit_Payment_Submited function

def Deposit_Payment_Submited(USER_ID, DEPOSIT_PAYMENT_INFO):
    '''
    This will submit the new order into the address
    There are couple things need to be done

    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    Order_ID = DEPOSIT_PAYMENT_INFO['Order_ID']

    Paid_Amount = DEPOSIT_PAYMENT_INFO['Paid_Amount']

    Payment_Method = DEPOSIT_PAYMENT_INFO['Payment_Method']

    Order_Status = 'PRO'

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT * FROM Orders_User WHERE User_ID = \'{}\' AND Order_ID = \'{}\' ;'.format(USER_ID, Order_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:

        if int(Paid_Amount) > 0:
            QUERYSQL = ('UPDATE Orders SET Order_Status = \'{}\', Order_Payment_Method = \'{}\', Order_Paid_Price = \'{}\' WHERE Order_ID = \'{}\';'.format(Order_Status, Payment_Method, Paid_Amount, Order_ID))

        else:
            QUERYSQL = ('UPDATE Orders SET Order_Payment_Method = \'{}\', Order_Paid_Price = \'{}\' WHERE Order_ID = \'{}\';'.format(Payment_Method, Paid_Amount, Order_ID))

        CURSOR.execute(QUERYSQL)

        STATUS = ErrorCode.SUCCESS_CODE

    else:

        STATUS = ErrorCode.ORDER_ID_DOES_NOT_MATCH


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()


    return(STATUS, DATA)


# End of the Submit_Order function
