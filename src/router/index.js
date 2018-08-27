import Vue from 'vue'
import Router from 'vue-router'
import AddBlog from '../components/AddBlog'
import HelloVue from '../components/HelloVue'
import Home from '../components/Home'
import LoginVue from '../pages/login'
import NotFoundComponent from '../pages/404'
import Register from '../pages/register'
import ShowBlog from '../components/ShowBlog'
import MyBlog from '../components/MyBlog'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {path: '*', component: NotFoundComponent},
    {path: '/', component: Home},
    {path: '/addBlog', component: AddBlog},
    {path: '/helloVue', component: HelloVue},
    {path: '/login', component: LoginVue},
    {path: '/register', component: Register},
    {path: '/showBlog/:articleid', component: ShowBlog},
    {path: '/myBlog', component: MyBlog}
  ]
})
