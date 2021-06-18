<template>
	<div class="connect-page">
		<div class="d-flex h-100 align-items-center justify-content-center">
			<div>
				<div class="sk-cube-grid">
					<div class="sk-cube sk-cube1"></div>
					<div class="sk-cube sk-cube2"></div>
					<div class="sk-cube sk-cube3"></div>
					<div class="sk-cube sk-cube4"></div>
					<div class="sk-cube sk-cube5"></div>
					<div class="sk-cube sk-cube6"></div>
					<div class="sk-cube sk-cube7"></div>
					<div class="sk-cube sk-cube8"></div>
					<div class="sk-cube sk-cube9"></div>
				</div>
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
				access_uri: 'https://api.instagram.com/oauth/access_token',
				instagram_access: null
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
					this.instagram_access = response.data;
					this.getUserMedia();
				})
				.catch(error => {
					console.log(error);
				});
			},
			getUserMedia: function(){
				this.$axios({
					url: 'https://graph.instagram.com/v11.0/'+ this.instagram_access.user_id +'/media',
					params: {
						access_token: this.instagram_access.access_token,
						fields: 'media_url'
					}
				})
				.then(response => {
					console.log('response =>', response.data);
					let data = response.data;
					let posts = data.data;

					if( posts.length ){
						posts.reverse();
						posts.forEach((item, index) => {
							this.$store.commit('addPost', item.media_url);
							if( index === (posts.length-1) ){
								this.ready = true;
								window.close();
							}
						});
					}
				})
				.catch(error => {
					console.log(error);
				});
			}
		},
		created: function(){
			let code = this.searchParams('code');
			if( code ) this.getAccessToken(code);
		}
	}
</script>

<style lang="scss" scoped>
	@-webkit-keyframes sk-cubeGridScaleDelay {
		0%,70%,100%{-webkit-transform:scale3D(1,1,1);transform:scale3D(1,1,1)}
		35%{-webkit-transform:scale3D(0,0,1);transform:scale3D(0,0,1)}
	}
	@keyframes sk-cubeGridScaleDelay {
		0%,70%,100%{-webkit-transform:scale3D(1,1,1);transform:scale3D(1,1,1)}
		35%{-webkit-transform:scale3D(0,0,1);transform:scale3D(0,0,1)}
	}

	.connect-page{
		width:100%;
		height:100vh;

		.sk-cube-grid{
			width: 64px;
			height: 64px;

			.sk-cube{
				width: 33%;
				height: 33%;
				background-color: #555;
				float: left;
				-webkit-animation:sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
				animation:sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
			}
		}
		.sk-cube-grid .sk-cube1{-webkit-animation-delay:.2s;animation-delay:.2s}
		.sk-cube-grid .sk-cube2{-webkit-animation-delay:.3s;animation-delay:.3s}
		.sk-cube-grid .sk-cube3{-webkit-animation-delay:.4s;animation-delay:.4s}
		.sk-cube-grid .sk-cube4{-webkit-animation-delay:.1s;animation-delay:.1s}
		.sk-cube-grid .sk-cube5{-webkit-animation-delay:.2s;animation-delay:.2s}
		.sk-cube-grid .sk-cube6{-webkit-animation-delay:.3s;animation-delay:.3s}
		.sk-cube-grid .sk-cube7{-webkit-animation-delay:0;animation-delay:0}
		.sk-cube-grid .sk-cube8{-webkit-animation-delay:.1s;animation-delay:.1s}
		.sk-cube-grid .sk-cube9{-webkit-animation-delay:.2s;animation-delay:.2s}
	}
</style>