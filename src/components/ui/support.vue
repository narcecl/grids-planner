<template>
	<transition name="fade">
		<div class="support" :class="type" v-if="enable">
			<div class="d-flex align-items-center justify-content-between">
				<div class="d-flex align-items-center w-100">
					<span :class="selectedIcon" class="support-icon f-28 mr-16"></span>
					<slot></slot>
				</div>
				<a href="#" class="close hover-opacity" v-if="dismiss" @click.prevent="hide">
					<span class="f-20 fa fa-close"></span>
				</a>
			</div>
		</div>
	</transition>
</template>

<script>
	export default{
		props: {
			type: {type: String, default: 'info'},
			icon: {type: String, default: 'fa fa-home'},
			dismiss: {type: Boolean, default: false}
		},
		data: function(){
			return {
				enable: true
			};
		},
		computed: {
			selectedIcon: function(){
				switch (this.type){
					case 'info':
						return 'fa fa-info-circle';
						break;
					case 'warning':
						return 'fa fa-exclamation-circle';
						break;
					case 'error':
						return 'fa fa-times-circle';
						break;
				}
			}
		},
		methods: {
			hide: function(){
				this.enable = false;
			}
		}
	}
</script>

<style lang="scss">
	// .dark{
	// 	.support{
	// 		&.info{
	// 			background:rgba(195, 224, 251, .5);
	// 		}
	// 	}
	// }

	.support{
		padding:16px;
		border-radius:8px;
		border:1px solid transparent;

		.close span{color:#444;}

		&.info{
			background:#cce4fd;
			border-color:#c1ddfa;
			p{color:#444}
			.support-icon{color:#265c96}
		}

		&.warning{
			background:#fef1ce;
			border-color:#f6e4b8;
			p{color:#444}
			.support-icon{color:#9e823d}
		}

		&.error{
			background:#f6d7d9;
			border-color:#f0cdd1;
			p{color:#444}
			.support-icon{color:#853942}
		}
	}
</style>