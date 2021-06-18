export default{
	state: {
		theme: 'light',
		instagram_login: null,
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
		}
	},
	mutations: {
		toggleTheme: function(state, theme = null){
			if( theme ) state.theme = theme;
			else state.theme = (state.theme === 'dark') ? 'light' : 'dark';
		},
		addPost: function(state, value){
			// Añade un post desde el dragArea al state
			let image = { image: value };

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
			let x = (window.innerWidth / 2) - 250,
				y = (window.innerHeight / 2);

			let url_string = `?client_id=476586483443014&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
			let prop_string = `width=500,height=600,resizable=no,location=no,toolbar=no,titlebar=no,status=no,scrollbars=no,left=${x}',top=${y}`;
			state.instagram_login = window.open('https://www.instagram.com/oauth/authorize' + url_string, '', prop_string);
		},
		closeLogin: function(state){
			// Cerramos el login de verificación de instagram
			state.instagram_login.close();
		}
	}
}