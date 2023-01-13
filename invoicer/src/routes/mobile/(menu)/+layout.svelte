<script>
	import { fade } from 'svelte/transition';
	import CreateEntity from './../../../lib/mobile/components/CreateEntity.svelte';
	import MobileHeader from '$lib/mobile/components/MobileHeader.svelte';
	import { page } from '$app/stores';

	// $: showHorizontalMenu = true;
	// $: showHorizontalMenu = !entitiesUrls.filter((url) => url == $page.url.pathname)[0];
	$: showHorizontalMenu = $page.url.pathname == '/mobile';
	// $: alert($page.url.pathname);
</script>

<div class="main" in:fade={{ delay: 200 }} out:fade>
	<div class="header"><MobileHeader {showHorizontalMenu} /></div>
	<slot />
</div>

<div class="create-entity" in:fade out:fade>
	<CreateEntity />
</div>

<style>
	.main {
		height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;
		user-select: none;
	}
</style>
