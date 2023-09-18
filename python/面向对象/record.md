# 函数
## 动态属性
stu.xx='DONG TAI'  xx属性本来是没有的，这样直接可以动态添加  （stu是实例）

如果有不希望在使用对象时候为对象动态添加属性，就用_slots_=(想要的仅有的属性)，这样动态添加其他属性时候就会报错

## 继承
dog继承了Animal的方法和属性，smallDdog继承了Dog和Animal的方法和属性
```python
class Animal:
    def eat(self):
        print('eat')

class Dog(Animal):
    def jiao(self):
        print('wang')

class SmallDOg(Dog):
    def sleep(self):
        print('sleep')

```
## 重写
```python
class Animal:
    def eat(self):
        print('eat')

class Dog(Animal):
    def jiao(self):
        print('wang')

class SmallDOg(Dog):
    def jiao(self):
        print('sleep')
# SmallDOg中的jiao就是对父类方法的jiao方法的重写
```

## 方法的拓展
```python
class Animal:
    def eat(self):
        print('eat')

class Dog(Animal):
    def jiao(self):
        print('wang')

class SmallDOg(Dog):
    def hah(self):
        super().jiao() # 调用父类的方法
# SmallDOg中的jiao就是对父类方法的jiao方法的重写
```