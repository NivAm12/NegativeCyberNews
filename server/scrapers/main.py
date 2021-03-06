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
    
    articles = [item for sublist in results for item in sublist]

    if not articles:
        raise Exception("no articles")
    return articles                   


def search(scraper, searchTerm):
    return scraper.searchForCyberNews(searchTerm)


articles = start(sys.argv[1])
print(json.dumps(articles))


