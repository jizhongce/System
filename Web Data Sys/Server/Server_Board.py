from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
from Server_utli import UrlParse, Log_In, Sign_Up, ServerSMS, Verify_Code
import json
import hashlib, uuid



class MyNewhandler(BaseHTTPRequestHandler):
    """docstring for MyNewhandler."""
    def do_GET(self):

        URL_DICT = UrlParse(self.path)

        URL_PATH = URL_DICT['path']

        if URL_PATH == '/log_in':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))
            USER_NAME = USER_DATA['User_Name']
            USER_PASS = USER_DATA['Password']

            (STATUS_CODE, USERID) = Log_In(USER_NAME, USER_PASS)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(USERID).encode())


        elif URL_PATH == '/phone_verify':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))
            USER_PHONE = USER_DATA['Phone_Number']
            USER_TEMPCODE = USER_DATA['TEMPCODE']

            (STATUS_CODE, USERID) = Verify_Code(USER_PHONE, USER_TEMPCODE)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(USERID).encode())

        return

    def do_POST(self):
        URL_DICT = UrlParse(self.path)

        URL_PATH = URL_DICT['path']

        if URL_PATH == '/sign_up':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_NAME = USER_DATA['User_Name']
            USER_PASS = USER_DATA['Password']
            USER_PHONE = USER_DATA['Phone_Number']

            (STATUS_CODE, USERID) = Sign_Up(USER_NAME, USER_PASS, USER_PHONE)

            if STATUS_CODE ==200:

                (STATUS, MESSAGE) = ServerSMS(USER_PHONE)

                self.send_response(STATUS)

                self.end_headers()

            else:

                self.send_response(STATUS_CODE)

                self.end_headers()

        return



def Start_Server(server_class, handler_class):

    print("Welcome to System Board Server!\n")

    httpd = server_class(("", 8080), handler_class)
    httpd.serve_forever()



Start_Server(HTTPServer, MyNewhandler)
