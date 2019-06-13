# Import the packages that needed for the function
import uuid
import datetime
from pytz import timezone
import urllib.parse
import hmac
import hashlib
import base64
import requests
#
#
# '''
#
# #This is the accesskey and accessSecret
# accessKeyId = "testId"
#
# accessSecret = "testSecret";
#
# #System parameter
#
# #This is the SignatureMethod
# SignatureMethod = {"SignatureMethod" : "HMAC-SHA1"}
#
# #This is the SignatureNonce
# SignatureNonce = {"SignatureNonce" : str(uuid.uuid4())}
#
# #This is the AccessKeyId
# AccessKeyId = {"AccessKeyId" : accessKeyId}
#
# #This is the SignatureVersion
# SignatureVersion = {"SignatureVersion" : "1.0"}
#
# #This is the Timestamp with type: yyyy-MM-dd'T'HH:mm:ss'Z'
# Timestamp = {"Timestamp" : datetime.datetime.now(tz = timezone('GMT')).strftime("%Y-%m-%dT%H:%M:%SZ")}
#
# #This is the Format
# Format = {"Format" : "XML"}
#
# #API parameter
#
# #This is Action, "SendSms"
# Action = {"Action" : "SendSms"}
#
# #This is Version
# Version = {"Version" : "2017-05-25"}
#
# #This is RegionId
# RegionId = {"RegionId" : "cn-hangzhou"}
#
# #This is PhoneNumbers
# PhoneNumbers = {"PhoneNumbers" : "15300000001"}
#
# #This sign name SignName
# SignName = {"SignName" :  "季中策"}
#
# #This is template param
# TemplateParam = {"TemplateParam" : "{\"Code\":\"1234\"}"}
#
# #This is TemplateCode
# TemplateCode = {"TemplateCode" : "SMS_122299912"}
#
# #This is OutId
# OutId = {"OutId" : "123"}
#
# '''
#

def SendSMS(PhoneNum, CODE):
    # This is the accesskey and accessSecret
    accessKeyId = "put you id"

    accessSecret = "put your secret"

    PARAMETER = "{\"Code\":" + "\"" + str(CODE) + "\"}"

    print(PARAMETER)

    QueryDict = {
                "SignatureMethod" : "HMAC-SHA1",
                "SignatureNonce" : str(uuid.uuid4()),
                "AccessKeyId" : accessKeyId,
                "SignatureVersion" : "1.0",
                "Timestamp" : datetime.datetime.now(tz = timezone('GMT')).strftime("%Y-%m-%dT%H:%M:%SZ"),
                "Format" : "XML",
                "Action" : "SendSms",
                "Version" : "2017-05-25",
                "RegionId" : "cn-hangzhou",
                "PhoneNumbers" : PhoneNum,
                "SignName" :  "季中策",
                "TemplateParam" : PARAMETER,
                "TemplateCode" : "SMS_122299912",
                "OutId" : "123"
                }

    parameterStr = Construct_Parameter(QueryDict)

    #Then add POP with HTTPMethod + “&” + specialUrlEncode(“/”) + ”&” + specialUrlEncode(sortedQueryString)
    stringToSign = urllib.parse.quote_plus(parameterStr).replace("%7E", "~")

    stringToSign = "GET" + "&" + urllib.parse.quote_plus("/").replace("+", "%20").replace("*", "%2A").replace("%7E", "~") + "&" + stringToSign

    #From here we start to sign with accessSecret
    key = (accessSecret + '&').encode("UTF-8")

    message = stringToSign.encode("UTF-8")

    digester = hmac.new(key, message, hashlib.sha1)

    signature = str(base64.b64encode(digester.digest()), "UTF-8")

    ulrsignature = urllib.parse.quote_plus(signature).replace("%7E", "~")

    finalrequest = "Signature=" + ulrsignature + "&" + parameterStr

    url = "http://dysmsapi.aliyuncs.com/?%s" % finalrequest

    RESPONSE = requests.get(url)

    return(RESPONSE.status_code)


def Construct_Parameter(QueryDict):
    SortedQueryDict = dict()

    for key in sorted(QueryDict.keys()):
        SortedQueryDict[key] = QueryDict[key]


    if "Signature" in SortedQueryDict.keys():
        del SortedQueryDict["Signature"]

    #Here we will parse the query into url
    parameterStr = urllib.parse.urlencode(SortedQueryDict)

    #Then replace "+" with "%20"
    parameterStr.replace("%7E", "~")

    return(parameterStr)
