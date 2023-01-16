<script>
	import { fade } from 'svelte/transition';
	import MobileHeader from '$lib/mobile/components/MobileHeader.svelte';
	import { page } from '$app/stores';
	import GlobalMessages from '$lib/mobile/components/GlobalMessages.svelte';

	// $: showHorizontalMenu = true;
	// $: showHorizontalMenu = !entitiesUrls.filter((url) => url == $page.url.pathname)[0];
	$: showHorizontalMenu = $page.url.pathname == '/mobile';
	// $: alert($page.url.pathname);
</script>

<div class="main" in:fade={{ delay: 200 }} out:fade>
	<div class="header"><MobileHeader {showHorizontalMenu} /></div>
	<slot />
</div>

<GlobalMessages />
<div class="create-entity" in:fade out:fade />

<style>
	.main {
		height: 100%;
		display: grid;
		/* grid-template-rows: auto 1fr; */
		user-select: none;
	}
</style>
