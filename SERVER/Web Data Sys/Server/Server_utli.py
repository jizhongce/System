import urllib.parse
import mysql.connector
import uuid
from SMS_utli import SendSMS
from random import randint
import passlib.hash
import re
import ErrorCode
import datetime

#

# This is method to create a new date and time with string format

def CreateTimeNOW():
    return(datetime.datetime.now().isoformat(timespec='seconds').replace('T', ' '))




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

        if passlib.hash.sha256_crypt.verify(LOG_IN_PASSWORD, PASSWORD):
            DATA = USERID

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
                    QUERYSQL = ('UPDATE Phone_Numner_Verify_Code SET Verify_Code = \'{}\' WHERE Phone_Number = \'{}\'; ').format(VERIFY_CODE, SIGN_UP_PHONE_NUMBER)
                    CURSOR.execute(QUERYSQL)
                    STATUS = ErrorCode.SUCCESS_CODE


                else:
                    QUERYSQL = ('INSERT INTO Phone_Numner_Verify_Code(Phone_Number, Verify_Code) VALUES (\'{}\', \'{}\');').format(SIGN_UP_PHONE_NUMBER, VERIFY_CODE)
                    CURSOR.execute(QUERYSQL)
                    STATUS = ErrorCode.SUCCESS_CODE

                EVENTQUERY = ('SET GLOBAL event_scheduler = ON;')

                DELQUERY = ('CREATE EVENT {} ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 2 MINUTE DO UPDATE Phone_Numner_Verify_Code SET Verify_Code = NULL WHERE Phone_Number = \'{}\'; '.format((str(RandCode())+'_delete_code'), SIGN_UP_PHONE_NUMBER))

                CURSOR.execute(EVENTQUERY)

                CURSOR.execute(DELQUERY)


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
                    QUERYSQL = ('UPDATE Phone_Numner_Verify_Code SET Verify_Code = \'{}\' WHERE Phone_Number = \'{}\'; ').format(VERIFY_CODE, CHANGE_PASSWORD_PHONE_NUMBER)
                    CURSOR.execute(QUERYSQL)
                    STATUS = ErrorCode.SUCCESS_CODE


                else:
                    QUERYSQL = ('INSERT INTO Phone_Numner_Verify_Code(Phone_Number, Verify_Code) VALUES (\'{}\', \'{}\');').format(CHANGE_PASSWORD_PHONE_NUMBER, VERIFY_CODE)
                    CURSOR.execute(QUERYSQL)
                    STATUS = ErrorCode.SUCCESS_CODE

                EVENTQUERY = ('SET GLOBAL event_scheduler = ON;')

                DELQUERY = ('CREATE EVENT {} ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 2 MINUTE DO UPDATE Phone_Numner_Verify_Code SET Verify_Code = NULL WHERE Phone_Number = \'{}\'; '.format((str(RandCode())+'_delete_code'), CHANGE_PASSWORD_PHONE_NUMBER))

                CURSOR.execute(EVENTQUERY)

                CURSOR.execute(DELQUERY)


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
    return(len(Phonenum) == 11 and bool(Phonenum.isdigit))

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
                QUERYSQL = ('SELECT * FROM Phone_Numner_Verify_Code WHERE Phone_Number = \'{}\' ').format(SIGN_UP_PHONE_NUMBER)

                CURSOR.execute(QUERYSQL)

                QUERYLIST = CURSOR.fetchall()

                if QUERYLIST:
                    (Phone_Number, Verify_Code, ) = QUERYLIST[0]

                    if Verify_Code == int(SIGN_UP_VERIFY_CODE):

                        STATUS = ErrorCode.SUCCESS_CODE

                        USERID = CreateUserID()

                        SHOPPINGCARTID = CreateShoppingCartID()

                        PASSWORD = passlib.hash.sha256_crypt.hash(SIGN_UP_PASSWORD)

                        QUERYSQL_USER = ('INSERT INTO Users(User_ID, User_Name, Password, PhoneNum, Verified, TEMPCODE) VALUES (\'{}\', \'{}\', \'{}\', \'{}\', FALSE, 1232321);'.format(USERID, 'jiizhongce', PASSWORD, Phone_Number))

                        QUERYSQL_SHOPPINGCART = ('INSERT INTO Shopping_Cart_User(User_ID, Shopping_Cart_ID) VALUES (\'{}\', \'{}\');').format(USERID, SHOPPINGCARTID)

                        QUERYSQL_PROFILE = ('INSERT INTO Profiles(User_ID, First_Name, Last_Name, Level) VALUES (\'{}\', \'{}\', \'{}\', 1);').format(USERID, ' ', ' ')

                        CURSOR.execute(QUERYSQL_USER)

                        CURSOR.execute(QUERYSQL_SHOPPINGCART)

                        CURSOR.execute(QUERYSQL_PROFILE)
                        DATA = USERID

                    else:
                        STATUS = ErrorCode.WRONG_VERIFY_CODE


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
                    (Phone_Number, Verify_Code, ) = QUERYLIST[0]

                    if Verify_Code == int(CHANGE_PASSWORD_VERIFY_CODE):

                        PASSWORD = passlib.hash.sha256_crypt.hash(CHANGE_PASSWORD_NEW_PASSWORD)

                        UPDATEQUERY = ('UPDATE Users SET Password = \'{}\' WHERE PhoneNum = \'{}\';'.format(PASSWORD, CHANGE_PASSWORD_PHONE_NUMBER))

                        CURSOR.execute(UPDATEQUERY)

                        STATUS = ErrorCode.SUCCESS_CODE



                    else:
                        STATUS = ErrorCode.WRONG_VERIFY_CODE


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
        DATA = {'User_ID': User_ID, 'Phone_Number': Phone_Number}
        STATUS = ErrorCode.SUCCESS_CODE

    else:
        STATUS = ErrorCode.USER_EXIST_CODE
        DATA = 0

    return(STATUS, DATA)


