<script>
	import { fly } from 'svelte/transition';
	/**
	 * @type {URL}
	 */
	export let url;
	export let pageTransitionDuration = 250;
</script>

{#key url}
	<div
		in:fly={{ x: -5, duration: pageTransitionDuration, delay: pageTransitionDuration - 50 }}
		out:fly={{ x: 5, duration: pageTransitionDuration }}
	>
		<slot />
	</div>
{/key}
