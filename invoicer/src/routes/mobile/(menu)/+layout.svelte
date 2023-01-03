<script>
	import SliderStore from '$lib/stores/Slides';
	import 'swiper/css';

	import { History, Navigation, A11y } from 'swiper';
	import { Swiper, SwiperSlide } from 'swiper/svelte';
	import MobileHeader from '$lib/mobile/components/MobileHeader.svelte';
	import Invoices from '$lib/mobile/pages/Invoices.svelte';
	import Orders from '$lib/mobile/pages/Orders.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<!-- on:swiper={(swiper) => sliders.slideTo(swiper)} -->

<MobileHeader userId={data.userId} />
<Swiper
	class="swiper"
	on:swiper={(e) => {
		SliderStore.update((last) => {
			return { ...last, slider: e.detail[0] };
		});
	}}
	slidesPerView={1}
	history={{
		key: 'mobile'
		// root: 'mobile'
	}}
	on:slideChange={(e) => {
		SliderStore.update((last) => {
			return { ...last, activeIndex: e.detail[0].activeIndex };
		});
	}}
	modules={[Navigation, History, A11y]}
>
	<SwiperSlide data-history="invoices">
		<Invoices />
	</SwiperSlide>
	<SwiperSlide data-history="orders">
		<Orders />
	</SwiperSlide>
	<SwiperSlide data-history="payments">
		<Orders />
	</SwiperSlide>
	<SwiperSlide data-history="transactions">
		<Orders />
	</SwiperSlide>
</Swiper>

<style>
	#app {
		height: 100%;
	}
	html,
	body {
		position: relative;
		height: 100%;
	}

	body {
		background: #eee;
		font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
		font-size: 14px;
		color: #000;
		margin: 0;
		padding: 0;
	}

	.swiper {
		width: 100%;
		height: 100%;
	}

	.swiper-slide {
		text-align: center;
		font-size: 18px;
		background: #fff;

		/* Center slide text vertically */
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}
</style>
