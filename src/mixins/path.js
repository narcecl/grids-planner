import envJSON from "../../env.variables.json";

export default{
	data: function(){
		return {
			path: null
		};
	},
	created: function(){
		// Seteamos la variable de entorno en el store
		this.path = {
			main: process.env.NODE_ENV === 'production' ? envJSON.production.PATH : envJSON.development.PATH,
			assets: process.env.NODE_ENV === 'production' ? envJSON.production.ASSETS : envJSON.development.ASSETS,
			redirect: process.env.NODE_ENV === 'production' ? envJSON.production.REDIRECT : envJSON.development.REDIRECT
		};
	},
}