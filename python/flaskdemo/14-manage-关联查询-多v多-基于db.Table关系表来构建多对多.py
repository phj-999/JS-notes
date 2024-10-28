from datetime import datetime
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


# 购买关系表[这种表，无法提供给flask进行数据操作的，仅仅用于在数据库中记录两个模型之间的关系]
student_course_table = db.Table(
    "t_nvm_student_course",
    db.Column("id", db.Integer, primary_key=True, comment="主键"),
    db.Column("sid", db.Integer, db.ForeignKey("t_nvm_student.id"), comment="学生ID"),
    db.Column("cid", db.Integer, db.ForeignKey("t_nvm_course.id"), comment="课程ID"),
    db.Column("created_time", db.DateTime, default=datetime.now, comment="购买时间"),  # 当前字段无法操作
)


class Student(db.Model):
    """学生信息模型"""
    __tablename__ = "t_nvm_student"
    id = db.Column(db.Integer, primary_key=True, comment="主键")
    name = db.Column(db.String(15), index=True, comment="姓名")
    age = db.Column(db.SmallInteger, comment="年龄")
    sex = db.Column(db.Boolean, default=True, comment="性别")
    money = db.Column(db.Numeric(10, 2), default=0.0, comment="钱包")
    # 只有设置关联属性以后，flask中才提供模型关联的操作
    # course_list = db.relationship("Course", secondary=student_course_table, backref="student_list", lazy="dynamic")

    def __repr__(self):
        return f"<{self.name} {self.__class__.__name__}>"


class Course(db.Model):
    """课程信息模型"""
    __tablename__ = "t_nvm_course"
    id = db.Column(db.Integer, primary_key=True, comment="主键")
    name = db.Column(db.String(255), unique=True, comment="课程")
    student_list = db.relationship("Student", secondary=student_course_table, backref="course_list", lazy="dynamic")

    def __repr__(self):
        return f"<{self.name} {self.__class__.__name__}>"

@app.route("/")
def index():
    """添加数据"""

    # 添加其中一个主模型数据时，同时绑定添加另外一个主模型的数据，这个过程中，关系表会自动写入2者的关系数据，绑定2个模型之间的关系

    # student = Student(
    #     name="xiaozhao",
    #     age=13,
    #     sex=False,
    #     course_list=[
    #         Course(name="python入门"),
    #         Course(name="python初级"),
    #         Course(name="python进阶"),
    #     ]
    # )
    # db.session.add(student)
    # db.session.commit()


    # 在已有课程模型的基础上，新增学生，新增报读课程。

    # student = Student(
    #     name="xiaohong",
    #     age=14,
    #     sex=False,
    # )
    # db.session.add(student)
    # db.session.commit()
    #
    # student = Student.query.filter(Student.name == "xiaohong").first()
    # # 让小红新增报读课程id为3的课程
    # student.course_list.append(Course.query.get(3))
    # student.course_list.append(Course(name="python高级"))
    # db.session.commit()


    # 让学生一次性报读多个已有课程

    # student1 = Student.query.get(2)
    # course_list = Course.query.filter(Course.id.in_([1,2])).all()
    # student1.course_list.extend(course_list)
    # db.session.commit()


    """查询数据"""
    # # 查询id为1的学生购买的课程
    # student = Student.query.get(1)
    # print(student.course_list)
    #
    # # 查询id为4的课程，有哪些学生购买了
    # course = Course.query.get(4)
    # print(course.student_list.all())


    """更新数据"""
    # # 给报读了4号课程的同学，返现红包200块钱
    # course = Course.query.get(4)
    # for student in course.student_list:
    #     student.money += 200
    # db.session.commit()


    # db.Table的缺陷: 无法通过主模型直接操作db.Table中的外键之外的其他字段，例如：无法读取购买课程的时间
    course = Course.query.get(3)
    print(course.student_list.all())

    # 解决：在声明2个模型是多对多的关联关系时，如果需要在python中操作关系表的数据，则可以把关联关系使用第三个模型来创建声明，
    # 就是不要使用db.Table创建关系表了，改成关系模型来绑定2者的关系，把模型的多对多拆分成2个1对多

    return "ok"


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
