from flask import Flask
from flask_sqlalchemy import SQLAlchemy


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
    """
    CREATE TABLE tb_student (
        id INTEGER NOT NULL COMMENT '主键' AUTO_INCREMENT, 
        name VARCHAR(15) COMMENT '姓名', 
        age SMALLINT COMMENT '年龄', 
        sex BOOL COMMENT '性别', 
        email VARCHAR(128) COMMENT '邮箱地址', 
        money NUMERIC(10, 2) COMMENT '钱包', 
        PRIMARY KEY (id), 
        UNIQUE (email)
    )
    """
    # 声明与当前模型绑定的数据表名称
    __tablename__ = "tb_student"
    id = db.Column(db.Integer, primary_key=True, comment="主键")
    name = db.Column(db.String(15), index=True, comment="姓名")
    age = db.Column(db.SmallInteger, comment="年龄")
    sex = db.Column(db.Boolean, default=True, comment="性别")
    email = db.Column(db.String(128), unique=True, comment="邮箱地址")
    money = db.Column(db.Numeric(10, 2), default=0.0, comment="钱包")

    def __repr__(self):  # 相当于django的__str__
        return f"<{self.name} {self.__class__.__name__}>"

class Course(db.Model):
    """课程模型"""
    """
        CREATE TABLE tb_course (
        id INTEGER NOT NULL COMMENT '主键' AUTO_INCREMENT, 
        name VARCHAR(255) COMMENT '课程', 
        price NUMERIC(8, 2) COMMENT '价格', 
        PRIMARY KEY (id), 
        UNIQUE (name)
    )

    """
    __tablename__ = "tb_course"
    id = db.Column(db.Integer, primary_key=True, comment="主键")
    name = db.Column(db.String(255), unique=True, comment="课程")
    price = db.Column(db.Numeric(8, 2), comment="价格")

    def __repr__(self):  # 相当于django的__str__
        return f"{self.name}<{self.__class__.__name__}>"


class Teacher(db.Model):
    """老师模型"""
    """
    CREATE TABLE tb_teacher (
        id INTEGER NOT NULL COMMENT '主键' AUTO_INCREMENT,
        name VARCHAR(255) COMMENT '姓名',
        `option` ENUM('讲师','助教','班主任'),
        PRIMARY KEY (id),
        UNIQUE (name)
    )
    """
    __tablename__ = "tb_teacher"
    id = db.Column(db.Integer, primary_key=True, comment="主键")
    name = db.Column(db.String(255), unique=True, comment="姓名")
    option = db.Column(db.Enum("讲师", "助教", "班主任"), default="讲师")

    def __repr__(self):
        return f"{self.name}<{self.__class__.__name__}>"


@app.route("/data")
def data():
    """逻辑与"""
    # # 默认情况下， 多个条件并且的情况，可以直接基于filter或者filter_by采用逗号拼接多个查询条件实现
    # # 查询年龄大于16的男生
    # student_list = Student.query.filter(Student.age>16, Student.sex==True).all()
    # print(student_list)
    #
    # #  filter(and_(条件1,条件2,....))  等价于  filter(条件1,条件2,.....)
    # from sqlalchemy import and_
    # student_list = Student.query.filter(and_(Student.age>16, Student.sex==True)).all()
    # print(student_list)


    """逻辑或"""
    # # # 查询年龄大于16(Student.age>16)或者钱包余额大于1500（Student.money>1500） 女生
    # from sqlalchemy import or_
    # student_list = Student.query.filter(or_(Student.age>16, Student.money>1500), Student.sex==False).all()
    # print(student_list)
    #
    # # 查询 年龄大于16的男生(Student.age>16, Student.sex==True) 和 钱包余额大于1500的女生（Student.money>1500, Student.sex==False)
    # from sqlalchemy import or_, and_
    # student_list = Student.query.filter(
    #     or_(
    #         and_(Student.age>16, Student.sex==True),
    #         and_(Student.money>1500, Student.sex==False)
    #     )
    # ).all()
    # print(student_list)

    """逻辑非"""
    from sqlalchemy import not_
    student = Student.query.filter(Student.name != '小白').all()
    print(student)

    student = Student.query.filter(not_(Student.name == '小白')).all()
    print(student)

    return "ok"


if __name__ == '__main__':
    with app.app_context():
        # 如果没有提前声明模型中的数据表，则可以采用以下代码生成数据表，
        # 如果数据库中已经声明了有数据表，则不会继续生成
        # db.drop_all()
        db.create_all()
    app.run(debug=True)
