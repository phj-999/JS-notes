# Vuex的安装
>npm install vuex@next 添加next 指定版本

创建Store
不能直接改变store中的状态 改变store中的状态的唯一途径就显示提交(commit) mutation；

使用步骤
- 创建Store对象；store-->index.js
- 在app中通过插件安装；main.js-->createApp(App).use(store).mount('#app')
组件中使用store
- 在模板中使用；
- 在options api中使用，比如computed；
- 在setup中使用；

# [基本使用过程](./基本使用过程)