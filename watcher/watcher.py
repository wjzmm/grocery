# -*- coding: utf-8 -*-
import urllib2
import BeautifulSoup

def getHtml(url):
    con = urllib2.urlopen(url)
    html = con.read()
    con.close()
    return html

def main():
    url = "http://tieba.baidu.com/f?kw=%C4%C7%CC%EC%D1%F4%B9%E2%BA%DC%C3%C0&fr=index"
    baseurll = "http://tieba.baidu.com"
    html = getHtml(url);
    soup = BeautifulSoup.BeautifulSoup(html)
    # = soup.html.body.find('a', {'class': 'j_th_tit'})['href'] #抓取特定标签的链接
    #page_name = soup.html.find('div', {'class': 'content_leftList'}).find_all(class_="j_th_tit")
    link = soup.html.find('div', {'class': 'content_leftList'}).fetch('a')
    print len(link)
    for j in xrange(0,len(link),3):
        print link[j].get('href')

if __name__ == "__main__":
    main()
