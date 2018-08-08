import mysql.connector
import uuid
import passlib.hash
import datetime
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

ADD_PRODUCT1 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'GB846-85', 'P8847384', '32 X 32', '黑色', 0, 5000, 'Product_1');".format(PRODUCT1))
ADD_PRODUCT2 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'G8465', 'P8847384','8 X 15', '本色', 1, 3234, 'Product_1');".format(PRODUCT2))
ADD_PRODUCT3 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'GB84-88', 'P8834484','3 X 25', '灰色', 1, 4323, 'Product_1');".format(PRODUCT3))
ADD_PRODUCT4 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'GB846-82', 'P5547384','32 X 12', '黄色', 1, 1232, 'Product_1');".format(PRODUCT4))
ADD_PRODUCT5 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'GB846-83', 'P8823484','33 X 33', '黑色', 0, 12311, 'Product_1');".format(PRODUCT5))
ADD_PRODUCT6 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'GB846-85', 'P8543484','32 X 55', '黑色', 1, 23323, 'Product_1');".format(PRODUCT6))
ADD_PRODUCT7 = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir) VALUE (\'{}\', 'GB846-85', 'P8865684','45 X 65', '本色', 0, 5656, 'Product_1');".format(PRODUCT7))

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


# Start here is new default user
DEFAULT_USER = str(uuid.uuid4())

DEFAULT_USER_PASSWORD = passlib.hash.sha256_crypt.hash("JIzhongce123")

DEFAULT_USER_ADD_PHONE_NUMBER = ("INSERT INTO Phone_Numner_Verify_Code(Phone_Number, Verify_Code, Expiration_Time) VALUE ('15825679139', 123456, \'{}\');".format(CreateVerifyCodeTime()))

QUERIES.append(DEFAULT_USER_ADD_PHONE_NUMBER)

DEFAULT_USER_ADD_USER = ("INSERT INTO Users(User_ID, User_Name, Password, PhoneNum) VALUE (\'{}\','jizhongce', \'{}\', '15825679139');".format(DEFAULT_USER, DEFAULT_USER_PASSWORD))

QUERIES.append(DEFAULT_USER_ADD_USER)

DEFAULT_USER_ADD_PROFILE = ("INSERT INTO Profiles(User_ID, Name, Level) VALUE (\'{}\','Ji Zhongce', 1);".format(DEFAULT_USER))

QUERIES.append(DEFAULT_USER_ADD_PROFILE)

DEFAULT_USER_ADDRESS1 = str(uuid.uuid4())

DEFAULT_USER_ADDRESS2 = str(uuid.uuid4())

DEFAULT_USER_ADDRESS3 = str(uuid.uuid4())

DEFAULT_USER_ADD_ADDRESS1 = ("INSERT INTO Address(Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District) VALUE (\'{}\', '温州哈哈哈公司', '15825679139', '江滨西路118号','温州', '浙江', '鹿城区');".format(DEFAULT_USER_ADDRESS1))

QUERIES.append(DEFAULT_USER_ADD_ADDRESS1)

DEFAULT_USER_ADD_ADDRESS2 = ("INSERT INTO Address(Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District) VALUE (\'{}\', '温州新疆公司', '15825679139', '新江路118号','温州', '浙江', '瓯海区');".format(DEFAULT_USER_ADDRESS2))

QUERIES.append(DEFAULT_USER_ADD_ADDRESS2)

DEFAULT_USER_ADD_ADDRESS3 = ("INSERT INTO Address(Address_ID, Address_Name, Address_Phone_Number, Street, City, Province, District) VALUE (\'{}\', '上海标五公司', '15825679139', '标五路118号','上海市', '上海', '普陀区');".format(DEFAULT_USER_ADDRESS3))

QUERIES.append(DEFAULT_USER_ADD_ADDRESS3)

DEFAULT_USER_ADD_ADDRESS_USER1 = ("INSERT INTO Address_User(User_ID, Address_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_ADDRESS1))

QUERIES.append(DEFAULT_USER_ADD_ADDRESS_USER1)

DEFAULT_USER_ADD_ADDRESS_USER2 = ("INSERT INTO Address_User(User_ID, Address_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_ADDRESS2))

QUERIES.append(DEFAULT_USER_ADD_ADDRESS_USER2)

DEFAULT_USER_ADD_ADDRESS_USER3 = ("INSERT INTO Address_User(User_ID, Address_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_ADDRESS3))

QUERIES.append(DEFAULT_USER_ADD_ADDRESS_USER3)

DEFAULT_USER_ORDER1 = str(uuid.uuid4())
DEFAULT_USER_ORDER2 = str(uuid.uuid4())
DEFAULT_USER_ORDER3 = str(uuid.uuid4())
DEFAULT_USER_ORDER4 = str(uuid.uuid4())
DEFAULT_USER_ORDER5 = str(uuid.uuid4())
DEFAULT_USER_ORDER6 = str(uuid.uuid4())
DEFAULT_USER_ORDER7 = str(uuid.uuid4())


DEFAULT_USER_ADD_ORDER1 = ("INSERT INTO Orders(Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\', 'NDP', 1, 8000, 0, \'{}\', \'{}\');".format(DEFAULT_USER_ORDER1, CreateTimeNOW(), DEFAULT_USER_ADDRESS1))

QUERIES.append(DEFAULT_USER_ADD_ORDER1)

DEFAULT_USER_ADD_ORDER1_PRODUCT1 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',1, 5000);".format(DEFAULT_USER_ORDER1, PRODUCT1))
DEFAULT_USER_ADD_ORDER1_PRODUCT2 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',1, 3000);".format(DEFAULT_USER_ORDER1, PRODUCT2))

QUERIES.append(DEFAULT_USER_ADD_ORDER1_PRODUCT1)
QUERIES.append(DEFAULT_USER_ADD_ORDER1_PRODUCT2)

DEFAULT_USER_ADD_ORDER2 = ("INSERT INTO Orders(Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\', 'PRO', 1, 8000, 8000, \'{}\', \'{}\');".format(DEFAULT_USER_ORDER2, CreateTimeNOW() - datetime.timedelta(minutes=1), DEFAULT_USER_ADDRESS2))

QUERIES.append(DEFAULT_USER_ADD_ORDER2)

DEFAULT_USER_ADD_ORDER2_PRODUCT1 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',1, 5000);".format(DEFAULT_USER_ORDER2, PRODUCT1))
DEFAULT_USER_ADD_ORDER2_PRODUCT2 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',1, 3000);".format(DEFAULT_USER_ORDER2, PRODUCT2))

QUERIES.append(DEFAULT_USER_ADD_ORDER2_PRODUCT1)
QUERIES.append(DEFAULT_USER_ADD_ORDER2_PRODUCT2)

DEFAULT_USER_ADD_ORDER3 = ("INSERT INTO Orders(Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\', 'PCK', 3, 50000, 25000, \'{}\', \'{}\');".format(DEFAULT_USER_ORDER3, CreateTimeNOW() - datetime.timedelta(minutes=2), DEFAULT_USER_ADDRESS1))

QUERIES.append(DEFAULT_USER_ADD_ORDER3)

DEFAULT_USER_ADD_ORDER3_PRODUCT1 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',10, 5000);".format(DEFAULT_USER_ORDER3, PRODUCT1))

QUERIES.append(DEFAULT_USER_ADD_ORDER3_PRODUCT1)

DEFAULT_USER_ADD_ORDER4 = ("INSERT INTO Orders(Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\', 'SHP', 4, 32000, 16000, \'{}\', \'{}\');".format(DEFAULT_USER_ORDER4, CreateTimeNOW() - datetime.timedelta(minutes=3), DEFAULT_USER_ADDRESS3))

QUERIES.append(DEFAULT_USER_ADD_ORDER4)

DEFAULT_USER_ADD_ORDER4_PRODUCT1 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',10, 3200);".format(DEFAULT_USER_ORDER4, PRODUCT4))

QUERIES.append(DEFAULT_USER_ADD_ORDER4_PRODUCT1)

DEFAULT_USER_ADD_ORDER5 = ("INSERT INTO Orders(Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\', 'ORC', 2, 30000, 30000, \'{}\', \'{}\');".format(DEFAULT_USER_ORDER5, CreateTimeNOW() - datetime.timedelta(minutes=4), DEFAULT_USER_ADDRESS2))

QUERIES.append(DEFAULT_USER_ADD_ORDER5)

DEFAULT_USER_ADD_ORDER5_PRODUCT1 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',10, 3000);".format(DEFAULT_USER_ORDER5, PRODUCT3))

QUERIES.append(DEFAULT_USER_ADD_ORDER5_PRODUCT1)

DEFAULT_USER_ADD_ORDER6 = ("INSERT INTO Orders(Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\', 'SHP', 1, 30000, 30000, \'{}\', \'{}\');".format(DEFAULT_USER_ORDER6, CreateTimeNOW() - datetime.timedelta(minutes=1), DEFAULT_USER_ADDRESS1))

QUERIES.append(DEFAULT_USER_ADD_ORDER6)

DEFAULT_USER_ADD_ORDER6_PRODUCT1 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',10, 3000);".format(DEFAULT_USER_ORDER6, PRODUCT3))

QUERIES.append(DEFAULT_USER_ADD_ORDER6_PRODUCT1)

DEFAULT_USER_ADD_ORDER7 = ("INSERT INTO Orders(Order_ID, Order_Status, Order_Payment_Method, Order_Total_Price, Order_Paid_Price, Order_Time, Order_Shipping_Address_ID) VALUE (\'{}\', 'PCK', 2, 23000, 23000, \'{}\', \'{}\');".format(DEFAULT_USER_ORDER7, CreateTimeNOW() - datetime.timedelta(minutes=1), DEFAULT_USER_ADDRESS1))

QUERIES.append(DEFAULT_USER_ADD_ORDER7)

DEFAULT_USER_ADD_ORDER7_PRODUCT1 = ("INSERT INTO Orders_Products(Order_ID, Products_ID, Products_Units, Products_Price) VALUE (\'{}\',\'{}\',10, 2300);".format(DEFAULT_USER_ORDER7, PRODUCT6))

QUERIES.append(DEFAULT_USER_ADD_ORDER7_PRODUCT1)


DEFAULT_USER_ADD_ORDER_USER1 = ("INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_ORDER1))
DEFAULT_USER_ADD_ORDER_USER2 = ("INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_ORDER2))
DEFAULT_USER_ADD_ORDER_USER3 = ("INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_ORDER3))
DEFAULT_USER_ADD_ORDER_USER4 = ("INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_ORDER4))
DEFAULT_USER_ADD_ORDER_USER5 = ("INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_ORDER5))
DEFAULT_USER_ADD_ORDER_USER6 = ("INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_ORDER6))
DEFAULT_USER_ADD_ORDER_USER7 = ("INSERT INTO Orders_User(User_ID, Order_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_ORDER7))

QUERIES.append(DEFAULT_USER_ADD_ORDER_USER1)
QUERIES.append(DEFAULT_USER_ADD_ORDER_USER2)
QUERIES.append(DEFAULT_USER_ADD_ORDER_USER3)
QUERIES.append(DEFAULT_USER_ADD_ORDER_USER4)
QUERIES.append(DEFAULT_USER_ADD_ORDER_USER5)
QUERIES.append(DEFAULT_USER_ADD_ORDER_USER6)
QUERIES.append(DEFAULT_USER_ADD_ORDER_USER7)

DEFAULT_USER_MESSAGES1 = str(uuid.uuid4())
DEFAULT_USER_MESSAGES2 = str(uuid.uuid4())
DEFAULT_USER_MESSAGES3 = str(uuid.uuid4())
DEFAULT_USER_MESSAGES4 = str(uuid.uuid4())
DEFAULT_USER_MESSAGES7 = str(uuid.uuid4())


DEFAULT_USER_ADD_MESSAGES1 = ("INSERT INTO Messages(Message_ID, Message_Type, Message_Content, Message_Time, Message_Status) VALUE (\'{}\', \'{}\', '产品GB987的价格已经发生了浮动，请重新关注产品价格，确认后可以继续购买,新价格由2018年8月10日开始生效!', \'{}\', \'{}\');".format(DEFAULT_USER_MESSAGES1, 1, CreateTimeNOW() - datetime.timedelta(minutes=7), 1))
DEFAULT_USER_ADD_MESSAGES2 = ("INSERT INTO Messages(Message_ID, Message_Type, Message_Content, Message_Time, Message_Status) VALUE (\'{}\', \'{}\', '产品GB888的价格已经发生了浮动，请重新关注产品价格，确认后可以继续购买,新价格由2018年8月10日开始生效!', \'{}\', \'{}\');".format(DEFAULT_USER_MESSAGES2, 1, CreateTimeNOW() - datetime.timedelta(minutes=6), 0))
DEFAULT_USER_ADD_MESSAGES3 = ("INSERT INTO Messages(Message_ID, Message_Type, Message_Content, Message_Time, Message_Status) VALUE (\'{}\', \'{}\', '您的订单121232123的送货地址成功修改，请关注是否本人操作，如不是请联系客服!', \'{}\', \'{}\');".format(DEFAULT_USER_MESSAGES3, 2, CreateTimeNOW() - datetime.timedelta(minutes=5), 1))
DEFAULT_USER_ADD_MESSAGES4 = ("INSERT INTO Messages(Message_ID, Message_Type, Message_Content, Message_Time, Message_Status) VALUE (\'{}\', \'{}\', '您的订单88888888的送货地址成功修改，请关注是否本人操作，如不是请联系客服!', \'{}\', \'{}\');".format(DEFAULT_USER_MESSAGES4, 2, CreateTimeNOW() - datetime.timedelta(minutes=4), 0))
DEFAULT_USER_ADD_MESSAGES7 = ("INSERT INTO Messages(Message_ID, Message_Type, Message_Content, Message_Time, Message_Status) VALUE (\'{}\', \'{}\', '您的订单121232123已经发货，预计到达时间7天，请关注物流信息!', \'{}\', \'{}\');".format(DEFAULT_USER_MESSAGES7, 4, CreateTimeNOW() - datetime.timedelta(minutes=1), 1))

QUERIES.append(DEFAULT_USER_ADD_MESSAGES1)
QUERIES.append(DEFAULT_USER_ADD_MESSAGES2)
QUERIES.append(DEFAULT_USER_ADD_MESSAGES3)
QUERIES.append(DEFAULT_USER_ADD_MESSAGES4)
QUERIES.append(DEFAULT_USER_ADD_MESSAGES7)


DEFAULT_USER_ADD_MESSAGES_USER1 = ("INSERT INTO Messages_User(User_ID, Message_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_MESSAGES1))
DEFAULT_USER_ADD_MESSAGES_USER2 = ("INSERT INTO Messages_User(User_ID, Message_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_MESSAGES2))
DEFAULT_USER_ADD_MESSAGES_USER3 = ("INSERT INTO Messages_User(User_ID, Message_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_MESSAGES3))
DEFAULT_USER_ADD_MESSAGES_USER4 = ("INSERT INTO Messages_User(User_ID, Message_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_MESSAGES4))
DEFAULT_USER_ADD_MESSAGES_USER7 = ("INSERT INTO Messages_User(User_ID, Message_ID) VALUE (\'{}\',\'{}\');".format(DEFAULT_USER, DEFAULT_USER_MESSAGES7))

QUERIES.append(DEFAULT_USER_ADD_MESSAGES_USER1)
QUERIES.append(DEFAULT_USER_ADD_MESSAGES_USER2)
QUERIES.append(DEFAULT_USER_ADD_MESSAGES_USER3)
QUERIES.append(DEFAULT_USER_ADD_MESSAGES_USER4)
QUERIES.append(DEFAULT_USER_ADD_MESSAGES_USER7)



# End here is new default user

for query in QUERIES:
    CURSOR.execute(query)

CURSOR.close()

DATABASE_CONNECT.commit()

DATABASE_CONNECT.close()
