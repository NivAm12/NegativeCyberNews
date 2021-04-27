from abc import ABC, abstractmethod
from selenium import webdriver
import time
from bs4 import BeautifulSoup
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import json


class CyberWebSearcher(ABC):
    
    def __init__(self):
        self._url = None
        self._searchFieldXpath = None
        self._webdriver = None

    @abstractmethod
    def searchForCyberNews(self, searchQuery):
        pass

    def _startWebSession(self):
        op = webdriver.ChromeOptions()
        op.add_experimental_option('excludeSwitches', ['enable-logging'])
        self._webdriver = webdriver.Chrome(options=op)
        self._webdriver.get(self._url)
