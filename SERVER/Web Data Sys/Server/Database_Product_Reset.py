import json
import mysql.connector
import uuid
import sys


# Start of create uuid

def CreateProductID():
    '''
    This is function to create unique id
    '''

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)

    while True:
        Products_ID = uuid.uuid4()

        QUERYSQL = ('SELECT Products_ID FROM Products WHERE Products_ID = \'{}\' ').format(Products_ID)

        CURSOR.execute(QUERYSQL)

        QUERYLIST = CURSOR.fetchall()

        if not QUERYLIST:
            break

    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    return(str(Products_ID))


# End of create uuid

def Insert_Products():

    print("Inserting Products Data.....\n")

    Products_Data = ''

    with open("Products.json") as Products:
        Products_Data = json.load(Products)

    Total_Product = 0

    for Category in Products_Data:
        Products_List = Products_Data[Category]
        for Products in Products_List:
            Total_Product = Total_Product + len(Products['Specs'])


    # Next insert the data into the database

    CONNECTIONS = mysql.connector.connect(user='root',
    password='jizhongce123',
    host='127.0.0.1',
    database='Web_Data')

    CURSOR = CONNECTIONS.cursor(buffered=True)


    Progress_Bar_Length = 30

    Inserted_Product = 0

    for Category in Products_Data:
        Product_Category = Category
        for Product in Products_Data[Category]:
            Product_Name = Product["Product_Name"]
            for Specification in Product["Specs"]:
                Product_Number = Specification["Product_Number"]
                Product_Spec = Specification["Specification"]
                Product_Price = Specification["Price"]
                Product_Color = Specification["Color"]
                Product_ID = CreateProductID()

                ADD_PRODUCT = ("INSERT INTO Products(Products_ID, Products_Name, Products_Number, Products_Spec, Products_Color, Products_Status, Products_Price, Products_Image_Dir, Products_Category) VALUE (\'{}\', \'{}\', \'{}\', \'{}\', \'{}\', 0, \'{}\', 'Product_1', \'{}\');".format(Product_ID, Product_Name, Product_Number, Product_Spec, Product_Color, Product_Price, Product_Category))

                CURSOR.execute(ADD_PRODUCT)

                CONNECTIONS.commit()

                Inserted_Product = Inserted_Product + 1

                Bar_Inserted = '.' * int(Inserted_Product*Progress_Bar_Length/Total_Product)
                Bar_Uninserted = ' ' * (Progress_Bar_Length-int(Inserted_Product*Progress_Bar_Length/Total_Product))
                Bar = Bar_Inserted + Bar_Uninserted
                sys.stdout.write('[{}] \033[92m{}%\033[0m\r'.format(Bar ,round(100.0*Inserted_Product/ float(Total_Product),1)))
                sys.stdout.flush()


    CURSOR.close()

    CONNECTIONS.commit()

    CONNECTIONS.close()

    print('\n \033[92mReal Product has been Inserted\033[0m \n')

    # End
