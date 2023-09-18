集合任何两个元素都是不同的，即元素在集合中只能出现一次

```python
#创建集合 (重复元素不会出现)
set1={1,2,3,3,3,2}
print(set1)  #{1,2,3}


#创建集合构造器
set2 = set('hello')
print(set2)  #{'h','e','l','l','o'}

#将列表转换成集合（可以去掉重复元素）
set3= set([1,2,3,3,3,2])
print(set3)  #{1,2,3}

#集合运算
#成员运算
set1= {11,12,13,14,15}
print(10 in set1) #false 
print(15 not in set1) #false

#交并差运算
set1={1,2,3,4,5,6,7}
set2={2,4,6,8,10}
#交集
#方法一 &
print(set1 & set2) #{2,4,6}
# 方法二 intersection
print(set1.intersection(set2)) #{2,4,6}

#并集
#方法一 使用|
print(set1 | set2) #{1,2,3,4,5,6,7,8,10}
#方法二 使用union
print(set1.union(set2)) #{1,2,3,4,5,6,7,8,10}

#差集
#方法一  使用-
print(set1 - set2)  #{1,3,5,7}
#方法二  使用difference
print(set1.difference(set2))  #{1,3,5,7}

#对称差
#方法一  使用^
print(set1 ^ set2) #{1,3,5,7,8,10}
#方法二 使用symmetric_difference()
print(set1.symmetric_difference(set2)) #{1,3,5,7,8,10}
```
