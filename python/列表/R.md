列表 在其他语言中也叫数组
len.(列表)  获得列表长度 n+1   
列表.count(数据)  获取数据在列表中出现的次数
列表.sort() 升序排序 列表.sort(reverse=true) 降序排序 列表.reversve()反转/逆序
列表.index(数据) 获得数据第一次出现的索引 列表[索引]从利厄表中取值
列表数据类型支持很多方法，列表对象的所有方法所示如下：

list.append(x)

    在列表末尾添加一个元素，相当于 a[len(a):] = [x] 。

list.extend(iterable)

    用可迭代对象的元素扩展列表。相当于 a[len(a):] = iterable 。

list.insert(i, x)

    在指定位置插入元素。第一个参数是插入元素的索引，因此，a.insert(0, x) 在列表开头插入元素， a.insert(len(a), x) 等同于 a.append(x) 。

list.remove(x)

    从列表中删除第一个值为 x 的元素。未找到指定元素时，触发 ValueError 异常。

list.pop([i])

    删除列表中指定位置的元素，并返回被删除的元素。未指定位置时，a.pop() 删除并返回列表的最后一个元素。（方法签名中 i 两边的方括号表示该参数是可选的，不是要求输入方括号。这种表示法常见于 Python 参考库）。

list.clear()

    删除列表里的所有元素，相当于 del a[:] 。

list.index(x[, start[, end]])

    返回列表中第一个值为 x 的元素的零基索引。未找到指定元素时，触发 ValueError 异常。

    可选参数 start 和 end 是切片符号，用于将搜索限制为列表的特定子序列。返回的索引是相对于整个序列的开始计算的，而不是 start 参数。

list.count(x)

    返回列表中元素 x 出现的次数。

list.sort(*, key=None, reverse=False)

    就地排序列表中的元素（要了解自定义排序参数，详见 sorted()）。

list.reverse()

    翻转列表中的元素。

list.copy()

    返回列表的浅拷贝。相当于 a[:] 。
