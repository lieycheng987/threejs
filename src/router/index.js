import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const About = ()=>import("@/views/About.vue")
const Three = ()=>import("@/views/three.vue")
const Star = ()=>import("@/views/star.vue")
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path:"/home",
    name:"home",
    component:Home,
    meta:{
      title:"home"
    }
  },
  {
    path:'/about',
    name:"About",
    component:About,
    meta:{
      title:"about"
    }
  },
  {
    path:'/three',
    name:"three",
    component:Three,
    meta:{
      title:"three"
    }
  },
  {
    path:'/star',
    name:'star',
    component:Star,
    meta:{
      title:"star"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass:"active"
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})
export default router
