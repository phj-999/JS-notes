
token可以翻译为令牌
也就是在验证了用户账号和密码正确的情况，给用户颁发一个令牌
这个令牌作为后续用户访问一些接口或者资源的凭证
我们可以根据这个凭证来判断用户是否有权限来访问

token的使用应该分为两个重要步骤
生成token：登录的时候，颁发token
验证token：访问某些资源或者接口的时候验证token

想要实现token的机制，目前有个JWT
JWT帮助生成一个令牌
JWT生成的token由三部分组成

header：
  alg：采用的加密算法  默认是HMAC SHA256 (HS256)  采用同一个密钥进行 加密和解密
  typ：JWT 固定值 通常都写成JWT即可
  会通过base64URL算法进行编码

payload:
    携带的数据 比如我们可以将用户的id和name放到payload中
    默认也会携带iat （issued at） 令牌的签发时间
    我们也可以设置过期时间 exp（expiration time）
    会通过base64Url算法进行编码 

signature：
    设置一个secretKey， 通过将前两个的结果合并后进行HMACSHA256的算法
    HMACSHA256 (base64Url(header)+.+base64Url(payload,secretKey))
    但如果secretKey暴露是一个危险的事情 因为可以模拟颁发token 也可以解密token

完整的token： header.payload.signature

使用  安装jsonwebtoken

使用
const jwt = require('jsonwebtoken');
const token = jwt.sign()
（）里面的参数 header里的alg typ都默认 固定 所以不用写
但是payload里的要写，因为我们不知道要携带什么数据
又因为默认是hs256对称加密，所以需要一个密钥，在signature中secretKey来加密解密
其次令牌也需要是有个有效时间的，不能一直存在

所以（）里面的参数必须是三个： 需要携带的数据，自行设置的密钥，令牌过期时间（单位默认是秒）

const SERCET_KEY = 'ABC123' 
testRouter.get('/test', (ctx,next) => {
    const user = {id:110,name:'why'}
    const token = jwt.sign(user,SERCET_KEY,{
        expiresIn:10     // 单位是秒
    })
   
    ctx.body = token   //返回token
})

真实开发中我们会把token 放在header里面

以上都是对称加密，不安全 因为：
    分布式系统中，每一个子系统都需要获取密钥
    那么拿到这个密钥后这个子系统既可以发布另外，也可以验证令牌
    但对于一些资源服务器来说 他们只需要有验证令牌的能力就行了


非对称加密更加安全  RS256
非对称加密
   颁发的时候给一个privateKey  只有系统有，谁部署系统谁有  
   解密用publicKey加密 
   私钥（private Key）用于发布令牌
   公钥（public Key） 用于验证令牌

   新建keys文件夹 命令行切到此文件夹下

   安装openSSL
apt-get install openssl
apt-get install libssl-dev
openssl version -a
生成公私钥
生成私钥 (PKCS＃1)

openssl genrsa -out rsa_private.pem 2048  ---2048是长度
由私钥 (PKCS＃1)生成公钥 (PKCS＃1)

openssl rsa -in rsa_private.pem -RSAPublicKey_out -out rsa_public2.pem
由私钥 (PKCS＃1)生成公钥 (PKCS＃8)

openssl rsa -in rsa_private.pem -pubout -out rsa_public.pem
要从 (PKCS＃1)转换为 (PKCS＃8)

openssl rsa -RSAPublicKey_in -in rsa_public2.pem -pubout
要从 (PKCS＃8)转换为 (PKCS＃1)

openssl rsa -pubin -in <filename> -RSAPublicKey_out


coderwhy老师的命令  
打开苹果终端或者gitbash here
生成私钥          私钥颁发
openssl genrsa -out private.key 1024 对应的
根据私钥生成公钥   公钥解密
openssl rsa -in private.key -pubout -out public.key

  有的使用openssl genrsa -out rsa_private.key 1024生成私钥，那么对应就必须openssl rsa -in rsa_private.key -pubout -out rsa_public.key生成公钥
  
  
踩坑 MAC自带openssl  直接使用terminal终端
     windows没有自带openssl   直接使用git bash终端 或者 安装openssl  coderwhy老师建议windows直接使用git bash终端

用户输入用户名和密码登录，如果用户名和密码正确的话，使用 jsonwebtoken.sign() 生成 token，并返回给客户端。客户端将token存储在本地存储，在每次的 HTTP 请求中，都将 token 添加在 HTTP Header Authorazition: Bearer token 中。然后后端每次去验证该token的正确与否。只有token正确后才能访问到对应的资源。
