<script>
	import { slide } from 'svelte/transition';
	import LanguageStore from './../../stores/Language.js';
	import PlusIcon from './../../assets/icons/PlusIcon.svelte';
	import { clickOutside } from '$lib/helpers/ClickOutside.js';
	import { goto } from '$app/navigation';

	$: t = $LanguageStore;
	let rotated = false;

	let showEntitiesList = false;

	const clickOutsideEvent = () => {
		showEntitiesList = false;
		rotated = false;
	};

	const openPopup = () => {
		showEntitiesList = !showEntitiesList;
		rotated = !rotated;
	};

	const gotoInvoice = () => {
		localStorage.setItem('create_title', t.title_invoice);
		goto('/create/invoice');
	};

	const gotoTransaction = () => {
		localStorage.setItem('create_title', t.title_transaction);
		goto('/create/transaction');
	};

	const gotoTruck = () => {
		localStorage.setItem('create_title', t.title_truck);
		goto('/create/truck');
	};

	const gotoTrailer = () => {
		localStorage.setItem('create_title', t.title_trailer);
		goto('/create/trailer');
	};

	const gotoPayment = () => {
		localStorage.setItem('create_title', t.title_payment);
		goto('/create/payment');
	};

	const gotoPerson = () => {
		localStorage.setItem('create_title', t.title_person);
		goto('/create/driver');
	};

	const gotoCmr = () => {
		localStorage.setItem('create_title', t.title_cmr);
		goto('/create/cmr');
	};
</script>

<main use:clickOutside on:click_outside={clickOutsideEvent}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="icon-container" on:click={openPopup} class:rotated>
		<PlusIcon width={38} height={38} />
	</div>
	{#if showEntitiesList}
		<div class="entities-list" in:slide|local out:slide|local>
			<a class="entity-item" href="/mobile/create/invoice" on:click={gotoInvoice}>
				{t.entity_invoice}
			</a>
			<a class="entity-item" href="/mobile/create/transaction" on:click={gotoTransaction}>
				{t.entity_transaction}
			</a>
			<a class="entity-item" href="/mobile/create/truck" on:click={gotoTruck}>{t.entity_truck}</a>
			<a class="entity-item" href="/mobile/create/trailer" on:click={gotoTrailer}>
				{t.entity_trailer}
			</a>
			<a class="entity-item" href="/mobile/create/payment" on:click={gotoPayment}>
				{t.entity_payment}
			</a>
			<a class="entity-item" href="/mobile/create/driver" on:click={gotoPerson}>
				{t.entity_person}
			</a>
			<a class="entity-item" href="/mobile/create/cmr" on:click={gotoCmr}>{t.entity_cmr}</a>
		</div>
	{/if}
</main>

<style>
	main {
		position: fixed;
		right: 90px;
		bottom: 50px;
		z-index: 4;
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
