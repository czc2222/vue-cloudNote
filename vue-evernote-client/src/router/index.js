import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import Login from '@/components/Login.vue'
import NotebookList from '../components/NotebookList.vue'
import NoteDetail from '../components/NoteDetail.vue'
import TrashDetail from '../components/TrashDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/notebooks',
      component: NotebookList
    },
    {
      path: '/note',
      component: NoteDetail
    },
    {
      path: '/trash',
      component: TrashDetail
    }

  ]
})
