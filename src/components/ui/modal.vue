<template>
	<transition name="fade">
		<div class="s-modal h-100" :class="{ full: full }" v-if="value" @click="closed">
			<div class="s-modal-box h-100">
				<div class="close-section text-right">
					<a class="hover-opacity d-inline-block" href="#" @click.prevent="closeModal" aria-label="Ocultar modal">
						<span class="fa fa-close f-28 text-white" aria-hidden="true"></span>
					</a>
				</div>

				<div class="h-100" :class="{container: !full}">
					<div class="h-100" :class="[!full ? 'd-flex align-items-center' : '']">
						<div class="modal-content p-0 w-100 d-flex justify-content-center align-items-center">
							<div class="modal-box" ref="modal_box">
								<div class="modal-box box-shadow box-radius bg-white" v-if="!multimedia">
									<main :style="[limitHeight]" :class="notPadding ? 'no-padds' : '' ">
										<div class="s-modal-content">
											<slot name="main"></slot>
										</div>
									</main>
								</div>
								<div class="modal-custom-multimedia" v-else>
									<slot name="main"></slot>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	props:{
		value: { type: Boolean, default: false },
		size: { type: [String, Number], default: 6 },
		title: { type: String, default: '' },
		notPadding: { type: Boolean, default: false },
		multimedia: { type: Boolean, default: false },
		full: { type: Boolean, default: false }
	},
	computed: {
		modalSize: function(){
			return this.full ? 'w-100' : 'p-0 col-12 col-sm-9 col-lg-' + this.size;
		},
		limitHeight: function(){
			let max = this.footerHasContent ? this.window_height * 40 / 100 : this.window_height * 70 / 100;

			return {
				// Retornamos los estilos
				maxHeight: !this.full ? max + 'px' : 'none',
				overflow: 'auto',
				header: this.header
			};
		}
	},
	methods:{
		closeModal: function(){
			// Actualizamos el v-model
			this.$emit('input', false);

			// Devolvemos el overflow al body
			this.$store.dispatch('toggleOverflow', false);

			// Eliminamos el evento de cerrar con tecla ESC
			this.rmEscEvent();
		},
		closed: function(event){
			let parentModal = null,
				parents = this.$methods.getParents(event.target, '.s-modal');
			
			parents.forEach( item => {
				// Si el modal box se encuentra dentro de la lista de elementos padres,
				// asignamos la variable
				if( item === this.$refs.modal_box ) parentModal = true;
			});

			if( parentModal === null ){
				// Si no es el s-modal-box ni tampoco es el el contenido, cerramos
				this.closeModal();
			}
		},
		closeModalByEsc: function(e){
			// Verificamos si se presionó la tecla ESC para cerrar la modal
			if( e.keyCode === 27 ){
				// Si es asi, la cerramos
				this.closeModal();
			}
		},
		addEscEvent: function(){
			// Agregamos el evento keyup para cerrar la modal
			window.addEventListener('keyup', this.closeModalByEsc);
		},
		rmEscEvent: function(){
			// Eliminamos el evento keyup para cerrar la modal
			window.removeEventListener('keyup', this.closeModalByEsc);
		}
	},
	updated: function(){
		if( this.value ) {
			// Si la variable es true (esta abierto) quitamos el overflow del body
			this.$store.dispatch('toggleOverflow', true);

			// Agregamos el evento de cerrar con tecla ESC
			this.addEscEvent();
		}
	}
}
</script>

<style lang="scss">
.s-modal{
	width: 100%;
	position: fixed;
	top: 0;
	left:0;
	right:0;
	bottom:0;
	background: rgba(#000, .7);
	backdrop-filter: saturate(180%) blur(20px);
	z-index: 100;

	&.full{
		.modal-content{
			height: 100%;
			> div, .modal-box{height:100%;}
			.modal-box{
				main{
					height: 100%;
					&.header{
						height: calc(100% - 70px);
					}
				}
			}
		}
	}

	.s-modal-box{
		.close-section{
			position: absolute;
			right: 16px;
			top: 16px;
		}

		.modal-content{
			width: 100%;
			margin: 0 auto;
			position: relative;
			padding: 0;

			.modal-box {
				header{
					padding: 16px;

					#close_inner_modal{
						display: block;
						& > * {
							pointer-events: none;
						}
					}
				}
				main{
					padding: 16px 70px;
					padding-bottom: 0 !important;
					box-sizing:border-box;

					.iframe-container{
						iframe{width:100%;}
					}
				}
				div > footer{
					flex-flow: row wrap;
					justify-content: center;
					padding: 16px;
				}

				.s-modal-content{
					margin-bottom: 16px;
				}
			}
		}

		@media screen and (max-width: $break-md ){
			.modal-content{
				min-width:0 !important;
				.modal-box {
					> main {
						padding:16px;
					}
					> div > footer {
						display: flex;
						flex-flow: column wrap;
					}
				}
			}
		}
	}
}

.no-padds {
	margin: 0 !important;
	padding: 0 !important;
}
</style>