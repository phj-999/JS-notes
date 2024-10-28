import models

class Student(models.Model):
    # 声明表名
    __tablename__ = "student"
    id = models.Column(models.Integer, primary_key=True,)
    name = models.Column(models.String(255))
    sex = models.Column(models.Boolean)
    age = models.Column(models.SmallInteger)
    class_name = models.Column("class",models.String(255),)
    description = models.Column(models.Text)

    def __repr__(self):
        return f"<{self.name} {self.__class__.__name__}>"

if __name__ == '__main__':
    # 如果没有提前声明模型中的数据表，则可以采用以下代码生成数据表，
    # 如果数据库中已经声明了有数据表，则不会继续生成
    models.Model.metadata.create_all(models.engine)

    # # 获取模型对应表的所有数据
    # student_list = models.session.query(Student).all()
    #
    # # 循环输出
    # for student in student_list:
    #     print(student, student.id, student.name ,student.age)

    # # 获取一条数据[参数为主键，如果查询不到，则返回结果为None]
    # student = models.session.query(Student).get(105)
    # if student:
    #     print(student, student.name, student.class_name)
    # else:
    #     print("查无此人")

    # # 按条件查询
    # student_list = models.session.query(Student).filter(Student.sex==True, Student.class_name=='301').all()
    # print(student_list)

    # # 添加一条数据
    # student = Student(
    #     name="张三丰",
    #     sex=True,
    #     age=17,
    #     class_name="305",
    #     description="太极生两仪..."
    # )
    #
    # models.session.add(student)
    # models.session.commit()


    # # 修改操作
    # student = models.session.query(Student).filter_by(name="张三丰").first()
    # if student:
    #     student.name="张四封"
    #     student.age = 21
    #     models.session.commit()

    # # 删除一条数据操作
    # student = models.session.query(Student).filter_by(name="xiaohui").first()
    # models.session.delete(student)
    # models.session.commit()


    # # 添加多条数据
    # student_list = [
    #     Student(name="xiaohei", class_name="305", sex=False, age=18, description="美美的..",),
    #     Student(name="xiaobai", class_name="304", sex=True, age=18, description="美美的..",),
    #     Student(name="xiaohui", class_name="303", sex=False, age=18, description="美美的..",),
    # ]
    #
    # models.session.add_all(student_list)
    # models.session.commit()


    # # 更新多条数据
    # models.session.query(Student).filter(Student.class_name=="303").update({Student.age: Student.age+1})
    # models.session.commit()


    # # 删除多条数据
    # models.session.query(Student).filter(Student.id > 100).delete()
    # models.session.commit()

    # # 原生SQL语句
    # # 读
    # cursor = models.session.execute('select * from student')
    # # 一条
    # data = cursor.fetchone()
    # print(data)

    # # 多条
    # data_list = cursor.fetchall()
    # print(data_list)

    # 写[添加、删除、修改]
    cursor = models.session.execute(
        'insert into student(name, class, age, sex, description) values(:name, :class, :age, :sex, :description)',
        params={
            "name": "xiaohong",
            "class": "307",
            "age": 19,
            "sex": 0,
            "description": ".....",
        })
    models.session.commit()
    print(cursor.lastrowid)  # 获取最后添加的主键ID
