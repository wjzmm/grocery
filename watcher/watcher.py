# -*- coding: utf-8 -*-
import urllib2
import BeautifulSoup
import sys
import os
import re
import filecmp
import string
import time
import tarfile
import chardet
import hashlib

######################goal##########################
#当前已完成页面的抓取工作
#下面是要将页面存储为字典或者以其他方式判断页面是否存在更新
#当页面存在更新是抓取敏感内容 √
#将内容进行压缩后保存，并定期释放已保存页面
#试图加入多线程
#把当前程序作为exe文件运行
####################################################

#一些常量
PATH = sys.path[0]       #获取当前工作路径，暂未使用
ISOTIMEFORMAT='%Y-%m-%d' #获取当前时间作为备份目录，即每天一个备份存储文件
PATTERN = re.compile(u'[\u4e00-\u9fa5]+')#抓取页面中的汉字的正则表达式
LOG_NAME = 'watcher_log'                #报警日志存储路径


warn = (u'学习',u'吃饭',u'睡觉',u'想到',u'关于',u'我')  # 要监控的敏感词汇,应该是可变的，所以采用list存放
last_md5 = ''

def getHtml(url):        #通过url抓取页面并返回
    con = urllib2.urlopen(url)
    html = con.read()
    con.close()
    return html


#页面监控，敏感词报警
def watch(warn, soup):
    path = './backup'
    for aims in PATTERN.findall(soup.html.find('div', {'class': 'content_leftList'}).text):
        for oris in warn:
            if not aims.find(oris) == -1:
                info = "warning, found \t" + oris + "\t at \t" + aims + "\n"
                print info
                saveAsFile(path, LOG_NAME, info.encode('GBK'), ".txt")
                

#存储文件，path为保存路径，name为要保存的文件名称，page为页面内容，ftype为保存类型               
def saveAsFile(path, name, page, ftype):
    if not os.path.exists(path):#如果备份目录不存在，则创建
        os.mkdir(path)
    filename = path + "/" + name + ftype
    fw = file(filename, "a")
    fw.write(page)
    print 'write success at ', filename
    fw.close()

#主方法    
def main():
    url = "http://tieba.baidu.com/f?kw=%C4%C7%CC%EC%D1%F4%B9%E2%BA%DC%C3%C0&fr=index" #要监控的博客地址，此处为个人贴吧地址
    baseurl = "http://tieba.baidu.com"
    html = getHtml(url)
    soup = BeautifulSoup.BeautifulSoup(html)
    link = soup.html.find('div', {'class': 'content_leftList'}).fetch('a') 
    #watch(warn, soup)                                                      #监控敏感词
    path = './backup/'+ time.strftime(ISOTIMEFORMAT, time.localtime(time.time()))
    for j in xrange(0,len(link),3):#取出页面中的帖子的地址
        #print link[j].get('href'),link[j].text
        newurl = baseurl+link[j].get('href') #合成url地址
        #saveAsFile(path, link[j].text, getHtml(newurl), ".html")           #保存更新的页面

# 试图用MD5辨别是否存在新发的帖子
def isChangedOrNot(page):
    last_md5 = hashlib.md5(page).hexdigest()
    
#filecmp 测试
def test():
    result = filecmp.dircmp(".//backup//2015-06-11",".//backup//2015-06-11")
    result.report()

def compress(path):
    for root, dirs, files, in os.walk(path, True):
        print "位置:" , root
        for filename in files:
            fname = root.split("/")[-1]
            if not len(fname) == 0:
                fname = path + fname + ".tar.gz"
                print fname
                tar = tarfile.open(fname, "w:gz")
                filen = filename.decode('gbk','ignore').encode('utf-8')
                print chardet.detect(filen)
                tar.add(filen)      #存储时报错，存在类型转换问题，待解决
                tar.close()
if __name__ == "__main__":
    #main()
    #compress("./backup/")#压缩部分由于编码问题暂未解决。
    isChangedOrNot("这是一个字符串")
