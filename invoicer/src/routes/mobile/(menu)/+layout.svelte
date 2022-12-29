<script>
	import MobileHeader from '$lib/mobile/components/MobileHeader.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<MobileHeader userId={data.userId} />
<slot />

<style>
</style>
