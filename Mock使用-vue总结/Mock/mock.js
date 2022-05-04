import Mock from 'mockjs'

//配置请求延时
Mock.setup({
    timeout: 1000
})

Mock.Mock('/api/user',{
    username: 'xxx',
    age:'11',
    type:1
})