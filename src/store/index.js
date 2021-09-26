export default{
	state: {
		theme: 'light',
		instagram_login: null,
		instagram_info: null,
		login_status: false,
		posts: [],
		insta_posts: []
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
			// Devuelve array de posts de instagram
			return state.insta_posts;
		},
		loginStatus: function(state){
			// Devuelve el estado del login de instagram
			return state.login_status;
		},
		instagramInfo: function(state){
			return state.instagram_info;
		}
	},
	actions: {
		clearPosts: function(context){
			context.commit('clearPosts');
		},
		toggleOverflow: function(context, bool) {
			var value = bool ? 'hidden' : 'auto';
			document.body.style.overflow = value;
		},
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
			state.insta_posts.push(image);
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
			state.instagram_info = value;
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
			state.instagram_login = window.open(url, '', prop_string);
		},
		loginStatus: function(state, value){
			// Seteamos el valor del estatus del login
			state.login_status = value;
		}
	}
}