const myexpress = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');

const app  = myexpress();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,X_Requested_With,Content-Type,auth");
    // res.header("Content-Type", "application/json;charset=utf-8");
    // 获取图片，获取其它的资源
    //注意，如果nodejs 服务端有静态页面，上面的Content-Type就不要指定
    next();
});


// 相关模块的配置
app.use(logger('dev'));
app.use(myexpress.static(__dirname+"/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//写接口，进行处理
app.post('/login',function (req,res) {
    console.log(req.body);
   // 用户登录成功，返回的数据有 ,userInfo:用户相关数据 ， menuInfo : 当前用户对应的角色，可以访问哪些菜单 ，code : 请求状态, token:
    let userInfo = {id:8,username:'doubleyong',state:1,headImage:'image/binbin.jpg'};
    /**
     *
     *  menuId: 2,//菜单id
     menuName: "用户管理理",//菜单名称
     menuUrl: "/index/user",//菜单的路径，注如果子菜单要显示在父菜单中，那路径一定要有父级的路径
     pathname: "userlist",//菜单路径名称，暂时没用
     componentPath: "user/UserManger",//对应组件的路径
     menuImgClass: 'TeamOutlined',//菜单对应的class名称,主要用于设置菜单的ICON
     pId: //父级菜单的menuId, 没有父级时，值设置为0
     menuState: "0",//菜单的状态，0 有效，1无效
     isContainChildren:false,//是否包含子组件中; 子组件显示的位置
     menuChilds: []	//子菜单列表，必须是数组类型
     * */

    console.log(req.body);
    let menuInfo = [
        {
            menuId: 2,
            menuName: "用户管理",
            menuUrl: "/index/user",
            pathname: "userlist",
            componentPath: "user/UserManger",
            menuImgClass: 'TeamOutlined',
            pId:0,
            menuState: "0",
            isContainChildren:false,
            menuChilds: [{
                menuId: 10,
                menuName: "添加用户",
                menuUrl: "/index/adduser",
                pathname: "adduser",
                componentPath: "user/AddUser",
                menuImgClass: 'VideoCameraAddOutlined',
                pId:2,
                menuState: "0",
                isContainChildren:false,
                menuChilds: []
            }]
        },
        {
            menuId: 3,
            menuName: "角色管理",
            menuUrl: "/index/role",
            pathname: "role",
            componentPath: "user/RoleManger",
            menuImgClass: 'WhatsAppOutlined',
            pId:0,
            menuState: "0",
            isContainChildren:false,
            menuChilds: [
                {
                    menuId: 7,
                    menuName: "添加角色",
                    menuUrl: "/index/role/addrole",
                    pathname: "addrole",
                    componentPath: "user/AddRole",
                    menuImgClass: 'VideoCameraAddOutlined',
                    pId:3,
                    menuState: "0",
                    isContainChildren:false,
                    menuChilds: []
                },
                {
                    menuId: 8,
                    menuName: "角色详情",
                    menuUrl: "/index/role/roleInfo",
                    pathname: "roleInfo",
                    componentPath: "user/RoleInfo",
                    menuImgClass: 'TagOutlined',
                    isContainChildren:false,
                    pId:3,
                    menuState: "0",
                    menuChilds: []
                },
                {
                    menuId: 9,
                    menuName: "角色列表",
                    menuUrl: "/index/role/rolelist",
                    pathname: "rolelist",
                    componentPath: "user/RoleList",
                    menuImgClass: 'StarOutlined',
                    pId:3,
                    menuState: "0",
                    isContainChildren:false,
                    menuChilds: []
                }
            ]
        }
    ];

    let returnData = {
        data: {
            menuInfo: menuInfo,
            userInfo: userInfo,
        },
        token: "111",
        returnCode: 200
    }
    res.send(returnData);

})
app.listen(8888,function () {
   console.log('服务启动');
});