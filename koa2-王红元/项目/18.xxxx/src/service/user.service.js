const connection = require ('../app/database')
const { avatarInfo } = require('../controller/user.controller')

class UserService {
    async create(user) { //比如把user存进数据库中

       const { name , password } = user
       const statement = `INSERT INTO user (name,password) VALUES (?.?);`

       const result = await connection.execute(statement,[name,password])  //[name,password匹配上面values中的两个？]


        return result[0]
    }

    async getUserByName (name) {
      
        const statement = `SELECT * FROM user WHERE name = ?`

        const result = await connection.execute(statement,[name])

        return result[0]
    }

    async updateAvatarUrlById (avatarUrl,userId) {
        const statement = `UPDATE user SET avatar_url = ? WHERE id = ?`

        const [result] = await connection.execute(statement, [avatarUrl,userId])

        return result
    }
}

module.exports = new UserService()