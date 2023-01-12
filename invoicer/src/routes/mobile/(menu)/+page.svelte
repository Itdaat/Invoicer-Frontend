<script>
	import SliderStore from '$lib/stores/Slides';
	import 'swiper/css';

	import { page } from '$app/stores';
	import Invoices from '$lib/mobile/pages/Invoices.svelte';
	import Orders from '$lib/mobile/pages/Orders.svelte';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import { removeURLParameter } from '$lib/helpers/url';

	$: slider = $SliderStore;

	const getInitialSlide = () => {
		// const fromSearch = $page.url.searchParams.get('index');
		// if (fromSearch !== null) {
		// 	const index = fromSearch !== null ? Number(fromSearch) : 1;
		// 	slider.activeIndex = index;
		// 	return index;
		// }
		return slider.activeIndex || 1;
	};
</script>

<div class="main">
	<Swiper
		class="swiper"
		on:swiper={(e) => {
			const detail = e.detail;
			if (typeof detail != 'undefined') {
				SliderStore.update((last) => {
					return { ...last, slider: detail[0] };
				});
			}
		}}
		slidesPerView={1}
		initialSlide={getInitialSlide()}
		on:slideChange={(e) => {
			SliderStore.update((last) => {
				return { ...last, activeIndex: e.detail[0].activeIndex };
			});
		}}
	>
		<SwiperSlide>
			<div class="slide">Messages</div>
		</SwiperSlide>
		<SwiperSlide>
			<div class="slide">
				<Invoices />
			</div>
		</SwiperSlide>
		<SwiperSlide>
			<div class="slide">
				<Orders />
			</div>
		</SwiperSlide>
		<SwiperSlide>
			<div class="slide">Payments</div>
		</SwiperSlide>
		<SwiperSlide>
			<div class="slide">hello</div>
		</SwiperSlide>
	</Swiper>
</div>

<style>
	.main {
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
