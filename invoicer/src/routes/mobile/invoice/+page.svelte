<script>
	import LanguageStore from '$lib/stores/Language';
	import ShareIcon from './../../../lib/assets/icons/ShareIcon.svelte';
	import { slide, fly } from 'svelte/transition';
	import ReturnIcon from '$lib/assets/icons/ReturnIcon.svelte';
	import MoreActionsIcon from './../../../lib/assets/icons/MoreActionsIcon.svelte';
	import PrintIcon from '$lib/assets/icons/PrintIcon.svelte';
	import DeleteIcon from '$lib/assets/icons/DeleteIcon.svelte';
	import { getInvoice } from '$lib/api/CRM/invoice';
	import { clickOutside } from '$lib/templates/ClickOutside';
	export let title = 'Інвойс №1231';
	$: t = $LanguageStore;

	const returnToPage = () => {
		history.back();
	};

	let actionsActive = false;

	const openActions = () => {
		actionsActive = !actionsActive;
	};

	const clickOutsideEvent = () => {
		actionsActive = false;
	};
</script>

<main>
	<div class="header">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="return" on:click={returnToPage}><ReturnIcon /></div>
		<div class="title">{title}</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="actions" use:clickOutside on:click_outside={clickOutsideEvent}>
			<div class="actions-container" on:click={openActions}>
				<MoreActionsIcon />
			</div>
			{#if actionsActive}
				<div class="actions-popup" in:slide out:slide on:click={() => {}}>
					<div class="action-item">
						<ShareIcon />
						<div class="actions-item-title">
							{t.invoice_share_title}
						</div>
					</div>
					<div class="action-item">
						<PrintIcon />
						<div class="actions-item-title">{t.invoice_print_title}</div>
					</div>
					<div class="action-item">
						<DeleteIcon />
						<div class="actions-item-title">{t.invoice_delete_title}</div>
					</div>
				</div>
			{/if}
		</div>
	</div>

	<div class="main">
		<div class="container">
			{#await getInvoice() then invoice}
				<div class="list-item">
					<div class="left">{t.invoice_num}</div>
					<div class="right">{invoice.number}</div>
				</div>
				<div class="list-item">
					<div class="left">{t.invoice_creation_date}</div>
					<div class="right">{invoice.creationDate}</div>
				</div>
				<div class="list-item">
					<div class="left">{t.invoice_order_number}</div>
					<div class="right">{invoice.order.number}</div>
				</div>
				<div class="list-item">
					<div class="left">{t.invoice_route}</div>
					<div class="right">{invoice.order.downloadAddress}-{invoice.order.unloadAddress}</div>
				</div>
				<div class="list-item">
					<div class="left">{t.invoice_license_num}</div>
					<div class="right">{invoice.order.truck?.number}/{invoice.order.trailer?.number}</div>
				</div>
				<div class="list-item">
					<div class="left">{t.invoice_cmr_number}</div>
					<div class="right">{invoice.cmr?.number}</div>
				</div>
				<div class="list-item">
					<div class="left">{t.invoice_currency}</div>
					<div class="right">{invoice.order.currency}</div>
				</div>
				<div class="list-item">
					<div class="left">{t.invoice_payment_date}</div>
					<div class="right">{invoice.order.date}</div>
				</div>
				<div class="list-item">
					<div class="left">{t.invoice_status}</div>
					<div class="right">{invoice.status}</div>
				</div>
				<div class="conclusion-list-item">
					<div class="left">{t.invoice_sum}</div>
					<div class="right">{invoice.order.price}</div>
				</div>
			{/await}
		</div>
	</div>
</main>

<style>
	main {
		height: 100vh;
		display: grid;
		grid-template-rows: 106px 1fr;
	}
	.header {
		height: 70px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #ffffff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
		padding: 0px 20px;
	}

	.title {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 25px;
		line-height: 38px;
		/* identical to box height */

		letter-spacing: 1px;

		color: #3d5a80;
	}

	.return,
	.actions {
		margin-top: 5px;
	}

	.actions-popup {
		position: absolute;
		top: 78px;
		right: 8px;
		background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		width: 170px;
		height: 137px;

		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 2px;
	}

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
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
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
</style>
