import sys
#import json

from Cyware import CywareScraper
from CyberNews import CybernewsScraper
from Upguard import UpguardScraper

class Parse:

    def __init__(self):
        self.cyberNews = CybernewsScraper()
        self.cywareScraper = CywareScraper()
        self.upguard = UpguardScraper()

    def start(self, searchTerm):
        self.cyberNews.searchForCyberNews(searchTerm)
         



p = Parse()
p.start(sys.argv[1])
print(sys.argv[1])


# {
#     link:
#     title:
#     description:
#     timestamp:

# }

