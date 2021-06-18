import Vue from 'vue';
import Vuex from 'vuex';
import router from './router';
import axios from 'axios';
import draggable from 'vuedraggable';
import $store from '@/store/index.js';
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
import loading from '@/components/ui/loading.vue';
import btn from '@/components/ui/button.vue';

const $config = {
	install( Vue ){
		// Prototypes
		Vue.prototype.$axios = axios;

		// Mixins
		Vue.mixin(mobile);
		Vue.mixin(path)

		// Component
		Vue.component('main-header', mainHeader);
		Vue.component('main-footer', mainFooter);
		Vue.component('drag-area', dragArea);
		Vue.component('post-area', postArea);
		Vue.component('draggable', draggable);
		Vue.component('dark-mode', darkMode);
		Vue.component('loading', loading);
		Vue.component('btn', btn);
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