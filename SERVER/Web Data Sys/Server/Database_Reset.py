import mysql.connector
import uuid
import passlib.hash


'''
passlib.hash.sha256_crypt.hash("jizhongce123")

'''


DATABASE_CONNECT = mysql.connector.connect(user='root', password='jizhongce123', host='127.0.0.1', database='Web_Data')

CURSOR = DATABASE_CONNECT.cursor(buffered=True)

DROPQUERY = ("DROP TABLE Users;")

CREATEQUERY = ("CREATE TABLE Users ( User_ID VARCHAR(100), User_Name VARCHAR(50), Password VARCHAR(100), PhoneNum VARCHAR(50) UNIQUE, Verified BOOLEAN, TEMPCODE BIGINT UNSIGNED, PRIMARY KEY (User_Name));")

INSERTQUERY1 = ("INSERT INTO Users(User_ID, User_Name, Password, PhoneNum, Verified, TEMPCODE) VALUES (\'{}\','jizhongce',\'{}\', '15000000000', TRUE, 123456);".format(uuid.uuid4(), passlib.hash.sha256_crypt.hash("jizhongce123")))

INSERTQUERY2 = ("INSERT INTO Users(User_ID, User_Name, Password, PhoneNum, Verified, TEMPCODE) VALUES (\'{}\','jizhongce1',\'{}\', '25000000000', FALSE, 123456);".format(uuid.uuid4(), passlib.hash.sha256_crypt.hash("jizhongce123")))

STARTEVENTQUERY = ("SET GLOBAL event_scheduler = ON")

CURSOR.execute(DROPQUERY)

CURSOR.execute(CREATEQUERY)

CURSOR.execute(INSERTQUERY1)

CURSOR.execute(INSERTQUERY2)

CURSOR.execute(STARTEVENTQUERY)

CURSOR.close()

DATABASE_CONNECT.commit()

DATABASE_CONNECT.close()
