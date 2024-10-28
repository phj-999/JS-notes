from flask import Flask
from flask_redis import FlaskRedis
from flask import session
from flask_session import Session as SessionStore

app = Flask(__name__)

# redis中默认有16个数据库，我们可以让flask_redis初始化时，默认连接到不同的库中，当然这需要我们设置配置redis的前缀config_prefix
session_redis = FlaskRedis(config_prefix="REDIS_SESSION")
user_redis = FlaskRedis(config_prefix="REDIS_USER")
order_redis = FlaskRedis(config_prefix="REDIS_ORDER")

app.config.update({
    "SECRET_KEY": "my-secret_key",
    "REDIS_SESSION_URL": "redis://default:default@127.0.0.1:6379/0",
    "REDIS_USER_URL": "redis://default:default@127.0.0.1:6379/1",
    "REDIS_ORDER_URL": "redis://default:default@127.0.0.1:6379/2",

    # 把session保存到redis中
    "SESSION_TYPE": "redis",  # session类型为sqlalchemy, redis 或 mongodb
    "SESSION_PERMANENT": True,  # 如果设置为True，则关闭浏览器session就失效
    "SESSION_USE_SIGNER": True,  # 是否对发送到浏览器上session的cookie值进行添加签名，防止串改。
    "SESSION_KEY_PREFIX": "session:",  # session数据表中sessionID的前缀，默认就是 session:
    # session保存数据到redis时启用的链接对象
    "SESSION_REDIS": session_redis,  # 用于连接redis的配置
})

# 初始化 flask_redis
session_redis.init_app(app)
user_redis.init_app(app)
order_redis.init_app(app)


# 务必保证session存储类初始化之前，redis已经完成初始化了。
session_store = SessionStore()
session_store.init_app(app)


@app.route("/")
def index():
    session_redis.setnx("age", 100)
    user_redis.setnx("user_id", 100)
    order_redis.setnx("order_id", 100)
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
    app.run(debug=True)
