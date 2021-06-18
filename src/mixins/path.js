import envJSON from "../../env.variables.json";
export default{
	data: function(){
		return {
			path: null
		};
	},
	created: function(){
		// Seteamos la variable de entorno en el store
		// this.app_path = (process.env.NODE_ENV === 'production' ? envJSON.production.PATH : envJSON.development.PATH);
		this.path = {
			main: envJSON.production.PATH,
			redirect: envJSON.production.REDIRECT
		};
	},
}