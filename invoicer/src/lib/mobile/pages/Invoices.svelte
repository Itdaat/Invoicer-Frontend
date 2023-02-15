<script>
	import { getCurrentFirmId } from '$lib/api/server/firm';
	import { getInvoice, getInvoices, getInvoicesCount } from '$lib/api/server/invoice';
	import ListItems from '$lib/desktop/components/ListItems.svelte';
	import { postAuthRequestJson } from '$lib/helpers/apiHelper';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import { fade, slide } from 'svelte/transition';
	import { createdInvoice, outdatedInvoice, plannedInvoice } from '../../../consts';
	import CounterBig from '../components/CounterBig.svelte';
	import CounterSmall from '../components/CounterSmall.svelte';
	import InvoiceMini from '../components/InvoiceMini.svelte';
	import Loader from '../components/Loader.svelte';
	import MiniCategory from '../components/MiniCategory.svelte';

	$: t = $LanguageStore;
	$: filter = $FilterStore;

	const firmId = getCurrentFirmId();
	let outdatedCount, allCount, plannedCount, createdCount;
	let outdatedCent, allCent, plannedCent, createdCent;

	let showOutdated = true,
		showPlanned = true,
		showCreated = true;

	// let outdatedInvoices = [],
	// 	plannedInvoices = [],
	// 	createdInvoices = [];

	const showPlannedFun = () => {
		showOutdated = showCreated = false;
		showPlanned = true;
	};

	const showCreatedFun = () => {
		showOutdated = showPlanned = false;
		showCreated = true;
	};

	const showOutdatedFun = () => {
		showPlanned = showCreated = false;
		showOutdated = true;
	};

	const getInvoicesCountVals = async (filter) => {
		const countsResult = await getInvoicesCount(firmId);
		if (countsResult.error || !countsResult.result) {
			return;
		}
		outdatedCount = countsResult.result[0].outdated || 0.0;
		outdatedCent = outdatedCount.toString().split('.')[1];
		outdatedCount = outdatedCount.toString().split('.')[0];
		allCount = countsResult.result[0].allSum || 0.0;
		allCent = allCount.toString().split('.')[1];
		allCount = allCount.toString().split('.')[0];
		plannedCount = countsResult.result[0].planned || 0.0;
		plannedCent = plannedCount.toString().split('.')[1];
		plannedCount = plannedCount.toString().split('.')[0];
		createdCount = countsResult.result[0].created || 0.0;
		createdCent = createdCount.toString().split('.')[1];
		createdCount = createdCount.toString().split('.')[0];
	};

	$: getInvoicesCountVals(filter);

	// $: getAllInvoices(filter);
	$: outdatedInvoicesApi = getInvoices({ ...filter, invoiceStatusId: outdatedInvoice }, firmId);
	$: plannedInvoicesApi = getInvoices({ ...filter, invoiceStatusId: plannedInvoice }, firmId);
	$: createdInvoicesApi = getInvoices({ ...filter, invoiceStatusId: createdInvoice }, firmId);
</script>

<main>
	<div class="counter">
		<CounterBig cash={allCount} cent={allCent} />
		<div class="small-counter-container">
			<CounterSmall cash={plannedCount} cent={plannedCent} title={t.invoices_planned} onClick={showPlannedFun} />
			<CounterSmall cash={createdCount} cent={createdCent} title={t.invoices_created} onClick={showCreatedFun} />
			<CounterSmall cash={outdatedCount} cent={outdatedCent} title={t.invoices_outdated} onClick={showOutdatedFun} />
		</div>
	</div>
	<MiniCategory title={t.invoices_created}>
		{#if showCreated}
			{#await createdInvoicesApi}
				<Loader size="45" type="circle" colorTheme="dark" status="inProcess" />
			{:then createdInvoices}
				{#each createdInvoices.result as invoice}
					<InvoiceMini
						date={invoice.invoiceDate}
						price={invoice.sum}
						number={invoice.invoiceNumber}
						trailerNumber={invoice.trailer?.licenseNumber}
						truckNumber={invoice.truck?.licenseNumber}
					/>
				{/each}
			{/await}
		{/if}
	</MiniCategory>
	<MiniCategory title={t.invoices_outdated}>
		{#if showOutdated}
			{#await outdatedInvoicesApi}
				<Loader size="45" type="circle" colorTheme="dark" status="inProcess" />
			{:then outdatedInvoices}
				{#each outdatedInvoices.result as invoice}
					<InvoiceMini
						date={invoice.invoiceDate}
						price={invoice.sum}
						number={invoice.invoiceNumber}
						trailerNumber={invoice.trailer?.licenseNumber}
						truckNumber={invoice.truck?.licenseNumber}
					/>
				{/each}
			{/await}
		{/if}
	</MiniCategory>
	<MiniCategory title={t.invoices_planned}>
		{#if showPlanned}
			{#await plannedInvoicesApi}
				<Loader size="45" type="circle" colorTheme="dark" status="inProcess" />
			{:then plannedInvoices}
				{#each plannedInvoices.result as invoice}
					<InvoiceMini
						date={invoice.invoiceDate}
						price={invoice.sum}
						number={invoice.invoiceNumber}
						trailerNumber={invoice.trailer?.licenseNumber}
						truckNumber={invoice.truck?.licenseNumber}
					/>
				{/each}
			{/await}
		{/if}
	</MiniCategory>
</main>

<style>
	main {
		user-select: none;
	}
	.counter {
		margin: 20px 0px;
		margin-bottom: 35px;
	}

	.small-counter-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin-top: 20px;
		padding: 0px 10px;
		user-select: none;
	}
</style>
