from http.server import BaseHTTPRequestHandler, HTTPServer
import json


class MyNewhandler(BaseHTTPRequestHandler):
    """docstring for MyNewhandler."""
    def do_POST(self):

        print(self.path)
        print(json.loads(self.rfile.read(int(self.headers['content-length']))))

        self.send_response(400)
        self.end_headers()

        self.wfile.write(json.dumps("PHONENUM").encode())









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

    httpd = server_class(("", 3001), handler_class)
    httpd.serve_forever()



Start_Server(HTTPServer, MyNewhandler)
