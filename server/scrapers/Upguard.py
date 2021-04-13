from selenium import webdriver
from bs4 import BeautifulSoup
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from cyberWebSearcher import CyberWebSearcher


class UpguardScraper(CyberWebSearcher):
    def __init__(self):
        self.__url = 'https://www.upguard.com/security-reports'
        self.__searchFieldXpath = '//*[@id="field"]'
        self.__webdriver = None
    
    def searchForCyberNews(self, searchQuery):
        self.__startWebSession()

        # start the search:
        self.__webdriver.find_element_by_xpath(self.__searchFieldXpath).send_keys(searchQuery)
        

    def __startWebSession(self):
        self.__webdriver = webdriver.Chrome()
        self.__webdriver.get(self.__url)

