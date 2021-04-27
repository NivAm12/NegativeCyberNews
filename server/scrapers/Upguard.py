from selenium import webdriver
import time
from bs4 import BeautifulSoup
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from  CyberWebSearcher import CyberWebSearcher
import json


class UpguardScraper(CyberWebSearcher):
    def __init__(self):
        self._url = 'https://www.upguard.com/security-reports'
        self._searchFieldXpath = '//*[@id="field"]'
    

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
        time.sleep(2)
        self._webdriver.find_elements_by_link_text('View security report')[0].click()
        time.sleep(2)   


    def __getArticles(self):
        # get source
        pageSource = self._webdriver.page_source
        soup = BeautifulSoup(pageSource, 'html.parser')
        articles = soup.find(class_='grid-thirds list-combine w-dyn-items').find_all(class_='w-dyn-item')
        data = []

        # add articles
        for i in range(3):
            article = {
                "title": articles[i].find(class_='h4 mb-16').text.strip(),
                "description": articles[i].find(class_='card-description-3-lines').text.strip(),
                "date": articles[i].find(class_='h5 h5-subtitle w-embed').text.strip(),
                "link": articles[i].a.get('href')
            }

            data.append(article)

        return data