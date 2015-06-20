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
import sched

######################goal##########################
#当前已完成页面的抓取工作
#下面是要将页面存储为字典或者以其他方式判断页面是否存在更新
#当页面存在更新是抓取敏感内容 √
#将内容进行压缩后保存，并定期释放已保存页面
#试图加入多线程
#把当前程序作为exe文件运行
#实现增量备份，提高效率
####################################################

#一些常量
PATH = sys.path[0]       #获取当前工作路径，暂未使用
ISOTIMEFORMAT='%Y-%m-%d' #获取当前时间作为备份目录，即每天一个备份存储文件
PATTERN = re.compile(u'[\u4e00-\u9fa5]+')#抓取页面中的汉字的正则表达式
LOG_NAME = 'watcher_log'                #报警日志存储路径

scheduler = sched.scheduler(time.time, time.sleep)

warn = (u'学习',u'吃饭',u'睡觉',u'想到',u'关于',u'我')  # 要监控的敏感词汇,应该是可变的，所以采用list存放

#全局变量
_last_md5 = ""
_con_dict = []
_pointer = 0
_count = 100

#通过url抓取页面并返回
def getHtml(url):        
    con = urllib2.urlopen(url)
    html = con.read()
    con.close()
    return html


#页面监控，敏感词报警
def watch(warn, soup):
    print "watching sensitive words..."
    path = './backup'
    for aims in PATTERN.findall(soup.html.find('div', {'class': 'content_leftList'}).text):
        for oris in warn:
            if not aims.find(oris) == -1:
                info = time.time() + "/t" + "warning, found \t" + oris + "\t at \t" + aims + "\n"
                #print info
                saveAsFile(path, LOG_NAME, info.encode('GBK'), ".txt", False)
                

#存储文件，path为保存路径，name为要保存的文件名称，page为页面内容，ftype为保存类型               
def saveAsFile(path, name, page, ftype, com):
    if com:
        print "saving changed pages..."
    if not os.path.exists(path):#如果备份目录不存在，则创建
        os.mkdir(path)
    filename = path + "/" + name + ftype
    fw = file(filename, "a")
    fw.write(page)
    #print 'write success at ', filename
    fw.close()
    if com:
        compress(path)
#主方法
def main():
    scheduler.enter(0, 0, watchDog,"")
    scheduler.run()

#监控入口
def watchDog():
    global _last_md5
    global _con_dict
    global _count
    global _pointer
    urllist = ""
    newurl = []
    linktext = []
    print "watchingDog is working..."
    url = "http://tieba.baidu.com/f?kw=%C4%C7%CC%EC%D1%F4%B9%E2%BA%DC%C3%C0&fr=index" #要监控的博客地址，此处为个人贴吧地址
    baseurl = "http://tieba.baidu.com"
    html = getHtml(url)
    soup = BeautifulSoup.BeautifulSoup(html)
    link = soup.html.find('div', {'class': 'content_leftList'}).fetch('a')                                                     #监控敏感词
    path = './backup/'+ time.strftime(ISOTIMEFORMAT, time.localtime(time.time()))
    for j in xrange(0,len(link),3):#取出页面中的帖子的地址
        newurl.append(baseurl+link[j].get('href'))
        linktext.append(link[j].text)
        temp = hashlib.md5(link[j].text.encode("gbk")).hexdigest()
        #把贴吧当前条目以列表的形式存储，每次监测都检查当前页面条目是否在列表中，如果不在则证明有内容变化，将新条目保存并存储在列表中，将列表中最老的条目剔除以保持列表长度不会发生变化
        #为选择时间最久的条目，设置一个指针将列表变为队列，每次只在指针出做入队出对操作即可
        if temp not in _con_dict:
            saveAsFile(path, link[j].text, getHtml(newurl[-1]), ".html", True)      #增量备份
            print temp
            if not len(_con_dict) == _count:
                _con_dict.append(temp)
            else:
                _con_dict[_pointer] = temp
                print _pointer
                _pointer = (_pointer % 100) +1
        else:
            print "当前贴吧没有内容发生变化......"
        urllist += link[j].get('href')
    #if isChangedOrNot(urllist):
    #    watch(warn, soup)
    #    for i in xrange(len(newurl)):
    #        #print newurl[i], linktext[i]
    #        saveAsFile(path, linktext[i], getHtml(newurl[i]), ".html", True)
    print _con_dict
    scheduler.enter(10, 0, watchDog,"")
 
# 试图用MD5辨别是否存在新发的帖子
# 因为加了列表作为判别，所以此方法并没有用到
def isChangedOrNot(page):
    global _last_md5
    if len(_last_md5) == 0:
        _last_md5 = hashlib.md5(page).hexdigest()
        return True
    else:
        new_md5 = hashlib.md5(page).hexdigest()
        if _last_md5 == new_md5:
            return False
        else:
            _last_md5 = hashlib.md5(page).hexdigest()
            return True
    
    
# 测试 方法
def test():
    result = filecmp.dircmp(".//backup//2015-06-11",".//backup//2015-06-11")
    result.report()
    #compress("./backup/")#压缩部分由于编码问题暂未解决。
    #isChangedOrNot("这是一个字符串")


#压缩模块还存在一定的问题，会把目录同时压缩，如果不添加全局目录，则会报一个编码错误，待解决，暂时可用吧
def compress(path):
    print "compressing changed files..."
    for root, dirs, files, in os.walk(path, True):
        #print "location:" , root
        #os.chdir(root)
        fname = root.split("/")[-1]
        if not len(fname) == 0:
            fname = path + ".tar.gz"
            #fname = fname + ".tar.gz"
            #print fname, fullpath
            tar = tarfile.open(fname, "w:gz")
            for filename in files:
                #os.chdir(path)
                #print path
                fullpath = os.path.join(root, filename)
                tar.add(fullpath)
            tar.close()
               
            
if __name__ == "__main__":
    main()
    #test()
