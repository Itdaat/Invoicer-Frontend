<script>
	import { fade, fly } from 'svelte/transition';
	import CreateEntity from '../../../../lib/mobile/components/CreateEntity.svelte';
	import MobileHeader from '$lib/mobile/components/MobileHeader.svelte';
	import { page } from '$app/stores';
	import GlobalMessages from '$lib/mobile/components/GlobalMessages.svelte';
	import { onMount } from 'svelte';
	import FilterStore from '$lib/stores/FilterStore';

	// $: showHorizontalMenu = true;
	// $: showHorizontalMenu = !entitiesUrls.filter((url) => url == $page.url.pathname)[0];
	$: showHorizontalMenu = $page.url.pathname == '/mobile';
	// onMount(() => {
	// 	FilterStore.set({});
	// });
	// $: alert($page.url.pathname);
</script>

<div class="main" in:fade={{ duration: 200, delay: 350 }} out:fade={{ duration: 200 }}>
	<div class="header"><MobileHeader {showHorizontalMenu} /></div>
	<slot />
</div>
<GlobalMessages />

<div class="create-entity" in:fade out:fade>
	<CreateEntity />
</div>

<style>
	.main {
		height: 100%;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: auto 1fr;
		user-select: none;
		/* overflow-y: scroll; */
	}
</style>
