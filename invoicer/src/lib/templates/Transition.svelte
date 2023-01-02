<script>
	import { fade, fly, slide } from 'svelte/transition';
	/**
	 * @type {URL}
	 */
	export let url;
</script>

{#key url}
	<main in:slide={{ delay: 250 }} out:slide={{ duration: 250 }} />
{/key}
<slot />
