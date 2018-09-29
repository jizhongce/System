import mysql.connector


'''
passlib.hash.sha256_crypt.hash("jizhongce123")

'''


def Create_Tables():
    DATABASE_CONNECT = mysql.connector.connect(user='root', password='jizhongce123', host='127.0.0.1', database='Web_Data')

    CURSOR = DATABASE_CONNECT.cursor(buffered=True)

    GET_TABLE_NAMES = ("SHOW TABLES")

    CURSOR.execute(GET_TABLE_NAMES)

    QUERYLIST = CURSOR.fetchall()

    DROPQUERYLIST = list()

    DROPQUERY = ("SET FOREIGN_KEY_CHECKS = 0")

    DROPQUERYLIST.append(DROPQUERY)

    if QUERYLIST:
        for TABLE in QUERYLIST:
            (TABLE_NAME,) = TABLE
            DROPQUERY = ("DROP TABLE {} ;".format(TABLE_NAME))
            DROPQUERYLIST.append(DROPQUERY)

    DROPQUERY = ("SET FOREIGN_KEY_CHECKS = 1")

    DROPQUERYLIST.append(DROPQUERY)

    for query in DROPQUERYLIST:
        CURSOR.execute(query)


    CREATE_PHONE_NUMBER_VERIFY_CODE = ("CREATE TABLE IF NOT EXISTS Phone_Numner_Verify_Code ( Phone_Number VARCHAR(50) UNIQUE, Verify_Code BIGINT UNSIGNED, Expiration_Time DATETIME, PRIMARY KEY (Phone_Number));")

    CREATE_USER = ("CREATE TABLE IF NOT EXISTS Users ( User_ID VARCHAR(100) UNIQUE, User_Name VARCHAR(50), Password VARCHAR(100), PhoneNum VARCHAR(50) UNIQUE, PRIMARY KEY (User_ID), FOREIGN KEY (PhoneNum) REFERENCES Phone_Numner_Verify_Code(Phone_Number) );")

    CREATE_PROFILES = ("CREATE TABLE IF NOT EXISTS Profiles ( User_ID VARCHAR(100) UNIQUE, Name VARCHAR(100), Level INT, FOREIGN KEY (User_ID) REFERENCES Users(User_ID));")

    CREATE_ADDRESS = ("CREATE TABLE IF NOT EXISTS Address ( Address_ID VARCHAR(100) UNIQUE, Address_Name VARCHAR(100), Address_Phone_Number VARCHAR(50), Street VARCHAR(100), City VARCHAR(100), Province VARCHAR(100), District VARCHAR(100), Latitude VARCHAR(50), Longitude VARCHAR(50), PRIMARY KEY (Address_ID));")

    CREATE_ADDRESS_USER = ("CREATE TABLE IF NOT EXISTS Address_User ( User_ID VARCHAR(100), Address_ID VARCHAR(100),  FOREIGN KEY (User_ID) REFERENCES Users(User_ID), FOREIGN KEY (Address_ID) REFERENCES Address(Address_ID));")

    CREATE_ORDERS = ("CREATE TABLE IF NOT EXISTS Orders ( Order_ID VARCHAR(100) UNIQUE, Order_Status VARCHAR(50), Order_Payment_Method INT, Order_Total_Price BIGINT UNSIGNED, Order_Paid_Price BIGINT UNSIGNED, Order_Time DATETIME, Order_Shipping_Address_ID  VARCHAR(100), Order_Factory INT, Factory_Latitude VARCHAR(50), Factory_Longitude VARCHAR(50), PRIMARY KEY (Order_ID), FOREIGN KEY (Order_Shipping_Address_ID) REFERENCES Address(Address_ID));")

    CREATE_ORDERS_USER = ("CREATE TABLE IF NOT EXISTS Orders_User ( User_ID VARCHAR(100), Order_ID VARCHAR(100),  FOREIGN KEY (User_ID) REFERENCES Users(User_ID), FOREIGN KEY (Order_ID) REFERENCES Orders(Order_ID));")

    CREATE_PRODUCT = ("CREATE TABLE IF NOT EXISTS Products ( Products_ID VARCHAR(100) UNIQUE, Products_Name VARCHAR(100), Products_Number VARCHAR(100), Products_Spec VARCHAR(100), Products_Color VARCHAR(100), Products_Status BOOLEAN, Products_Price BIGINT UNSIGNED, Products_Image_Dir VARCHAR(100), PRIMARY KEY (Products_ID));")

    CREATE_ORDERS_PRODUCTS = ("CREATE TABLE IF NOT EXISTS Orders_Products ( Order_ID VARCHAR(100), Products_ID VARCHAR(100), Products_Units BIGINT UNSIGNED, Products_Price BIGINT UNSIGNED, PRIMARY KEY (Order_ID, Products_ID), FOREIGN KEY (Products_ID) REFERENCES Products(Products_ID), FOREIGN KEY (Order_ID) REFERENCES Orders(Order_ID));")

    CREATE_FAVORITE_PRODUCTS = ("CREATE TABLE IF NOT EXISTS Favorite_Products ( User_ID VARCHAR(100), Products_ID VARCHAR(100),  PRIMARY KEY (User_ID, Products_ID), FOREIGN KEY (Products_ID) REFERENCES Products(Products_ID), FOREIGN KEY (User_ID) REFERENCES Users(User_ID));")

    CREATE_SHOPPING_CART = ("CREATE TABLE IF NOT EXISTS Shopping_Cart ( Shopping_Cart_ID VARCHAR(100), Products_ID VARCHAR(100), Products_Units BIGINT UNSIGNED, PRIMARY KEY (Shopping_Cart_ID, Products_ID), FOREIGN KEY (Products_ID) REFERENCES Products(Products_ID));")

    CREATE_SHOPPING_CART_USER = ("CREATE TABLE IF NOT EXISTS Shopping_Cart_User ( User_ID VARCHAR(100), Shopping_Cart_ID VARCHAR(100),  PRIMARY KEY (User_ID, Shopping_Cart_ID), FOREIGN KEY (User_ID) REFERENCES Users(User_ID));")

    CREATE_MESSAGES = ("CREATE TABLE IF NOT EXISTS Messages ( Message_ID VARCHAR(100), Message_Type INT, Message_Content VARCHAR(1028),  Message_Time DATETIME, Message_Status BOOLEAN, PRIMARY KEY (Message_ID));")

    CREATE_MESSAGES_USER = ("CREATE TABLE IF NOT EXISTS Messages_User ( User_ID VARCHAR(100), Message_ID VARCHAR(100),  PRIMARY KEY (User_ID, Message_ID), FOREIGN KEY (User_ID) REFERENCES Users(User_ID), FOREIGN KEY (Message_ID) REFERENCES Messages(Message_ID));")

    CURSOR.execute(CREATE_PRODUCT)

    CURSOR.execute(CREATE_PHONE_NUMBER_VERIFY_CODE)

    CURSOR.execute(CREATE_ADDRESS)

    CURSOR.execute(CREATE_USER)

    CURSOR.execute(CREATE_PROFILES)

    CURSOR.execute(CREATE_ADDRESS_USER)

    CURSOR.execute(CREATE_ORDERS)

    CURSOR.execute(CREATE_ORDERS_USER)

    CURSOR.execute(CREATE_ORDERS_PRODUCTS)

    CURSOR.execute(CREATE_FAVORITE_PRODUCTS)

    CURSOR.execute(CREATE_SHOPPING_CART)

    CURSOR.execute(CREATE_SHOPPING_CART_USER)

    CURSOR.execute(CREATE_MESSAGES)

    CURSOR.execute(CREATE_MESSAGES_USER)

    CURSOR.close()

    DATABASE_CONNECT.commit()

    DATABASE_CONNECT.close()
