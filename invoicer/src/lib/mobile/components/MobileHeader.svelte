<script>
	import TransactionFilter from './filters/TransactionFilter.svelte';
	import MessagesFilter from './filters/MessagesFilter.svelte';
	import FilterPopup from './FilterPopup.svelte';
	import OpenFilterButton from './../../assets/icons/OpenFilterButton.svelte';
	import OpenMenuIcon from './../../assets/icons/OpenMenuIcon.svelte';
	import MobileHeaderMenu from './MobileHeaderMenu.svelte';
	import SliderStore from '$lib/stores/Slides';
	import InvoiceFilter from './filters/InvoiceFilter.svelte';
	import OrderFilter from './filters/OrderFilter.svelte';
	import PaymentFilter from './filters/PaymentFilter.svelte';
	import MenuPopup from './MenuPopup.svelte';
	import { getCurrentFirm, getFirm } from '$lib/api/server/firm';

	/**
	 * @type {import('../../../types/Entities').Firm }
	 */
	const firm = JSON.parse(localStorage.getItem('firm') || '');

	let showFilter = false;
	let showMenu = false;

	const showMenuFun = () => {
		showMenu = !showMenu;
	};

	const showFilterFun = () => {
		showFilter = !showFilter;
	};

	$: slider = $SliderStore;
</script>

<div class="container">
	<div class="top-panel">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="menu" on:click={showMenuFun}><OpenMenuIcon /></div>
		<div class="title">{firm?.name}</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="filter" on:click={showFilterFun}><OpenFilterButton /></div>
	</div>
	<div class="pages-menu-horizontal">
		<MobileHeaderMenu />
	</div>
	{#if showFilter}
		<FilterPopup bind:showFilter>
			{#if slider.activeIndex == 0}
				<MessagesFilter />
			{:else if slider.activeIndex == 1}
				<InvoiceFilter />
			{:else if slider.activeIndex == 2}
				<OrderFilter />
			{:else if slider.activeIndex == 3}
				<PaymentFilter />
			{:else if slider.activeIndex == 4}
				<TransactionFilter />
			{/if}
		</FilterPopup>
	{/if}
	<MenuPopup show={showMenu} />
</div>

<style>
	.container {
		padding: 15px 15px 0px 15px;
		background: #ffffff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
	}

	.top-panel {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1px;
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
