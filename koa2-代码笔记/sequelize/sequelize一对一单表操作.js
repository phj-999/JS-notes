const {Sequelize,DataTypes,Model,Op, DOUBLE}= require('sequelize')
//Op是可选的意思

const sequelize = new Sequelize('数据库的名称','用户名','密码',{
    host:'',
    dialect:'mysql' //数据库类型
});

//测试链接
sequelize.authenticate().then(()=>{
    console.log('sequelize连接成功');
}).catch((er)=>{
    console.log('sequelize连接失败');
})

//实践  操作 products 这个表
//products把这个表映射进类里面，通过这个类操作这个数据库，相当于在代码和mysql2中间多加了一层

//定义一个类  做映射
//早期版本中映射的方式sequelize.define的方式过时了，但也能用
//coderwhy老师推荐用class的形式  符合ES6

class Product extends Model {}  //定义类 做关系映射  数据库表名是product
Product.init ({  //让这个类变得有意义  传入参数 id之类
  id:{
      type:DataTypes.INTEGER,
      primarykey: true,
      autoIncrement: true
    },
    title:{
        type:DataTypes.STRING,
        allowNotNull:false
    },
    price:DataTypes.DOUBLE,
    score:DataTypes.DOUBLE,
    createdAt:false, updatedAt:false,  //这两个参数在老师的代码执行中有在sql中打印出来 老师不想让这个出现，设置false，实际上sequelize是做了映射之后代替执行了mysql的增删改查语句
    tableName:'products',
    sequelize

})  

//对数据库操作放置在这个里面
async function queryProducts(){
    // 1 查询所有内容
    const result1 = await Product.find()  
    console.log(result1);
    
    // 2 带条件 查询价格大于5000的
    const result2 = await Product.findAll({
        where:{
            price:{
                [Op.gte]:5000  //lt是小于  gte是大于
            }
        }
    })

    // 3 插入
    const result3 = await Product.create({
        title:'',
        price:'',

    })

    // 4 更新id为1的价格
    const result4 = await Product.update(
    {
        title:'',
        price:'',
    },
    {
        where:{
        id:1
    }
    }

    )

}


Op是可选的意思



queryProducts()