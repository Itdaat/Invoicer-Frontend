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

	const getInvoicesCountVals = async () => {
		const countsResult = await getInvoicesCount(firmId);
		if (countsResult.error || !countsResult.result) {
			return;
		}
		outdatedCount = countsResult.result[0].outdated;
		outdatedCent = outdatedCount.toString().split('.')[1];
		outdatedCount = outdatedCount.toString().split('.')[0];
		allCount = countsResult.result[0].allSum;
		allCent = allCount.toString().split('.')[1];
		allCount = allCount.toString().split('.')[0];
		plannedCount = countsResult.result[0].planned;
		plannedCent = plannedCount.toString().split('.')[1];
		plannedCount = plannedCount.toString().split('.')[0];
		createdCount = countsResult.result[0].created;
		createdCent = createdCount.toString().split('.')[1];
		createdCount = createdCount.toString().split('.')[0];
	};

	// const getAllInvoices = async (filters) => {
	// 	// const
	// 	outdatedInvoices = (await getInvoices({ ...filters, invoiceStatusId: outdatedInvoice })).result || [];
	// 	plannedInvoices = (await getInvoices({ ...filters, invoiceStatusId: plannedInvoice })).result || [];
	// 	createdInvoices = (await getInvoices({ ...filters, invoiceStatusId: createdInvoice })).result || [];
	// 	console.log(outdatedInvoices[0]);
	// };

	getInvoicesCountVals();

	// $: getAllInvoices(filter);
	$: outdatedInvoicesApi = getInvoices({ ...filter, invoiceStatusId: outdatedInvoice });
	$: plannedInvoicesApi = getInvoices({ ...filter, invoiceStatusId: plannedInvoice });
	$: createdInvoicesApi = getInvoices({ ...filter, invoiceStatusId: createdInvoice });
</script>

<main>
	<div class="counter">
		<CounterBig cash={allCount} cent={allCent} />
		<div class="small-counter-container">
			<CounterSmall cash={plannedCount} cent={plannedCent} title={t.invoices_planned} />
			<CounterSmall cash={createdCount} cent={createdCent} title={t.invoices_created} />
			<CounterSmall cash={outdatedCount} cent={outdatedCent} title={t.invoices_outdated} />
		</div>
	</div>
	{#if showPlanned}
		<MiniCategory title={t.invoices_planned}>
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
		</MiniCategory>
	{/if}
	{#if showCreated}
		<MiniCategory title={t.invoices_created}>
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
		</MiniCategory>
	{/if}
	{#if showOutdated}
		<MiniCategory title={t.invoices_outdated}>
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
		</MiniCategory>
	{/if}
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
