from tech_news.database import search_news
import re
from datetime import datetime


# Requisito 6
def search_by_title(title):
    regex = re.compile(title, re.IGNORECASE)
    get_noticias = search_news({
        'title': regex})
    print(get_noticias)
    news = []

    for noticia in get_noticias:
        news.append((noticia['title'], noticia['url']))
    return news


# Requisito 7
def search_by_date(date):
    try:
        # https://www.geeksforgeeks.org/python-validate-string-date-format/
        datetime.strptime(date, "%Y-%m-%d")
        regex = re.compile(date, re.IGNORECASE)
        get_noticias = search_news({
            'timestamp': regex})
        print(get_noticias)
        news = []
        for noticia in get_noticias:
            news.append((noticia['title'], noticia['url']))
        return news
    except ValueError:
        raise ValueError("Data inválida")


# Requisito 8
def search_by_source(source):
    regex = re.compile(source, re.IGNORECASE)
    get_noticias = search_news({
        'sources': regex})
    print(get_noticias)
    news = []

    for noticia in get_noticias:
        news.append((noticia['title'], noticia['url']))
    return news


# Requisito 9
def search_by_category(category):
    regex = re.compile(category, re.IGNORECASE)
    get_noticias = search_news({
        'categories': regex})
    print(get_noticias)
    news = []

    for noticia in get_noticias:
        news.append((noticia['title'], noticia['url']))
    return news
