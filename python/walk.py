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
        print "λ��:" + root
        for filename in files:
            state = os.stat(os.path.join(root, filename))
            info = "�ļ���:" + filename + " "
            info = info + "��С��" + ("%d" %state[-4]) + " "
            t = time.strftime("%Y-%m-%d%X", time.localtime(state[-1]))
            info = info + "����ʱ��:" + t + " "
            t = time.strftime("%Y-%m-%d%X", time.localtime(state[-2]))
            info = info + "����޸�ʱ��:" + t + " "
            t = time.strftime("%Y-%m-%d%X", time.localtime(state[-3]))
            info = info + "������ʱ��:" + t + " "
            print info
if __name__ == "__main__":
    path = r"F:\PT"
   # os.path.walk(path, WalkD, ())
    showFileProperties(path)
