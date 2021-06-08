const connection = require ('../app/database')

class MomentService {
    
    async create (userId, content) {
        
        const statemoment = `INSERT INTO moment (connect, user_id) VALUES (?,?)`

        const [result] = await connection.execute(statemoment,[content,userId])

        return result[0]
    }

}

module.exports = new MomentService()