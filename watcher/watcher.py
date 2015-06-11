# -*- coding: utf-8 -*-
import urllib2
import BeautifulSoup
import sys
import os
import time

PATH = sys.path[0]
ISOTIMEFORMAT='%Y-%m-%d'

def getHtml(url):
    con = urllib2.urlopen(url)
    html = con.read()
    con.close()
    return html
def savePage(name, page):
    path = './backup/'+ time.strftime(ISOTIMEFORMAT, time.localtime(time.time()))
    if not os.path.exists(path):
        os.mkdir(path)
    filename = path + "/" + name + '.html'
    fw = file(filename, "w")
    fw.write(page)
    print 'write success at ', filename
    fw.close()
    
def main():
    url = "http://tieba.baidu.com/f?kw=%C4%C7%CC%EC%D1%F4%B9%E2%BA%DC%C3%C0&fr=index"
    baseurl = "http://tieba.baidu.com"
    html = getHtml(url);
    soup = BeautifulSoup.BeautifulSoup(html)
    # = soup.html.body.find('a', {'class': 'j_th_tit'})['href'] #抓取特定标签的链接
    #page_name = soup.html.find('div', {'class': 'content_leftList'}).find_all(class_="j_th_tit")
    link = soup.html.find('div', {'class': 'content_leftList'}).fetch('a')
    
    #print getHtml(newurl)
    for j in xrange(0,len(link),3):
        print link[j].get('href'),link[j].text
        newurl = baseurl+link[j].get('href');
        savePage(link[j].text, getHtml(newurl))
    #print PATH + '/backup/'+ time.strftime(ISOTIMEFORMAT, time.localtime(time.time())) + '/'+ link[0].text+ '.html'
if __name__ == "__main__":
    main()
    #print PATH
    
