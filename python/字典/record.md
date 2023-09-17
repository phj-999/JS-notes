字典是除列表以外py中最灵活的数据类型
可以存储多个数据（通常用来描述一个物品的相关信息）
和列表的区别：
 列表是有序的对象集合，字典是无序的
 字典用{}定义，键值对存储

```python
len.(字典) 键值对数量     字典.values()  value列表
字典.keys() 所有key列表   字典.items() 所有(key,value)元组列表

字典[key] 可以从字典中取值，key不存在会报错
字典.get(key)可以从字典中取值，key不存在会报错

del 字典[key] 删除指定键值对，key不存在会报错
字典.pop(key)删除指定键值对，key不存在会报错
字典.popItem()随即删除一个键值对    pop.clear()清空字典

字典[key] = value   key存在则修改，不存在则创建
字典.setdefault(key,value)  key存在，不会修改数据，key不存在，则新建键值对
字典.update(字典2) 将字典2合并到字典1


```

