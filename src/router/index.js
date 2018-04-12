import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AuthorInfo from '@/components/AuthorInfo'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/author/info/:name',
      name: 'AuthorInfo',
      component: AuthorInfo
    }
  ]
})
