import mysql.connector
import uuid
import passlib.hash


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

ADD_USER1 = ("INSERT INTO Users(User_ID, User_Name, Password, PhoneNum, Verified, TEMPCODE) VALUE (\'{}\','jizhongce', \'{}\', '15000000000', TRUE, 123456);".format(USER1, PASSWORD1))
ADD_USER2 = ("INSERT INTO Users(User_ID, User_Name, Password, PhoneNum, Verified, TEMPCODE) VALUE (\'{}\','jizhongce123', \'{}\', '25000000000', TRUE, 123456);".format(USER2, PASSWORD2))

QUERIES.append(ADD_USER1)
QUERIES.append(ADD_USER2)

ADD_PROFILE1 = ("INSERT INTO Profiles(User_ID, First_Name, Last_Name, Level) VALUE (\'{}\','Zhongce','Ji', 1);".format(USER1))
ADD_PROFILE2 = ("INSERT INTO Profiles(User_ID, First_Name, Last_Name, Level) VALUE (\'{}\','Zhongce123','Ji', 3);".format(USER2))

QUERIES.append(ADD_PROFILE1)
QUERIES.append(ADD_PROFILE2)

ADD_ADDRESS1 = ("INSERT INTO Address(Address_ID, Street, City, Province, Post_Code) VALUE (\'{}\','west street','shanghai', 'shanghai', '023333');".format(ADDRESS1))
ADD_ADDRESS2 = ("INSERT INTO Address(Address_ID, Street, City, Province, Post_Code) VALUE (\'{}\','east street','wenzhou', 'zhejiang', '325000');".format(ADDRESS2))

QUERIES.append(ADD_ADDRESS1)
QUERIES.append(ADD_ADDRESS2)

ADD_ADDRESS_USER1 = ("INSERT INTO Address_User(User_ID, Address_ID) VALUE (\'{}\',\'{}\');".format(USER1, ADDRESS1))
ADD_ADDRESS_USER2 = ("INSERT INTO Address_User(User_ID, Address_ID) VALUE (\'{}\',\'{}\');".format(USER1, ADDRESS2))
ADD_ADDRESS_USER3 = ("INSERT INTO Address_User(User_ID, Address_ID) VALUE (\'{}\',\'{}\');".format(USER2, ADDRESS2))

QUERIES.append(ADD_ADDRESS_USER1)
QUERIES.append(ADD_ADDRESS_USER2)
QUERIES.append(ADD_ADDRESS_USER3)

ADD_ORDER1 = ("INSERT INTO Orders(Order_ID, Order_Status, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\',4, '2014-01-01', \'{}\');".format(ORDER1, ADDRESS1))
ADD_ORDER2 = ("INSERT INTO Orders(Order_ID, Order_Status, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\',3, '2015-01-01', \'{}\');".format(ORDER2, ADDRESS2))
ADD_ORDER3 = ("INSERT INTO Orders(Order_ID, Order_Status, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\',2, '2013-01-01', \'{}\');".format(ORDER3, ADDRESS1))

QUERIES.append(ADD_ORDER1)
QUERIES.append(ADD_ORDER2)
QUERIES.append(ADD_ORDER3)

ADD_ORDER_USER1 = ("INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\',\'{}\');".format(USER1, ORDER1))
ADD_ORDER_USER2 = ("INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\',\'{}\');".format(USER1, ORDER3))
ADD_ORDER_USER3 = ("INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\',\'{}\');".format(USER2, ORDER2))

QUERIES.append(ADD_ORDER_USER1)
QUERIES.append(ADD_ORDER_USER2)
QUERIES.append(ADD_ORDER_USER3)

ADD_PRODUCT1 = ("INSERT INTO Products(Products_ID, Products_Status, Products_Spec, Products_Price) VALUE (\'{}\',32, '123123', 5000);".format(PRODUCT1))
ADD_PRODUCT2 = ("INSERT INTO Products(Products_ID, Products_Status, Products_Spec, Products_Price) VALUE (\'{}\',12, '323', 3234);".format(PRODUCT2))
ADD_PRODUCT3 = ("INSERT INTO Products(Products_ID, Products_Status, Products_Spec, Products_Price) VALUE (\'{}\',32, '432', 4323);".format(PRODUCT3))
ADD_PRODUCT4 = ("INSERT INTO Products(Products_ID, Products_Status, Products_Spec, Products_Price) VALUE (\'{}\',43, '234', 1232);".format(PRODUCT4))
ADD_PRODUCT5 = ("INSERT INTO Products(Products_ID, Products_Status, Products_Spec, Products_Price) VALUE (\'{}\',65, '432', 12311);".format(PRODUCT5))
ADD_PRODUCT6 = ("INSERT INTO Products(Products_ID, Products_Status, Products_Spec, Products_Price) VALUE (\'{}\',456, '234', 23323);".format(PRODUCT6))
ADD_PRODUCT7 = ("INSERT INTO Products(Products_ID, Products_Status, Products_Spec, Products_Price) VALUE (\'{}\',0, '444', 5656);".format(PRODUCT7))

QUERIES.append(ADD_PRODUCT1)
QUERIES.append(ADD_PRODUCT2)
QUERIES.append(ADD_PRODUCT3)
QUERIES.append(ADD_PRODUCT4)
QUERIES.append(ADD_PRODUCT5)
QUERIES.append(ADD_PRODUCT6)
QUERIES.append(ADD_PRODUCT7)

ADD_ORDER_PRODUCT1 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',34);".format(ORDER1, PRODUCT1))
ADD_ORDER_PRODUCT2 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',32);".format(ORDER1, PRODUCT2))
ADD_ORDER_PRODUCT3 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',43);".format(ORDER1, PRODUCT3))

QUERIES.append(ADD_ORDER_PRODUCT1)
QUERIES.append(ADD_ORDER_PRODUCT2)
QUERIES.append(ADD_ORDER_PRODUCT3)

ADD_ORDER_PRODUCT4 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',54);".format(ORDER2, PRODUCT2))
ADD_ORDER_PRODUCT5 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',45);".format(ORDER2, PRODUCT3))
ADD_ORDER_PRODUCT6 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',34);".format(ORDER2, PRODUCT4))

QUERIES.append(ADD_ORDER_PRODUCT4)
QUERIES.append(ADD_ORDER_PRODUCT5)
QUERIES.append(ADD_ORDER_PRODUCT6)

ADD_ORDER_PRODUCT7 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',67);".format(ORDER3, PRODUCT5))
ADD_ORDER_PRODUCT8 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',76);".format(ORDER3, PRODUCT6))
ADD_ORDER_PRODUCT9 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units) VALUE (\'{}\',\'{}\',57);".format(ORDER3, PRODUCT7))

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