# End of Get_User_Info






#
# # This fucntion Clear_TEMPCODE
#
# def Clear_TEMPCODE(PHONENUM):
#     CONNECTIONS = mysql.connector.connect(user='root',
#     password='jizhongce123',
#     host='127.0.0.1',
#     database='Web_Data')
#
#     CURSOR = CONNECTIONS.cursor(buffered=True)
#
#     QUERYSQL = ('UPDATE Users SET TEMPCODE = NULL WHERE PhoneNum = \'{}\'; ').format(PHONENUM)
#
#     CURSOR.execute(QUERYSQL)
#
#     CURSOR.close()
#
#     CONNECTIONS.commit()
#
#     CURSOR = CONNECTIONS.cursor(buffered=True)
#
#     #First, we need to check whether the TEMPCODE is already exist in the database
#
#     QUERYSQL = ('SELECT TEMPCODE FROM Users WHERE PhoneNum = \'{}\' ').format(PHONENUM)
#
#     CURSOR.execute(QUERYSQL)
#
#     QUERYLIST = CURSOR.fetchall()
#
#     (TEMPCODE, ) = QUERYLIST[0]
#
#     print(TEMPCODE)
#
#     CONNECTIONS.close()
#
#
# # End of Clear_TEMPCODE
#
#


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
            (Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) = product
            Product_List.append({"Products_ID": Products_ID, "Products_Name": Products_Name, "Products_Number": Products_Number, "Products_Spec": Products_Spec, "Products_Color": Products_Color, "Products_Status": Products_Status, "Products_Price": Products_Price, "Products_Image_Dir": Products_Image_Dir})

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(STATUS, Product_List)



