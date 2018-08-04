from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
from Server_utli import UrlParse, Log_In, Sign_Up, Sign_Up_Send_Verify_Code, Change_Password_Send_Verify_Code, Change_Password, Get_User_Info, Get_All_Products, Get_Shopping_Cart, Add_To_Shopping_Cart, Add_To_Favorite_Product, Get_User_Profile, Get_Favorite_Product
from Server_utli import Get_Order, Change_User_Name, Check_Favorite_Exist, Delete_From_Favorite_Product, Get_Single_Product_Info, Shopping_Cart_Quantity_Change, Delete_From_Shopping_Cart, Get_Address_Book, Add_New_Address, Delete_Address, Edit_Address, Get_Single_Order, Submit_Order, Deposit_Payment_Submited
import json
import time
import hashlib, uuid
import ErrorCode


class MyNewhandler(BaseHTTPRequestHandler):
    """docstring for MyNewhandler."""
    def do_GET(self):

        UrlParse_Res = UrlParse(self.path)

        URL_PATH = UrlParse_Res['path']


        if URL_PATH == '/get_all_products':
            (STATUS_CODE, DATA) = Get_All_Products()
            if STATUS_CODE == ErrorCode.SUCCESS_CODE:

                self.send_response(STATUS_CODE)
                self.end_headers()
                self.wfile.write(json.dumps(DATA).encode())


        elif URL_PATH == '/get_single_product_info':

            URL_QUERY = UrlParse_Res['query']

            Product_ID = URL_QUERY['Product_ID'][0]

            (STATUS_CODE, DATA) = Get_Single_Product_Info(Product_ID)

            print(STATUS_CODE)
            print(DATA)

            #
            # print(DATA)
            #
            self.send_response(STATUS_CODE)
            self.end_headers()
            self.wfile.write(json.dumps(DATA).encode())

        elif URL_PATH == '/get_user_info':

            URL_QUERY = UrlParse_Res['query']

            USER_ID = URL_QUERY['User_ID'][0]

            (STATUS_CODE, DATA) = Get_User_Info(USER_ID)

            print(STATUS_CODE)
            print(DATA)

            #
            # print(DATA)
            #
            self.send_response(STATUS_CODE)
            self.end_headers()
            self.wfile.write(json.dumps(DATA).encode())


        elif URL_PATH == '/get_user_profile':
            URL_QUERY = UrlParse_Res['query']

            USER_ID = URL_QUERY['User_ID'][0]

            (STATUS_CODE, DATA) = Get_User_Profile(USER_ID)

            print(DATA)

            self.send_response(STATUS_CODE)
            self.end_headers()
            self.wfile.write(json.dumps(DATA).encode())


        elif URL_PATH == '/get_address_book':

            URL_QUERY = UrlParse_Res['query']

            User_ID = URL_QUERY['User_ID'][0]

            print(User_ID)

            (STATUS_CODE, DATA) = Get_Address_Book(User_ID)

            print(STATUS_CODE)
            print(DATA)


            self.send_response(STATUS_CODE)
            self.end_headers()
            self.wfile.write(json.dumps(DATA).encode())


        elif URL_PATH == '/get_single_order':

            URL_QUERY = UrlParse_Res['query']

            Order_ID = URL_QUERY['Order_ID'][0]

            print(Order_ID)

            (STATUS_CODE, DATA) = Get_Single_Order(Order_ID)

            # print(DATA)
            #
            # print(STATUS_CODE)
            # print(DATA)
            #
            #
            self.send_response(STATUS_CODE)
            self.end_headers()
            self.wfile.write(json.dumps(DATA).encode())

        elif URL_PATH == '/get_order':

            URL_QUERY = UrlParse_Res['query']

            USER_ID = URL_QUERY['User_ID'][0]

            ORDER_TYPE = URL_QUERY['Order_Type'][0]

            print(USER_ID)

            print(ORDER_TYPE)

            (STATUS_CODE, DATA) = Get_Order(USER_ID, ORDER_TYPE)

            # print(DATA)
            #
            print(STATUS_CODE)
            print(DATA)


            self.send_response(STATUS_CODE)
            self.end_headers()
            self.wfile.write(json.dumps(DATA).encode())



        return

    def do_POST(self):
        URL_PATH = self.path

        #FOR THE LOG IN, PRASE THE USERNAME AND PASSWORD, IF THE USERNAME AND PASSWORD IS PHONENUM_NOT_CORRECT
        #CHECK THE PHONE NUMBER IS VERIFIED OR NOT
        #THEN ASK TO VERIFIED THE PHONE NUMBER
        #FUNCTION USED :
        #Log_In
        #

        if URL_PATH == '/log_in':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))
            LOG_IN_PHONE_NUMBER = USER_DATA['Log_In_Phone_Number']
            LOG_IN_PASSWORD = USER_DATA['Log_In_Password']

            (STATUS_CODE, DATA) = Log_In(LOG_IN_PHONE_NUMBER, LOG_IN_PASSWORD)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())



        elif URL_PATH == '/sign_up_send_verify_code':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            SIGN_UP_PHONE_NUMBER = USER_DATA['Sign_Up_Phone_Number']

            (STATUS_CODE, DATA) = Sign_Up_Send_Verify_Code(SIGN_UP_PHONE_NUMBER)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())


        elif URL_PATH == '/change_password_send_verify_code':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            CHANGE_PASSWORD_PHONE_NUMBER = USER_DATA['Change_Password_Phone_Number']

            (STATUS_CODE, DATA) = Change_Password_Send_Verify_Code(CHANGE_PASSWORD_PHONE_NUMBER)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())


        elif URL_PATH == '/change_password':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            CHANGE_PASSWORD_PHONE_NUMBER = USER_DATA['Change_Password_Phone_Number']
            CHANGE_PASSWORD_NEW_PASSWORD = USER_DATA['Change_Password_New_Password']
            CHANGE_PASSWORD_VERIFY_CODE = USER_DATA['Change_Password_Verify_Code']

            (STATUS_CODE, DATA) = Change_Password(CHANGE_PASSWORD_PHONE_NUMBER, CHANGE_PASSWORD_NEW_PASSWORD, CHANGE_PASSWORD_VERIFY_CODE)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())


        #THE SIGN UP PATH, PRASE THE USERNAME AND PASSWORD AND PHONE NUMBER
        #FUNCTION USER:
        #Sign_Up
        #

        elif URL_PATH == '/sign_up':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            SIGN_UP_PHONE_NUMBER = USER_DATA['Sign_Up_Phone_Number']
            SIGN_UP_PASSWORD = USER_DATA['Sign_Up_Password']
            SIGN_UP_VERIFY_CODE = USER_DATA['Sign_Up_Verify_Code']

            (STATUS_CODE, DATA) = Sign_Up(SIGN_UP_PHONE_NUMBER, SIGN_UP_PASSWORD, SIGN_UP_VERIFY_CODE)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())


        elif URL_PATH == '/change_user_name':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            CHANGE_USER_NAME_USER_ID = USER_DATA['User_ID']
            CHANGE_USER_NAME_NEW_NAME = USER_DATA['New_Name']

            (STATUS_CODE, DATA) = Change_User_Name(CHANGE_USER_NAME_USER_ID, CHANGE_USER_NAME_NEW_NAME)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())




        #GET THE SPECIFIC USER'S SHOPPING CART FROM THE DATABASE
        #FUNCTION USED:
        #Get_Shopping_Cart
        elif URL_PATH == '/get_shopping_cart':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']

            (STATUS_CODE, DATA) = Get_Shopping_Cart(USER_ID)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())


        #GET THE SPECIFIC USER'S FAVORITE PRODUCTS FROM THE DATABASE
        #FUNCTION USED:
        #Get_Favorite_Product
        elif URL_PATH == '/get_favorite_product':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']

            (STATUS_CODE, DATA) = Get_Favorite_Product(USER_ID)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())


        #ADD THE PRODUCT INTO THE SPECIFIC USER'S DATABASE
        #FUNCTION USED:
        #Add_To_Shopping_Cart
        elif URL_PATH == '/add_to_shopping_cart':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']
            PRODUCT = USER_DATA['TempProduct']
            print(PRODUCT)
            (STATUS_CODE, DATA) = Add_To_Shopping_Cart(USER_ID, PRODUCT)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())


        #ADD NEW ADDRESS INTO THE SPECIFIC USER'S DATABASE
        #FUNCTION USED:
        #Add_New_Address
        elif URL_PATH == '/add_new_address':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']
            NEW_ADDRESS = USER_DATA['New_Address']
            print(NEW_ADDRESS)
            (STATUS_CODE, DATA) = Add_New_Address(USER_ID, NEW_ADDRESS)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())


        #delete NEW ADDRESS INTO THE SPECIFIC USER'S DATABASE
        #FUNCTION USED:
        #Delete_Address
        elif URL_PATH == '/delete_address':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']
            ADDRESS_ID = USER_DATA['Address_ID']
            print(ADDRESS_ID)
            (STATUS_CODE, DATA) = Delete_Address(USER_ID, ADDRESS_ID)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())


        #Edit ADDRESS INTO THE SPECIFIC USER'S DATABASE
        #FUNCTION USED:
        #Edit_Address
        elif URL_PATH == '/edit_address':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']
            NEW_ADDRESS = USER_DATA['New_Address']

            (STATUS_CODE, DATA) = Edit_Address(USER_ID, NEW_ADDRESS)

            # print(NEW_ADDRESS)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())


        #UPDATE PRODUCT INTO THE SPECIFIC USER'S DATABASE
        #FUNCTION USED:
        #Shopping_Cart_Quantity_Change
        elif URL_PATH == '/shopping_cart_quantity_change':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']
            PRODUCT = USER_DATA['TempProduct']

            print(PRODUCT)

            (STATUS_CODE, DATA) = Shopping_Cart_Quantity_Change(USER_ID, PRODUCT)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())


        #DELETE PRODUCT INTO THE SPECIFIC USER'S DATABASE
        #FUNCTION USED:
        #Delete_From_Shopping_Cart
        elif URL_PATH == '/delete_from_shopping_cart':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']
            PRODUCT_ID = USER_DATA['Product_ID']

            print(PRODUCT_ID)

            (STATUS_CODE, DATA) = Delete_From_Shopping_Cart(USER_ID, PRODUCT_ID)

            self.send_response(STATUS_CODE)

            self.end_headers()

            self.wfile.write(json.dumps(DATA).encode())


            # print()

            # self.send_response(STATUS_CODE)
            #
            # self.end_headers()
            #
            # self.wfile.write(json.dumps(DATA).encode())



        elif URL_PATH == '/add_to_favorite_product':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']
            PRODUCT_ID = USER_DATA['TempProductID']

            (STATUS_CODE, DATA) = Add_To_Favorite_Product(USER_ID, PRODUCT_ID)

            print(DATA)

            self.send_response(STATUS_CODE)
            self.end_headers()
            self.wfile.write(json.dumps(DATA).encode())



        elif URL_PATH == '/delete_From_favorite_product':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']
            PRODUCT_ID = USER_DATA['TempProductID']

            (STATUS_CODE, DATA) = Delete_From_Favorite_Product(USER_ID, PRODUCT_ID)

            print(DATA)

            self.send_response(STATUS_CODE)
            self.end_headers()
            self.wfile.write(json.dumps(DATA).encode())


        elif URL_PATH == '/check_favorite_exist':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']
            PRODUCT_ID = USER_DATA['Product_ID']

            (STATUS_CODE, DATA) = Check_Favorite_Exist(USER_ID, PRODUCT_ID)

            print(DATA)

            self.send_response(STATUS_CODE)
            self.end_headers()
            self.wfile.write(json.dumps(DATA).encode())



        elif URL_PATH == '/submit_order':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']
            SHOPPING_CART = USER_DATA['Shopping_Cart']
            SHIPPING_ADDRESS = USER_DATA['Shipping_Address']

            print(USER_ID)
            print(SHOPPING_CART)
            print(SHIPPING_ADDRESS)

            (STATUS_CODE, DATA) = Submit_Order(USER_ID, SHOPPING_CART, SHIPPING_ADDRESS)

            print(DATA)

            self.send_response(STATUS_CODE)
            self.end_headers()
            self.wfile.write(json.dumps(DATA).encode())



            # Deposit_Payment_Submited
        elif URL_PATH == '/deposit_payment_submited':
            USER_DATA = json.loads(self.rfile.read(int(self.headers['content-length'])))

            USER_ID = USER_DATA['User_ID']
            DEPOSIT_PAYMENT_INFO = USER_DATA['Deposit_Payment_Info']


            print(USER_ID)
            print(DEPOSIT_PAYMENT_INFO)

            (STATUS_CODE, DATA) = Deposit_Payment_Submited(USER_ID, DEPOSIT_PAYMENT_INFO)

            print(DATA)

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
