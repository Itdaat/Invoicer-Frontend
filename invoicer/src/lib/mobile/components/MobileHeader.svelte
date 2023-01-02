<script>
	import { setDefaultFirm } from '$lib/api/CRM/firm';
	import FirmStore from '$lib/stores/Firm';
	import OpenFilterButton from './../../assets/icons/OpenFilterButton.svelte';
	import OpenMenuIcon from './../../assets/icons/OpenMenuIcon.svelte';
	import MobileHeaderMenu from './MobileHeaderMenu.svelte';

	export let userId = '';

	setDefaultFirm(userId);
	$: firm = $FirmStore;
</script>

<div class="container">
	<div class="top-panel">
		<div class="menu"><OpenMenuIcon /></div>
		<div class="title">{firm?.name}</div>
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
		align-items: center;
	}

	.title {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 30px;
		line-height: 45px;
		/* identical to box height */

		letter-spacing: 1px;

		color: #3d5a80;
	}
</style>
