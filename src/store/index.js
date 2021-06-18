export default{
	state: {
		theme: 'light',
		instagram_login: null,
		posts: []
	},
	getters: {
		getTheme: function( state ){
			// Devuelve el tema (Claro/Oscuro)
			return state.theme;
		},
		getPosts: function( state ){
			// Devuelve array de posts
			return state.posts;
		}
	},
	actions: {
		showLogin: function(context){
			context.commit('showLogin');
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
		showLogin: function(state){
			// Levantamos la ventana de login de facebook
			let x = (window.innerWidth / 2) - 250,
				y = (window.innerHeight / 2);

			state.instagram_login = window.open('https://www.instagram.com/oauth/authorize?client_id=476586483443014&redirect_uri=https://grids-planner.herokuapp.com/connect_success&scope=user_profile,user_media&response_type=code', '', 'width=500,height=600,resizable=no,location=no,toolbar=no,titlebar=no,status=no,scrollbars=no,left='+x+',top='+y);
		},
		closeLogin: function(state){
			// obtenemos el codigo de verificacion y cerramos el login
			state.instagram_login.close();
		}
	}
}