#End of the Get_All_Products function


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
        DATA = {"Products_ID": Products_ID, "Products_Name": Products_Name, "Products_Number": Products_Number, "Products_Spec": Products_Spec, "Products_Color": Products_Color, "Products_Status": Products_Status, "Products_Price": Products_Price, "Products_Image_Dir": Products_Image_Dir}

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
            Product_List.append({"Products_ID": Products_ID, "Products_Name": Products_Name, "Products_Number": Products_Number, "Products_Spec": Products_Spec, "Products_Color": Products_Color, "Products_Status": Products_Status, "Products_Price": Products_Price, "Products_Image_Dir": Products_Image_Dir, "Products_Units": ProductUnits})

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
        QUERYSQL = ('UPDATE Shopping_Cart SET Products_Units = \'{}\' WHERE Shopping_Cart_ID = \'{}\' AND Products_ID = \'{}\';'.format(Product_Units, Shopping_Cart_ID, Product_ID))
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

        QUERYSQL = ('DELETE FROM Shopping_Cart WHERE Shopping_Cart_ID = \'{}\' AND Products_ID = \'{}\';'.format(Shopping_Cart_ID, productid))
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

        QUERYSQL = ('SELECT * FROM Shopping_Cart WHERE Shopping_Cart_ID = \'{}\' AND Products_ID = \'{}\' ;'.format(Shopping_Cart_ID, Temp_Prodcut_ID))

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if QUERYLIST:

            (Shopping_Cart_ID, Products_ID, Products_Units) = QUERYLIST[0]

            new_Product_Units = Temp_Product_Units + Products_Units

            QUERYSQL = ('UPDATE Shopping_Cart SET Products_Units = \'{}\' WHERE Shopping_Cart_ID = \'{}\' AND Products_ID = \'{}\';'.format(new_Product_Units, Shopping_Cart_ID, Products_ID))

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
            QUERYSQL = ("INSERT INTO Shopping_Cart(Shopping_Cart_ID, Products_ID, Products_Units) VALUE (\'{}\', \'{}\', \'{}\');".format(Shopping_Cart_ID, Temp_Prodcut_ID, Temp_Product_Units))

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
        (User_ID, First_Name, Last_Name, Level) = QUERYLIST[0]
        DATA = {"User_ID": User_ID, "First_Name": First_Name, "Last_Name": Last_Name, "Level": Level}

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
            Favorite_Product_List.append({"Products_ID": Products_ID, "Products_Name": Products_Name, "Products_Number": Products_Number, "Products_Spec": Products_Spec, "Products_Color": Products_Color, "Products_Status": Products_Status, "Products_Price": Products_Price, "Products_Image_Dir": Products_Image_Dir})

        DATA = Favorite_Product_List

    else:
        STATUS = ErrorCode.NO_FAVORITE_PRODUCT_EXIST_ERROR
        DATA = 0

    return(STATUS, DATA)


# End of the Get_Favorite_Product function



# Start of the Get_User_Order function

