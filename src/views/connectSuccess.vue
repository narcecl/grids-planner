<template>
	<div class="connect-page">
		<div class="d-flex h-100 align-items-center justify-content-center">
			<div>
				<loading/>
				<p class="text-center mt-16" v-if="ready">All done</p>
			</div>
		</div>
	</div>
</template>

<script>
	import qs from 'qs';

	export default{
		data: function(){
			return {
				ready: false,
				access_uri: 'https://api.instagram.com/oauth/access_token'
			};
		},
		methods: {
			searchParams: function(param){
				let url_string = window.location.href;
				let new_url = new URL(url_string);
				return new_url.searchParams.get(param);
			},
			getAccessToken: function(code){
				this.$axios({
					method: 'post',
					url: this.access_uri,
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
					console.log('response =>', response);
					this.setLocalStorage(response.data);
					this.ready = true;

					setTimeout(() => {
						//window.close();
					}, 500);
				})
				.catch(error => {
					console.log(error);
				});
			},
			setLocalStorage: function(data){
				localStorage.setItem('instagram', [data.access_token, data.user_id].join(','));
			},
		},
		created: function(){
			let code = this.searchParams('code');
			if( code ) this.getAccessToken(code);
		}
	}
</script>