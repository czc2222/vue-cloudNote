import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 先把VueRouter原型对象的push replace  方法保存一份
let originPush=Router.prototype.push;
let originReplace=Router.prototype.replace;
// 重写push方法 第一个参数
Router.prototype.push=function(location,resolve,reject){
  // console.log(this);//实例
  // 判断如果成功或失败回调已经传了
  if(resolve&&reject){
    // call 调用函数一次  改变this指向
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
}


Router.prototype.replace=function(location,resolve,reject){
  if(resolve&&reject){
    originReplace.call(this,location,resolve,reject)
  }else {
    originReplace.call(this, location, () => {}, () => {})
  }
}


export default new Router({
  routes: [
    {
      path: '/',
      alias:'/notebooks',
      component: () => import('@/components/NotebookList.vue') //懒加载
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/Login.vue') //懒加载

    },
    // {
    //   path: '/notebooks',
    //   component: NotebookList
    // },
    {
      path: '/note',
      component: () => import('@/components/NoteDetail.vue') //懒加载

    },
    {
      path: '/trash',
      component: () => import('@/components/TrashDetail.vue') //懒加载
    }

  ]
})
