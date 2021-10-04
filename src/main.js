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
			ready: false
		};
	},
	computed: {
		hasStorage: function(){
			// Verificamos si el item del localStorage cumple con los parámetros para obtener la info
			return (this.$store.getters.instagramStorage && 'access_token' in this.$store.getters.instagramStorage && 'user_id' in this.$store.getters.instagramStorage);
		},
	},
	methods: {
		getInstagramInfo: function(){
			// Agregamos el item en el store
			let storageItem = localStorage.getItem('instagram').split(',');
			this.$store.dispatch('setInstagramStorage', {
				access_token: storageItem[0],
				user_id: storageItem[1]
			});

			// Actualizamos el valor (se hizo login)
			this.$store.dispatch('loginStatus', true);

			// Validamos que el storage tenga los campos
			if( this.hasStorage && !this.$store.getters.getInstaPosts.length ){
				// Obtenemos la info y los posts del usuario
				this.getUserInfo();
				this.getUserMedia();
			}
			else{
				// El item en el localStorage es invalido
				console.error('Ocurrió un problema con el item en el localStorage.');
			}
		},
		getUserInfo: function(){
			// Obtenemos el Username del usuario logueado
			this.$axios({
				url: `https://graph.instagram.com/v11.0/${ this.$store.getters.instagramStorage.user_id }`,
				params: {
					access_token: this.$store.getters.instagramStorage.access_token,
					fields: 'username'
				}
			})
			.then(response => {
				// Obtuvimos la info del usuario
				let data = response.data;
				// La seteamos en el store
				this.$store.commit('setInstagramInfo', data);
			})
			.catch(error => {
				// Hubo un problema al obtener la info
				if( error.response ){
					let data = error.response.data;
					console.error(`Error ${data.code}: ${data.error_message} (${data.error_type}).`);
				}
			});
		},
		getUserMedia: function(){
			// Obtenemos los posts del usuario
			this.$axios({
				url: `https://graph.instagram.com/v11.0/${ this.$store.getters.instagramStorage.user_id }/media`,
				params: {
					access_token: this.$store.getters.instagramStorage.access_token,
					fields: 'media_url'
				}
			})
			.then(response => {
				let data = response.data;
				let posts = data.data;

				// Obtuvimos resultados (posts)
				if( posts.length ){
					// Recorremos y agregamos los posts al store
					posts.forEach((item, index) => {
						this.$store.commit('addInstaPost', {
							image: item.media_url,
							drag: false
						});

						if( index === (posts.length-1) ){
							// Llegamos al final
						}
					});
				}
			})
			.catch(error => {
				// Hubo un problema al obtener los posts
				if( error.response ){
					let data = error.response.data;
					console.error(`Error ${data.code}: ${data.error_message} (${data.error_type}).`);
				}
			});
		}
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
			let theme = 'light';

			// Si tiene el modo oscuro
			if( event.matches ) theme = 'dark';

			// Ajustamos el theme en el store
			this.$store.commit('toggleTheme', theme);
		});

		if( localStorage.getItem('instagram') ){
			// Hacemos la verificación del item
			if( localStorage.getItem('instagram') ){
				this.getInstagramInfo();
			}
		}

		// Agregamos el evento para saber si se agrega la storage en otra ventana
		window.addEventListener('storage', () => {
			if( localStorage.getItem('instagram') ){
				// El item instagram tiene contenido
				this.getInstagramInfo();
			}
		});
	}
});

router.beforeEach((to, from, next) => {
	// Eventos antes de pasar a otra página (Router)
	main.currentPath = router.currentRoute.path;
	main.ready = false;

	// Progress Bar
	if( to.meta.progress !== undefined ){
		let meta = to.meta.progress;
		main.$Progress.parseMeta(meta);
	}
	main.$Progress.start();

	// Avanzamos
	next();
});

router.afterEach(() => {
	// Eventos después de pasar a otra página (Router)
	main.currentPath = router.currentRoute.path;
	main.$Progress.finish();
	setTimeout(() => main.ready = true, 500);
});