def Get_User_Order(USER_ID):
    '''
    This is the function which will get the order list of specific user in the database
    '''
    STATUS = ErrorCode.SUCCESS_CODE

    DATA = 0

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT Orders.Order_ID, Orders.Order_Status, Orders.Order_Payment_Method, Orders.Order_Total_Price, Orders.Order_Time, Orders.Order_Shipping_Address_ID FROM Orders_User, Orders WHERE Orders_User.Order_ID = Orders.Order_ID AND Orders_User.User_ID = \'{}\';'.format(USER_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    Orders = list()

    if QUERYLIST:
        for order in QUERYLIST:
            (Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Time, Order_Shipping_Address_ID) = order
            Orders.append({"Order_ID": Order_ID, "Order_Status": Order_Status, "Order_Payment_Method":Order_Payment_Method, "Order_Total_Price" : Order_Total_Price, "Order_Time": str(Order_Time), "Order_Shipping_Address_ID": Order_Shipping_Address_ID})

        DATA = Orders

    else:
        STATUS = ErrorCode.NO_ORDER_EXIST_ERROR
        DATA = 0

    return(STATUS, DATA)


# End of the Get_User_Order function



# Start of the Get_Single_Order function

def Get_Single_Order(Order_ID):
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

    QUERYSQL = ('SELECT Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID FROM Orders WHERE Orders.Order_ID = \'{}\';'.format(Order_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        (Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID) = QUERYLIST[0]
        Basic_Info = {"Order_ID": Order_ID, "Order_Status": Order_Status, "Order_Payment_Method": Order_Payment_Method, "Order_Total_Price":Order_Total_Price, "Order_Paid_Price": Order_Paid_Price, "Order_Time": str(Order_Time)}

        QUERYSQL = ('SELECT Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District FROM Address WHERE Address_ID = \'{}\';'.format(Order_Shipping_Address_ID))

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if QUERYLIST:
            (Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District) = QUERYLIST[0]
            Shipping_Info = {"Address_ID": Address_ID, "Address_Name": Address_Name, "Address_Phone_Number": Address_Phone_Number, "Street": Street, "City": City, "Province": Province, 'District': District}

            QUERYSQL = ('SELECT Products.Products_ID, Products.Products_Name, Products.Products_Number, Products.Products_Status, Products.Products_Spec, Products.Products_Color, Products.Products_Price, Products.Products_Image_Dir, Orders_Products.Products_Price, Orders_Products.Products_Units FROM Products, Orders_Products WHERE Orders_Products.Order_ID = \'{}\' AND Orders_Products.Products_ID = Products.Products_ID ;'.format(Order_ID))

            CURSOR.execute(QUERYSQL)

            QUERYLIST = CURSOR.fetchall()

            Product_List = list()

            if QUERYLIST:
                for product in QUERYLIST:
                    (Products_ID, Products_Name, Products_Number,  Products_Status, Products_Spec, Products_Color, Products_Price, Product_Price, Products_Image_Dir, Product_Units) = product
                    Product_List.append({"Products_ID": Products_ID, "Products_Name": Products_Name, "Products_Number": Products_Number, "Products_Spec": Products_Spec, "Products_Color": Products_Color, "Products_Status": Products_Status, "Products_Price": Products_Price, "Products_Image_Dir": Products_Image_Dir, "Products_Units": Product_Units})

                Order_Info = {"Basic_Info": Basic_Info, "Shipping_Info": Shipping_Info, "Product_List": Product_List}
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


    return(STATUS, DATA)


# End of the Get_Single_Order function


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

    QUERYSQL = ('SELECT Address.Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District FROM Address, Address_User  WHERE Address.Address_ID = Address_User.Address_ID AND Address_User.User_ID = \'{}\';'.format(USER_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    Address_Book = list()

    if QUERYLIST:
        for Address in QUERYLIST:
            (Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District) = Address
            Address_Book.append({"Address_ID": Address_ID, "Address_Name": Address_Name, "Address_Phone_Number": Address_Phone_Number, "Street": Street, "City": City, "Province": Province, "District": District})

        DATA = Address_Book

    else:
        STATUS = ErrorCode.NO_ADDRESS_EXIST_ERROR
        DATA = 0

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

    if not Phone_Schame_Check(New_Address_Phone_Number):
        STATUS = ErrorCode.WRONG_PHONE_SCHEMA_CODE
        DATA = 0

    else:
        QUERYSQL = ('INSERT INTO Address(Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District) VALUE (\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\');'.format(New_Address_ID, New_Address_Name, New_Address_Phone_Number, New_Address_Street, New_Address_City, New_Address_Province, New_Address_District))

        CURSOR.execute(QUERYSQL)

        CONNECTIONS.commit()

        QUERYSQL = ('INSERT INTO Address_User(User_ID, Address_ID) VALUE (\'{}\', \'{}\');'.format(USER_ID, New_Address_ID))

        CURSOR.execute(QUERYSQL)

        CURSOR.close()

        CONNECTIONS.commit()

        CONNECTIONS.close()

        DATA = {"Address_ID" : New_Address_ID, "Address_Name": New_Address_Name, "Address_Phone_Number": New_Address_Phone_Number, "Street" : New_Address_Street, "Province" : New_Address_Province, "City" : New_Address_City, "District" : New_Address_District}
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

    QUERYSQL = ('SELECT * FROM Address WHERE Address_ID = \'{}\';'.format(Address_ID))

    CURSOR.execute(QUERYSQL)

    QUERYLIST = CURSOR.fetchall()

    if QUERYLIST:
        if not Phone_Schame_Check(New_Address_Phone_Number):
            STATUS = ErrorCode.WRONG_PHONE_SCHEMA_CODE
            DATA = 0

        else:
            QUERYSQL = ('UPDATE Address SET Address_Name = \'{}\', Address_Phone_Number = \'{}\', Street = \'{}\', City = \'{}\', Province = \'{}\', District = \'{}\' WHERE Address_ID = \'{}\';'.format(New_Address_Name, New_Address_Phone_Number, Address_Street, Address_City, Address_Province, Address_District, Address_ID))

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

    for Product in SHOPPING_CART:
        Temp_Prodcut_Units = Product['Products_Units']
        Temp_Prodcut_Price = Product['Products_Price']
        Order_Total_Price = Order_Total_Price + Temp_Prodcut_Units*Temp_Prodcut_Price


    QUERYSQL = ('INSERT INTO Orders(Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\', \'{}\');'.format(New_Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, New_Time, Order_Shipping_Address_ID))

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

        QUERYSQL = ('DELETE FROM Shopping_Cart WHERE Shopping_Cart_ID = \'{}\';'.format(Shopping_Cart_ID))

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
