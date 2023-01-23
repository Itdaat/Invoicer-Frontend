<script>
	import CreateEntity from '$lib/desktop/components/CreateEntity.svelte';
	import Menu from '$lib/desktop/components/Menu.svelte';
</script>

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
