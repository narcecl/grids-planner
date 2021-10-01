export default{
	state: {
		theme: 'light',
		instagramLogin: null,
		instagramInfo: null,
		loginStatus: false,
		instagramExpires: false,
		instagramStorage: null,
		posts: [],
		instaPosts: []
	},
	getters: {
		getTheme: function(state){
			// Devuelve el tema (Claro/Oscuro)
			return state.theme;
		},
		isDarkMode: function(state){
			return state.theme === 'dark';
		},
		getPosts: function(state){
			// Devuelve array de posts
			return state.posts;
		},
		hasPosts: function(state){
			// Devuelve boolean si es que hay posts o no
			return state.posts.length ? state.posts.length : false;
		},
		getInstaPosts: function(state){
			// Devuelve array de posts de Instagram
			return state.instaPosts;
		},
		loginStatus: function(state){
			// Devuelve el estado del login de Instagram
			return state.loginStatus;
		},
		instagramInfo: function(state){
			// Devuelve la info del usuario obtenida de Instagram
			return state.instagramInfo;
		},
		instagramStorage: function(state){
			// Devuelve el localStorage
			return state.instagramStorage;
		}
	},
	actions: {
		clearPosts: function(context){
			// Elimina todos los posts
			context.commit('clearPosts');
		},
		toggleOverflow: function(context, bool) {
			var value = bool ? 'hidden' : 'auto';
			document.body.style.overflow = value;
		},
		loginStatus: function(context, value){
			// Seteamos el valor del estatus del login
			context.state.loginStatus = value;
		},
		setInstagramStorage: function(context, value){
			// Seteamos el valor del storage
			context.state.instagramStorage = value;
		}
	},
	mutations: {
		clearPosts: function(state){
			state.posts = [];
		},
		toggleTheme: function(state, theme = null){
			if( theme ) state.theme = theme;
			else state.theme = (state.theme === 'dark') ? 'light' : 'dark';
		},
		addInstaPost: function(state, image){
			// Agregamos los posts que obtuvimos desde la sesion
			state.instaPosts.push(image);
		},
		addPost: function(state, value){
			// Añade un post desde el dragArea al state
			let image = value;

			if( !state.posts.length ){
				// Si no hay posts, agregamos con push
				state.posts.push(image);
			}
			else{
				// Si hay posts agregamos al principio del array
				state.posts.splice(0, 0, image);
			}
		},
		deletePost: function(state, value){
			// Eliminamos un posts del array
			state.posts.splice(value, 1);
		},
		setInstagramInfo: function(state, value){
			// Guardamos la info del usuario que recibimos de Instagram
			state.instagramInfo = value;
		},
		updatePostsList: function(state, value){
			// Actualizamos la lista de posts desde el postsArea (vuedraggable)
			state.posts = value;
		},
		showLogin: function(state, redirectUri){
			// Levantamos la ventana de login de facebook
			let winw = 500,
				winh = 600,
				x = (window.innerWidth / 2) - (winw/2),
				y = (window.innerHeight / 2) - (winh/4);
				
			let url_string = `?client_id=476586483443014&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
			let prop_string = `width=${winw},height=${winh},resizable=no,location=no,toolbar=no,titlebar=no,status=no,scrollbars=no,left=${x}',top=${y}`;
			let url = `https://www.instagram.com/oauth/authorize${url_string}`;
			state.instagramLogin = window.open(url, '', prop_string);
		}
	}
}