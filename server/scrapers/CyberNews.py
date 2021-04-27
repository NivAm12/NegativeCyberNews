from selenium import webdriver
import time
from bs4 import BeautifulSoup
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from CyberWebSearcher import CyberWebSearcher
import json


class CybernewsScraper(CyberWebSearcher):
    def __init__(self):
        self._url = 'https://cybernews.com/?s='
        self._searchFieldXpath = '/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]/div/div/div[2]/form/input'
    

    def searchForCyberNews(self, searchQuery):
        self._startWebSession()

        # start the search:
        self.__search(searchQuery)

        # get articles
        articles = self.__getArticles()

        # end session:
        self._webdriver.quit()
        
        return articles


    def __search(self, searchQuery):
        # auto actions on driver:
        self._webdriver.find_element_by_xpath(self._searchFieldXpath).send_keys(searchQuery, Keys.RETURN)
        
        # wait for results to be load:
        WebDriverWait(self._webdriver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'jeg_block_container'))) 


    def __getArticles(self):
         # get source
        pageSource = self._webdriver.page_source
        soup = BeautifulSoup(pageSource, 'html.parser')
        articles = soup.find_all(class_='jeg_post jeg_pl_lg_2 format-standard')
        data = []

        # add articles
        for i in range(min(3, len(articles))):
            article = {
                "title": articles[i].find(class_='jeg_post_title').text.strip(),
                "description": articles[i].find(class_='jeg_post_excerpt').p.text.strip(),
                "date": articles[i].find(class_='jeg_meta_date').text.strip(),
                "link": articles[i].find(class_='jeg_post_title').a.get('href')
            }

            data.append(article)

        return data  
