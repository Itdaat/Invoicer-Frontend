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
	import {
		invoiceSlide,
		messagesSlide,
		mobileCmrs,
		mobileDrivers,
		mobilePocket,
		mobileTrailers,
		mobileTrucks,
		orderSlide,
		paymentSlide,
		transactionSlide
	} from '../../../consts';
	import { page } from '$app/stores';
	import PersonFilter from './filters/PersonFilter.svelte';
	import CmrFilter from './filters/CmrFilter.svelte';
	import TrailerFilter from './filters/TrailerFilter.svelte';
	import TruckFilter from './filters/TruckFilter.svelte';
	import PocketFilter from './filters/PocketFilter.svelte';

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
	$: path = $page.url.pathname;
</script>

<div class="container {!showHorizontalMenu ? 'container-mini' : ''}">
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
			in:slide|local={{ duration: 400, delay: 150 }}
			out:slide|local={{ duration: 400, delay: 150 }}
		>
			<MobileHeaderMenu />
		</div>
	{/if}
	{#if showFilter}
		<FilterPopup bind:showFilter>
			{#if path == mobileDrivers}
				<PersonFilter />
			{:else if path == mobileCmrs}
				<CmrFilter />
			{:else if path == mobileTrailers}
				<TrailerFilter />
			{:else if path == mobileTrucks}
				<TruckFilter />
			{:else if path == mobilePocket}
				<PocketFilter />
			{:else if slider.activeIndex == messagesSlide}
				<MessagesFilter />
			{:else if slider.activeIndex == invoiceSlide}
				<InvoiceFilter />
			{:else if slider.activeIndex == orderSlide}
				<OrderFilter />
			{:else if slider.activeIndex == paymentSlide}
				<PaymentFilter />
			{:else if slider.activeIndex == transactionSlide}
				<TransactionFilter />
			{/if}
			<!-- {:else if  } -->
			<!-- {/if} -->
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
