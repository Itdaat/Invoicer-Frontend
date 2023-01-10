<script>
	import { slide } from 'svelte/transition';
	import LanguageStore from './../../stores/Language.js';
	import PlusIcon from './../../assets/icons/PlusIcon.svelte';
	import { clickOutside } from '$lib/helpers/ClickOutside.js';

	$: t = $LanguageStore;

	let showEntitiesList = false;

	const clickOutsideEvent = () => {
		showEntitiesList = false;
	};

	const openPopup = () => {
		showEntitiesList = !showEntitiesList;
	};
</script>

<main use:clickOutside on:click_outside={clickOutsideEvent}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="icon-container" on:click={openPopup}>
		<PlusIcon />
	</div>
	{#if showEntitiesList}
		<div class="entities-list" in:slide out:slide>
			<a class="entity-item" href="/mobile/create/invoice">{t.entity_invoice}</a>
			<a class="entity-item" href="/mobile/create/transaction">{t.entity_transaction}</a>
			<a class="entity-item" href="/mobile/create/truck">{t.entity_truck}</a>
			<a class="entity-item" href="/mobile/create/trailer">{t.entity_trailer}</a>
			<a class="entity-item" href="/mobile/create/payment">{t.entity_payment}</a>
			<a class="entity-item" href="/mobile/create/person">{t.entity_person}</a>
			<a class="entity-item" href="/mobile/create/cmr">{t.entity_cmr}</a>
		</div>
	{/if}
</main>

<style>
	main {
		position: fixed;
		right: 30px;
		bottom: 50px;
		z-index: 4;
	}

	.icon-container {
		width: 60px;
		height: 60px;
		margin-top: 3px;
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;
		background: #ffffff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
		border-radius: 100%;
	}

	.entities-list {
		position: fixed;
		right: 65px;
		bottom: 110px;
		background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
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
