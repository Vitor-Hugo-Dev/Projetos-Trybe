import requests
import time
from parsel import Selector
from tech_news.database import create_news


# Requisito 1
def fetch(url):  # url1 = "https://www.tecmundo.com.br/novidades"
    time.sleep(1)
    try:
        response = requests.get(url, timeout=3)
        if response.status_code == 200:
            return response.text
        else:
            return None
    except requests.exceptions.RequestException:
        return None


# Requisito 2
def scrape_novidades(html_content):  # https://www.tecmundo.com.br/novidades

    content = Selector(text=html_content)
    href_list = content.css(
        'div.tec--list__item a.tec--card__title__link::attr(href)'
        ).getall()
    return href_list


# Requisito 3
def scrape_next_page_link(html_content):
    content = Selector(text=html_content)
    href_next_page = content.css('div.tec--list a.tec--btn::attr(href)').get()

    return href_next_page


# Requisito 4
def scrape_noticia(html_content):
    content = Selector(text=html_content)
    result = {}
    url = content.css(
      'head link[rel="canonical"]::attr(href)'
    ).get()
    result['url'] = url

    title = content.css(
        'div.z--pt-40 h1.tec--article__header__title::text'
        ).get()
    result['title'] = title

    times_tamp = content.css(
        'div.tec--timestamp__item time::attr(datetime)'
        ).get()
    result['timestamp'] = times_tamp

    writer = content.css(
        '.z--font-bold *::text'
        ).get()
    if writer:
        result['writer'] = writer.strip()
    else:
        result['writer'] = None

    shares_count = content.css(
        '.tec--toolbar__item::text'
        ).get()
    if(shares_count):
        result['shares_count'] = int(shares_count.split()[0])
    else:
        result['shares_count'] = 0

    comments_count = content.css(
        '#js-comments-btn::attr(data-count)'
        ).get()
    if comments_count:
        result['comments_count'] = int(comments_count)
    else:
        result['comments_count'] = 0

    summary = "".join(content.css(
        'div.tec--article__body > p:nth-child(1) *::text'
        ).getall())
    result['summary'] = summary

    sources = content.css(
        'div.z--mb-16 a.tec--badge::text'
        ).getall()
    result['sources'] = [source.strip() for source in sources]

    categories = content.css(
        '#js-categories a.tec--badge::text'
        ).getall()
    result['categories'] = [category.strip() for category in categories]

    return result


# Requisito 5
def get_tech_news(amount):
    url = "https://www.tecmundo.com.br/novidades"
    html_content = fetch(url)

    next_page_link = scrape_next_page_link(html_content)
    scrape_noticias_list = []

    while (len(scrape_noticias_list) < amount):
        for link in scrape_novidades(html_content):
            if len(scrape_noticias_list) < amount:
                scrape_noticias_list.append(scrape_noticia(fetch(link)))
            else:
                break
        html_content = fetch(next_page_link)

    create_news(scrape_noticias_list)
    return scrape_noticias_list
