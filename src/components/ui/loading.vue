<template>
	<div class="sk-cube-grid">
		<div class="sk-cube sk-cube1"></div>
		<div class="sk-cube sk-cube2"></div>
		<div class="sk-cube sk-cube3"></div>
		<div class="sk-cube sk-cube4"></div>
		<div class="sk-cube sk-cube5"></div>
		<div class="sk-cube sk-cube6"></div>
		<div class="sk-cube sk-cube7"></div>
		<div class="sk-cube sk-cube8"></div>
		<div class="sk-cube sk-cube9"></div>
	</div>
</template>

<style lang="scss" scoped>
.sk-cube-grid{
	width: 64px;
	height: 64px;
	margin:0 auto;

	.sk-cube{
		width: 33%;
		height: 33%;
		background-color: #333;
		float: left;
		-webkit-animation:sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
		animation:sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
		transition:all .3s ease;

		&1{-webkit-animation-delay:.2s;animation-delay:.2s}
		&2{-webkit-animation-delay:.3s;animation-delay:.3s}
		&3{-webkit-animation-delay:.4s;animation-delay:.4s}
		&4{-webkit-animation-delay:.1s;animation-delay:.1s}
		&5{-webkit-animation-delay:.2s;animation-delay:.2s}
		&6{-webkit-animation-delay:.3s;animation-delay:.3s}
		&7{-webkit-animation-delay:0;animation-delay:0}
		&8{-webkit-animation-delay:.1s;animation-delay:.1s}
		&9{-webkit-animation-delay:.2s;animation-delay:.2s}
	}
}

.dark{
	.sk-cube-grid{
		.sk-cube{
			background-color: #ccc;
		}
	}
}
</style>