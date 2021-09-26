import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import axios from 'axios';
import draggable from 'vuedraggable';
import VueProgressBar from 'vue-progressbar'
import $store from '@/store/index.js';
import methods from '@/methods.js';

// Estilos
import "@/assets/scss/main.scss";

// Mixins
import mobile from '@/mixins/mobile';
import path from '@/mixins/path';

// Components
import mainHeader from '@/components/global/mainHeader.vue';
import dragArea from '@/components/global/dragArea.vue';
import postArea from '@/components/global/postArea.vue';
import mainFooter from '@/components/global/mainFooter.vue';
import darkMode from '@/components/global/darkMode.vue';

// UI Components
import loading from '@/components/ui/loading.vue';
import btn from '@/components/ui/button.vue';
import support from '@/components/ui/support.vue';
import modal from '@/components/ui/modal.vue';

const $config = {
	install( Vue ){
		// Prototypes
		Vue.prototype.$methods = methods;
		Vue.prototype.$axios = axios;

		// Mixins
		Vue.mixin(mobile);
		Vue.mixin(path);

		// Component
		Vue.component('main-header', mainHeader);
		Vue.component('main-footer', mainFooter);
		Vue.component('drag-area', dragArea);
		Vue.component('post-area', postArea);
		Vue.component('draggable', draggable);
		Vue.component('dark-mode', darkMode);
		Vue.component('loading', loading);
		Vue.component('btn', btn);
		Vue.component('support', support);
		Vue.component('modal', modal);
	}
}

Vue.config.productionTip = false;
Vue.use($config);
Vue.use(Vuex);
Vue.use(VueProgressBar, {
	color: '#1769aa',
	failedColor: '#874b4b',
	thickness: '6px',
	transition: {
		speed: '0.2s',
		opacity: '0.6s',
		termination: 300
	},
	autoRevert: true,
	location: 'top',
	inverse: false
});

const store = new Vuex.Store($store);
const main = new Vue({
	el: '#app',
	router,
	store,
	data: function(){
		return {
			ready: true
		};
	},
	created: function(){
		// Progress Bar
		this.$Progress.start();

		// Tiene el modo oscuro activado por OS
		if( window.matchMedia('(prefers-color-scheme: dark)').matches ){
			this.$store.commit('toggleTheme', 'dark');
		}
	},
	mounted: function(){
		// Progress Bar
		this.$Progress.finish();
		this.ready = true;

		// Evento para verificar si se cambia el tema del OS
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
			if( event.matches ){
				// Si tiene el modo oscuro, lo cambiamos
				this.$store.commit('toggleTheme', 'dark');
			}
			else {
				// Si tiene el modo claro, lo cambiamos
				this.$store.commit('toggleTheme', 'light');
			}
		});
	}
});

router.beforeEach((to, from, next) => {
	main.currentPath = router.currentRoute.path;
	main.ready = false;

	if( to.meta.progress !== undefined ){
		let meta = to.meta.progress;
		main.$Progress.parseMeta(meta);
	}
	main.$Progress.start();

	next();
});

router.afterEach(() => {
	main.currentPath = router.currentRoute.path;
	main.$Progress.finish();
	setTimeout(() => main.ready = true, 500);
});