为什么需要登录凭证？

http为无状态协议的原因

登录成功后 以登录的用户身份去访问其他数据资源 还是通过HTTP去访问的  但HTTP的每次请求对服务器来说每次都是新的、单独的请求，与之前的请求毫无半点关系

这时候要想让服务器知道上次也是自己登陆的，就需要拿到一个登录凭证  相当于用登录凭证来证明 我是我

常用的登陆凭证
1、cookie + session

2、Token令牌

coderwhy老师说登录模块cookie+session正在慢慢被淘汰  token是未来趋势  因为现在高并发盛行，前端有移动端、pc端等等，前后端分离  token更适合未来发展

内存cookie由浏览器维护，保存在内存中，浏览器关闭cookie消失，存在时间短暂
硬盘cookie保存在硬盘中，有一个过期时间，用户手动清理，或者过期时间到了的时候自动清理

识别：无过期时间 内存cookie
      有过期时间 硬盘cookie

cookie常见属性
生命周期
默认是内存cookie
可以通过设置expires或者max-age来设置过期时间：

expires：设置的是Date.toUTCString(),设置格式是 expires = date-in-GMTString-format

max-age：设置过期的秒钟，max-age=max-age-in-seconds  列如一年为60*60*24*365

cookie的作用域（允许cookie发送给哪些URL）
Domain ：指定哪些主机可以接受cookie

如果不指定 那么默认是origin 不包括子域名
如果不指定Domain 则包含子域名，例如Domain=mozilla.org 则cookie也包含在子域名中（被携带过去了）
www.xxx。com  子域名就是abc.xxx.com之类的

path：指定主机下哪些路径可以接受cookie
列如 Path=/docs 则会匹配
/docs
/docs/web/

客户端设置值cookie，也可以由服务器设置cookie，服务器设置值cookie会保存在客户端里面
一般都是服务端设置cookie，客户端删除cookie
