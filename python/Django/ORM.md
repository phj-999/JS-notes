##  表结构

实现：创建表、修改表、删除表。

在app中的models.py中按照规则编写类    ===> 表结构。

- 编写类

  ```python
  from django.db import models
  
  
  class UserInfo(models.Model):
      name = models.CharField(max_length=16)
      age = models.IntegerField()
  ```

- 注册app

  ```python
  INSTALLED_APPS = [
      # 'django.contrib.admin',
      # 'django.contrib.auth',
      # 'django.contrib.contenttypes',
      # 'django.contrib.sessions',
      # 'django.contrib.messages',
      'django.contrib.staticfiles',
      'apps.app01.apps.App01Config',
      'apps.app02.apps.App02Config',
  ]
  ```

- 命令，django根据models中类生成一个 `对数据库操作的配置文件` => `migrations`

  ```
  python manage.py makemigrations
  ```

  

![peizhiwenjian](D:\我的git项目\hub\JS-notes\python\Django\assets\orm-jianbiao.png)

命令，读取已经注册么给app中的migrations目录将配置文件  -> 转换成：生成表，修改表 SQL -> 连接数据库去运行。

```python
python manage.py migrate
```

- 那个数据库？
- 数据库账户和密码?

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

![](D:\我的git项目\hub\JS-notes\python\Django\assets\orm-shujuku.png)

## 常见字段和参数

- 字段

```
CharField

SmallIntegerField
IntegerField
BigIntegerField

DateField
DateTimeField

BooleanField  -> 其实数据库不支持真假，根据SmallIntegerField创造出来出来。 0  1

DecimalField  -> 精确的小数
```

- 参数

```python
name = models.CharField(verbose_name="姓名", max_length=16)
name = models.CharField(verbose_name="姓名", max_length=16, default="哈哈哈")

# db_index=True 经常查询，速度快（MySQL，https://www.bilibili.com/video/BV15R4y1b7y9）
name = models.CharField(verbose_name="姓名", max_length=16, default="哈哈哈", null=True, blank=True, db_index=True)
email = models.CharField(verbose_name="姓名", max_length=16, default="哈哈哈", null=True, blank=True, unique=True)

# 在数据库存储时只能是：sh、bj （上海、北京一般用于页面显示中文）
code = models.CharField(verbose_name="姓名", max_length=16, choices=(("sh", "上海"), ("bj", "北京")),default="sh")
```

```python
# 不用 max_length=16

count = models.IntegerField(verbose_name="数量", default=1, null=True, blank=True, unique=True)
code = models.IntegerField(verbose_name="性别",choices=((1, "男"), (2, "女")),default=1)
```

```python
register_date = models.DateField(verbose_name="注册时间", auto_now=True)
```

```python
amount = models.DecimalField(verbose_name="余额", max_digits=10, decimal_places=2)
```

## 示例

```python
from django.db import models


class UserInfo(models.Model):
    name = models.CharField(verbose_name="姓名", max_length=16, db_index=True)
    age = models.PositiveIntegerField(verbose_name="年龄")
    email = models.CharField(verbose_name="邮箱", max_length=128, unique=True)
    amount = models.DecimalField(verbose_name="余额", max_digits=10, decimal_places=2, default=0)
    register_date = models.DateField(verbose_name="注册时间", auto_now=True)


class Goods(models.Model):
    title = models.CharField(verbose_name="标题", max_length=32)
    # detail = models.CharField(verbose_name="详细信息", max_length=255)
    detail = models.TextField(verbose_name="详细信息")
    price = models.PositiveIntegerField(verbose_name="价格")
    count = models.PositiveBigIntegerField(verbose_name="库存", default=0)
```

 

## 表关系

![](D:\我的git项目\hub\JS-notes\python\Django\assets\biaoguanxi01.png)

![02](D:\我的git项目\hub\JS-notes\python\Django\assets\biaoguanxi02.png)

![3](D:\我的git项目\hub\JS-notes\python\Django\assets\biaoguanxi03.png)

![04](D:\我的git项目\hub\JS-notes\python\Django\assets\biaoguanxi04.png)

![05](D:\我的git项目\hub\JS-notes\python\Django\assets\biaoguuanxi05.png)

## 单表 互相之间没有关系
```python
# 单表，互相之间没有关系
class UserInfo(models.Model):
    # db_index加上他查询很快
    name = models.CharField(verbose_name='姓名', db_index=True, max_length=16, unique=True)
    age = models.IntegerField(verbose_name='年龄')
    # auto_now自动加时间
    register_date = models.DateField(verbose_name='日期', auto_now=True)
    email = models.EmailField(max_length=128, verbose_name='邮箱', unique=True)
    active = models.BooleanField(verbose_name='是否激活')
    amount = models.DecimalField(verbose_name="余额", max_digits=10, decimal_places=2, default=0)


class Goods(models.Model):
    title = models.CharField(verbose_name='标题', max_length=32)
    # count = models.IntegerField(verbose_name="数量", default=1, null=True, blank=True, unique=True)
    detail = models.TextField(verbose_name='详细信息')
    price = models.PositiveIntegerField(verbose_name='价格')
    count = models.PositiveBigIntegerField(verbose_name='库存', default=0)

```

## 一对多
`depart = models.ForeignKey(verbose_name='部门ID',to='Department',to_field='id',on_delete=models.CASCADE)`  删除id， on_delete=models.CASCADE表示跟id相关联的数据全部删除。

`depart = models.ForeignKey(verbose_name='部门ID',to='Department', to_field='id', on_delete=models.SET_NULL,NULL=True, blank=True)` 表示把删除了的地方变成null。

```python
models.py
class Department(models.Model):
    """部门表"""
    title = models.CharField(verbose_name='标题')

class UserInfo(models.Model):
    """用户表"""
    name = models.CharField(verbose_name='姓名')
    # 删除的地方和关联的数据全部清空
    depart = models.ForeignKey(
        verbose_name='部门ID',
        to='Department',
        to_field='id',
        on_delete=models.CASCADE
    )
    # 删除的地方变成null
    # depart = models.ForeignKey(
    #     verbose_name='部门ID',
    #     to='Department',
    #     to_field='id',
    #     on_delete=models.SET_NULL,
    #     NULL=True,
    #     blank=True
    # )

```


## 多对多
```python
# 多对多的表
models.py
class Boy(models.Model):
    name = models.CharField(verbose_name='姓名', db_index=True, max_length=16, unique=True)
class Girl(models.Model):
    name = models.CharField(verbose_name='姓名', db_index=True, max_length=16, unique=True)
    # 这个也可以用多对多生成，但是不太好，就用下面的ForeignKey
    # relation = models.ManyToManyField(verbose_name='男女关系', to='Boy')
class BoyandGirl(models.Model):
    bid = models.ForeignKey(verbose_name='男生ID', to='Boy', to_field='id', on_delete=models.CASCADE)

    gid = models.ForeignKey(verbose_name='女生ID', to='Girl', to_field='id', on_delete=models.CASCADE)

# 多对多表end
```