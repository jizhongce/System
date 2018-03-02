import mysql.connector


'''
passlib.hash.sha256_crypt.hash("jizhongce123")

'''


DATABASE_CONNECT = mysql.connector.connect(user='root', password='jizhongce123', host='127.0.0.1', database='Web_Data')

CURSOR = DATABASE_CONNECT.cursor(buffered=True)

DROPQUERY = ("DROP TABLE Favorite_Products, Profiles, Orders_User, Orders_Products, Address_User, Shopping_Cart, Shopping_Cart_User, Users, Products, Orders, Address ;")

CREATE_USER = ("CREATE TABLE Users ( User_ID VARCHAR(100) UNIQUE, User_Name VARCHAR(50), Password VARCHAR(100), PhoneNum VARCHAR(50) UNIQUE, Verified BOOLEAN, TEMPCODE BIGINT UNSIGNED, PRIMARY KEY (User_Name) );")

CREATE_PROFILES = ("CREATE TABLE Profiles ( User_ID VARCHAR(100) UNIQUE, First_Name VARCHAR(100), Last_Name VARCHAR(100), Level INT, FOREIGN KEY (User_ID) REFERENCES Users(User_ID));")

CREATE_ADDRESS = ("CREATE TABLE Address ( Address_ID VARCHAR(100) UNIQUE, Street VARCHAR(100), City VARCHAR(100), Province VARCHAR(100), Post_Code VARCHAR(100), PRIMARY KEY (Address_ID));")

CREATE_ADDRESS_USER = ("CREATE TABLE Address_User ( User_ID VARCHAR(100), Address_ID VARCHAR(100),  FOREIGN KEY (User_ID) REFERENCES Users(User_ID), FOREIGN KEY (Address_ID) REFERENCES Address(Address_ID));")

CREATE_ORDERS = ("CREATE TABLE Orders ( Order_ID VARCHAR(100) UNIQUE, Order_Status INT, Order_Time DATETIME, Order_Shipping_Address_ID  VARCHAR(100), PRIMARY KEY (Order_ID), FOREIGN KEY (Order_Shipping_Address_ID) REFERENCES Address(Address_ID));")

CREATE_ORDERS_USER = ("CREATE TABLE Orders_User ( User_ID VARCHAR(100), Order_ID VARCHAR(100),  FOREIGN KEY (User_ID) REFERENCES Users(User_ID), FOREIGN KEY (Order_ID) REFERENCES Orders(Order_ID));")

CREATE_PRODUCT = ("CREATE TABLE Products ( Products_ID VARCHAR(100) UNIQUE, Products_Status INT, Products_Spec VARCHAR(100), Products_Price BIGINT UNSIGNED, PRIMARY KEY (Products_ID));")

CREATE_ORDERS_PRODUCTS = ("CREATE TABLE Orders_Products ( Order_ID VARCHAR(100), Products_ID VARCHAR(100), Products_Units BIGINT UNSIGNED, PRIMARY KEY (Order_ID, Products_ID), FOREIGN KEY (Products_ID) REFERENCES Products(Products_ID), FOREIGN KEY (Order_ID) REFERENCES Orders(Order_ID));")

CREATE_FAVORITE_PRODUCTS = ("CREATE TABLE Favorite_Products ( User_ID VARCHAR(100), Products_ID VARCHAR(100),  PRIMARY KEY (User_ID, Products_ID), FOREIGN KEY (Products_ID) REFERENCES Products(Products_ID), FOREIGN KEY (User_ID) REFERENCES Users(User_ID));")

CREATE_SHOPPING_CART = ("CREATE TABLE Shopping_Cart ( Shopping_Cart_ID VARCHAR(100), Products_ID VARCHAR(100), Products_Units BIGINT UNSIGNED, PRIMARY KEY (Shopping_Cart_ID, Products_ID), FOREIGN KEY (Products_ID) REFERENCES Products(Products_ID));")

CREATE_SHOPPING_CART_USER = ("CREATE TABLE Shopping_Cart_User ( User_ID VARCHAR(100), Shopping_Cart_ID VARCHAR(100),  PRIMARY KEY (User_ID, Shopping_Cart_ID), FOREIGN KEY (User_ID) REFERENCES Users(User_ID));")

CURSOR.execute(DROPQUERY)

CURSOR.execute(CREATE_PRODUCT)

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

CURSOR.close()

DATABASE_CONNECT.commit()

DATABASE_CONNECT.close()
