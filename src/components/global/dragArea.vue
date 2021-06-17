<template>
	<section class="section">
		<div class="container">
			<div class="drag-area">
				<label for="images" @drop.prevent="handleDrop" @dragover.prevent @dragenter.prevent>
					<div class="drag-cont">
						<span class="fa fa-picture-o"></span>
						<h2 class="mb-4 fw-semibold">Empieza a crear tu feed</h2>
						<p class="w-100 w-sm-35 center">Arrastra tus imágenes o haz clic aquí para buscarlas entre tus archivos.</p>
					</div>
					<input type="file" ref="file" id="images" multiple accept="image/x-png,image/gif,image/jpeg" @change="handleFile">
				</label>
			</div>
		</div>
	</section>
</template>

<script>
	export default{
		name: 'dragArea',
		data: function(){
			return {};
		},
		methods: {
			addPost: function(items){
				// Agregamos el nuevo item al store
				Array.from(items).forEach(item => this.$store.commit('addPost', URL.createObjectURL(item)) );
			},
			handleFile: function(e){
				// Si encontramos un archivo, lo agregamos
				if( e.target.files.length ) this.addPost(e.target.files);
			},
			handleDrop: function(e){
				// Si dejamos un archivo, lo agregamos
				if( e.dataTransfer.files.length ) this.addPost(e.dataTransfer.files);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dark{
		.drag-area{
			.drag-cont{
				background: #333;
				*{color: #fff;}
			}
		}
	}

	.drag-area{
		.drag-cont{
			text-align: center;
			padding:32px;
			border-radius:16px;
			background:#efefef;
			position:relative;
			transition:all .3s ease;
			border:2px solid transparent;

			&.active, &:hover{
				border-color: rgba(195, 224, 251, .5);
				background: rgba(195, 224, 251, .2);
			}
			
			*{transition: all .3s ease;}
			h2{font-size:18px;color:#333;}
			span{font-size:38px;display:block;margin-bottom:16px;color:#555;}

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