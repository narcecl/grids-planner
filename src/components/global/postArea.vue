<template>
	<section class="pt-4" :class="{ 'pb-48': postsList.length }">
		<div :class="{container: !isMobileViewport}">
			<div class="post-area">
				<div class="cont" ref="cont">
					<draggable class="row total" :class="{extramini: isMobileViewport}" v-model="postsList" @start="drag=true" @end="drag=false">
						<div class="col-4" v-for="(post, index) in postsList" :key="index">
							<div class="grid-item" :style="[sizeController, {backgroundImage: 'url(' + post.image + ')' }]">
								<div class="grid-cont">
									<a href="#" class="delete-item" @click.prevent="confirmDelete(index)">
										<span class="fa fa-trash"></span>
									</a>
								</div>
							</div>
						</div>
					</draggable>
				</div>

				<loading v-if="!ready && instagramStorage"/>

				<transition name="fade">
					<div class="prompt" v-if="prompt">
						<div class="h-100 d-flex align-items-center justify-content-center">
							<div class="cont text-center">
								<h6 class="heading-4 text-white">¿Estás seguro que quieres eliminar esta imagen?</h6>
								<p class="f-large text-white">Esta acción no se puede deshacer y si la necesitas, tendrás que subirla de nuevo.</p>

								<div class="btn-holder mt-32">
									<btn @click="deletePost" text="Aceptar"/>
									<btn @click="cancelDelete" text="Cancelar"/>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</section>
</template>

<script>
	import draggable from 'vuedraggable';
	import btn from '@/components/ui/button.vue';

	export default{
		components: {
			btn,
			draggable
		},
		data: function(){
			return {
				prompt: false,
				selected_index: null,
				ready: false,
				items_per_row: 3,
				item_width: null,
				containerWidth: 0,
				ready: false,
				instagramStorage: null
			}
		},
		watch: {
			instagramStorage: function(value){
				this.getUserMedia();
			}
		},
		computed: {
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
			getUserMedia: function(){
				this.$axios({
					url: 'https://graph.instagram.com/v11.0/'+ this.instagramStorage.user_id +'/media',
					params: {
						access_token: this.instagramStorage.access_token,
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
								// Llegamos al final
								this.ready = true;
								// window.close();
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
			//console.log('posts =>', this.$store.getters.getPosts);
		},
		mounted: function(){
			this.ready = true;
			this.containerWidth = this.$refs.cont.offsetWidth;

			// Hacemos la verificación del item
			if( localStorage.getItem('instagram') ){
				let storage = localStorage.getItem('instagram').split(',');
				this.instagramStorage = {
					access_token: storage[0],
					user_id: storage[1]
				};
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
					// Si existe la actualizamos
					let storage = localStorage.getItem('instagram').split(',');
					this.instagramStorage = {
						access_token: storage[0],
						user_id: storage[1]
					};
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
		background: rgba(0,0,0,.8);
		z-index: 99;
		backdrop-filter: saturate(180%) blur(20px);
	}

	.grid-item{
		cursor: move;
		background-size: cover;
		background-position: center;

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