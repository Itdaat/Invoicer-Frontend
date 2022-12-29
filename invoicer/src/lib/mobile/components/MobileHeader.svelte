<script>
	import FirmStore from '$lib/stores/Store';
	import OpenFilterButton from './../../assets/icons/OpenFilterButton.svelte';
	import OpenMenuIcon from './../../assets/icons/OpenMenuIcon.svelte';
	import MobileHeaderMenu from './MobileHeaderMenu.svelte';
	$: firm = $FirmStore;
	console.log(firm);
</script>

<div class="container">
	<div class="top-panel">
		<div class="menu"><OpenMenuIcon /></div>
		<div class="title">{''}</div>
		<div class="filter"><OpenFilterButton /></div>
	</div>
	<div class="pages-menu-horizontal">
		<MobileHeaderMenu />
	</div>
</div>

<style>
	.container {
		padding: 20px;
	}

	.top-panel {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
</style>
