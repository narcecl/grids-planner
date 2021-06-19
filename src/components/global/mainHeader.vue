<template>
	<div class="app-header">
		<div class="container">
			<div class="row align-items-center">
				<div class="col-6 col-sm-8">
					<div class="logo d-flex align-items-center">
						<span class="fa fa-th-large isotype"></span>
						<h1>Grids <span>planner</span></h1>
						<span class="text d-none d-sm-block">Instagram Feed Planner</span>
					</div>
				</div>
				<div class="col-6 col-sm-4">
					<div class="d-flex align-items-center justify-content-end">
						<a href="#" class="btn-ingresar" @click.prevent="openLogin" v-if="!$store.getters.loginStatus">
							<span class="fa fa-instagram"></span>
							<span class="d-none d-sm-inline-block ml-8">Ingresar con Instagram</span>
						</a>
						<dark-mode/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data: function(){
			return {
			};
		},
		methods: {
			openLogin: function(){
				this.$store.commit('showLogin', this.path.redirect);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.app-header{
		padding:18px 0;
		background: #333;

		.logo{
			.isotype{
				font-size: 40px;
				margin-right: 16px;
				color: rgba(255,255,255,.8);
			}

			h1{
				color:#fff;
				font-size: 26px;
				font-weight:700;

				span{
					color: rgba(255,255,255,.8);
					display: block;
					margin-top:4px;
					font-size:10px;
					font-weight: 200;;
					letter-spacing: 3px;
					text-transform: uppercase;
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
			margin-right:32px;
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