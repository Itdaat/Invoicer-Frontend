<script>
	import { slide } from 'svelte/transition';

	/** @type {boolean} */
	export let animate;
</script>

{#if true}
	<div class="main" in:slide={{ delay: 400 }} out:slide={{ duration: 300 }}>
		<slot />
	</div>
{:else}
	<div class="main">
		<slot />
	</div>
{/if}

<style>
	.main {
		width: 100%;
	}
</style>
