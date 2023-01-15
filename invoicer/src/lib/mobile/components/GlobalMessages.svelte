<script>
	import GlobalMessageStore from '$lib/stores/GlobalMessage';
	import GlobalMessage from './GlobalMessage.svelte';

	$: globalMessages = $GlobalMessageStore;
</script>

<div class="main">
	{#each globalMessages.arr as globalMessage}
		<GlobalMessage {...globalMessage} buttonAction={globalMessage.func} />
	{/each}
</div>

<style>
	.main {
		position: absolute;
		bottom: 30px;
		overflow: hidden;
		width: 100%;
		height: 100px;
	}
</style>
