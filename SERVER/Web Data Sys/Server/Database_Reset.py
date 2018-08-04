import mysql.connector
import uuid
import passlib.hash
from Server_utli import CreateTimeNOW, CreateVerifyCodeTime



'''
passlib.hash.sha256_crypt.hash("jizhongce123")

'''

USER1 = str(uuid.uuid4())
USER2 = str(uuid.uuid4())

PASSWORD1 = passlib.hash.sha256_crypt.hash("jizhongce123")
PASSWORD2 = passlib.hash.sha256_crypt.hash("jizhongce123")

ADDRESS1 = uuid.uuid4()
ADDRESS2 = uuid.uuid4()

ORDER1 = uuid.uuid4()
ORDER2 = uuid.uuid4()
ORDER3 = uuid.uuid4()

PRODUCT1 = uuid.uuid4()
PRODUCT2 = uuid.uuid4()
PRODUCT3 = uuid.uuid4()
PRODUCT4 = uuid.uuid4()
PRODUCT5 = uuid.uuid4()
PRODUCT6 = uuid.uuid4()
PRODUCT7 = uuid.uuid4()

SHOPPINGCART1 = uuid.uuid4()
SHOPPINGCART2 = uuid.uuid4()

QUERIES = list()

DATABASE_CONNECT = mysql.connector.connect(user='root', password='jizhongce123', host='127.0.0.1', database='Web_Data')

CURSOR = DATABASE_CONNECT.cursor(buffered=True)

ADD_PHONE_NUMBER1 = ("INSERT INTO Phone_Numner_Verify_Code(Phone_Number, Verify_Code, Expiration_Time) VALUE ('15000000000', 123456, \'{}\');".format(CreateVerifyCodeTime()))
ADD_PHONE_NUMBER2 = ("INSERT INTO Phone_Numner_Verify_Code(Phone_Number, Verify_Code, Expiration_Time) VALUE ('25000000000', 123456, \'{}\');".format(CreateVerifyCodeTime()))

QUERIES.append(ADD_PHONE_NUMBER1)
QUERIES.append(ADD_PHONE_NUMBER2)

ADD_USER1 = ("INSERT INTO Users(User_ID, User_Name, Password, PhoneNum) VALUE (\'{}\','jizhongce', \'{}\', '15000000000');".format(USER1, PASSWORD1))
ADD_USER2 = ("INSERT INTO Users(User_ID, User_Name, Password, PhoneNum) VALUE (\'{}\','jizhongce123', \'{}\', '25000000000');".format(USER2, PASSWORD2))

QUERIES.append(ADD_USER1)
QUERIES.append(ADD_USER2)

ADD_PROFILE1 = ("INSERT INTO Profiles(User_ID, Name, Level) VALUE (\'{}\','Ji Zhongce', 1);".format(USER1))
ADD_PROFILE2 = ("INSERT INTO Profiles(User_ID, Name, Level) VALUE (\'{}\','Ji Zhongce123', 3);".format(USER2))

QUERIES.append(ADD_PROFILE1)
QUERIES.append(ADD_PROFILE2)

ADD_ADDRESS1 = ("INSERT INTO Address(Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District) VALUE (\'{}\', 'Company Name1', '15000000000', 'west street','shanghai', 'shanghai', 'shanghai1');".format(ADDRESS1))
ADD_ADDRESS2 = ("INSERT INTO Address(Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District) VALUE (\'{}\', 'Company Name2', '15120012012', 'east street','wenzhou', 'zhejiang', 'wenzhou1');".format(ADDRESS2))

QUERIES.append(ADD_ADDRESS1)
QUERIES.append(ADD_ADDRESS2)

ADD_ADDRESS_USER1 = ("INSERT INTO Address_User(User_ID, Address_ID) VALUE (\'{}\',\'{}\');".format(USER1, ADDRESS1))
ADD_ADDRESS_USER2 = ("INSERT INTO Address_User(User_ID, Address_ID) VALUE (\'{}\',\'{}\');".format(USER1, ADDRESS2))
ADD_ADDRESS_USER3 = ("INSERT INTO Address_User(User_ID, Address_ID) VALUE (\'{}\',\'{}\');".format(USER2, ADDRESS2))

