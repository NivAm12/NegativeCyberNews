import requests 
from bs4 import BeautifulSoup
import lxml

headers_get = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:49.0) Gecko/20100101 Firefox/49.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
    }

def main():

    #google news search
    googleSearch('Adobe')


def googleSearch(q):
    session = requests.Session()

    #query spaces fix
    query = '+'.join(q.split())

    #get request to google news with the query
    url = 'https://www.google.com/search?q=' + query + '&tbm=nws&ie=utf-8&oe=utf-8'
    response = session.get(url, headers=headers_get)

    #soup the response
    soup = BeautifulSoup(response.text, "lxml")

    #get the main div - with all of the articles
    #doesn't work yet
    div = soup.find('div', id="search")
    

if __name__ == "__main__":
    main()

