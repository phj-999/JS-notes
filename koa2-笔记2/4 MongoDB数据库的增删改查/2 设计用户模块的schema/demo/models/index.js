const mongoose = require('mongoose')

// const schema = new mongoose.Schema({
//     p1: String,
//     p2: String
// })
// const Obj = mongoose.model('names',schema)

//系统用户模型对象
const userSchema = new mongoose.Schema({
    username: String,
    pwd: String
})
const User = mongoose.model('users',userSchema)



module.exports = {
    User
}