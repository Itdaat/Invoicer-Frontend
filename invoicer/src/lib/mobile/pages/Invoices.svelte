<script>
	import LanguageStore from '$lib/stores/Language';
	import CounterBig from '../components/CounterBig.svelte';
	import CounterSmall from '../components/CounterSmall.svelte';
	import InvoiceMini from '../components/InvoiceMini.svelte';
	import MiniCategory from '../components/MiniCategory.svelte';
	$: t = $LanguageStore;

	let data = {
		sign: '$',
		cash: 123991,
		cent: 23
	};

	let counterSmall = {
		cash: 12232,
		cent: 42,
		sign: '$',
		title: 'В очікуванні'
	};

	/** @type {import('../../../types/Entities').InvoiceMini[]} */
	let invoicesMini = [
		{
			trailerNumber: 'BO9999BO',
			truckNumber: 'AO8888AO',
			number: 'GPC-2314133',
			date: new Date('2022-1-13'),
			price: 11243,
			status: 'missed'
		},
		{
			trailerNumber: 'BO9999BO',
			truckNumber: 'AO8888AO',
			number: 'GPC-2314133',
			date: new Date('2022-1-13'),
			price: 11243,
			status: 'missed'
		},
		{
			trailerNumber: 'BO9999BO',
			truckNumber: 'AO8888AO',
			number: 'GPC-2314133',
			date: new Date('2022-1-13'),
			price: 11243,
			status: 'missed'
		}
	];
</script>

<main>
	<div class="counter">
		<CounterBig {...data} />
		<div class="small-counter-container">
			<CounterSmall {...counterSmall} />
			<CounterSmall {...counterSmall} />
			<CounterSmall {...counterSmall} />
		</div>
	</div>
	<MiniCategory title={t.invoices_mini_future}>
		{#each invoicesMini as invoice}
			<InvoiceMini {...invoice} />
		{/each}
	</MiniCategory>
	<MiniCategory title={t.invoices_mini_future}>
		{#each invoicesMini as invoice}
			<InvoiceMini {...invoice} />
		{/each}
	</MiniCategory>
</main>

<style>
	main {
		user-select: none;
	}
	.counter {
		margin: 20px 0px;
	}

	.small-counter-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin-top: 20px;
		padding: 0px 10px;
		user-select: none;
	}
</style>
