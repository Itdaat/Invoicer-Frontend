<script>
	import { getCmr } from '$lib/api/server/cmr';
	import { getCurrentFirmId } from '$lib/api/server/firm';
	import { getOrder, getOrderAutoComplete } from '$lib/api/server/order';
	import { getTrailersAutocomplete, getTrucksAutocomplete } from '$lib/api/server/transport';
	import CreateProduct from '$lib/desktop/components/CreateProduct.svelte';
	import { dateToString } from '$lib/helpers/date';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import SaveEntity from '$lib/mobile/components/SaveEntity.svelte';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { slide } from 'svelte/transition';

	$: t = $LanguageStore;

	const firmId = getCurrentFirmId();
	let lastProductId = 0;

	/** @type {import('src/types/Response').ResponseStatus}*/
	let responseStatus = 'none';

	/** @type {string} */
	let date = dateToString(new Date());
	// let date;
	/** @type {string} */
	let number;
	/** @type {string} */
	let downloadAddress;
	/** @type {string} */
	let unloadAddress;
	/** @type {number} */
	let sum;
	/** @type {Array<{id:number,name: string, price : string}>} */
	let products = [];
	/** @type {Array<number>} */
	let orders;
	/** @type {string} */
	let orderNumber;
	/** @type {string} */
	let truck;
	/** @type {string} */
	let trailer;

	/** @type {'ordinary' | 'success' | 'error'}*/
	let dateStatus;
	/** @type {'ordinary' | 'success' | 'error'}*/
	let numberStatus;
	/** @type {'ordinary' | 'success' | 'error'}*/
	let downloadAddressStatus;
	/** @type {'ordinary' | 'success' | 'error'}*/
	let unloadAddressStatus;
	/** @type {'ordinary' | 'success' | 'error'}*/
	let sumStatus;
	/** @type {Array<'ordinary' | 'success' | 'error'>}*/
	let productsStatus = [];
	/** @type {Array<'ordinary' | 'success' | 'error'>}*/
	let ordersStatus = [];
	/** @type {'ordinary' | 'success' | 'error'}*/
	let orderNumberStatus;
	/** @type {'ordinary' | 'success' | 'error'}*/
	let truckStatus = 'ordinary';
	/** @type {'ordinary' | 'success' | 'error'}*/
	let trailerStatus = 'ordinary';

	let productName;
	let productValue;

	/** @type {string}*/
	let orderId;

	/** @param {string} id */
	const orderChanged = async (id) => {
		orderId = '';
		if (id === null || id === undefined || id === '') return;

		const order = await getOrder(firmId, id);
		unloadAddress = order.unloadAddress;
		downloadAddress = order.downloadAddress;
		truck = order.truck.licenseNumber;
		trailer = order.trailer.licenseNumber;
		// sum = order.price;

		for (let product of order.products) {
			createProduct(product.name, product.price);
		}
	};

	const save = () => {
		responseStatus = 'inProcess';
	};

	/**
	 * @param {string} name
	 * @param {string} value
	 */
	const createProduct = (name, value) => {
		if (!name || isNaN(value)) {
			return;
		}
		products = [
			...products,
			{
				id: lastProductId++,
				name,
				price: value
			}
		];
		productName = productValue = null;
	};

	/** @param {Array<{id:number,name: string, price : string}>} productsList */
	const calc = (productsList) => {
		let sumRes = 0;
		for (let product of productsList) {
			sumRes += Number.parseFloat(product.price);
		}
		sum = sumRes.toFixed(2);
	};

	$: console.log(products);

	/**
	 * @param {number} id
	 */
	const deleteProduct = (id) => {
		const newProductsList = products.filter((product) => product.id != id);
		products = newProductsList;
	};

	$: trucksSuggestions = getTrucksAutocomplete(truck);
	$: trailerSuggestions = getTrailersAutocomplete(trailer);
	$: orderSuggestions = getOrderAutoComplete(firmId, orderNumber);

	$: orderChanged(orderId);
	$: calc(products);

	$: productsList = products;
	// $: products = createProduct(productName, productValue);
</script>

<div class="main">
	<MiniCategory title={t.invoice_main}>
		<LabeledInput
			bind:value={number}
			status={numberStatus}
			label={t.invoice_number}
			placeHolder={t.invoice_number}
			message={t.invoice_number_empty}
		/>
		<LabeledInput
			bind:value={date}
			status={dateStatus}
			label="{t.invoice_date}pseudoValue"
			placeHolder={t.invoice_date}
			message={t.invoice_date_empty}
			type="date"
		/>
	</MiniCategory>
	<MiniCategory title={t.invoice_order}>
		<LabeledInput
			bind:value={orderNumber}
			status={orderNumberStatus}
			label={t.invoice_order_number}
			placeHolder={t.invoice_order_number}
			message={t.invoice_order_number_empty}
			autocomplete
			bind:pseudoValue={orderId}
			suggestionsApi={orderSuggestions}
		/>
		<LabeledInput
			bind:value={downloadAddress}
			status={downloadAddressStatus}
			label={t.invoice_download_address}
			placeHolder={t.invoice_download_address}
			message={t.invoice_download_address_empty}
		/>
		<LabeledInput
			bind:value={unloadAddress}
			status={unloadAddressStatus}
			label={t.invoice_unload_address}
			placeHolder={t.invoice_unload_address}
			message={t.invoice_unload_address_empty}
		/>
	</MiniCategory>
	<MiniCategory title={t.transport_title}>
		<LabeledInput
			bind:value={truck}
			status={truckStatus}
			label={t.order_truck}
			placeHolder={t.order_truck}
			message={t.order_truck_empty}
			autocomplete
			suggestionsApi={trucksSuggestions}
		/>
		<LabeledInput
			bind:value={trailer}
			status={trailerStatus}
			label={t.order_trailer}
			placeHolder={t.order_trailer}
			message={t.order_truck_empty}
			autocomplete
			suggestionsApi={trailerSuggestions}
		/>
	</MiniCategory>
	<MiniCategory title={t.invoice_products}>
		{#if productsList?.length > 0}
			{#each productsList as product}
				<div class="product" transition:slide>
					<LabeledInput bind:value={product.price} label={product.name} />
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="delete"
						on:click={() => {
							deleteProduct(product.id);
						}}
					>
						{t.invoice_product_delete}
					</div>
				</div>
			{/each}
		{/if}
		<CreateProduct
			bind:name={productName}
			bind:value={productValue}
			onButtonClick={() => {
				createProduct(productName, productValue);
			}}
			valueType={'number'}
			namePlaceHolder={t.invoice_new_product_name}
			valuePlaceHolder={t.invoice_new_product_value}
		/>
	</MiniCategory>
	<MiniCategory title={t.invoice_conclusion}>
		<LabeledInput
			bind:value={sum}
			status={sumStatus}
			label={t.invoice_sum}
			placeHolder={t.invoice_sum}
			message={t.invoice_sum_empty}
			type="number"
			disabled
		/>
	</MiniCategory>
	<SaveEntity {save} status={responseStatus} />
</div>

<style>
	.product {
		display: grid;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		grid-template-columns: 6fr 1fr;
		width: 85%;
	}
	.delete {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 400;
		font-size: 15px;
		line-height: 18px;
		/* identical to box height */

		letter-spacing: 1px;

		color: rgba(176, 26, 26, 0.7);
	}
</style>
