<template>
	<section class="section">
		<div class="container">
			<div class="drag-area">
				<label for="images" @drop.prevent="handleDrop" @dragover.prevent @dragenter.prevent>
					<div class="drag-cont">
						<span class="fa fa-images"></span>
						<h2 class="heading-5 mb-4 fw-semibold">Empieza a organizar tu feed</h2>
						<p class="f-medium text-muted w-100 w-sm-35 center">Haz clic para buscar las imágenes entre tus archivos o simplemente arrastralas aquí.</p>
					</div>
					<input type="file" ref="file" id="images" multiple accept="image/png,image/x-png,image/gif,image/jpeg" @change="handleFile">
				</label>
			</div>
		</div>
	</section>
</template>

<script>
	export default{
		name: 'dragArea',
		data: function(){
			return {
				
			};
		},
		methods: {
			addPost: function(items){
				// Agregamos el nuevo item al store
				Array.from(items).forEach(item => {
					this.$store.commit('addPost', {
						image: URL.createObjectURL(item),
						drag: true
					});
				});
			},
			handleFile: function(e){
				// Si encontramos un archivo, lo agregamos
				if( e.target.files.length ){
					this.addPost(e.target.files);
				}
			},
			handleDrop: function(e){
				// Si dejamos un archivo, lo agregamos
				if( e.dataTransfer.files.length ){
					this.addPost(e.dataTransfer.files);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dark{
		.drag-area{
			.drag-cont{
				background: #333;
				border-color:#444;
				.heading-5, span.fa{color:#fff;}
			}
		}
	}

	.drag-area{
		.drag-cont{
			text-align: center;
			padding:32px;
			border-radius:8px;
			background: #efefef;
			position:relative;
			transition:all .3s ease;
			border:2px solid #e9e9e9;

			&.active, &:hover{
				border-color: rgba(195, 224, 251, .5);
				background: rgba(195, 224, 251, .2);
			}
			
			*{transition: all .3s ease;}
			h2{color:#333;}
			span.fa{font-size:38px;display:block;margin-bottom:12px;}

			.btn-importar{background: #3897f0;padding: 12px 32px;border-radius: 36px;font-size: 13px;color: #fff;text-transform: uppercase;}
		}

		label{
			cursor: pointer;
			display: block;
			width: 100%;
			position: relative;

			input{
				width: 0;
				height: 0;
				position:absolute;
			}
		}
	}
</style>