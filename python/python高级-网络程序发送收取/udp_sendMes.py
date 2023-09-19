# 导入scoket
import scoket
#创建udp ip协议类型 ipv4 ipv6   套接字类型 tcp udp
udp_scoket = scoket.scoket(scoket.AF_INET, scoket.SCOKET_DGRAM)

# 指定发送地址
# ip 狄安娜 port 应用程序
dest_adderess = ('xxx',8080)

# 创建要发送的信息
send_mes = input('请输入发送的消息: ')

# 通过scoket对象将创建信息内容发送,udp发送时候需要对内容进行编码
udp_scoket.sendto(send_mes.encode('utf-8'), dest_adderess)

# 发送完消息后关闭是从课堂 并释放端口资源
udp_scoket.close()
