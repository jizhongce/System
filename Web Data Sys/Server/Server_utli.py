import urllib.parse
import mysql.connector

def UrlParse(url):
    
    '''
    This is the method to parse the url passed into the function
    and return an dictionary that indicates each parts
    '''

    # First get the path
    path = urllib.parse.urlparse(url).path
    # Then get the query
    query = urllib.parse.urlparse(url).query

    return({'path' : path, 'query' : urllib.parse.parse_qs(query)})


def Log_In(username, password):
    '''
    This is the method to connect the database and check the username and password,
    if it is existed, then we get the user id and return back
    else we send back bad error code
    '''
    
    STATUS = 200
    
    USERID = 0
    
    CONNECTIONS = mysql.connector.connect(user='root', 
    password='jizhongce123', 
    host='127.0.0.1', 
    database='Web_Data')
    
    CURSOR = CONNECTIONS.cursor(buffered=True)

    QUERYSQL = ('SELECT User_ID FROM Users WHERE User_Name = \'{}\' ').format(username)

    CURSOR.execute(QUERYSQL)
    
    QUERYLIST = CURSOR.fetchall()
    
    if not QUERYLIST:
        STATUS = 405
    
    else:
        (USERID,) = QUERYLIST[0]
        
    CURSOR.close()
    
    CONNECTIONS.commit()
    
    CONNECTIONS.close()
    
    return(STATUS, USERID)
    
