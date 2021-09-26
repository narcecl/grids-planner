<template>
	<a class="btn" :class="classController" href="#" @click.prevent="emitEvent">
		<span class="fa mr-8" :class="'fa-' + icon" v-if="icon && position ==='left'"></span>
		{{ text }}
		<span class="fa ml-8" :class="'fa-' + icon" v-if="icon && position === 'right'"></span>
	</a>
</template>

<script>
	export default{
		props: {
			type: { type: String, default: 'primary' },
			text: { type: String, default: '' },
			position: { type: String, default: 'left' },
			icon: { type: [String, Boolean], default: false },
		},
		computed: {
			classController: function(){
				return this.type;
			}
		},
		methods: {
			emitEvent: function(){
				this.$emit('click');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn{
		display: inline-block;
		font-size: 14px;
		text-decoration: none;
		padding:12px 32px;
		border-radius: 26px;
		transition: all .3s ease;

		&.primary{
			background: #1769aa;
			color: #fff;

			&:hover{
				background:#114b7a;
			}
		}

		&.secondary{
			background: #555;
			color: #fff;

			&:hover{
				background:#333;
			}
		}

		.fa{
			vertical-align: middle;
			font-size: 18px;

			&.fa-chevron-right, &.fa-chevron-left{
				font-size: 14px;
				line-height: 0;
				vertical-align: initial;
			}
		}
	}
</style>