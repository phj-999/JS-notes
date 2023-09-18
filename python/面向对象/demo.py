# class定义一个类，里面def定义方法 __int___添加属性
class Student:
    def __init__(self,name,age):
        self.name = name
        self.age = age
    # study, play都是类方法
    def study(self, course_name):
        print('F正在学习 {course_name}.')
    def play(self):
        print('playing game')
    def studyed(self, course_name):
        print(f'{self.name}hahah+ {course_name}')

# stu1 = Student()
# stu2 = Student()
stu3 = Student('xiaoming', 18)

#print(stu1)  会打印一个十六进制值 为其地址

# 调用方法
# stu1.study('dasdsad') 

# Student().study('DASD')
stu3.studyed('dasdasdasd ewqe')

# 创建私有属性
# self.__name=name (写在 self.name = name这里)

# 获取私有属性
# @property
# def name(self):
#     return self.__name

# 修改私有属性
# @name.setter
# def name(self, name):
#     self.__name =name or 'wu'

# 类方法@classmethod装饰器进行标识
# 其中第一个参数通常被命名为cls，表示类本身，而不是类的实例。
# 类方法可以使用类的属性和方法，但不能访问实例的属性和方法。

# 静态方法用@staticmethod装饰器进行标识
# 静态方法可以通过类或者类的实例来调用
# 与类方法不同，静态方法不能访问类或实例的属性和方法。
# 静态方法 传入参数都是普通参数。而类方法第一个擦桉树必须是cls  ，他代表当前方法属于当前的类，静态方法不和当前类绑定，可以看成单独函数