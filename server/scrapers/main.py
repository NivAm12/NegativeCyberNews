import sys
from joblib import Parallel, delayed
import json
from Cyware import CywareScraper
from CyberNews import CybernewsScraper
from WeLiveSecurity import WeLiveSecurityScraper


cyberNews = CybernewsScraper()
# cyware = CywareScraper()
weLiveSecurity = WeLiveSecurityScraper()
scrapers = [weLiveSecurity, cyberNews]

def start(searchTerm):
    results = Parallel(n_jobs=2, prefer="threads")(delayed(search)
                    (scraper=scraper, searchTerm=searchTerm) for scraper in scrapers)

    return results                    


def search(scraper, searchTerm):
    return scraper.searchForCyberNews(searchTerm)


# articles = search(weLiveSecurity, sys.argv[1])
results = start(sys.argv[1])
articles = [item for sublist in results for item in sublist]
print(json.dumps(articles))


