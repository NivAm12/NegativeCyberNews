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
        return self.cywareScraper.searchForCyberNews(searchTerm)
         



p = Parse()
result = p.start(sys.argv[1])
print(result)


# {
#     link:
#     title:
#     description:
#     timestamp:

# }

