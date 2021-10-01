<template>
	<section :class="{ 'pb-48': postsList.length}">
		<div :class="{container: !isMobileViewport}">
			<div class="d-flex align-items-center justify-content-center mb-48" v-if="gettingPosts && !postsReady">
				<div>
					<loading/>
					<p class="mt-16">Cargando tus posts desde Instagram...</p>
				</div>
			</div>

			<!-- <div v-if="!postsReady && instagramExpires">
				<support type="info" :dismiss="true" class="mb-48">
					<p>La sesión de Instagram caducó, por favor vuelve a iniciar sesión.</p>
				</support>
			</div> -->

			<div class="post-area" :class="{ 'w-posts': postsList.length, mobile: isMobileViewport }">
				<div :class="{container: isMobileViewport}">
					<support type="info" :dismiss="true" class="mb-32" v-if="hasPost >= 9">
						<p>
							Esta aplicación <mark>aún está en desarrollo</mark>, por lo que las imágenes que has cargado podrían dejar de estar disponible aquí cuando cierres tu navegador.<br>
							Para que no pierdas tu trabajo, te recomendamos ocuparla para organizar tu feed en un corto plazo.
						</p>
					</support>
				</div>

				<div class="cont" ref="cont">
					<draggable :class="[ postsList.length ? 'row total' : '', {extramini: isMobileViewport}]" v-model="postsList" :move="checkMove" @start="drag = true" @end="drag = false">
						<div class="col-4" v-for="(post, index) in postsList" :key="index" @dragstart="checkDrag($event)" :draggable="post.drag" :class="post.drag ? 'draggable' : 'no-draggable'">
							<div class="grid-item" :style="[sizeController, {backgroundImage: 'url(' + post.image + ')' }]" :class="{drag: post.drag}">
								<div class="grid-cont">
									<a href="#" class="control-item view-post" title="Ver imagen" @click.prevent="showModal(post.image)" v-if="post.drag">
										<span class="fa fa-eye"></span>
									</a>
									<a href="#" class="control-item delete-post" title="Eliminar imagen" @click.prevent="confirmDelete(index)" v-if="post.drag">
										<span class="fa fa-trash"></span>
									</a>
									<span v-else class="from-instagram fa fa-instagram"></span>
								</div>
							</div>
						</div>
					</draggable>
				</div>
			</div>
		</div>

		<modal v-model="modal" :multimedia="true" size="12">
			<template slot="main">
				<div class="preview-image" :style="limitPreview">
					<figure :style="limitPreview">
						<img :src="modalImg" alt="Imagen subida">
					</figure>
				</div>
			</template>
		</modal>

		<transition name="fade">
			<div class="prompt" v-if="prompt">
				<div class="h-100 d-flex align-items-center justify-content-center">
					<div class="cont text-center">
						<span class="f-40 text-white fa fa-trash"></span>
						<div class="w-85 w-sm-100 center">
							<h6 class="heading-5 text-white mt-16 mb-4">¿Estás seguro que quieres eliminar esta imagen?</h6>
							<p class="f-medium w-100 w-sm-60 center text-white">Esta acción no se puede deshacer. Si necesitas la imagen tendrás que subirla nuevamente.</p>
						</div>

						<div class="btn-holder mt-32">
							<btn @click="deletePost" text="Aceptar"/>
							<btn @click="cancelDelete" text="Cancelar" type="secondary"/>
						</div>
					</div>
				</div>
			</div>
		</transition>
	</section>
</template>

<script>
	export default{
		data: function(){
			return {
				prompt: false,
				selected_index: null,
				ready: false,
				items_per_row: 3,
				item_width: null,
				containerWidth: 0,
				postsReady: false,
				gettingPosts: false,
				modal: false,
				modalImg: null
			}
		},
		computed: {
			hasPost: function(){
				return this.$store.getters.hasPosts;
			},
			postsList: {
				get: function(){
					// Obtenemos la lista del store + posts de insta (si es que hay)
					return this.$store.getters.getPosts.concat(this.$store.getters.getInstaPosts);
				},
				set: function(posts){
					// Actualizamos la lista de posts cuando movemos
					this.$store.commit('updatePostsList', posts);
				}
			},
			sizeController: function(){
				if( this.ready ){
					let item_width = (this.containerWidth / this.items_per_row) - 20;

					return {
						height: item_width > 0 ? item_width + 'px' : false
					};
				}
			},
			limitPreview: function(){
				// Obtenemos el alto maximo de la ventana (para la modal preview)
				return {
					overflow: 'auto',
					maxHeight: `${ this.window_height * 80 / 100 }px`
				};
			}
		},
		methods: {
			checkMove: function(evt){
				if( evt.related.classList.contains('no-draggable') ){
					return false;
				}
			},
			checkDrag: function(event){
				if( event.target.classList.contains('no-draggable') ){
					event.preventDefault();
					return false;
				}
			},
			confirmDelete: function(index){
				this.selected_index = index;
				this.prompt = true;
			},
			showModal: function(image){
				this.modalImg = image;
				this.modal = true;
			},
			deletePost: function(){
				this.$store.commit('deletePost', this.selected_index);
				this.prompt = false;
				this.selected_index = null;
			},
			cancelDelete: function(){
				this.prompt = false;
				this.selected_index = null;
			},
		},
		mounted: function(){
			this.ready = true;
			this.containerWidth = this.$refs.cont.offsetWidth;

			// Resize event para determinar el alto/ancho de las cajas
			window.addEventListener('resize', () => {
				if( typeof this.$refs.cont !== 'undefined' ){
					this.containerWidth = this.$refs.cont.offsetWidth;
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
.preview-image{
	figure{
		img{
			max-width: 100%;
			display: block;
			height: auto;
			max-height: inherit;
			margin: 0 auto;
		}
	}
}
.dark{
	.post-area.w-posts{
		border-color: #333;
	}
}
.post-area{
	&.w-posts{
		padding-top:48px;
		transition:border-color .3s ease;
		border-top:1px solid #e9e9e9;
	}

	&.mobile{
		.grid-item{
			border-radius:0;
		}
	}

	.grid-item{
		background-size: cover;
		background-position: center;
		border-radius:8px;

		&.drag{
			cursor: move;
		}

		&:hover{
			.grid-cont{
				.control-item{
					opacity: 1;
				}
			}
		}

		.grid-cont{
			width: 100%;
			height: 50px;
			position: relative;
			overflow: hidden;

			.from-instagram{
				position: absolute;
				right:10px;
				top: 10px;
				font-size: 32px;
				color: #fff;
			}

			.control-item{
				position: absolute;
				background: rgba(0,0,0,.5);
				z-index: 1;
				padding: 8px 0;
				color: #fff;
				border-radius: 100%;
				width: 32px;
				height: 32px;
				text-align: center;
				transition: all .3s ease;
				opacity:0;

				&:hover{
					background:rgba(0,0,0,.9);
				}

				&.view-post{
					left: 10px;
					top: 10px;
				}
				&.delete-post{
					right: 10px;
					top: 10px;
				}
			}

			img{
				pointer-events: none;
				position: absolute;
				left: -50%;
				top: -50%;
				bottom: -50%;
				right: -50%;
				margin: auto;
			}
		}
	}
}
</style>