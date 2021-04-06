from selenium import webdriver
import time
from bs4 import BeautifulSoup
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from cyberWebSearcher import CyberWebSearcher


class CywareScraper(CyberWebSearcher):
    def __init__(self):
        self.__url = 'https://cyware.com/search'
        self.__searchFieldXpath = '//*[@id="__layout"]/div/section[2]/div/div/div[2]/div/div/div/div/div/div[1]/input'
        self.__webdriver = None
    
    def searchForCyberNews(self, searchQuery):
        self.__startWebSeassion()

        # start the search:
        self.__webdriver.find_element_by_xpath(self.__searchFieldXpath).send_keys(searchQuery, Keys.RETURN)

    def __startWebSeassion(self):
        self.__webdriver = webdriver.Chrome()
        self.__webdriver.get(self.__url)


#####test 
testObj = CywareScraper()
testObj.searchForCyberNews('apple')