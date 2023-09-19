import scoket

# 发送数据
def send_mes(udp_scoket):
    # 获取发送的信息
    msg = input('请输入信息：')
    # 输入对方的ip地址
    dest_ip= input('请输入对方的ip地址:')
    # 输入对方的接受mes的软件端口：
    try:
      dest_port = int(input('请输入对方port:'))
      # 发soon给数据
      udp_scoket.sendto(msg.encode('utf-8'),(dest_ip,dest_port))
    except Exception as e: 
        print('请输入正确端口，错误类型：%s' % e)
    
# 接受数据
def recv_mes(udp_scoket):
    # 接收数据 最大1024字节
    recv_msg = udp_scoket.recvfrom(1024)
    # 解码
    recv_ip_port = recv_msg[1]
    recv_msg = recv_msg[0].decode('utf-8')
    print(f'消息内容：{recv_msg}, 发送方地址是:{recv_ip_port}')

# 主函数
def main():
# 套接字
    udp_scoket = scoket.scoket(scoket.AF_INET,scoket.SOCK_DGRAM)
    # 绑定本机信息
    udp_scoket.bind('',7890)

    # 因为udp只执行以下，发消息要保证程序未退出，所以死循环保证一直运行
    while True:
        # 功能
        print('='*30)
        print('1.发送信息')
        print('2.接收信息' )
        print('='*30)

        op_num = input('请输入功能序号：')

        if op_num == '1':
            # 发送mes
            send_mes(udp_scoket)
        elif op_num == '2':
            recv_mes(udp_scoket)
        else:
            print('重新输入：')

# 创建测试
if __name__ =='__name__':
    main()