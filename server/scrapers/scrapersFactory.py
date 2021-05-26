from CyberNewsSearcher import CyberNewsSearcher
import enum

ARTICLES_LEN = 3

class ScrapersOptions(enum.Enum):
    weLiveSecurity = 1
    threatPost = 2
    cyberNews = 3


def scrapersFactory(scraper: ScrapersOptions):
    scraperToBuild = None

    if scraper == ScrapersOptions.weLiveSecurity:
        scraperToBuild = CyberNewsSearcher(weLiveSecurityUrl, weLiveSecurityAriclesClass, weLiveSecurityArticlesMethod)
    
    elif scraper == ScrapersOptions.cyberNews:
        scraperToBuild = CyberNewsSearcher(cyberNewsUrl, cyberNewsAriclesClass, cyberNewsArticlesMethod)

    elif scraper == ScrapersOptions.threatPost:
        scraperToBuild = CyberNewsSearcher(threatPostUrl, threatPostAriclesClass, threatPostArticlesMethod)

    else:
        raise Exception("No such scraper...")        


    return scraperToBuild
    

# we live security:
weLiveSecurityUrl = 'https://www.welivesecurity.com/?s='  
weLiveSecurityAriclesClass = 'news-feed-item'
def weLiveSecurityArticlesMethod(articles):
    data = []

    #add articles
    for i in range(min(ARTICLES_LEN, len(articles))):
        article = {
            "title": articles[i].h2.text.strip(),
            "description": articles[i].p.text.strip(),
            "date": articles[i].time.text.strip(),
            "link": articles[i].h2.a.get('href')
        }

        data.append(article)

    return data

# cyber news:
cyberNewsUrl = 'https://cybernews.com/?s='
cyberNewsAriclesClass = 'jeg_post'
def cyberNewsArticlesMethod(articles):
    data = []

    #add articles
    for i in range(min(ARTICLES_LEN, len(articles))):
        article = {
            "title": articles[i].find(class_='jeg_post_title').text.strip(),
            "description": articles[i].find(class_='jeg_post_excerpt').p.text.strip(),
            "date": articles[i].find(class_='jeg_meta_date').text.strip(),
            "link": articles[i].find(class_='jeg_post_title').a.get('href')
        }

        data.append(article)

    return data          

# threat post:
threatPostUrl = 'https://threatpost.com/?s='
threatPostAriclesClass = 'c-card c-card--horizontal--half@md c-card--horizontal@lg c-card--horizontal--flat@md js-post-item'
def threatPostArticlesMethod(articles):
    data = []

    #add articles
    for i in range(min(ARTICLES_LEN, len(articles))):
        article = {
            "title": articles[i].h2.text.strip(),
            "description": articles[i].p.text.strip(),
            "date": articles[i].find(class_='c-card__time').text.strip(),
            "link": articles[i].h2.a.get('href')
        }

        data.append(article)

    return data      