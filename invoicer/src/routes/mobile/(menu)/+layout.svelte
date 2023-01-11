<script>
	import CreateEntity from './../../../lib/mobile/components/CreateEntity.svelte';

	import SliderStore from '$lib/stores/Slides';
	import 'swiper/css';

	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import MobileHeader from '$lib/mobile/components/MobileHeader.svelte';
	import Invoices from '$lib/mobile/pages/Invoices.svelte';
	import Orders from '$lib/mobile/pages/Orders.svelte';
	import { page } from '$app/stores';
	// onMount(() => {
	// });
	// $: slider.slider?.slideTo(slider.activeIndex || 1, 1500);

	const getInitialSlide = () => {
		const fromSearch = Number($page.url.searchParams.get('index'));
		return fromSearch ? fromSearch - 1 : 0;
	};
</script>

<main>
	<div class="header"><MobileHeader /></div>
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
		history={{
			key: 'mobile'
		}}
		initialSlide={getInitialSlide()}
		loop={true}
		on:slideChange={(e) => {
			SliderStore.update((last) => {
				return { ...last, activeIndex: e.detail[0].activeIndex };
			});
		}}
	>
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
		<SwiperSlide>
			<div class="slide">Messages</div>
		</SwiperSlide>
	</Swiper>
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
