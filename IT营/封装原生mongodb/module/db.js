const MongoClient = require('mongodb').MongoClient

const Config = require('./config')

class Db {
   
    //可以定义一个单例 这样下面实例化的时候用的是 const myDb= Db.getInstance()
    //如此性能更好

// static getInstance(){
//     if (!Db.instance) {
//         Db.instance=new Db()
//     }
//     return  Db.instance
// }

    constructor() {
        this.dbClient=''
        this.connect()
    }
    //连接数据库
    connect() {
        return new Promise((resolve, reject) => {
            if (!this.dbClient) {
                
            
            MongoClient.connect(Config.dbUrl, (err, client) =>{
                if (err) {
                    reject(err)
                } else {
                    const db = client.db(Config.dbName)
                    this.dbClient=db
                    resolve(  this.dbClient)
                }
            })
        }else{
            resolve(this.dbClient)
        }
        })
    }

//查询封装
    find(collectionName, json) {
       return new Promise((resolve,reject)=>{
        this.connect().then((db) => {
            let result = db.collection(collectionName).find(json)
            result.toArray((err, docs)=> {
                if (error) {
                    reject(err)
                    return
                }
                resolve(docs)
            })
        });
       })
    }
}


使用  
var myDb = new Db()

myDb.find('user',{}).then((data)=>{
    console.log(data);
})