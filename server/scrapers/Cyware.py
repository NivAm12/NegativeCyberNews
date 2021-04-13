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


class CywareScraper(CyberWebSearcher):
    def __init__(self):
        self.__url = 'https://cyware.com/search'
        self.__searchFieldXpath = '//*[@id="__layout"]/div/section[2]/div/div/div[2]/div/div/div/div/div/div[1]/input'
        self.__webdriver = None
    

    def searchForCyberNews(self, searchQuery):
        self.__startWebSession()
        data = []
        # start the search:
        self.__webdriver.find_element_by_xpath(self.__searchFieldXpath).send_keys(searchQuery, Keys.RETURN)
        
        # wait for results to be load:
        WebDriverWait(self.__webdriver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'cy-feed-tabs')))
            
        time.sleep(4)

        # get source
        pageSource = self.__webdriver.page_source
        soup = BeautifulSoup(pageSource, 'html.parser')

        # get articles
        articles = soup.find(class_='cy-feed-tabs').find_all(class_='cy-panel__body')

        # add articles
        for i in range(3):
            article = {
                "title": articles[i].find(class_='cy-card__title m-0 cursor-pointer pb-3').text.strip(),
                "description": articles[i].find(class_='cy-card__description').text.strip(),
                "date": articles[i].select_one("div > span").text,
                "link": articles[i].select('a')[2].get('href')
            }

            data.append(article)

        return data


    def __startWebSession(self):
        op = webdriver.ChromeOptions()
        op.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.__webdriver = webdriver.Chrome(options=op)
        self.__webdriver.get(self.__url)
