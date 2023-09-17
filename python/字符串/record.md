```python
str.cpitalize()获得str首字母大写后的字符串
str.title() 获得str每个单词首字母大写后的strr
str.upper()所有字母大写后的str
str.lower()所有字母小写后的str

#查找操作
str.find(x) 从前到后第一个查找，返回字符x出现的索引位置
str.rfind(x) 从后向前
str.find(x, index)查找x，从index开始查找

#性质判断 startswitch,endswitch判断字符串是否以xx开头，结尾。返回true/false
str.startswitch(x)   str.endswitch(x)

#检查字符串是否由数字构成返回布尔值
str.isdigit()
#检查字符串是否由字母构成 返回布尔值
str.isalpha()
#检查字符串是否由字母和数字构成 返回布尔值
str.isalnum()

#格式化字符串
str=xxx
#以高度为20将字符串中居中，并在两侧居中
str.center(20,'*')  # ***xxx***
#宽度20将str右对齐并在左侧填充空格
str.rjust(20)  #    xxx
#宽度20将str左对齐 并在右侧填充-
str.ljust(20,'-')  # xxx---------
#在左侧填充0
print('33',str.zfill(5)) #00033


#修剪 strip()  lstrip()  rstrip()
#返回源字符串修剪左右两端空格之后的str
strip()  lstrip()  rstrip()

#替换 replace(想要替换的原字符, 想要替换的目标字符， 下标)
s='hello,world'
s.replace('o','@')  #hell@,w@rld
s.replace('o','@', 1)  #hello,w@rld

#拆分/合并 split/join   拆分也可以指定字符串， 默认是空格split('xxx')
s='i love'
w=s.split()  # w = ['i', 'love']  拆分
print('#',join(w))  #  i#love  合并

#编码/解码操作  encode('utf-8') / encode('gbk')
#把字符串str编码为字节串bytes，或者把bytes解码成str

```