QUERIES.append(ADD_ADDRESS_USER1)
QUERIES.append(ADD_ADDRESS_USER2)
QUERIES.append(ADD_ADDRESS_USER3)

ADD_ORDER1 = ("INSERT INTO Orders(Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\', 'NDP', 0, 352000, 0, \'{}\', \'{}\');".format(ORDER1, CreateTimeNOW(), ADDRESS1))
ADD_ORDER2 = ("INSERT INTO Orders(Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\', 'PRO', 1, 330509, 150000, \'{}\', \'{}\');".format(ORDER2, CreateTimeNOW(), ADDRESS2))
ADD_ORDER3 = ("INSERT INTO Orders(Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\', 'SHP', 2, 391690, 391690, \'{}\', \'{}\');".format(ORDER3, CreateTimeNOW(), ADDRESS1))

QUERIES.append(ADD_ORDER1)
QUERIES.append(ADD_ORDER2)
QUERIES.append(ADD_ORDER3)

ADD_ORDER_USER1 = ("INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\',\'{}\');".format(USER1, ORDER1))
ADD_ORDER_USER2 = ("INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\',\'{}\');".format(USER1, ORDER3))
ADD_ORDER_USER3 = ("INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\',\'{}\');".format(USER2, ORDER2))

QUERIES.append(ADD_ORDER_USER1)
QUERIES.append(ADD_ORDER_USER2)
QUERIES.append(ADD_ORDER_USER3)

ADD_PRODUCT1 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'GB846-85', 'P8847384', '32 X 32', 'Black', 0, 5000, 'Product_1');".format(PRODUCT1))
ADD_PRODUCT2 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'G8465', 'P8847384','8 X 15', 'Original', 1, 3234, 'Product_1');".format(PRODUCT2))
ADD_PRODUCT3 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'GB84-88', 'P8834484','3 X 25', 'Grey', 1, 4323, 'Product_1');".format(PRODUCT3))
ADD_PRODUCT4 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'GB846-82', 'P5547384','32 X 12', 'Yellow', 1, 1232, 'Product_1');".format(PRODUCT4))
ADD_PRODUCT5 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'GB846-83', 'P8823484','33 X 33', 'Black', 0, 12311, 'Product_1');".format(PRODUCT5))
ADD_PRODUCT6 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'GB846-85', 'P8543484','32 X 55', 'Black', 1, 23323, 'Product_1');".format(PRODUCT6))
ADD_PRODUCT7 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'GB846-85', 'P8865684','45 X 65', 'Original', 0, 5656, 'Product_1');".format(PRODUCT7))

QUERIES.append(ADD_PRODUCT1)
QUERIES.append(ADD_PRODUCT2)
QUERIES.append(ADD_PRODUCT3)
QUERIES.append(ADD_PRODUCT4)
QUERIES.append(ADD_PRODUCT5)
QUERIES.append(ADD_PRODUCT6)
QUERIES.append(ADD_PRODUCT7)

ADD_ORDER_PRODUCT1 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',34, 5000);".format(ORDER1, PRODUCT1))
ADD_ORDER_PRODUCT2 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',32, 3000);".format(ORDER1, PRODUCT2))
ADD_ORDER_PRODUCT3 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',43, 2000);".format(ORDER1, PRODUCT3))

QUERIES.append(ADD_ORDER_PRODUCT1)
QUERIES.append(ADD_ORDER_PRODUCT2)
QUERIES.append(ADD_ORDER_PRODUCT3)

ADD_ORDER_PRODUCT4 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',54, 4444);".format(ORDER2, PRODUCT2))
ADD_ORDER_PRODUCT5 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',45, 333);".format(ORDER2, PRODUCT3))
ADD_ORDER_PRODUCT6 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',34, 2222);".format(ORDER2, PRODUCT4))

QUERIES.append(ADD_ORDER_PRODUCT4)
QUERIES.append(ADD_ORDER_PRODUCT5)
QUERIES.append(ADD_ORDER_PRODUCT6)

ADD_ORDER_PRODUCT7 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',67, 333);".format(ORDER3, PRODUCT5))
ADD_ORDER_PRODUCT8 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',76, 4444);".format(ORDER3, PRODUCT6))
ADD_ORDER_PRODUCT9 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',57, 555);".format(ORDER3, PRODUCT7))

