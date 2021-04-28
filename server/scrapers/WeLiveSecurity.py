# from selenium import webdriver
# import time
# from bs4 import BeautifulSoup
# from selenium.webdriver.common.action_chains import ActionChains
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.common.by import By
# from selenium.common.exceptions import NoSuchElementException
# from  CyberWebSearcher import CyberWebSearcher
# import json


# class WeLiveSecurityScraper(CyberWebSearcher):
#     def __init__(self):
#         self._url = 'https://www.welivesecurity.com/'
#         self._searchFieldXpath = '//*[@id="header-nav"]/div[2]/form/div/input'
    

#     def searchForCyberNews(self, searchQuery):
#         self._startWebSession()

#         # start the search:
#         self.__search(searchQuery)

#         # get articles
#         articles = self.__getArticles()

#         # end session:
#         self._webdriver.quit()
        
#         return articles


#     def __search(self, searchQuery):
#         # auto actions on driver:
#         self._webdriver.find_element_by_xpath(self._searchFieldXpath).send_keys(searchQuery, Keys.RETURN)

#         # wait for results to be load:
#         WebDriverWait(self._webdriver, 10).until(
#             EC.presence_of_element_located((By.ID, 'news-feed')))


#     def __getArticles(self):
#         # get source
#         pageSource = self._webdriver.page_source
#         soup = BeautifulSoup(pageSource, 'html.parser')
#         articles = soup.find_all(class_='news-feed-item col-xs-12 no-padding')
#         data = []

#         # add articles
#         for i in range(min(3, len(articles))):
#             article = {
#                 "title": articles[i].h2.text.strip(),
#                 "description": articles[i].p.text.strip(),
#                 "date": articles[i].time.text.strip(),
#                 "link": articles[i].h2.a.get('href')
#             }

#             data.append(article)
        
#         return data
       
from CyberWebSearcher import CyberWebSearcher
from bs4 import BeautifulSoup
import requests
import urllib
import json


class WeLiveSecurityScraper(CyberWebSearcher):

    def __init__(self):
        self._url = 'https://www.welivesecurity.com/?s='  
        self._class = 'news-feed-item'

    def searchForCyberNews(self, searchQuery):

        #parse URL
        url = self._url + urllib.parse.quote_plus(searchQuery)

        #get request
        response = requests.get(url)

        #soup the response
        soup = BeautifulSoup(response.text, 'lxml')

        #get articles
        return self.__getArticles(soup)

    def __getArticles(self,soup):

        #for nivos - these lines are also the same for every class
        articles = soup.find_all(class_=self._class)
        data = []


        #only this 'for loop' is different:

        #add articles
        for i in range(min(3, len(articles))):
            article = {
                "title": articles[i].h2.text.strip(),
                "description": articles[i].p.text.strip(),
                "date": articles[i].time.text.strip(),
                "link": articles[i].h2.a.get('href')
            }

            data.append(article)
        
        return data
       