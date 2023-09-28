# __new__方法
![Alt text](./IMG/image.png)

# code
```python
class MusicPlayer:
```
     当调用new后，需要在当前new方法中调用父类的new方法
     父类的new方法已经划分了内存地址，在内存中就没有划分内存空间给当前类
     ```
    
    def __new__(cls, *args, *kwargs):
        print('创建对象，分配空间')
        # 为对象分配空间  父类的new是一个类方法
        instance = super().__new__(cls)
        return instance
    
    def __init__(self):
        print('播放功能初始化')

# 创建播放器对象
player= MusicPlayer()

```
