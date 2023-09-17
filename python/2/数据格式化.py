name = 'xming'
print("i'm %s" %name )

str_num = 123
print('我的学号为: %d' %str_num)

# py内置函数输出的都是字符串
price = float(input('apple单价:  '))
weight = float(input('apple重量: '))

# 总金额
money =price*weight
# 浮点数 保留了两位小数
print('当前价格为：%.2f, 重量为: %.2f,总价为：%.2f' %(price,weight,money))