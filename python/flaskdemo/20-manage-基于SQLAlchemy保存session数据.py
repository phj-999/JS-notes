from datetime import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# 引入sessio操作类，注意：引入路径不同，大小写不同的。
from flask_session import Session as SessionStore
from flask import session

app = Flask(__name__)

# 把SQLAlchemy组件注册到项目中
db = SQLAlchemy()

# 初始化session存储类
session_store = SessionStore()

app.config.update({
    # 使用session必须设置秘钥
    "SECRET_KEY": "*(%#4sxcz(^(#$#8423",

    # 要把存储到SQLAlchemy，必须配置数据库连接
    "SQLALCHEMY_DATABASE_URI": "mysql://root:123@127.0.0.1:3306/flask_student?charset=utf8mb4",
    "SQLALCHEMY_TRACK_MODIFICATIONS": True,
    "SQLALCHEMY_ECHO": False,

    # 把session通过SQLAlchmey保存到mysql中
    "SESSION_TYPE": "sqlalchemy",  # session类型为sqlalchemy
    "SESSION_SQLALCHEMY": db,  # SQLAlchemy的数据库连接对象
    "SESSION_SQLALCHEMY_TABLE": 'sessions',  # session要保存的表名称
    "SESSION_PERMANENT": True,  # 如果设置为True，则关闭浏览器session就失效
    "SESSION_USE_SIGNER": True,  # 是否对发送到浏览器上session的cookie值进行添加签名，防止串改。
    "SESSION_KEY_PREFIX": "session:"  # session数据表中sessionID的前缀，默认就是 session:
})

db.init_app(app)
# 务必保证在数据库配置初始化以后才进行session存储类的初始化
session_store.init_app(app)

@app.route("/")
def index():
    return "ok"

@app.route("/set_session")
def set_session():
    session["uname"] = "xiaoming"
    session["age"] = 18
    return "ok"


@app.route("/get_session")
def get_session():
    print(session.get("uname"))
    print(session.get("age"))
    return "ok"


@app.route("/del_session")
def del_session():
    # 此处的删除，不是删除用户对应的session表记录，而是删除session值而已。
    print(session.pop("uname"))
    print(session.pop("age"))
    return "ok"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