QUERIES.append(ADD_ORDER_PRODUCT7)
QUERIES.append(ADD_ORDER_PRODUCT8)
QUERIES.append(ADD_ORDER_PRODUCT9)

ADD_FAVORITE_PRODUCT1 = ("INSERT INTO Favorite_Products(User_ID, Products_ID) VALUE (\'{}\',\'{}\');".format(USER1, PRODUCT2))
ADD_FAVORITE_PRODUCT2 = ("INSERT INTO Favorite_Products(User_ID, Products_ID) VALUE (\'{}\',\'{}\');".format(USER1, PRODUCT3))
ADD_FAVORITE_PRODUCT3 = ("INSERT INTO Favorite_Products(User_ID, Products_ID) VALUE (\'{}\',\'{}\');".format(USER1, PRODUCT4))

QUERIES.append(ADD_FAVORITE_PRODUCT1)
QUERIES.append(ADD_FAVORITE_PRODUCT2)
QUERIES.append(ADD_FAVORITE_PRODUCT3)

ADD_FAVORITE_PRODUCT4 = ("INSERT INTO Favorite_Products(User_ID, Products_ID) VALUE (\'{}\',\'{}\');".format(USER2, PRODUCT1))
ADD_FAVORITE_PRODUCT5 = ("INSERT INTO Favorite_Products(User_ID, Products_ID) VALUE (\'{}\',\'{}\');".format(USER2, PRODUCT5))
ADD_FAVORITE_PRODUCT6 = ("INSERT INTO Favorite_Products(User_ID, Products_ID) VALUE (\'{}\',\'{}\');".format(USER2, PRODUCT6))

QUERIES.append(ADD_FAVORITE_PRODUCT4)
QUERIES.append(ADD_FAVORITE_PRODUCT5)
QUERIES.append(ADD_FAVORITE_PRODUCT6)

ADD_SHOPPING_CART1 = ("INSERT INTO Shopping_Cart(Shopping_Cart_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',22);".format(SHOPPINGCART1, PRODUCT1))
ADD_SHOPPING_CART2 = ("INSERT INTO Shopping_Cart(Shopping_Cart_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',12);".format(SHOPPINGCART1, PRODUCT2))
ADD_SHOPPING_CART3 = ("INSERT INTO Shopping_Cart(Shopping_Cart_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',90);".format(SHOPPINGCART1, PRODUCT5))

QUERIES.append(ADD_SHOPPING_CART1)
QUERIES.append(ADD_SHOPPING_CART2)
QUERIES.append(ADD_SHOPPING_CART3)

ADD_SHOPPING_CART4 = ("INSERT INTO Shopping_Cart(Shopping_Cart_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',32);".format(SHOPPINGCART2, PRODUCT3))
ADD_SHOPPING_CART5 = ("INSERT INTO Shopping_Cart(Shopping_Cart_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',22);".format(SHOPPINGCART2, PRODUCT4))
ADD_SHOPPING_CART6 = ("INSERT INTO Shopping_Cart(Shopping_Cart_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',54);".format(SHOPPINGCART2, PRODUCT1))

QUERIES.append(ADD_SHOPPING_CART4)
QUERIES.append(ADD_SHOPPING_CART5)
QUERIES.append(ADD_SHOPPING_CART6)

ADD_SHOPPING_CART_USER1 = ("INSERT INTO Shopping_Cart_User(User_ID, Shopping_Cart_ID) VALUE (\'{}\',\'{}\');".format(USER1, SHOPPINGCART1))
ADD_SHOPPING_CART_USER2 = ("INSERT INTO Shopping_Cart_User(User_ID, Shopping_Cart_ID) VALUE (\'{}\',\'{}\');".format(USER2, SHOPPINGCART2))

QUERIES.append(ADD_SHOPPING_CART_USER1)
QUERIES.append(ADD_SHOPPING_CART_USER2)

STARTEVENTQUERY = ("SET GLOBAL event_scheduler = ON")

QUERIES.append(STARTEVENTQUERY)

for query in QUERIES:
    CURSOR.execute(query)

CURSOR.close()

DATABASE_CONNECT.commit()

DATABASE_CONNECT.close()
