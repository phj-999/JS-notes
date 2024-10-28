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
    """模糊查询"""
    # # 名字包含"黑"的学生
    # student_list = Student.query.filter(Student.name.contains("黑")).all()
    # print(student_list)
    #
    # # 名字以"小"开头的学生
    # student_list = Student.query.filter(Student.name.startswith("小")).all()
    # print(student_list)
    #
    # # 名字以"红"结尾的学生
    # student_list = Student.query.filter(Student.name.endswith("兰")).all()
    # print(student_list)


    """比较查询"""
    # # 比较查询需要指定条件格式为: filter(模型.字段 比较运算符 值)。
    # # 运算符可以是: ==表示相等, !=不相等，> 表示大于  < 表示小于，>=大于等于，<=小于等于
    # # 单个条件的比较查询
    # student_list = Student.query.filter(Student.age>15).all()
    # print(student_list)
    #
    # # 多个条件的比较查询
    # # 要求多个条件都要满足，相当于逻辑查询中的 并且(and)！！
    # student_list = Student.query.filter(Student.age>15, Student.sex==True).all()
    # print(student_list)

    """精确查询"""
    # 单条件格式：filter_by(字段=值)
    # 多条件格式：filter_by(字段=值, 字段=值, 字段=值...)
    student_list = Student.query.filter_by(age=16).all()  # 字段添加不需要附带模型类
    print(student_list)

    return "ok"


if __name__ == '__main__':
    with app.app_context():
        # 如果没有提前声明模型中的数据表，则可以采用以下代码生成数据表，
        # 如果数据库中已经声明了有数据表，则不会继续生成
        # db.drop_all()
        db.create_all()
    app.run(debug=True)
