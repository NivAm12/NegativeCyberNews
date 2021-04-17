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


class CybernewsScraper(CyberWebSearcher):
    def __init__(self):
        self.__url = 'https://cybernews.com/?s='
        self.__searchFieldXpath = '/html/body/div[2]/div/div[1]/div/div/div[2]/div[1]/div/div/div[2]/form/input'
        self.__webdriver = None
    
    def searchForCyberNews(self, searchQuery):
        self.__startWebSession()
        data = []
        # start the search:
        self.__webdriver.find_element_by_xpath(self.__searchFieldXpath).send_keys(searchQuery, Keys.RETURN)
        
        # wait for results to be load:
        WebDriverWait(self.__webdriver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, 'jeg_block_container')))
            
        time.sleep(4)

        # get source
        pageSource = self.__webdriver.page_source
        soup = BeautifulSoup(pageSource, 'html.parser')

        # get articles
        articles = soup.find_all(class_='jeg_post jeg_pl_lg_2 format-standard')

        # add articles
        for i in range(3):
            article = {
                "title": articles[i].find(class_='jeg_post_title').text.strip(),
                "description": articles[i].find(class_='jeg_post_excerpt').p.text.strip(),
                "date": articles[i].find(class_='jeg_meta_date').text.strip(),
                "link": articles[i].find(class_='jeg_post_title').a.get('href')
            }

            data.append(article)

        return data


    def __startWebSession(self):
        op = webdriver.ChromeOptions()
        op.add_experimental_option('excludeSwitches', ['enable-logging'])
        self.__webdriver = webdriver.Chrome(options=op)
        self.__webdriver.get(self.__url)
