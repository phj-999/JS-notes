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
    """查询所有男生[Student.sex==True]数据"""
    student_list = Student.query.filter(Student.sex==True).all()
    print(student_list)

    """查询id为4的学生[3种方式]"""
    student = Student.query.get(4)
    print(student)
    student = Student.query.filter(Student.id==4).first()
    print(student)
    student = Student.query.filter_by(id=4).first()
    print(student)


    """查询年龄大于16的所有学生数据"""
    student_list = Student.query.filter(Student.age>16).all()
    print(student_list)

    """查询name为小明的学生数据"""
    student_list = Student.query.filter(Student.name=="小明").all()
    print(student_list)

    """查询17岁的男生"""
    student_list = Student.query.filter(Student.age==17, Student.sex==True).all()
    print(student_list)

    return "ok"


if __name__ == '__main__':
    with app.app_context():
        # 如果没有提前声明模型中的数据表，则可以采用以下代码生成数据表，
        # 如果数据库中已经声明了有数据表，则不会继续生成
        # db.drop_all()
        db.create_all()
    app.run(debug=True)
