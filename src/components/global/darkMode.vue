<template>
	<div class="dark-mode-btn">
		<a href="#" class="hover-opacity" :title="titleText" @click.prevent="toggleDark" :class="{ dark: this.$store.getters.isDark }">
			<span class="fa" :class="classController"></span>
		</a>
	</div>
</template>

<script>
	export default{
		computed: {
			classController: function(){
				return ( this.$store.getters.getTheme === 'dark' ) ? 'fa-sun' : 'fa-moon';
			},
			titleText: function(){
				return 'Activar modo ' + ( this.$store.getters.getTheme === 'dark' ? 'claro' : 'oscuro');
			}
		},
		methods: {
			toggleDark: function(){
				this.$store.commit('toggleTheme');
			}
		}
	}
</script>

<style lang="scss" scoped>
.dark-mode-btn{
	padding-left:32px;
	margin-left:32px;
	border-left:solid 1px rgba(255,255,255,.5);

	a{
		border-radius: 100%;
		font-size: 32px;
		transition: all .3s ease;
		background:#333;
		color:#fff;
		width: 32px;
		height: 32px;
		display: block;
		text-align: center;
	}
}
</style>