import re

tell = "0536-4934036"

print re.findall(r"\d{3}-\d{8}|\d{4}-\d{7}", tell)

tel2 = "010-12345678"
print re.findall(r"\d{3}-\d{8}|\d{4}-\d{7}", tel2)

tel3 = "(010)12345678"

print re.findall(r"[\(]?\d{3}[\)]-?\d{8}|[\(]?\d{4}[\)]-?\d{7}",tel3)

s = "1asd23ascac34qdsad"

p = re.compile(r"\d+")

print p.findall(s)

print p.pattern
