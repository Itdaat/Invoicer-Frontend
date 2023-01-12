<script>
	import { slide } from 'svelte/transition';
	import SliderStore from '$lib/stores/Slides';
	import OpenFilterButton from './../../assets/icons/OpenFilterButton.svelte';
	import OpenMenuIcon from './../../assets/icons/OpenMenuIcon.svelte';
	import FilterPopup from './FilterPopup.svelte';
	import InvoiceFilter from './filters/InvoiceFilter.svelte';
	import MessagesFilter from './filters/MessagesFilter.svelte';
	import OrderFilter from './filters/OrderFilter.svelte';
	import PaymentFilter from './filters/PaymentFilter.svelte';
	import TransactionFilter from './filters/TransactionFilter.svelte';
	import MenuPopup from './MenuPopup.svelte';
	import MobileHeaderMenu from './MobileHeaderMenu.svelte';

	/**
	 * @type {import('../../../types/Entities').Firm }
	 */
	const firm = JSON.parse(localStorage.getItem('firm') || '');

	let showFilter = false;
	let showMenu = false;
	/** @type {boolean} */
	export let showHorizontalMenu;

	const showMenuFun = () => {
		showMenu = !showMenu;
	};

	const showFilterFun = () => {
		showFilter = !showFilter;
	};

	$: slider = $SliderStore;
</script>

<div
	class="container {!showHorizontalMenu ? 'container-mini' : ''}"
	in:slide={{ duration: 500 }}
	out:slide={{ duration: 500 }}
>
	<div class="top-panel">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="menu" on:click={showMenuFun}><OpenMenuIcon /></div>
		<div class="title">{firm?.name}</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="filter" on:click={showFilterFun}><OpenFilterButton /></div>
	</div>
	{#if showHorizontalMenu}
		<div
			class="pages-menu-horizontal"
			in:slide|local={{ duration: 500 }}
			out:slide|local={{ duration: 500 }}
		>
			<MobileHeaderMenu />
		</div>
	{/if}
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
	<MenuPopup bind:showMenu />
</div>

<style>
	.container {
		padding: 15px 15px 0px 15px;
		background: #ffffff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
	}

	.container-mini {
		padding: 15px 15px 10px 15px;
	}

	.menu {
		width: 40px;
	}

	.top-panel {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1px;
	}

	.title {
		margin-top: -2px;

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
