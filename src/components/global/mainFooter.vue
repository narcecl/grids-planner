<template>
	<footer class="app-footer">
		<div class="container">
			<div class="row total mini">
				<div class="col-12 col-sm-6">
					<p><span class="fa fa-heart mr-8 animate__animated animate__heartBeat animate__infinite"></span>Desarrollado con amor por <a href="https://www.narce.cl" target="_blank">Nicolás Arce</a>.</p>
				</div>
				<div class="col-12 col-sm-6 text-left text-md-right">
					<p><span class="fas fa-mug-hot mr-8"></span>¿Te sirvió la app? <a href="https://ko-fi.com/narcecl" target="_blank">Regalame un café</a>.</p>
				</div>
				<!-- <div class="col-12 col-sm-4 text-center text-sm-right">
					<p><span class="fa fa-bug mr-8"></span>¿Tuviste algún problema? <a href="#">Cuentamelo</a>.</p>
				</div> -->
			</div>
		</div>
	</footer>
</template>

<script>
	export default{
		name: 'appFooter'
	}
</script>

<style lang="scss" scoped>
	.dark{
		.app-footer{
			border-top-color: #333;
			*{color: #aaa;}
		}
	}

	.app-footer{
		transition: all .3s ease;
		padding: 32px 0;
		border-top: 1px solid #eee;

		.fa-heart{color:#d9534f}

		p{
			font-size: 13px;
			span.fa{font-size: 16px;}

			a{
				font-weight: bolder;
				color: inherit;
				text-decoration: none;

				&:hover{
					text-decoration: underline;
				}
			}
		}
	}
</style>