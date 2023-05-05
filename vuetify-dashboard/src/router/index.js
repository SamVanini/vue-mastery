import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'about',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/AboutV.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/Login.vue'),
	},
	{
		path: '/dashboard',
		name: 'dashboard',
		component: () => import('@/views/Dashboard.vue'),
	},
	{
		path: '/signup',
		name: 'signup',
		component: () => import('@/views/Signup.vue'),
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
