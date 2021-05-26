from bs4 import BeautifulSoup
import json
import requests
import urllib

class CyberNewsSearcher():

    def __init__(self, url, articleClass, articlesMethod):
        self.__url = url
        self.__articleClass = articleClass
        self.__aritclesBuild = articlesMethod
    
    def searchForCyberNews(self, searchQuery):
        try:
            #parse URL
            url = self.__url + urllib.parse.quote_plus(searchQuery)

            #get request
            response = requests.get(url)

            #soup the response
            soup = BeautifulSoup(response.text, 'lxml')

            #get articles
            return self.__getArticles(soup)
        except:
            return []    

    def __getArticles(self, soup):

        # scrape articles:
        articles = soup.find_all(class_=self.__articleClass)
        data = self.__aritclesBuild(articles)

        return data  
