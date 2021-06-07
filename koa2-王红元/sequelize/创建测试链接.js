const {Sequelize,DataTypes,Model,Op, DOUBLE}= require('sequelize')

const sequelize = new Sequelize('数据库','用户名','密码',{
    host:'',
    dialect:'mysql'
});


sequelize.authenticate().then(()=>{
    console.log('sequelize连接成功');
}).catch((er)=>{
    console.log('sequelize连接失败');
})