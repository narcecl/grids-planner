<template>
	<div>
		<section class="section-clean pt-92">
			<div class="container">
				<div class="row total justify-content-between">
					<div class="col-12 col-sm-6">
						<h1 class="heading-2 w-100 w-sm-80 mb-8" :class="{ 'text-white': $store.getters.isDarkMode }">
							Organiza de forma visual tu feed de Instagram
						</h1>
						<p class="f-large text-muted">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
							quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat.
						</p>

						<div class="btn-holder mt-32">
							<btn href="app" @click="$router.push({name: 'app'})" text="Empezar" icon="chevron-right" position="right"/>
						</div>
					</div>
					<div class="col-12 col-sm-4">
						<figure class="full">
							<img :src="`${this.path.assets}/images/iphone-1.png`" alt="Imagen">
						</figure>
					</div>
				</div>
			</div>
		</section>

		<section class="section-clean pt-92 bg-secondary">
			<div class="container">
				<div class="row total justify-content-between">
					<div class="col-12 col-sm-4">
						<figure class="full">
							<img :src="`${this.path.assets}/images/iphone-1.png`" alt="Imagen">
						</figure>
					</div>
					<div class="col-12 col-sm-6">
						<h1 class="heading-2 w-100 w-sm-80 mb-8" :class="{ 'text-white': $store.getters.isDarkMode }">
							Busca las imágenes entre tus archivos para empezar
						</h1>
						<p class="f-large text-muted">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
							quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat.
						</p>
					</div>
				</div>
			</div>
		</section>

		<section class="section-clean pt-92">
			<div class="container">
				<div class="row total justify-content-between">
					<div class="col-12 col-sm-6">
						<h1 class="heading-2 w-100 w-sm-80 mb-8" :class="{ 'text-white': $store.getters.isDarkMode }">
							Ordena fácilmente tus post arrastrando y soltando
						</h1>
						<p class="f-large text-muted">
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
							tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
							quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat.
						</p>
					</div>
					<div class="col-12 col-sm-4">
						<figure class="full">
							<img :src="`${this.path.assets}/images/iphone-1.png`" alt="Imagen">
						</figure>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
