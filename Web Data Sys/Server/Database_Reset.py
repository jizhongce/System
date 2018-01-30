import mysql.connector
import uuid

DATABASE_CONNECT = mysql.connector.connect(user='root', password='jizhongce123', host='127.0.0.1', database='Web_Data')

CURSOR = DATABASE_CONNECT.cursor(buffered=True)

DROPQUERY = ("DROP TABLE Users;")

CREATEQUERY = ("CREATE TABLE Users ( User_ID VARCHAR(100), User_Name VARCHAR(50), Password VARCHAR(100), Password_Salt VARCHAR(50), PhoneNum VARCHAR(50) UNIQUE, Verified BOOLEAN, TEMPCODE BIGINT UNSIGNED, PRIMARY KEY (User_Name));")

INSERTQUERY = ("INSERT INTO Users(User_ID, User_Name, Password, Password_Salt, PhoneNum, Verified, TEMPCODE) VALUES (\'{}\','jizhongce1','jizhongce123', '', '1500000202', FALSE, 123456);".format(uuid.uuid4()))

STARTEVENTQUERY = ("SET GLOBAL event_scheduler = ON")

CURSOR.execute(DROPQUERY)

CURSOR.execute(CREATEQUERY)

CURSOR.execute(INSERTQUERY)

CURSOR.execute(STARTEVENTQUERY)

CURSOR.close()

DATABASE_CONNECT.commit()

DATABASE_CONNECT.close()
