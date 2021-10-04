<template>
	<div class="connection-page">
		<div class="d-flex h-100 align-items-center justify-content-center">
			<div>
				<loading v-if="!done"/>

				<transition name="fade">
					<div class="text-center" v-if="done">
						<span class="fa f-48" :class="{'text-white': $store.getters.isDarkMode, 'fa-times-circle': error, 'fa-check-circle': success}"></span>
						<p class="mt-16" :class="{'text-white': $store.getters.isDarkMode}">
							<mark class="f-large" v-text="message"></mark><br>
							<span>Esta ventana se cerrará automáticamente en algunos segundos.</span>
						</p>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
	// Query String
	import qs from 'qs';

	export default{
		data: function(){
			return {
				success: false,
				successMessage: 'Token Recibido correctamente',
				error: false,
				errorMessage: 'Hubo un problema al obtener el token de acceso',
				closeTimeout: 2000
			};
		},
		computed: {
			done: function(){
				// Verificamos si hay error o la solicitud se completó correctamente
				return this.success || this.error;
			},
			message: function(){
				if( this.done && this.success ) return this.successMessage;
				if( this.done && this.error ) return this.errorMessage;
			}
		},
		methods: {
			searchParams: function(param){
				// Buscamos un parametro en la url y devolvemos su valor
				let url_string = window.location.href;
				let new_url = new URL(url_string);
				return new_url.searchParams.get(param) || false;
			},
			closeWindow: function(){
				// Cerramos la ventana
				setTimeout(() => {
					window.close();
				}, this.closeTimeout);
			},
			getAccessToken: function(code){
				// Petición a la API de Instagram para obtener el access token
				this.$axios({
					method: 'post',
					url: 'https://api.instagram.com/oauth/access_token',
					headers: { 
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: qs.stringify({
						'client_id': '476586483443014',
						'client_secret': '3b211b44e23f75a9f6c546ecee953841',
						'code': code.split('#_')[0],
						'grant_type': 'authorization_code',
						'redirect_uri': this.path.redirect
					})
				})
				.then(response => {
					// Todo bien, seteamos el local storage
					console.log('response =>', response.data);
					this.success = true;
					this.setLocalStorage(response.data);
					// Cerramos la ventana (popup)
					this.closeWindow();
				})
				.catch(error => {
					// Problema al obtener el token de acceso
					if( error.response ){
						let data = error.response.data;
						console.error(`Error ${data.code}: ${data.error_message} (${data.error_type}).`);
					}
					this.error = true;
					this.closeWindow();
				});
			},
			setLocalStorage: function(data){
				// Seteamos la info del usuario en el localStorage
				localStorage.setItem('instagram', [data.access_token, data.user_id].join(','));
			},
			redirectHome: function(){
				// Devuelta al home
				this.$router.push({name: 'home'});
			}
		},
		created: function(){
			// Obtenemos el code mediante URL
			let code = this.searchParams('code');

			// No existe el token de Instagram, redirect al home
			if( !code ) this.redirectHome();

			// Existe el token de Instagram
			else this.getAccessToken(code);
		}
	}
</script>

<style lang="scss" scoped>
	.connection-page{
		height: 100vh;
	}
</style>