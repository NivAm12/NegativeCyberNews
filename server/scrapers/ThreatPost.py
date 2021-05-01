from CyberWebSearcher import CyberWebSearcher
from bs4 import BeautifulSoup
import requests
import urllib
import json
import time

class ThreatPost(CyberWebSearcher):

    def __init__(self):
        self._url = 'https://threatpost.com/?s='
        self._class = 'c-card c-card--horizontal--half@md c-card--horizontal@lg c-card--horizontal--flat@md js-post-item'

    def searchForCyberNews(self, searchQuery):

        #parse URL
        url = self._url + urllib.parse.quote_plus(searchQuery)
        
        #get request
        response = requests.get(url)
        
        #soup the response
        soup = BeautifulSoup(response.text, 'lxml')
        
        #get articles
        return self.__getArticles(soup)

    def __getArticles(self, soup):

        #for nivos - these lines are also the same for every class
        articles = soup.find_all(class_=self._class)
        data = []

        #only this 'for loop' is different:

        #add articles
        for i in range(min(3, len(articles))):
            article = {
                "title": articles[i].h2.text.strip(),
                "description": articles[i].p.text.strip(),
                "date": articles[i].find(class_='c-card__time').text.strip(),
                "link": articles[i].h2.a.get('href')
            }

            data.append(article)
            
        
        return data


test = ThreatPost()
print(test.searchForCyberNews('microsoft'))