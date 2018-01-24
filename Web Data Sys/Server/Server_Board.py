import mysql.connector
from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
from Server_utli import UrlParse, Log_In
import json
import hashlib, uuid


class MyNewhandler(BaseHTTPRequestHandler):
    """docstring for MyNewhandler."""
    def do_GET(self):

        URL_DICT = UrlParse(self.path)

        URL_PATH = URL_DICT['path']

        if URL_PATH == '/log_in':
            URL_QUERY = URL_DICT['query']
            USER_NAME = URL_QUERY['User_Name'][0]
            USER_PASS = URL_QUERY['Password'][0]
            
            (STATUS_CODE, USERID) = Log_In(USER_NAME, USER_PASS)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(USERID).encode())


        return


def Start_Server(server_class, handler_class):
    
    print("Welcome to System Board Server!\n")
    
    httpd = server_class(("", 8080), handler_class)
    httpd.serve_forever()



Start_Server(HTTPServer, MyNewhandler)


