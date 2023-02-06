<script>
	import { slide } from 'svelte/transition';
	import LanguageStore from './../../stores/Language.js';
	import PlusIcon from './../../assets/icons/PlusIcon.svelte';
	import { clickOutside } from '$lib/helpers/ClickOutside.js';
	import { goto } from '$app/navigation';
	import CreatePopup from '../templates/CreatePopup.svelte';
	import { cmr, driver, invoice, payment, trailer, transaction, truck } from '../../../consts.js';
	import InvoiceFilter from '$lib/mobile/components/filters/InvoiceFilter.svelte';
	import PaymentFilter from '$lib/mobile/components/filters/PaymentFilter.svelte';
	import PersonFilter from '$lib/mobile/components/filters/PersonFilter.svelte';
	import TransactionFilter from '$lib/mobile/components/filters/TransactionFilter.svelte';
	import OrderFilter from '$lib/mobile/components/filters/OrderFilter.svelte';
	import CreateInvoice from './create/CreateInvoice.svelte';
	import CreatePayment from './create/CreatePayment.svelte';
	import CreateDriver from './create/CreateDriver.svelte';
	import CreateTrailer from './create/CreateTrailer.svelte';
	import CreateCmr from './create/CreateCmr.svelte';
	import CreateTruck from './create/CreateTruck.svelte';

	$: t = $LanguageStore;
	let rotated = false;

	let showEntitiesList = false;
	let showCreatePopup = false;

	let showCreateInvoice = false,
		showCreateTransaction = false,
		showCreateTruck = false,
		showCreateTrailer = false,
		showCreatePayment = false,
		showCreatePerson = false,
		showCreateCmr = false;

	let type = '';

	const clickOutsideEvent = () => {
		showEntitiesList = false;
		rotated = false;
	};

	const openPopup = () => {
		showEntitiesList = !showEntitiesList;
		rotated = !rotated;
	};

	const openCreatePopup = () => {
		showCreatePopup = !showCreatePopup;
	};

	const createInvoice = () => {
		type = invoice;
		showCreateInvoice = !showCreateInvoice;
		openCreatePopup();
	};

	const createTransaction = () => {
		type = transaction;
		showCreateTransaction = !showCreateTransaction;
		openCreatePopup();
	};

	const createTuck = () => {
		type = truck;
		showCreateTruck = !showCreateTruck;
		openCreatePopup();
	};

	const createTrailer = () => {
		type = trailer;
		showCreateTrailer = !showCreateTrailer;
		openCreatePopup();
	};

	const createPayment = () => {
		type = payment;
		showCreatePayment = !showCreatePayment;
		openCreatePopup();
	};

	const createPerson = () => {
		type = driver;
		showCreatePerson = !showCreatePerson;
		openCreatePopup();
	};

	const createCmr = () => {
		type = cmr;
		showCreateCmr = !showCreateCmr;
		openCreatePopup();
	};
</script>

<main use:clickOutside on:click_outside={clickOutsideEvent}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="icon-container" on:click={openPopup} class:rotated>
		<PlusIcon width={38} height={38} />
	</div>
	{#if showEntitiesList}
		<div class="entities-list" in:slide|local out:slide|local>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="entity-item" on:click={createInvoice}>
				{t.entity_invoice}
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="entity-item" on:click={createTransaction}>
				{t.entity_transaction}
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="entity-item" on:click={createTuck}>{t.entity_truck}</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="entity-item" on:click={createTrailer}>
				{t.entity_trailer}
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="entity-item" on:click={createPayment}>
				{t.entity_payment}
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="entity-item" on:click={createPerson}>
				{t.entity_person}
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="entity-item" on:click={createCmr}>{t.entity_cmr}</div>
		</div>
	{/if}
</main>
{#if type == invoice}
	<CreateInvoice />
{:else if type == payment}
	<CreatePayment />
{:else if type == driver}
	<CreateDriver />
{:else if type == trailer}
	<CreateTrailer bind:show={showCreateTrailer} />
	<!-- {:else if type == transaction} -->
	<!-- <CreateTransaction /> -->
{:else if type == truck}
	<CreateTruck bind:show={showCreateTruck} />
{:else if type == cmr}
	<CreateCmr bind:show={showCreateCmr} />
{/if}

<style>
	main {
		position: fixed;
		right: 90px;
		bottom: 50px;
		z-index: 4;

		user-select: none;
		cursor: pointer;
	}

	.rotated {
		transform: rotate(-135deg);
	}

	.icon-container {
		width: 70px;
		height: 70px;
		margin-top: 3px;
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;
		background: #ffffff;
		/* box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1); */
		border-radius: 100%;

		background: #ffffff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.153);

		transition-duration: 300ms;
		/* transform-origin: left; */
		/* transform: translate(50%, 50%) rotate(90deg); */
	}

	.entities-list {
		position: fixed;
		right: 40px;
		bottom: 135px;
		background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
		/* box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1); */
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
		border-radius: 20px;
		width: 181px;
		height: 327px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.entity-item {
		font-family: 'Exo 2';
		text-decoration: none;
		font-style: normal;
		font-weight: 400;
		font-size: 19px;
		line-height: 40px;
		/* or 211% */

		letter-spacing: 1px;

		color: #3d5a80;
	}
</style>
