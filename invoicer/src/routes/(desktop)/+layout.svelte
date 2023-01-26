<script>
	import { getCurrentFirmId } from '$lib/api/server/firm';
	import CreateEntity from '$lib/desktop/components/CreateEntity.svelte';
	import CreateFirm from '$lib/desktop/components/firm/CreateFirm.svelte';
	import Menu from '$lib/desktop/components/Menu.svelte';

	const firmId = getCurrentFirmId();
	const firm = JSON.parse(localStorage.getItem('firm') || '{}');

	let showCreateFirm = !firm || firm.error;
</script>

{#if showCreateFirm}
	<CreateFirm showFirm={showCreateFirm} />
{/if}
<div class="main">
	<Menu />
	<div class="list-container"><slot /></div>
	<!-- <div class="data"><slot /></div> -->
</div>
<CreateEntity />

<style>
	.main {
		display: grid;
		grid-template-columns: minmax(10%, 250px) 5fr;
		height: 100vh;
	}
</style>
