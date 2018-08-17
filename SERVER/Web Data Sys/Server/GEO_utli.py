import requests

def GetGEOCODE(Address):

    lat = ''

    lon = ''

    url = "https://restapi.amap.com/v3/geocode/geo?address=%s&output=JSON&key=4841e08469cbcfcc94afb118b3ad0e0d" % Address

    RESPONSE = requests.get(url).json()

    infocode = RESPONSE['infocode']

    if infocode == '10000':

        location = RESPONSE['geocodes'][0]['location'].split(',')

        lat = location[1]

        lon = location[0]

    return({'infocode' : infocode, 'lat' : lat, 'lon' : lon})
