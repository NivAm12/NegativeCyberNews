from selenium import webdriver
from bs4 import BeautifulSoup
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from cyberWebSearcher import CyberWebSearcher


class CybernewsScraper(CyberWebSearcher):
    def __init__(self):
        self.__url = 'https://cybernews.com/?s='
        self.__searchFieldXpath = '/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]/div/div/div[2]/form/input'
        self.__searchBtnXpath = '/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]/div/div/div[2]/form/button' 
        self.__webdriver = None
    
    def searchForCyberNews(self, searchQuery):
        self.__startWebSeassion()

        # start the search:
        self.__webdriver.find_element_by_xpath(self.__searchFieldXpath).send_keys(searchQuery, Keys.RETURN)

    def __startWebSeassion(self):
        self.__webdriver = webdriver.Chrome()
        self.__webdriver.get(self.__url)


#####test 
testObj = CybernewsScraper()
testObj.searchForCyberNews('apple')