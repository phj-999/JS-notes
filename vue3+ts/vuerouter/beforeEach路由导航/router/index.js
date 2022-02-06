import {
  createRouter,
  createWebHistory,//history路由
  createWebHashHistory,//hash路由
} from "vue-router";

import about from "../pages/about.vue";
import home from "../pages/home.vue";
//配制映射关系
const routes = [
  { path: "/home", component: home },
  { path: "/about", component: about },
];

//创建一个路由对象
const router = createRouter({
  routes: routes,
  history: createWebHistory(), //或者createWebHashHistory()
});

//路由导航守卫
router.beforeEach((to,from)=>{
  console.log(to);
  console.log(from);

  if (to.path != '/home') {
    const token = window.localStorage.getItem('token')
    if (!token) {
      return {
        path:'/login'
      }
    }
  }
})

export default router;
