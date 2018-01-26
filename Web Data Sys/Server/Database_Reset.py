import mysql.connector

DATABASE_CONNECT = mysql.connector.connect(user='root', password='jizhongce123', host='127.0.0.1', database='Web_Data')

CURSOR = DATABASE_CONNECT.cursor(buffered=True)

DROPQUERY = ("DROP TABLE Users;")

CREATEQUERY = ("CREATE TABLE Users ( User_ID BIGINT UNSIGNED UNIQUE AUTO_INCREMENT, User_Name VARCHAR(50), Password VARCHAR(100), Password_Salt VARCHAR(50), PhoneNum VARCHAR(50) UNIQUE, TEMPCODE BIGINT UNSIGNED, PRIMARY KEY (User_Name));")

INSERTQUERY = ("INSERT INTO Users(User_ID, User_Name, Password, Password_Salt, PhoneNum) VALUES (1,'jizhongce1','jizhongce123', '', '15825679139');")

CURSOR.execute(DROPQUERY)

CURSOR.execute(CREATEQUERY)

CURSOR.execute(INSERTQUERY)

CURSOR.close()

DATABASE_CONNECT.commit()

DATABASE_CONNECT.close()



