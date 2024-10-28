from sqlalchemy import create_engine   # 驱动引擎
from sqlalchemy.orm import sessionmaker  # 连接会话
from sqlalchemy.ext.declarative import declarative_base  # 数据库基类
from sqlalchemy import *
from sqlalchemy.orm import *

engine = create_engine(
    # 连接数据库的URL
    # url="mysql+pymysql://root:123@127.0.0.1:3306/school?charset=utf8mb4",  # 如果底层驱动是pymysql
    url="mysql://root:123@127.0.0.1:3306/school?charset=utf8mb4",    # 如果底层驱动是MysqlDB
    echo=True,  # 当设置为True时会将orm语句转化为sql语句打印，一般debug的时候可用
    pool_size=8, # 连接池的大小，默认为5个，设置为0时表示连接无限制
    pool_recycle=60*30 # 设置时间以限制数据库多久没连接自动断开
)

# 创建数据库连接
DbSession = sessionmaker(bind=engine)
session = DbSession()

# 创建数据基类
Model = declarative_base()

