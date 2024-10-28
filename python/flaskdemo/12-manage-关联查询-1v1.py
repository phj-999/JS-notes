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
    # 关联属性[提供给SQLAlchemy]
    info = db.relationship("StudentInfo", uselist=False, backref=backref("student", uselist=False))

    def __repr__(self):
        return f"<{self.name} {self.__class__.__name__}>"


class StudentInfo(db.Model):
    __tablename__ = "t_1v1_student_info"
    id = db.Column(db.Integer, primary_key=True, comment="主键")
    # 外键字段[提供给数据库]
    student_id = db.Column(db.Integer, db.ForeignKey("t_1v1_student.id"), comment="student外键")
    # # 关联属性[提供给SQLAlchemy，关联属性的声明，可以在2个关联模型中任意一个模型里面]
    # student = db.relationship("Student", uselist=False, backref=backref("info", uselist=False))
    address = db.Column(db.String(255), index=True, comment="注册地址")
    mobile = db.Column(db.String(15), index=True, comment="手机号码")

    def __repr__(self):
        return f"<{self.student.name} {self.__class__.__name__}>"

@app.route("/")
def index():
    """添加操作"""
    """添加主模型的同时也添加外键模型[2个数据都是新建的]"""
    # student = Student(
    #     name="张小明",
    #     age=16,
    #     sex=True,
    #     email="zhangxm@qq.com",
    #     money=1000,
    #     info=StudentInfo(
    #         address= "北京大兴",
    #         mobile = "13312345678"
    #     )
    # )
    #
    # db.session.add(student)
    # db.session.commit()

    # """已经有了主模型，基于主模型新增外键模型"""
    # student = Student(name="小白", sex=True, age=18, email="xiaobai@qq.com", money=1000)
    # db.session.add(student)
    # db.session.commit()
    #
    # student.info = StudentInfo(address="北京朝阳", mobile="13512345678")
    # db.session.commit()

    # """添加外键模型的同时，同时新新增主模型"""
    # info = StudentInfo(
    #     mobile="13300010003",
    #     address="北京市昌平区百沙路206号",
    #     student=Student(
    #         name="xiaolan04",
    #         age=17,
    #         sex=False,
    #         money=10000,
    #         email="xiaolan04@qq.com",
    #     ),
    # )
    #
    # db.session.add(info)
    # db.session.commit()

    """查询操作"""
    # # 以外键模型的字段作为主模型的查找条件
    # student = Student.query.filter(StudentInfo.mobile=="13312345678").first()
    # print(student)

    # # 以主键模型的字段作为外键模型的查找条件
    # info = StudentInfo.query.filter(Student.name=="张小明").first()
    # print(info)

    # # 通过主模型调用外键模型
    # student = Student.query.filter(Student.name=="张小明").first()
    # print(student.info)
    # print(student.info.mobile)

    # # 通过外键模型调用主键模型
    # info = StudentInfo.query.filter(StudentInfo.mobile == "13312345678").first()
    # print(info.student)
    # print(info.student.name)


    """更新操作"""
    # # 根据主模型修改外键模型的数据
    # student = Student.query.filter(Student.name=="张小明").first()
    # student.age = 17
    # student.info.address = "北京密云"
    # db.session.commit()

    # # 根据外键模型修改主模型的数据
    # info = StudentInfo.query.filter(StudentInfo.mobile == "13312345678").first()
    # info.student.age = 23
    # db.session.commit()


    """删除操作"""
    # # 删除主模型，SQLAlchemy会自动把对应的外键字段值设置为null
    # student = Student.query.get(4)
    # db.session.delete(student)
    # db.session.commit()

    # # 如果删除附加模型数据，则直接删除，不会修改主模型数据
    # info = StudentInfo.query.get(4)
    # db.session.delete(info)
    # db.session.commit()

    return "ok"


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
