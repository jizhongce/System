import urllib.request
import json
import re
import os


def Get_District(City_Code):
    '''
    The whole function is to get district for each city, The main idea is:
    1. first we get the whole html page according to the City_Code passed with agrument
    2. Second, we get the lines which contain each district name
    3. next, we split the line into the district
    4. for each district content, we split the front and end to get the name
    '''
    District_Link = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2017/%s.html" % City_Code

    District_Response = urllib.request.Request(District_Link, headers={'User-Agent': 'Chrome/51.0.2704.103'})

    District_Content = ''

    with urllib.request.urlopen(District_Response) as html:
        for Lines in html:
            # match the whole line which contain the district
            if re.match('<tr class=\'countytr\'>.{0,}</td></tr>', Lines.decode('GB18030')):
                # decode with GB18030 is used for decode into chinese
                District_Content = Lines.decode('GB18030')

    District = list()

    for district in District_Content.split('</td></tr>'):
        if len(district.split('</td><td>')) == 2:
            # split the each district contect from front and get second fragment
            Temp_District = district.split('</td><td>')[1]
            # split the each district contect from end
            Temp_District = Temp_District.split('html\'>')

            District_Name = Temp_District[(len(Temp_District)-1)].replace('</a>', '')

            District.append(District_Name)

    return(District)



def Get_City(Province_Code):
    '''
    The procedure to get the city according to the province code is same as the function above
    The only difference is the pattern and the city content is different
    And in the city function we also need to call the district function to get the district for each city as well 
    '''
    City_Link = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2017/%s.html" % Province_Code

    City_Response = urllib.request.Request(City_Link, headers={'User-Agent': 'Chrome/51.0.2704.103'})

    City_Content = ''

    with urllib.request.urlopen(City_Response) as html:
        for Lines in html:
            if re.match('<tr class=\'citytr\'>.{0,}</td></tr>', Lines.decode('GB18030')):
                City_Content = Lines.decode('GB18030')

    City = dict()

    for city in City_Content.split('</td></tr>'):

        if len(city.split('</td><td>')) == 2:
            Temp_City = city.split('</td><td>')[1]

            City_Name_RE = 'html\'>.{0,}</a>'

            City_Number_RE = '\d{1,}\/\d{1,}'

            Temp_City_Name = re.findall(City_Name_RE, Temp_City)[0].replace('html\'>','').replace('</a>', '')

            Temp_City_Number = re.findall(City_Number_RE, Temp_City)[0]

            City[Temp_City_Name] = Get_District(Temp_City_Number)

    return(City)


def Get_Province_City_District():
    Province_Link = "http://www.stats.gov.cn/tjsj/tjbz/tjyqhdmhcxhfdm/2017/index.html"

    Province_Response = urllib.request.Request(Province_Link, headers={'User-Agent': 'Chrome/51.0.2704.103'})

    Province_Content = ''

    with urllib.request.urlopen(Province_Response) as html:
        for Lines in html:
            if re.match('<tr class=\'provincetr\'>.{0,}</td></tr>', Lines.decode('GB18030')):
                Province_Content = Lines.decode('GB18030')

    Province_City_District = dict()

    for province in Province_Content.split('</td>'):
        if re.search('<td><a href=.{0,}<br/></a>', province):
            Province_Number_RE = '\d{1,2}'
            Province_Name_RE = 'html\'>.{0,}<br/>'

            Temp_Province_Name = re.findall(Province_Name_RE, province)[0].replace('html\'>','').replace('<br/>', '')
            Temp_Province_Number = re.findall(Province_Number_RE, province)[0]

            print(Temp_Province_Number)

            Province_City_District[Temp_Province_Name] = Get_City(Temp_Province_Number)


    return(Province_City_District)

#  Here we write the whole data out into json file
if os.path.isfile('./Province_City_District.json') :
    os.remove('./Province_City_District.json')

file = open("Province_City_District.json", "w")

file.write(json.dumps(Get_Province_City_District()))

file.close()
