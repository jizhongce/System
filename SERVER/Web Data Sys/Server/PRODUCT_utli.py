import urllib.request
import json
import re
import os
import math



####### Helper Functions

# This helper function to get category name according to the pattern: <dt><a href="javascript:void(0);" onclick="onCatClick(19)">小螺钉</a></dt>
def GetCategory(Category_String):
    '''
    First replace the number in string with '', then we split the string to get the name
    '''
    return(re.sub('\d', '', Category_String).split('()\">')[1].split('</a>')[0])


# This helper function is used to get the products name and products code for one category according to the pattern:
def GetProductNameCode(Product_String):
    Code_Content = re.search('id=\d{1,}', Product_String).group()

    Code = int(re.search('\d{1,}',Code_Content).group())

    # First remove the code
    Name_Content = re.sub('id=\d{1,}', '', Product_String)
    # Then do the search
    Name_Content = re.search('php\\?\">.{0,}</a></dd>', Name_Content).group()
    # Then get rid of prefix and tail
    Name = re.sub('</a></dd>', '', re.sub('php\\?\">', '', Name_Content))

    return((Name, Code))


# This is the function to get the product number info for the product
def GetProductNum(Product_Code):

    Product_Link = "http://www.shhdw.com/goods.php?id={}".format(Product_Code)

    Product_Content = ''

    Index = 0

    Number_Line_Flag = False

    Number_Content = ''

    Number_Index = 0

    with urllib.request.urlopen(Product_Link) as html:
        for Line in html:
            Index = Index + 1

            if re.search('<strong>商品货号.{1,}' , Line.decode('utf-8')) != None:
                Number_Index = Index
                Number_Line_Flag = True

            if Number_Line_Flag == True and Index == Number_Index:
                Number_Content = Line.decode('utf-8')

        Number_Content = re.sub('<strong>.{1,}</strong>', '', Number_Content)
        Number = re.sub('</dd>|\s', '', Number_Content)

    return(Number)



# This is the helper function to get spec including specification, color, price, product number for the product
def GetProductSpec(Product_Spec_Content):

    Product_Spec_Content_List = Product_Spec_Content.split("</td>")

    # First get the code for the product
    Code_Content = Product_Spec_Content_List[1]
    Code_Content = re.search('\"goods.php\\?id=\d{1,}\"' , Code_Content).group()
    Code = int(re.search('\d{1,}' , Code_Content).group())

    Product_Number = GetProductNum(Code)
    # print(Code)

    # Then get the Specification for the product
    Specification_Content = Product_Spec_Content_List[2]
    Specification = re.sub('\s|<td>', '', Specification_Content)

    # Then get the Price for the product
    Price_Content = Product_Spec_Content_List[3]
    Price = float(re.sub('\s|<td>', '', Price_Content))

    # Then get the color
    Color_Content = Product_Spec_Content_List[4]
    Color = re.sub('\s|<td>', '', Color_Content)

    return({'Product_Number' : Product_Number, 'Specification' : Specification, 'Price' : Price, 'Color' : Color})
    # return()

####### Helper Functions


# Get Prodcut Spec list for one product
def GetProductSpecs(Product_Code, Product_Pages):
    # Get product spec and price
    # http://www.shhdw.com/category.php?id=88

    Product_Spec_List = list()

    for Page in range(Product_Pages):

        Product_Index_Link = "http://www.shhdw.com/category.php?id={}&price_min=0&price_max=0&page={}&sort=spec_txt&order=DESC".format(Product_Code, (Page+1))

        with urllib.request.urlopen(Product_Index_Link) as html:
            Product_Spec_Raw_Content = html.read().decode('utf-8').replace('\n', ' ')
            Product_Spec_Content_List = re.search('<table.{1,}</table>', Product_Spec_Raw_Content).group().split('<tr height="30">')
            index = 0
            for Product_Spec_Content in Product_Spec_Content_List:
                if re.search('\"goods.php\\?id=\d{1,}\"', Product_Spec_Content) != None:
                    Product_Spec_List.append(GetProductSpec(Product_Spec_Content))


    return(Product_Spec_List)


# Get Prodcut pages
def GetProductSpecsPages(Product_Code):
    Product_Index_Link = "http://www.shhdw.com/category.php?id={}".format(Product_Code)

    Product_Spec_Content = ''

    with urllib.request.urlopen(Product_Index_Link) as html:
        Product_Spec_Raw_Content = html.read().decode('utf-8').replace('\n', ' ')
        Pages_Content = re.search('总计 <b>\d{1,}</b>  个记录</span>', Product_Spec_Raw_Content).group()
        Total_Product = int(re.search('\d{1,}', Pages_Content).group())
        Pages = math.ceil(Total_Product/40)

    return(Pages)



# Get products
def GetProduct():
    Product_Index_Link = "http://www.shhdw.com"

    Product_Index_Response = urllib.request.Request(Product_Index_Link, headers={'User-Agent': 'Chrome/51.0.2704.103'})

    Product_Content = ''

    with urllib.request.urlopen(Product_Index_Link) as html:
        Line_Index = 0
        for Lines in html:
            # Here we need to get the lines which contain the category infomation
            if Line_Index <= 280 and Line_Index >= 143:
                Product_Content = Product_Content + Lines.decode('utf-8')
            Line_Index = Line_Index + 1

    # Here we split category and products
    Product_Category_Content_List = Product_Content.split('</dl>')

    Product_List = dict()

    Index = 0

    for Product_Category in Product_Category_Content_List:
        # First, for each category, we need to find category name by using the function GetCategory
        Category_Name = GetCategory(re.search('<dt>.{0,}</dt>', Product_Category).group())
        # split by <dd> then we have to get rid of the first element which is nothing
        Product_Content_List = Product_Category.split('</dt>')[1].split('<dd>')
        Product_List[Category_Name] = list()

        for Product_Content in Product_Content_List:
            if re.search('category.php\\?id=\d{1,}\">.{0,}</a></dd>', Product_Content) != None and Index == 2:

                print(Product_Content)

                (Product_Name, Product_Code) = GetProductNameCode(Product_Content)

                Product_Pages = GetProductSpecsPages(Product_Code)

                print(GetProductSpecs(Product_Code, Product_Pages))
                print(len(GetProductSpecs(Product_Code, Product_Pages)))
                # Product_List[Category_Name].append({'Product_Name' : Product_Name, 'Specs' : GetProductSpecs(Product_Code)})

            Index = Index + 1
        # ?P<first_name>
        # for Product_Content in Product_Category.split('</dt>')[1].split('<dd>')[]:
        #     pass

    return(Product_List)


Products = GetProduct()

print(Products)
