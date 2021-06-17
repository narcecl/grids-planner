<template>
	<div>
		<mainHeader/>

		<dragArea/>
		<postArea/>

		<mainFooter/>
	</div>
</template>

<script>
import mainHeader from '@/components/global/mainHeader.vue';
import dragArea from '@/components/global/dragArea.vue';
import postArea from '@/components/global/postArea.vue';
import mainFooter from '@/components/global/mainFooter.vue';

export default {
	name: 'Home',
	components: {
		mainHeader,
		dragArea,
		postArea,
		mainFooter
	}
}
</script>
