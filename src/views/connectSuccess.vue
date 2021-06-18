<template>
	<div class="connect-page">
		<div class="d-flex h-100 align-items-center justify-content-center">
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
		</div>
	</div>
</template>

<script>
	export default{
		methods: {
			searchParams: function(param){
				let url_string = window.location.href;
				let new_url = new URL(url_string);
				return new_url.searchParams.get(param);
			}
		},
		created: function(){
			let code = this.searchParams('code');

			if( code ){
				//this.$router.push('/');
				this.$axios({
					method: 'post',
					url: 'https://api.instagram.com/oauth/access_token',
					data: {
						client_id: '476586483443014',
						client_secret: '3b211b44e23f75a9f6c546ecee953841',
						code: code,
						grant_type: 'authorization_code',
						redirect_uri: this.path,
					}  
				})
				.then( response => {
					console.log('response => ', response);
				})
				.catch( error => {
					console.error('error =>', error);
				});
			}
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