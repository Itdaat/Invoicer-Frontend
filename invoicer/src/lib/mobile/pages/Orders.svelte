<script>
	import { goto } from '$app/navigation';
	import { getOrders } from '$lib/api/server/order';
	import { getCookie } from '$lib/helpers/cookies';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import { mobile, order } from '../../../consts';
	import CounterBig from '../components/CounterBig.svelte';
	import CounterSmall from '../components/CounterSmall.svelte';
	import MiniCategory from '../components/MiniCategory.svelte';
	import OrderMini from '../components/OrderMini.svelte';

	$: t = $LanguageStore;
	$: filters = $FilterStore;

	const firmId = getCookie('firmId');

	/**
	 * @param {{}} filters
	 */
	const getOrdersFormatted = async (filters) => {
		// console.log((await getOrders(firmId, { ...filters, orderStatusId: 1 })).result);
		return (await getOrders(firmId, filters)).result;
	};

	/** type {import('../../../types/Entities').InvoiceMini[]} */
	$: futureOrdersApi = getOrdersFormatted(filters);

	const gotoOrder = (id) => {
		goto(mobile + '/' + id + order);
	};

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
</script>

<div class="main">
	<div class="counter">
		<CounterBig {...data} />
		<div class="small-counter-container">
			<CounterSmall {...counterSmall} />
			<CounterSmall {...counterSmall} />
			<CounterSmall {...counterSmall} />
		</div>
	</div>
	<MiniCategory title={t.invoices_mini_future}>
		{#await futureOrdersApi then orders}
			{#each orders as order}
				<OrderMini price={order.price} date={order.date} trailerNumber={'dsfa'} truckNumber={'sdfe'} number={order.orderNumber} id={order.id} />
			{/each}
		{/await}
	</MiniCategory>
	<MiniCategory title={t.invoices_mini_future}>
		<!-- {#each orders as invoice}
			<InvoiceMini {...invoice} />
		{/each} -->
	</MiniCategory>
</div>

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
