<script>
	import CreateEntity from './../../../lib/mobile/components/CreateEntity.svelte';

	import SliderStore from '$lib/stores/Slides';
	import 'swiper/css';

	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import MobileHeader from '$lib/mobile/components/MobileHeader.svelte';
	import Invoices from '$lib/mobile/pages/Invoices.svelte';
	import Orders from '$lib/mobile/pages/Orders.svelte';
	import MobileHeaderMedium from '$lib/mobile/components/MobileHeaderMedium.svelte';
</script>

<main>
	<div class="header"><MobileHeaderMedium /></div>
</main>

<CreateEntity />

<style>
	main {
		height: 100vh;
		display: grid;
		grid-template-rows: 106px 1fr;
		user-select: none;
	}

	body {
		background: #eee;
		font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
		font-size: 14px;
		color: #000;
		margin: 0;
		padding: 0;
	}

	:global(.swiper) {
		width: 100%;
		height: 88vh;
	}

	:global(.swiper-slide) {
		overflow-y: scroll;
	}

	.pages-container {
		overflow-y: scroll;
	}

	.slide {
		padding-bottom: 20px;
	}
</style>
