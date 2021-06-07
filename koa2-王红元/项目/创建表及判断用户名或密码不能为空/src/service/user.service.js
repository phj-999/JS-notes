const connection = require ('../app/database')

class UserService {
    async create(user) { //比如把user存进数据库中

       const { name , password } = user
       const statement = `INSERT INTO users (name,password) VALUES (?.?);`

       const result = await connection.execute(statement,[name,password])  //[name,password匹配上面values中的两个？]


        return result
    }
}

module.exports = new UserService()