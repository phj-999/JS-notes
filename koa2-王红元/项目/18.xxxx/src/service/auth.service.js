const connection = require('../app/database');



// class AuthService {

//     async checkMoment(momentId, userId) {

//         try {

//             const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ? ;`

//             const [result] = await connection.execute(statement, [momentId, userId])

//             console.log(result);

//             return result.length === 0 ? false : true

//         } catch (error) {

//             console.error();

//         }

//     }
// }


//上面是原本仅支持验证发表评论的逻辑中间件，现在把他改成既可以验证评论发表 也可以验证评论修改的中间件

class AuthService {

    async checkResource( tableName, id, userId ) {

        try {

            const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ? ;`

            const [result] = await connection.execute(statement, [id, userId])

            console.log(result);

            return result.length === 0 ? false : true

        } catch (error) {

            console.error();

        }

    }
}

module.exports = new AuthService()