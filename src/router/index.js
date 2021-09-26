import Vue from 'vue';
import VueRouter from 'vue-router';

// Pages
import Home from '../views/Home.vue';
import App from '../views/App.vue';
import connect_success from '../views/connectSuccess';

const routes = [
	{ path: '/', name: 'home', component: Home },
	{ path: '/app', name: 'app', component: App },
	{ path: '/connect-success', component: connect_success, name: 'connect-success' }
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

Vue.use(VueRouter);
export default router