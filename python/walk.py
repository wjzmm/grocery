# -*- coding: cp936 -*-
import os, os.path, time
def WalkDir(path):
    li = os.listdir(path)
    for p in li:
        pathname = os.path.join(path, p)
        if not os.path.isfile(pathname):
            WalkDir(pathname)
        else:
            print pathname

def WalkD(arg, dirname, names):
    for filepath in names:
        print os.path.join(dirname, filepath)

def OsWalk(path):
    for root, dirs, files in os.walk(path):
        for filepath in files:
            print os.path.join(root, filepath)


def showFileProperties(path):
    for root, dirs, files, in os.walk(path, True):
        print "位置:" + root
        for filename in files:
            state = os.stat(os.path.join(root, filename))
            info = "文件名:" + filename + " "
            info = info + "大小：" + ("%d" %state[-4]) + " "
            t = time.strftime("%Y-%m-%d%X", time.localtime(state[-1]))
            info = info + "创建时间:" + t + " "
            t = time.strftime("%Y-%m-%d%X", time.localtime(state[-2]))
            info = info + "最后修改时间:" + t + " "
            t = time.strftime("%Y-%m-%d%X", time.localtime(state[-3]))
            info = info + "最后访问时间:" + t + " "
            print info
if __name__ == "__main__":
    path = r"F:\PT"
   # os.path.walk(path, WalkD, ())
    showFileProperties(path)
