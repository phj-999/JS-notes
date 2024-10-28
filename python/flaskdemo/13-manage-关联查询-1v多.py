from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import backref

app = Flask(__name__)
# 连接数据库连接url
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:123@127.0.0.1:3306/school?charset=utf8mb4"
# 动态追踪修改设置，如未设置只会提示警告
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
# 查询时会显示原始SQL语句
app.config["SQLALCHEMY_ECHO"] = True

# 把SQLAlchemy组件注册到项目中
db = SQLAlchemy()
db.init_app(app)


class Student(db.Model):
    """学生信息模型"""
    __tablename__ = "t_1v1_student"
    id = db.Column(db.Integer, primary_key=True, comment="主键")
    name = db.Column(db.String(15), index=True, comment="姓名")
    age = db.Column(db.SmallInteger, comment="年龄")
    sex = db.Column(db.Boolean, default=True, comment="性别")
    email = db.Column(db.String(128), unique=True, comment="邮箱地址")
    money = db.Column(db.Numeric(10, 2), default=0.0, comment="钱包")
    address_list = db.relationship("StudentAddress", uselist=True, backref=backref("student", uselist=False), lazy="dynamic")

    def __repr__(self):
        return f"<{self.name} {self.__class__.__name__}>"


class StudentAddress(db.Model):
    __tablename__ = "t_1vn_student_address"
    id = db.Column(db.Integer, primary_key=True, comment="主键")
    name = db.Column(db.String(50), default="默认", comment="地址名称")
    province = db.Column(db.String(50), comment="省份")
    city = db.Column(db.String(50), comment="城市")
    area = db.Column(db.String(50), comment="地区")
    address = db.Column(db.String(500), comment="详细地址")
    mobile = db.Column(db.String(15), comment="收货人电话")
    # 外键字段[记录到数据库中的字段]
    student_id = db.Column(db.Integer, db.ForeignKey("t_1v1_student.id"), comment="student外键")
    # 关联属性
    # 外键模型--> 主模型   StudentAddress.student  结果是一个模型对象
    # 主模型  --> 外键模型 Student.address_list  结果是一个列表
    # student = db.relationship("Student", uselist=False, backref=backref("address_list", uselist=True, lazy="dynamic"))

    def __repr__(self):
        return f"<{self.student.name} {self.__class__.__name__}>"

@app.route("/")
def index():
    """添加操作"""
    # # 主模型已存在，添加外键模型
    # student = Student(name="张小白", age=15, sex=True, email="zhangxb@qq.com", money=10000)
    # db.session.add(student)
    # db.session.commit()
    #
    # student.address_list = [
    #     StudentAddress(name="家里", province="北京市", city="北京市", area="昌平区", address="百沙路201", mobile="13012345678"),
    #     StudentAddress(name="学校", province="北京市", city="北京市", area="昌平区", address="百沙路202", mobile="13012345678"),
    #     StudentAddress(name="公司", province="北京市", city="北京市", area="昌平区", address="百沙路203", mobile="13012345678"),
    # ]
    # db.session.commit()


    # # 添加主模型的同时，添加外键模型
    # student = Student(
    #     name="李大宝",
    #     age=21,
    #     sex=True,
    #     email="lidabao@qq.com",
    #     money=10000,
    #     address_list=[
    #         StudentAddress(name="家里", province="北京市", city="北京市", area="昌平区", address="百沙路301", mobile="13312345678"),
    #         StudentAddress(name="学校", province="北京市", city="北京市", area="昌平区", address="百沙路302", mobile="13312345678"),
    #         StudentAddress(name="公司", province="北京市", city="北京市", area="昌平区", address="百沙路303", mobile="13312345678"),
    #     ]
    # )
    # db.session.add(student)
    # db.session.commit()


    # # 添加外键模型的同时，添加主模型
    # address = StudentAddress(
    #     name="家里",
    #     province="北京市",
    #     city="北京市",
    #     area="昌平区",
    #     address="顺沙路102",
    #     mobile="13312345678",
    #     student = Student(
    #         name="李小白",
    #         age=18,
    #         sex=True,
    #         email="lixiaobai@qq.com",
    #         money=10000,
    #     )
    # )
    # db.session.add(address)
    # db.session.commit()


    """查询操作"""
    student = Student.query.filter(Student.name=="张小白").first()

    return "ok"


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
