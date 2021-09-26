<template>
	<div class="app-header">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-6 col-sm-8">
					<div class="logo-group d-flex align-items-center">
						<router-link :to="{name: 'home'}" class="logo d-flex align-items-center">
							<span class="fa fa-th-large isotype"></span>
							<h1>Grids <span>planner</span></h1>
						</router-link>
						<span class="text d-none d-sm-block">Instagram Feed Planner</span>
					</div>
				</div>
				<div class="col-6 col-sm-4">
					<div class="d-flex align-items-center justify-content-end">
						<a href="#" class="btn-ingresar" @click.prevent="prompt = true" v-if="!$store.getters.loginStatus">
							<span class="fa fa-instagram"></span>
							<span class="d-none d-sm-inline-block ml-8">Ingresar con Instagram</span>
						</a>
						<div class="loggedin" v-if="$store.getters.loginStatus && $store.getters.instagramInfo">
							<div class="d-flex align-items-center">
								<span class="fa fa-instagram"></span>
								<p class="ml-16">
									<span class="f-12 d-block">Logueado como:</span>
									<mark>@{{ $store.getters.instagramInfo.username }}</mark>
								</p>
							</div>
						</div>
						<dark-mode/>
					</div>
				</div>
			</div>
		</div>

		<transition name="fade">
			<div class="prompt" v-if="prompt">
				<div class="h-100 d-flex align-items-center justify-content-center">
					<div class="cont text-center">
						<div class="d-flex align-items-center justify-content-center">
							<span class="f-40 text-white fa fa-instagram"></span>
							<span class="f-32 text-white mx-16">+</span>
							<span class="f-40 text-white fa fa-th-large"></span>
						</div>
						<div class="w-85 w-sm-55 center">
							<h6 class="heading-3 text-white mt-16 mb-8">¿Cómo funciona el inicio de sesión?</h6>
							<p class="f-large text-muted">
								Se abrirá una nueva ventana para que puedas iniciar sesión en el sitio web oficial de Instagram<br>
								<mark class="text-white">Grids Planner no tendrá acceso a tu información personal en ningún momento.</mark><br><br>
								Cuando hayas iniciado sesión correctamente, Instagram redireccionará con un token a una de nuestras páginas. Con este token Grids Planner puede obtener la lista de tus posts.<br><br>
								En ningún momento Instagram nos compartirá información personal de tu cuenta.<br>
								<mark class="text-white">Esta aplicación no puede subir post, ni editar los posts que ya estén en tu cuenta.</mark>
							</p>
						</div>

						<div class="btn-holder mt-32">
							<btn @click="openLogin" text="Continuar"/>
							<btn @click="prompt = false" text="Cancelar" type="secondary"/>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	export default{
		data: function(){
			return {
				prompt: false
			};
		},
		methods: {
			openLogin: function(){
				this.prompt = false;
				this.$store.commit('showLogin', this.path.redirect);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-header{
		padding:18px 0;
		background: #333;

		.logo-group{
			.logo{
				text-decoration:none;

				&:hover{
					.isotype, h1{opacity:.6;}
				}

				.isotype{
					font-size: 40px;
					margin-right: 16px;
					color: rgba(255,255,255,.8);
					transition: all .3s ease;
				}

				h1{
					color:#fff;
					font-size: 26px;
					font-weight:700;
					transition: all .3s ease;

					span{
						color: rgba(255,255,255,.8);
						display: block;
						margin-top:2px;
						font-size:10px;
						font-weight: 200;;
						letter-spacing: 3px;
						text-transform: uppercase;
					}
				}
			}
			
			.text{
				padding:10px 0 10px 16px;
				margin-left:20px;
				border-left:solid 1px rgba(255,255,255,.5);
				font-size: 13px;
				color: rgba(255,255,255,.8);
			}
		}

		.loggedin{
			p{
				color:rgba(255,255,255,.8);
				line-height: 1.1em;
				mark{color:white;font-size:16px;}
			}
			.fa{
				color: white;
				display:inline-block;
				vertical-align: text-bottom;
				font-size: 32px;
			}
		}

		.btn-ingresar{
			// background: rgb(112,59,188);
			// background: linear-gradient(90deg, rgba(112,59,188,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
			background: #555;
			color: #fff;
			border:none;
			padding:10px 18px;
			border-radius: 30px;
			font-size:14px;
			transition: all .3s ease;
			text-decoration: none;

			&:hover{
				background: #444;
			}
			
			.fa{
				display:inline-block;
				vertical-align: text-bottom;
				font-size:20px;
			}
		}
	}
</style>