<script>
	import { fly } from 'svelte/transition';
	import ActiveLinkIcon from './../assets/icons/ActiveLinkIcon.svelte';
	import SphereIcon from './../assets/icons/SphereIcon.svelte';
	import SliderStore from '$lib/stores/Slides';

	export let index = 0;
	export let marked = false;
	export let active = false;

	$: swiper = $SliderStore;
</script>

<div class="container">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class:active
		class="link"
		on:click={() => {
			swiper.slider?.slideTo(index);
		}}
	>
		<slot />
	</div>
	{#if marked}
		<div class="sphere-icon">
			<SphereIcon />
		</div>
	{/if}
	{#if active}
		<div class="icon-container" in:fly={{ duration: 200 }} out:fly={{ duration: 200, y: 2 }}>
			<ActiveLinkIcon />
		</div>
	{/if}
</div>

<style>
	.container {
		display: grid;
		grid-template-areas:
			'main icon'
			'activeIcon icon';
		grid-template-columns: auto auto;
		align-items: flex-start;
		margin-bottom: -10px;
	}

	.sphere-icon {
		grid-area: icon;
		display: flex;
		align-items: flex-start;
		margin-left: 3px;
		margin-bottom: 5px;
	}

	.link {
		grid-area: main;
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

	.icon-container {
		grid-area: activeIcon;
		margin-top: -5px;
		margin-bottom: -7px;
		/* max-width: 20px; */
		height: 10px;
	}
</style>
