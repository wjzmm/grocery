import sys

context = '''hello world
hello china
'''

f = file("hello.txt", "w")
f.write(context)
f.close()

#fout = open("hello.txt", "r+")
#while True:
#    line = fout.readline()
#    if line:
#        print line
#    else:
#        break
fout = open("hello.txt", "r+")
lines = fout.readlines()
for line in lines:
    print line
fout.close()


ff = open("hello.txt")
context = ff.read()
print context

