import sys
from joblib import Parallel, delayed
import json
from Cyware import CywareScraper
from CyberNews import CybernewsScraper
from Upguard import UpguardScraper


cyberNews = CybernewsScraper()
cyware = CywareScraper()
upguard = UpguardScraper()
scrapers = [cyberNews, cyware, upguard]

def start(searchTerm):
    results = Parallel(n_jobs=-1)(delayed(search)
                    (scraper=scraper, searchTerm=searchTerm) for scraper in scrapers)

    return results                    


def search(scraper, searchTerm):
    return scraper.searchForCyberNews(searchTerm)



results = start(sys.argv[1])
articles = [item for sublist in results for item in sublist]
print(json.dumps(articles))


