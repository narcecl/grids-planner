<template>
	<a class="btn" :class="classController" href="#" @click.prevent="emitEvent">
		<span class="fa" :class="'fa-' + icon" v-if="icon"></span>
		{{ text }}
	</a>
</template>

<script>
	export default{
		props: {
			type: { type: String, default: 'primary' },
			text: { type: String, default: '' },
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

		&.primary{
			border-color: rgba(195, 224, 251, .5);
			background: rgba(195, 224, 251, .2);
			padding: 12px 32px;
			border-radius: 26px;
			color: #fff;
		}

		.fa{
			margin-right: 6px;
			vertical-align: middle;
			font-size: 18px;
		}
	}
</style>