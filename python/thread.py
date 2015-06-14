import os
import subprocess

pingP = subprocess.Popen(args='ping - n 4 www.sina.com.cn',shell=True)
pingP.wait()
print pingP.pid
print pingP.returncode

#notepad='c:\\windows\\notepad.exe'
#os.execl(notepad, "python")
