# 基本操作



## --删除数据库

drop database xxx1

## --创建数据库

create database xxx1

## --创建表

use xxx1

```mysql
create table user (
    id int(30) not null auto_increment    //字段int类型长度10 不能为null 且自增
    name varchar(20) not null default 'admin' comment '用户名'  //字符串类型  默认admin  如果为空 自动添加admin 
    pwd varchar(50) not null comment '密码'
    primary key(id)  //主键是id
)engine=InnoDB chartset=utf8
```



## --查看表

show tables

## --查看表结构

desc user

## --删除表

drop table userr

## --插入表数据

insert into user values(1,'user1','123')

### 或者 制定专门的字段

insert into user(name,pwd) values('user2','222')

## --查询表数据

select * from user
select id,name from user
select id,name from user where =1

## --修改表数据

update user set pwd = '111' where id = 1

## --删除表数据

delete from user where id = 2

# 实例：

## egg操作mysql

### 方式1：直接操作

```
yarn add egg-mysql -S
```

#### config/plug.js中配置

```javascript
exports.mysql={
    enable:'true',
    package:'egg-mysql'
}
```



#### config/config.default.js

```javascript
config.mysql = {
    app:true, //是否挂载到app
    agent::false, //是否挂载到代理
    client: { //根据实际项目配置
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'123456',
        database:'xxx1'
    }
}
```

service/user.js
class UserService extends Service {
    async lists() {
        try {
            const {app} = this
            const res = await app.mysql.select('user') //查询所有
            //.....
        } catch(error) {
            //.....
        }
    }

    async detail(id){
        try {
            const {app} = this
            const res = await app.mysql.get('user',{id}) //根据id查询
            return res
            //.....
        } catch(error) {
            //.....
        }
    }
}

controller/user.js
class UserController extends Controller {
    //查询
    async detail() {
        const {ctx,app} = this;
        const res = await ctx.service.user.detail(ctx.parmars.id)
        ctx.body=res
}

module.exports = UserController;

如此新增插入是 app.mysql.insert('user',params) 修改是update()