<template>
	<a href="#" title="Alternar modo oscuro" @click.prevent="toggleDark" :class="{ dark: this.$store.getters.isDark }">
		<span class="fa" :class="classController"></span>
	</a>
</template>

<script>
	export default{
		computed: {
			classController: function(){
				return ( this.$store.getters.getTheme === 'dark' ) ? 'fa-sun-o' : 'fa-moon-o';
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
	a{
		// position: fixed;
		// right: 30px;
		// top: 24%;
		border-radius: 100%;
		font-size: 30px;
		transition: all .3s ease;
		background:#333;
		color:#fff;
		width: 30px;
		height: 30px;
		text-align: center;
	}
</style>