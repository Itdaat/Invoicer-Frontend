<script>
	import { page } from '$app/stores';
	import Transition from './../../../lib/templates/Transition.svelte';
	import MobileHeader from '$lib/mobile/components/MobileHeader.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<MobileHeader userId={data.userId} />
<Transition url={$page.url}>
	<slot />
</Transition>

<style>
</style>
