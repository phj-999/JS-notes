const Router = require('koa-router')
const {
    add,
    find,
    findOne,
    update,
    del
} = require('../controllers/user')
const router = Router({
	prefix: '/user'
})

//查询所有用户
router.get('/', find)

//查询单个用户
router.get('/find/:id', findOne)

//删除用户
router.delete('/del', del)

//修改用户
router.put('/update', update)

//添加用户
router.post('/add', add)

module.exports = router