<template>
	<div>
		<mainHeader/>

		<main>
			<section class="pt-92 special">
				<div class="container">
					<div class="row justify-content-between">
						<div class="col-12 col-sm-6">
							<h1 class="heading-2 w-100 w-sm-80 mb-8" :class="{ 'text-white': $store.getters.isDarkMode }">
								Organiza de forma visual tu feed de Instagram
							</h1>
							<p class="f-large" :class="{ 'text-white': $store.getters.isDarkMode }">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat.
							</p>

							<div class="btn-holder mt-32">
								<btn href="app" @click="$router.push('/app')" text="Empezar"/>
							</div>
						</div>
						<div class="col-12 col-sm-4">
							<figure class="full">
								<img src="assets/images/iphone-1.png">
							</figure>
						</div>
					</div>
				</div>
			</section>

			<section class="pt-92 special bg-secondary">
				<div class="container">
					<div class="row justify-content-between">
						<div class="col-12 col-sm-4">
							<figure class="full">
								<img src="assets/images/iphone-1.png">
							</figure>
						</div>
						<div class="col-12 col-sm-6">
							<h1 class="heading-2 w-100 w-sm-80 mb-8" :class="{ 'text-white': $store.getters.isDarkMode }">
								Ordena fácilmente tus post mediante drag and drop
							</h1>
							<p class="f-large" :class="{ 'text-white': $store.getters.isDarkMode }">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
								tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
								consequat.
							</p>
						</div>
					</div>
				</div>
			</section>
		</main>

		<mainFooter/>
	</div>
</template>

<script>
import mainHeader from '@/components/global/mainHeader.vue';
import mainFooter from '@/components/global/mainFooter.vue';

export default {
	name: 'Home',
	components: {
		mainHeader,
		mainFooter
	}
}
</script>
