import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import draggable from 'vuedraggable';
import $store from './store';
import "@/assets/scss/main.scss";

// Mixins
import mobile from '@/mixins/mobile';

// Components
import mainHeader from '@/components/global/mainHeader.vue';
import dragArea from '@/components/global/dragArea.vue';
import postArea from '@/components/global/postArea.vue';
import mainFooter from '@/components/global/mainFooter.vue';
import darkMode from '@/components/global/darkMode.vue';

const $config = {
	install( Vue ){
		// Prototypes
		Vue.prototype.$axios = axios;

		// Mixins
		Vue.mixin(mobile);

		// Component
		Vue.component('main-header', mainHeader);
		Vue.component('main-footer', mainFooter);
		Vue.component('drag-area', dragArea);
		Vue.component('post-area', postArea);
		Vue.component('draggable', draggable);
		Vue.component('dark-mode', darkMode);
	}
}

Vue.config.productionTip = false;
Vue.use($config);
Vue.use(Vuex);

const store = new Vuex.Store($store);
const main = new Vue({
	el: '#app',
	router,
	store,
	created: function(){
		if( window.matchMedia('(prefers-color-scheme: dark)').matches ){
			// Tiene el modo oscuro activado por OS
			this.$store.commit('toggleTheme', 'dark');
		}
	},
	mounted: function(){
		// Evento para verificar si se cambia el tema del OS
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
			if( event.matches ){
				// Si tiene el modo oscuro, lo cambiamos
				this.$store.commit('toggleTheme', 'dark');
			} else {
				// Si tiene el modo claro, lo cambiamos
				this.$store.commit('toggleTheme', 'light');
			}
		});
	}
});