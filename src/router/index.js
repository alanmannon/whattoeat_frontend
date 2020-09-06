import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import RestaurantIndex from '../views/RestaurantIndex.vue';
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
import Signup from '../views/Signup.vue';
import Usergroup from '../views/Usergroup.vue';
import RestaurantShow from '../views/RestaurantShow.vue';
import RestaurantRoll from '../views/RestaurantRoll.vue';
import GroupShow from '../views/GroupShow.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
  },
  {
    path: '/index',
    name: 'Restaurant Index',
    component: RestaurantIndex
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/roll',
    name: 'RestaurantRoll',
    component: RestaurantRoll
  },
  {
    path: '/show',
    name: 'Restaurant Show',
    component: RestaurantShow,
  },
  {
    path: '/group',
    name: 'Group Show',
    component: GroupShow,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
