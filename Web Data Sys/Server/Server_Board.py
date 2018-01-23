import mysql.connector
from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
from Server_utli import UrlParse
import mysql.connector
import json
import hashlib, uuid


class MyNewhandler(BaseHTTPRequestHandler):
    """docstring for MyNewhandler."""
    def do_GET(self):

        URL_DICT = UrlParse(self.path)

        # print(URL_DICT['path'])
        # print(URL_DICT['query'])

        URL_PATH = URL_DICT['path']

        if URL_PATH == '/log_in':
            URL_QUERY = URL_DICT['query']
            USER_NAME = URL_QUERY['User_Name']
            USER_PASS = URL_QUERY['Password']

            print(USER_NAME)
            print(USER_PASS)
            # cnx = mysql.connector.connect(user='root', password='jizhongce123',
            # host='127.0.0.1',
            # database='Web_Data')
            # 
            # cursor = cnx.cursor(buffered=True)
            # 
            # querysql = ("SELECT * FROM users ")
            # 
            # addquery = ("INSERT INTO users (user_name, password) VALUES ('Tim', 'jizhongce3333');")
            # 
            # cursor.execute(querysql)
            # 
            # querylist = cursor.fetchall()
            # 
            # print(querylist)
            # 
            # cursor.close()
            # 
            # cnx.commit()
            # 
            # cnx.close()


            self.send_response(200)

            self.end_headers()

            # self.wfile.write(json.dumps(querylist).encode())

            print("lol")


        return


def Start_Server(server_class, handler_class):
    
    print("Welcome to System Board Server!\n")
    
    httpd = server_class(("", 8080), handler_class)
    httpd.serve_forever()



Start_Server(HTTPServer, MyNewhandler)


