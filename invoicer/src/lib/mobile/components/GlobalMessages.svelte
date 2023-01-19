<script>
	import GlobalMessageStore from '$lib/stores/GlobalMessage';
	import GlobalMessage from './GlobalMessage.svelte';

	$: globalMessages = $GlobalMessageStore;
</script>

{#if globalMessages.arr.length > 0}
	<div class="main">
		{#each globalMessages.arr as globalMessage}
			<GlobalMessage {...globalMessage} buttonAction={globalMessage.func} />
		{/each}
	</div>
{/if}

<style>
	.main {
		position: absolute;
		display: flex;
		align-items: center;
		bottom: 30px;
		overflow: hidden;
		width: 100%;
		min-height: 100px;
	}
</style>
