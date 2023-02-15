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
	import PaymentMini from '../components/PaymentMini.svelte';

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
		cash: 12333,
		cent: 90
	};
</script>

<div class="main">
	<div class="counter">
		<CounterBig {...data} />
		<div class="small-counter-container">
			<CounterSmall cash={12333.9} cent={0} title={t.orders_done} />
			<CounterSmall cash={0} cent={0} title={t.orders_created} />
			<CounterSmall cash={0} cent={0} title={t.orders_outdated} />
		</div>
	</div>
	<MiniCategory title={t.orders_done}>
		{#await futureOrdersApi then orders}
			{#each orders as order}
				<PaymentMini price={12333.9} date={order.date} number={'Bank'} id={order.id} />
			{/each}
		{/await}
	</MiniCategory>
	<MiniCategory title={t.orders_created}>
		<!-- {#each orders as invoice}
			<InvoiceMini {...invoice} />
		{/each} -->
	</MiniCategory>
	<MiniCategory title={t.orders_outdated}>
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
