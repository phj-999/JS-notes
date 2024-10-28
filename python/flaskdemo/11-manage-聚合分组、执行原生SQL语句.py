from flask import Flask, request, render_template
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
# 连接数据库连接url
app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://root:123@127.0.0.1:3306/school?charset=utf8mb4"
# 动态追踪修改设置，如未设置只会提示警告
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# 查询时会显示原始SQL语句
app.config["SQLALCHEMY_ECHO"] = False

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
    """聚合函数"""
    # from sqlalchemy import func
    #
    # #  获取所有学生的money总数
    # ret = db.session.query(func.sum(Student.money)).first()[0]
    # print(ret)
    #
    # # 查询女生的数量
    # ret = db.session.query(func.count(Student.id)).filter(Student.sex==False).first()[0]
    # print(ret)
    #
    # ret = db.session.query(func.count(Student.id)).filter(Student.sex==False).scalar()
    # print(ret)
    #
    #
    # # 查询所有学生的平均年龄
    # ret = db.session.query(func.avg(Student.age)).scalar()
    # print(ret)


    """分组查询"""
    # # 查询男生女生的平均年龄
    # ret = db.session.query(func.avg(Student.age)).group_by(Student.sex).all()
    # print(ret)  # [(Decimal('17.0000'),), (Decimal('17.5000'),)]
    #
    # # 查询各个年龄段的学生数量
    # # 分组时， db.session.query()中的字段，只能要么是被分组的字段，要么是聚合结果
    # ret = db.session.query(Student.age, func.count(Student.id)).group_by(Student.age).all()
    #
    # # 多字段分组，
    # # 查询查询各个年龄段的女生与男生学生数量
    # ret = db.session.query(Student.age, Student.sex, func.count(Student.id)).group_by(Student.sex, Student.age).all()
    # print(ret)
    #
    # # 分组后的过滤操作 having
    # # 在所有学生中，找出各个年龄中拥有最多钱的同学，并在这些同学里面筛选出money > 1500的数据
    # subquery = func.max(Student.money)
    # ret = db.session.query(Student.age, subquery).group_by(Student.age).having(subquery > 1500).all()
    # print(ret)

    """执行原生SQL语句"""
    # # 查询多条数据
    # ret = db.session.execute("select * from tb_student").fetchall()
    # print(ret)
    # # 查询一条数据
    # ret = db.session.execute("select * from tb_student").fetchone()
    # print(ret)

    # 分组合并值
    ret = db.session.execute("select age,count(id),group_concat(name) from tb_student group by age").fetchall()
    print(ret)

    return "ok"



if __name__ == '__main__':
    with app.app_context():
        # 如果没有提前声明模型中的数据表，则可以采用以下代码生成数据表，
        # 如果数据库中已经声明了有数据表，则不会继续生成
        # db.drop_all()
        db.create_all()
    app.run(debug=True)
