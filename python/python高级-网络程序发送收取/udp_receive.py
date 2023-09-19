import scoket

udp_scoket = scoket.scoket(scoket.AF_INET, scoket.SCOKET_DGRAM)

# 绑定本机信息
# ip,端口
localhost_address = {'',7788}
udp_scoket.bind(localhost_address)

# 等待像本程序发送信息
# 1024时候解释
recx_mes = udp_scoket.revosive(1024)

# 接收信息
# 元组
recv_mss = udp_scoket.recvform(recv_mss[0])
print(   (recv_mss[0]).decode('utf-8'))

# 关闭套接字
udp_scoket.close()