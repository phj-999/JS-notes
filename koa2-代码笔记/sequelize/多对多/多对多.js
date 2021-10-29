

//多对多关系的联系
Student.belongsToMany(Course,{
    through: StudentCourse,
    foreighKey:'student_id',
    otherKey:'Course_id'
})

Course.belongsToMany(Student,{
    through: StudentCourse,
    foreighKey:'Course_id',
    otherKey:'student_id'
})

async function queryProducts() { 
    const result = await Student.findAll({
        include:{
            model:Course
        }
    })
    console.log(result);
 }

 queryProducts()