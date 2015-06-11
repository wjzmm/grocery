import urllib2

def getHtml(url):
    page = urllib2.urlopen(url)
    html = page.read()
    return html

html = getHtml("http://www.baidu.com")
print html
