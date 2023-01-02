<script>
	import { fly } from 'svelte/transition';
	import ActiveLinkIcon from './../assets/icons/ActiveLinkIcon.svelte';
	import SphereIcon from './../assets/icons/SphereIcon.svelte';
	import SliderStore from '$lib/stores/Slides';
	import { flush } from 'svelte/internal';

	export let index = 0;
	export let marked = false;
	export let active = false;
	// alert(active);

	$: swiper = $SliderStore;
	// console.log(swiper.activeIndex);
</script>

<div class="global-container">
	<div class="container">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class:active
			class="link"
			on:click={() => {
				swiper.activeIndex = index;
				SliderStore.update((last) => {
					return { ...last, activeIndex: index };
				});
				swiper.slider.slideTo(index);
			}}
		>
			<slot />
		</div>
		{#if marked}
			<SphereIcon />
		{/if}
	</div>
	{#if active}
		<div class="icon-container" in:fly={{ y: -1, duration: 200 }} out:fly={{ y: 2 }}>
			<ActiveLinkIcon />
		</div>
	{/if}
</div>

<style>
	.container {
		display: flex;
		align-items: flex-start;
	}

	.link {
		text-decoration: none;
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;
		/* identical to box height */

		letter-spacing: 1px;

		color: #284b63;
	}

	.active {
	}
</style>
