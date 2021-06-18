import Vue from 'vue';
import VueRouter from 'vue-router';

// Pages
import Home from '../views/Home.vue';
import connect_success from '../views/connectSuccess';


const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/connect_success', component: connect_success }
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

Vue.use(VueRouter);
export default router