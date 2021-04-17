from selenium import webdriver
import time
from bs4 import BeautifulSoup
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
from WebScraper import CyberWebSearcher
import json


class UpguardScraper(CyberWebSearcher):
    def __init__(self):
        self.__url = 'https://www.upguard.com/security-reports'
        self.__searchFieldXpath = '//*[@id="field"]'
        self.__webdriver = None
    
    def searchForCyberNews(self, searchQuery):
        self.__startWebSession()
        data = []
        # start the search:
        self.__webdriver.find_element_by_xpath(self.__searchFieldXpath).send_keys(searchQuery, Keys.RETURN)
        time.sleep(2)
        self.__webdriver.find_elements_by_link_text('View security report')[0].click()
        time.sleep(4)

        # get source
        pageSource = self.__webdriver.page_source
        soup = BeautifulSoup(pageSource, 'html.parser')

        # # get articles
        articles = soup.find(class_='grid-thirds list-combine w-dyn-items').find_all(class_='w-dyn-item')
        
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

    def __startWebSession(self):
        op = webdriver.ChromeOptions()
        op.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.__webdriver = webdriver.Chrome(options=op)
        self.__webdriver.get(self.__url)
