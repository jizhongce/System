from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
from Server_utli import Log_In, Sign_Up, ServerSMS, Verify_Code, Pass_Change_Get_User, Change_Pass, Phone_Change_Log_In, Change_Phone, Get_All_Products
import json
import hashlib, uuid
import ErrorCode


class MyNewhandler(BaseHTTPRequestHandler):
    """docstring for MyNewhandler."""
    def do_GET(self):

        URL_PATH = self.path

        if URL_PATH == '/get_all_products':
            (STATUS_CODE, DATA) = Get_All_Products()
            if STATUS_CODE == ErrorCode.SUCCESS_CODE:
                self.send_response(STATUS_CODE)
                self.end_headers()
                self.wfile.write(json.dumps(DATA).encode())

        # if URL_PATH == '/log_in':
        #     USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))
        #     USER_NAME = USER_DATA['User_Name']
        #     USER_PASS = USER_DATA['Password']
        #
        #     (STATUS_CODE, DATA) = Log_In(USER_NAME, USER_PASS)
        #
        #     if STATUS_CODE == ErrorCode.SUCCESS_CODE:
        #         USERID = DATA
        #         self.send_response(STATUS_CODE)
        #         self.end_headers()
        #         self.wfile.write(json.dumps(USERID).encode())
        #
        #     elif STATUS_CODE == ErrorCode.NO_SUCH_USER_CODE:
        #         self.send_response(STATUS_CODE)
        #         self.end_headers()
        #         self.wfile.write(json.dumps(DATA).encode())
        #
        #     elif STATUS_CODE == ErrorCode.WORNG_PASSWORD_CODE:
        #         self.send_response(STATUS_CODE)
        #         self.end_headers()
        #         self.wfile.write(json.dumps(DATA).encode())
        #
        #     elif STATUS_CODE == ErrorCode.PHONE_NOT_VERIFIED_CODE:
        #         PHONENUM = DATA
        #
        #         STATUS = ServerSMS(PHONENUM)
        #
        #         if STATUS == ErrorCode.SUCCESS_CODE:
        #             self.send_response(STATUS_CODE)
        #
        #             self.end_headers()
        #
        #             self.wfile.write(json.dumps(PHONENUM).encode())
        #
        #         else:
        #             self.send_response(STATUS)
        #
        #             self.end_headers()
        #
        #
        #     else:
        #         self.send_response(STATUS_CODE)
        #
        #         self.end_headers()
        #
        #         self.wfile.write(json.dumps(DATA).encode())



            # Next deal with STATUS_CODE AND DATA
            #
            # self.send_response(STATUS_CODE)
            #
            # self.end_headers()
            #
            # self.wfile.write(json.dumps(USERID).encode())


            # if STATUS_CODE == ErrorCode.SUCCESS_CODE:
            #     PHONENUM = DATA
            #
            #     STATUS = ServerSMS(PHONENUM)
            #
            #     if STATUS == 200:
            #         self.send_response(STATUS_CODE)
            #
            #         self.end_headers()
            #
            #         self.wfile.write(json.dumps(PHONENUM).encode())
            #
            #     else:
            #         self.send_response(STATUS)
            #
            #         self.end_headers()
            #
            #         self.wfile.write(json.dumps(PHONENUM).encode())
            #
            # else:
            #     self.send_response(STATUS_CODE)
            #
            #     self.end_headers()
            #
            #     self.wfile.write(json.dumps(DATA).encode())



        # elif URL_PATH == '/pass_change_user':
        #     USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))
        #     USER_NAME = USER_DATA['User_Name']
        #
        #     (STATUS_CODE, DATA) = Pass_Change_User(USER_NAME)
        #
        #     if STATUS_CODE == 200:
        #         PHONENUM = DATA
        #
        #         STATUS = ServerSMS(PHONENUM)
        #
        #         if STATUS == 200:
        #             self.send_response(STATUS_CODE)
        #
        #             self.end_headers()
        #
        #             self.wfile.write(json.dumps(PHONENUM).encode())
        #
        #         else:
        #             self.send_response(STATUS)
        #
        #             self.end_headers()
        #
        #     else:
        #
        #         self.send_response(STATUS_CODE)
        #
        #         self.end_headers()
        #
        #         self.wfile.write(json.dumps(DATA).encode())
        #
        #

        return

    def do_POST(self):
        URL_PATH = self.path


        #FOR THE LOG IN, PRASE THE USERNAME AND PASSWORD, IF THE USERNAME AND PASSWORD IS PHONENUM_NOT_CORRECT
        #CHECK THE PHONE NUMBER IS VERIFIED OR NOT
        #THEN ASK TO VERIFIED THE PHONE NUMBER
        #FUNCTION USED :
        #Log_In
        #ServerSMS

        if URL_PATH == '/log_in':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))
            USER_NAME = USER_DATA['User_Name']
            USER_PASS = USER_DATA['Password']

            (STATUS_CODE, DATA) = Log_In(USER_NAME, USER_PASS)

            if STATUS_CODE == ErrorCode.SUCCESS_CODE:
                USERID = DATA
                self.send_response(STATUS_CODE)
                self.end_headers()
                self.wfile.write(json.dumps(USERID).encode())

            elif STATUS_CODE == ErrorCode.NO_SUCH_USER_CODE:
                self.send_response(STATUS_CODE)
                self.end_headers()
                self.wfile.write(json.dumps(DATA).encode())

            elif STATUS_CODE == ErrorCode.WORNG_PASSWORD_CODE:
                self.send_response(STATUS_CODE)
                self.end_headers()
                self.wfile.write(json.dumps(DATA).encode())

            elif STATUS_CODE == ErrorCode.PHONE_NOT_VERIFIED_CODE:
                PHONENUM = DATA

                STATUS = ServerSMS(PHONENUM)

                if STATUS == ErrorCode.SUCCESS_CODE:
                    self.send_response(STATUS_CODE)

                    self.end_headers()

                    self.wfile.write(json.dumps(PHONENUM).encode())

                else:
                    self.send_response(STATUS)

                    self.end_headers()


            else:
                self.send_response(STATUS_CODE)

                self.end_headers()

                self.wfile.write(json.dumps(DATA).encode())




        #THE SIGN UP PATH, PRASE THE USERNAME AND PASSWORD AND PHONE NUMBER
        #FUNCTION USER:
        #Sign_Up
        #ServerSMS

        elif URL_PATH == '/sign_up':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_NAME = USER_DATA['User_Name']
            USER_PASS = USER_DATA['Password']
            USER_PHONE = USER_DATA['Phone_Number']

            (STATUS_CODE, DATA) = Sign_Up(USER_NAME, USER_PASS, USER_PHONE)

            if STATUS_CODE == ErrorCode.SUCCESS_CODE:

                STATUS = ServerSMS(USER_PHONE)

                self.send_response(STATUS)

                self.end_headers()

            else:

                self.send_response(STATUS_CODE)

                self.end_headers()




        #VERIFY THE PHONE NUMBER, PRASE THE PHONE NUMBER AND CODE
        #FUNCTION USED :
        #Verify_Code
        elif URL_PATH == '/phone_verify':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))
            USER_PHONE = USER_DATA['Phone_Number']
            USER_TEMPCODE = USER_DATA['TempCode']

            (STATUS_CODE, USERID) = Verify_Code(USER_PHONE, USER_TEMPCODE)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(USERID).encode())




        #PASSWORD CHANGE USER, USE USER NAME TO GET THE PHONE NUMBER,
        #SEND BACK THE PHONE NUMBER AND ASK FOR VERIFY
        #FUNCTION USED:
        #Pass_Change_User
        #ServerSMS
        elif URL_PATH == '/pass_change_user':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))
            USER_NAME = USER_DATA['User_Name']

            (STATUS_CODE, DATA) = Pass_Change_Get_User(USER_NAME)

            if STATUS_CODE == ErrorCode.SUCCESS_CODE:
                PHONENUM = DATA

                STATUS = ServerSMS(PHONENUM)

                if STATUS == ErrorCode.SUCCESS_CODE:
                    self.send_response(STATUS_CODE)

                    self.end_headers()

                    self.wfile.write(json.dumps(PHONENUM).encode())

                else:
                    self.send_response(STATUS)

                    self.end_headers()

                    self.wfile.write(json.dumps(PHONENUM).encode())

            else:
                self.send_response(STATUS_CODE)

                self.end_headers()

                self.wfile.write(json.dumps(DATA).encode())



        #CHANGE THE PASSWORD, PRASE THE USER ID AND USER NEW PASSWORD AND CHANGE THE PASSOWRD IN THE DATABASE
        #FUNCTION USED:
        #Change_Pass
        elif URL_PATH == '/change_pass':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']
            USER_PASS = USER_DATA['New_Password']

            STATUS_CODE = Change_Pass(USER_ID, USER_PASS)

            self.send_response(STATUS_CODE)

            self.end_headers()




        #PHONE CHANGE LOG IN, LOG IN THE ACCOUNT TO CHANGE THE PHONE NUMBER, PRASE THE USERNAME AND PASSWORD
        #GET THE PHONE NUMBER(CODE: 200) OR USERID(CODE :603 WHICH MEANS UNVERIFIED)
        #FUNCTION USED:
        #Phone_Change_User
        #ServerSMS
        elif URL_PATH == '/phone_change_log_in':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))
            USER_NAME = USER_DATA['User_Name']
            USER_PASS = USER_DATA['Password']

            (STATUS_CODE, DATA) = Phone_Change_Log_In(USER_NAME, USER_PASS)

            if STATUS_CODE == ErrorCode.SUCCESS_CODE:
                PHONENUM = DATA

                STATUS = ServerSMS(PHONENUM)

                if STATUS == ErrorCode.SUCCESS_CODE:
                    self.send_response(STATUS_CODE)

                    self.end_headers()

                    self.wfile.write(json.dumps(PHONENUM).encode())

                else:
                    self.send_response(STATUS)

                    self.end_headers()

                    self.wfile.write(json.dumps(PHONENUM).encode())

            else:
                self.send_response(STATUS_CODE)

                self.end_headers()

                self.wfile.write(json.dumps(DATA).encode())



        #CHANGE PHONE, PRASE THE USER ID AND NEW PHONE NUMBER, CHANGE THE PHONE NUMBER IN THE DATABASE
        #FUNCTION USED:
        #Change_Phone
        #ServerSMS
        elif URL_PATH == '/change_phone':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']
            NEW_PHONE = USER_DATA['New_Phone']

            (STATUS_CODE, DATA)  = Change_Phone
            (USER_ID, NEW_PHONE)

            if STATUS_CODE == ErrorCode.SUCCESS_CODE:
                PHONENUM = DATA

                STATUS = ServerSMS(PHONENUM)

                if STATUS == ErrorCode.SUCCESS_CODE:
                    self.send_response(STATUS_CODE)

                    self.end_headers()

                    self.wfile.write(json.dumps(PHONENUM).encode())

                else:
                    self.send_response(STATUS)

                    self.end_headers()

                    self.wfile.write(json.dumps(PHONENUM).encode())

            else:
                self.send_response(STATUS_CODE)

                self.end_headers()

                self.wfile.write(json.dumps(DATA).encode())


        return
    #
    # def do_put(self):
    #     URL_DICT = UrlParse(self.path)
    #
    #     URL_PATH = URL_DICT['path']
    #
    #     if URL_PATH == '/change_pass':
    #         USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))
    #
    #         USER_ID = USER_DATA['User_ID']
    #         USER_PASS = USER_DATA['New_Password']
    #
    #         STATUS_CODE = Change_Pass(USER_ID, USER_PASS)
    #
    #         self.send_response(STATUS_CODE)
    #
    #         self.end_headers()
    #
    #     return



def Start_Server(server_class, handler_class):

    print("Welcome to System Board Server!\n")

    httpd = server_class(("", 8080), handler_class)
    httpd.serve_forever()



Start_Server(HTTPServer, MyNewhandler)
