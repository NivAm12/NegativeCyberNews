import sys
from joblib import Parallel, delayed
import json
from scrapersFactory import ScrapersOptions, scrapersFactory


cyberNews = scrapersFactory(ScrapersOptions.cyberNews)
threatPost = scrapersFactory(ScrapersOptions.threatPost)
weLiveSecurity = scrapersFactory(ScrapersOptions.weLiveSecurity)
scrapers = [weLiveSecurity, cyberNews, threatPost]

def start(searchTerm):
    results = Parallel(n_jobs=-1, prefer="threads")(delayed(search)
                    (scraper=scraper, searchTerm=searchTerm) for scraper in scrapers)

    return results                    


def search(scraper, searchTerm):
    return scraper.searchForCyberNews(searchTerm)


# articles = search(weLiveSecurity, sys.argv[1])
results = start(sys.argv[1])
articles = [item for sublist in results for item in sublist]
print(json.dumps(articles))


