<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getCurrentFirmId } from '$lib/api/server/firm';
	import { getOrder } from '$lib/api/server/order';
	import { formateDate, formatName } from '$lib/helpers/format';
	import ConclusionListItemBill from '$lib/mobile/components/ConclusionListItemBill.svelte';
	import ListItemBill from '$lib/mobile/components/ListItemBill.svelte';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import MiniMenu from '$lib/mobile/templates/MiniMenu.svelte';
	import GlobalMessageStore from '$lib/stores/GlobalMessage';
	import LanguageStore from '$lib/stores/Language';
	import Button from '$lib/templates/Button.svelte';
	import { quartIn } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { mobile, order, signedStatus, unsignedStatus } from '../../../../../../consts';

	$: t = $LanguageStore;
	$: globalMessages = $GlobalMessageStore;
	let title;

	const firmId = getCurrentFirmId();
	const id = $page.params.id;
	let status = '';

	const sign = () => {};

	const change = () => {
		localStorage.setItem('create_title', t.order_update_title);
		goto(mobile + '/' + id + '/update' + order);
	};

	const getOrderFormatted = async () => {
		const order = await getOrder(firmId, id);
		title = t.order_title + ' ' + order.orderNumber;
		// status = order.orderStatusId == signedStatus ;
		if (order.orderStatusId == signedStatus) {
			status = t.order_status_signed;
		} else if (order.orderStatusId == unsignedStatus) {
			status = t.order_status_unsigned;
		} else {
			status = t.order_status_broken_signature;
		}
		return order;
	};

	const orderAPI = getOrderFormatted();
</script>

<MiniMenu {title}>
	<div class="main" slot="main">
		{#await orderAPI}
			<Loader type="circle" status="inProcess" size="60" />
		{:then order}
			<div class="container" in:slide={{ duration: 700, easing: quartIn }}>
				<ListItemBill name={t.order_number} value={order.orderNumber} messageText={t.order_number_copied} />
				<ListItemBill name={t.order_external_number} value={order.externalOrderNumber} messageText={t.order_external_number_copied} />
				<ListItemBill name={t.order_date} value={formateDate(order.date)} messageText={t.order_date_copied} />
				<ListItemBill name={t.order_download_address} value={order.downloadAddress} messageText={t.order_download_address_copied} />
				<ListItemBill name={t.order_unload_address} value={order.unloadAddress} messageText={t.order_unload_address} />
				<ListItemBill name={t.order_person} value={formatName(order.firstName, order.lastName, order.nickname)} messageText={t.order_person_copied} />
				<ListItemBill name={t.order_payment_terms} value={formateDate(order.paymentTerms)} messageText={t.order_payment_terms_copied} />
				<ListItemBill name={t.order_status} value={status} messageText={t.order_status_copied} makeCopy={false} />
				<ListItemBill name={t.order_firm} value={order.firmName} messageText={t.order_firm_copied} />
				<ListItemBill name={t.order_truck} value={order.truck.licenseNumber} messageText={t.order_truck_copied} />
				<ListItemBill name={t.order_trailer} value={order.trailer.licenseNumber} messageText={t.order_trailer_copied} />
				{#if order.products?.length == 1}
					<ListItemBill name={t.order_price} value={order.price} messageText={t.order_price_copied} />
				{/if}
			</div>
			{#if order.products?.length > 1}
				<div class="container" style="margin-top:20px;" in:slide={{ duration: 400, delay: 400, easing: quartIn }}>
					{#each order.products as product}
						<ListItemBill name={product.name} value={product.price} messageText={t.order_product_price_copied} />
					{/each}
					<!-- <ConclusionListItemBill name={t.order_price} value={product.price} messageText={t.order_price} /> -->
					<ConclusionListItemBill name={t.order_price} value={order.price} messageText={t.order_price_copied} />
				</div>
			{/if}
		{/await}
		<div class="buttons-container">
			<div class="left-button-container">
				<Button type="light" onClick={sign}>{t.invoice_sign}</Button>
			</div>
			<div class="right-button-container">
				<Button type="dark" onClick={change}>{t.invoice_reject}</Button>
			</div>
		</div>
	</div>
</MiniMenu>

<style>
	.actions-item-title {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 17px;
		line-height: 40px;
		/* or 235% */

		letter-spacing: 1px;

		color: #204660;

		margin-left: 20px;
	}

	.action-item {
		display: flex;
		align-items: center;
		width: 90%;
		margin-left: 20px;
		margin-top: 3px;
	}

	.container {
		width: 85%;
		padding: 5px 16px;
		/* height: 360px; */

		background: #ffffff;
		border-radius: 10px;
		box-shadow: 0px 4px 20px rgba(37, 38, 94, 0.1);
	}

	.main {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		margin-top: 27px;
	}

	.actions {
		width: 100%;
	}

	.conclusion-list-item .left {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 600;
		font-size: 15px;
		line-height: 22px;
		/* identical to box height */

		display: flex;
		align-items: center;

		color: #4f6c8d;
	}

	.conclusion-list-item .right {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 600;
		font-size: 15px;
		line-height: 22px;
		/* identical to box height */

		display: flex;
		align-items: center;
		text-align: right;
		letter-spacing: 1.5px;

		/* done */

		color: #24a731;
	}

	.conclusion-list-item,
	.list-item {
		display: flex;
		justify-content: space-between;
		margin: 10px 0px;
	}

	.conclusion-list-item {
		margin: 15px 0px;
	}

	.left {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 400;
		font-size: 15px;
		line-height: 22px;
		/* identical to box height */

		display: flex;
		align-items: center;

		color: #4f6c8d;
	}

	.right {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 15px;
		line-height: 22px;
		/* identical to box height */

		display: flex;
		align-items: center;
		text-align: right;

		color: #092058;
		letter-spacing: 1px;
	}

	.buttons-container {
		margin-top: 36px;
		display: flex;
		justify-content: space-between;
		width: 80%;
	}

	.left-button-container,
	.right-button-container {
		width: 160px;
		max-width: 45%;
		height: 50px;
	}
</style>
