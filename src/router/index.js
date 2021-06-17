import Vue from 'vue';
import VueRouter from 'vue-router';

// Pages
import Home from '../views/Home.vue';


const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

Vue.use(VueRouter);
export default router