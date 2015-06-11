# -*- coding: utf-8 -*-
import urllib2
import BeautifulSoup
import sys
import os
import time

#当前已完成页面的抓取工作
#下面是要将页面存储为字典或者以其他方式判断页面是否存在更新
#当页面存在更新是抓取敏感内容
#将内容进行压缩后保存，并定期释放已保存页面

PATH = sys.path[0]       #获取当前工作路径，暂未使用
ISOTIMEFORMAT='%Y-%m-%d' #获取当前时间作为备份目录，即每天一个备份存储文件

def getHtml(url):        #通过url抓取页面并返回
    con = urllib2.urlopen(url)
    html = con.read()
    con.close()
    return html
def savePage(name, page):#存储页面，name为要保存的文件名称，page为页面内容
    path = './backup/'+ time.strftime(ISOTIMEFORMAT, time.localtime(time.time()))
    if not os.path.exists(path):#如果备份目录不存在，则创建
        os.mkdir(path)
    filename = path + "/" + name + '.html'
    fw = file(filename, "w")
    fw.write(page)
    print 'write success at ', filename
    fw.close()
    
def main():
    url = "http://tieba.baidu.com/f?kw=%C4%C7%CC%EC%D1%F4%B9%E2%BA%DC%C3%C0&fr=index" #要监控的博客地址，此处为个人贴吧地址
    baseurl = "http://tieba.baidu.com"
    html = getHtml(url);
    soup = BeautifulSoup.BeautifulSoup(html)
    # = soup.html.body.find('a', {'class': 'j_th_tit'})['href'] #抓取特定标签的链接，不通用，在当前页面下是这样抓取
    #page_name = soup.html.find('div', {'class': 'content_leftList'}).find_all(class_="j_th_tit")
    link = soup.html.find('div', {'class': 'content_leftList'}).fetch('a')
    
    #print getHtml(newurl)
    for j in xrange(0,len(link),3):#取出页面中的帖子的地址
        print link[j].get('href'),link[j].text
        newurl = baseurl+link[j].get('href');#合成url地址
        savePage(link[j].text, getHtml(newurl))
    #print PATH + '/backup/'+ time.strftime(ISOTIMEFORMAT, time.localtime(time.time())) + '/'+ link[0].text+ '.html'
if __name__ == "__main__":
    main()
    #print PATH
    
