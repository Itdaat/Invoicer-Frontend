<script>
	import SphereIcon from './../assets/icons/SphereIcon.svelte';
	import { page } from '$app/stores';

	export let href = '';
	export let marked = false;
	$: active = $page.url.href.includes(href);
</script>

<div class="container">
	<a {href} class:active class="link"><slot /></a>
	{#if marked}
		<SphereIcon />
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
