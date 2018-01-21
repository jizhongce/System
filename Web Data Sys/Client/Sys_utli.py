import urllib.parse


"""
This is the method to parse the url passed into the function
and return an dictionary that indicates each parts
"""

def UrlParse(url):
    # First get the path
    path = urllib.parse.urlparse(url).path
    # Then get the query
    query = urllib.parse.urlparse(url).query

    return({'path' : path, 'query' : urllib.parse.parse_qs(query)})
