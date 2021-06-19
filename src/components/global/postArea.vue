<template>
	<section :class="{ 'pb-48': postsList.length}">
		<div :class="{container: !isMobileViewport}">
			<div class="d-flex align-items-center justify-content-center mb-48" v-if="gettingPosts && !postsReady">
				<div>
					<loading/>
					<p class="mt-16">Cargando tus posts desde Instagram</p>
				</div>
			</div>
			<div v-if="!postsReady && instagramExpires">
				<support type="info" :dismiss="true" class="mb-48">
					<p>La sesión de Instagram caducó, por favor vuelve a iniciar sesión.</p>
				</support>
			</div>

			<div class="post-area">
				<div class="cont" ref="cont">
					<draggable :class="[ postsList.length ? 'row total' : '', {extramini: isMobileViewport}]" v-model="postsList" :move="checkMove" @start="drag=true" @end="drag=false">
						<div class="col-4" v-for="(post, index) in postsList" :key="index" @dragstart="checkDrag($event)" :draggable="post.drag" :class="post.drag ? 'draggable' : 'no-draggable'">
							<div class="grid-item" :style="[sizeController, {backgroundImage: 'url(' + post.image + ')' }]" :class="{drag: post.drag}">
								<div class="grid-cont">
									<a href="#" class="delete-item" @click.prevent="confirmDelete(index)" v-if="post.drag">
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

		<transition name="fade">
			<div class="prompt" v-if="prompt">
				<div class="h-100 d-flex align-items-center justify-content-center">
					<div class="cont text-center">
						<span class="f-40 text-white fa fa-trash"></span>
						<div class="w-85 w-sm-100 center">
							<h6 class="heading-4 text-white mt-16">¿Estás seguro que quieres eliminar esta imagen?</h6>
							<p class="f-large text-white">Esta acción no se puede deshacer y si la necesitas, tendrás que subirla nuevamente.</p>
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
				instagramExpires: false,
				instagramStorage: null,
			}
		},
		watch: {
			instagramStorage: function(value){
				// if( !this.$store.getters.loginStatus ){
				if( this.hasStorage ){
					// Si no esta el status activo, buscamos la info
					this.getUserMedia();
				}
			}
		},
		computed: {
			hasStorage: function(){
				let hasStorage = (this.instagramStorage && 'access_token' in this.instagramStorage && 'user_id' in this.instagramStorage);
				return (!this.postsReady && hasStorage);
			},
			postsList: {
				get: function(){
					// Obtenemos la lista del store
					return this.$store.getters.getPosts;
				},
				set: function(posts){
					// Actualizamos cuando movemos
					this.$store.commit('updatePostsList', posts);
				}
			},
			sizeController: function(){
				if( this.ready ){
					let item_width = (this.containerWidth / this.items_per_row) - 20;
					return {
						//width: item_width > 0 ? item_width + 'px' : false,
						height: item_width > 0 ? item_width + 'px' : false
					};
				}
			},
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
			deletePost: function(){
				this.$store.commit('deletePost', this.selected_index);
				this.prompt = false;
				this.selected_index = null;
			},
			cancelDelete: function(){
				this.prompt = false;
				this.selected_index = null;
			},
			setInstagramStorage: function(){
				let storage = localStorage.getItem('instagram').split(',');
				this.instagramStorage = {
					access_token: storage[0],
					user_id: storage[1]
				};
			},
			getUserMedia: function(){
				this.gettingPosts = true;
				this.$axios({
					url: 'https://graph.instagram.com/v11.0/'+ this.instagramStorage.user_id +'/media',
					params: {
						access_token: this.instagramStorage.access_token,
						fields: 'media_url'
					}
				})
				.then(response => {
					let data = response.data;
					let posts = data.data;

					this.$store.dispatch('clearPosts');

					if( posts.length ){
						// Si obtenemos resultados, los recorremos y los agreamos
						posts.reverse();

						// Recorremos los posts
						posts.forEach((item, index) => {
							this.$store.commit('addPost', {image: item.media_url, drag: false});

							if( index === (posts.length-1) ){
								// Llegamos al final
								this.$store.commit('loginStatus', true);
								this.postsReady = true;
								this.gettingPosts = false;
							}
						});
					}
				})
				.catch(error => {
					console.log(error);
					this.gettingPosts = false;
					this.instagramExpires = true;
					this.$store.commit('loginStatus', false);
					localStorage.removeItem('instagram');
				});
			}
		},
		mounted: function(){
			this.ready = true;
			this.containerWidth = this.$refs.cont.offsetWidth;

			// Hacemos la verificación del item
			if( localStorage.getItem('instagram') ){
				this.setInstagramStorage();
			}

			// Resize event para determinar el alto/ancho de las cajas
			window.addEventListener('resize', () => {
				if( typeof this.$refs.cont !== 'undefined' ){
					this.containerWidth = this.$refs.cont.offsetWidth;
				}
			});

			// Agregamos el evento para saber si se agrega la storage en otra ventana
			window.addEventListener('storage', () => {
				if( localStorage.getItem('instagram') ){
					this.setInstagramStorage();
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	.prompt{
		width: 100%;height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		background: rgba(0,0,0,.9);
		z-index: 99;
		backdrop-filter: saturate(180%) blur(20px);
	}

	.grid-item{
		background-size: cover;
		background-position: center;

		&.drag{
			cursor: move;
		}

		.grid-cont{
			width: 100%;
			height: 100%;
			position: relative;
			overflow: hidden;

			&:hover{
				.delete-item{
					opacity:1;
				}
			}

			.from-instagram{
				position: absolute;
				right:10px;
				top: 10px;
				font-size: 32px;
				color: #fff;
			}

			.delete-item{
				position: absolute;
				right: 10px;
				top: 10px;
				background: rgba(0,0,0,.5);
				z-index: 1;
				padding: 8px;
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
</style>