<script>
	import { page } from '$app/stores';
	import MainPageTemplate from '$lib/desktop/templates/MainPageTemplate.svelte';
	import { slide, fade, fly } from 'svelte/transition';

	$: path = $page.params.id;
</script>

<MainPageTemplate>{path}</MainPageTemplate>

<style>
	.content {
		font-family: 'Istok Web';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 23px;
		/* identical to box height */

		display: flex;
		align-items: center;
		justify-content: center;
		letter-spacing: 1px;

		color: rgba(61, 90, 128, 0.5);
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
</style>
