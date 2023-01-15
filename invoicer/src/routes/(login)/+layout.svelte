<script>
	import GlobalMessage from '$lib/mobile/components/GlobalMessage.svelte';
	import GlobalMessages from '$lib/mobile/components/GlobalMessages.svelte';
	import GlobalMessageStore from '$lib/stores/GlobalMessage';
</script>

<div class="main">
	<slot />
</div>
<GlobalMessages />

<style>
	.main {
		/* width: 100%; */
		height: 100%;
		overflow: hidden;
		user-select: none;
	}
</style>
