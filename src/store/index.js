export default{
	state: {
		theme: 'light',
		instagram_login: null,
		login_status: false,
		posts: []
	},
	getters: {
		getTheme: function(state){
			// Devuelve el tema (Claro/Oscuro)
			return state.theme;
		},
		getPosts: function(state){
			// Devuelve array de posts
			return state.posts;
		},
		loginStatus: function(state){
			// Devuelve el estado del login de instagram
			return state.login_status;
		}
	},
	actions: {
		clearPosts: function(context){
			context.commit('clearPosts');
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
			state.instagram_login = window.open('https://www.instagram.com/oauth/authorize' + url_string, '', prop_string);
		},
		loginStatus: function(state, value){
			// Seteamos el valor del estatus del login
			state.login_status = value;
		}
	}
}