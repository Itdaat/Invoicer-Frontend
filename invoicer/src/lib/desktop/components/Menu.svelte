<script>
	import SliderStore from '$lib/stores/Slides';
	import CloseMenuIcon from './../../assets/icons/CloseMenuIcon.svelte';
	import LogoutIcon from './../../assets/icons/LogoutIcon.svelte';
	import SettingsIcon from './../../assets/icons/SettingsIcon.svelte';
	import LanguageStore from '$lib/stores/Language';
	import { changeFirm, getFirms } from '$lib/api/server/firm';
	import ArrowButton from '$lib/assets/icons/ArrowButton.svelte';
	import { clickOutside } from '$lib/helpers/ClickOutside';
	import { slide, fade, fly } from 'svelte/transition';
	import { deleteToken } from '$lib/api/server/user';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import FilterStore from '$lib/stores/FilterStore';
	import {
		cmr,
		cmrs,
		drivers,
		invoice,
		invoices,
		messages,
		order,
		orders,
		payments,
		pocket,
		settings,
		trailers,
		transactions,
		trucks
	} from '../../../consts';
	export let showMenu = false;

	/** @type {import('../../../types/Entities').Firm}*/
	const firm = JSON.parse(localStorage.getItem('firm') || '');

	let showFirms = false;

	$: rotate = showFirms;
	$: t = $LanguageStore;
	$: slider = $SliderStore;

	const pocketPath = '/mobile/pocket';
	const cmrPath = '/mobile/cmrs';
	const driversPath = '/mobile/drivers';
	const trucksPath = '/mobile/trucks';
	const trailerPath = '/mobile/trailers';

	const pocketCount = 20;
	const messagesCount = 0;
	const invoiceCount = 2;
	const orderCount = 33;
	const transactionsCount = 0;
	const paymentCount = 0;
	const trucksCount = 0;
	const trailerCount = 0;
	const cmrCount = 0;
	const driverCount = 0;

	const gotoSlide = (/** @type {number} */ index) => {
		hideSelf();
		if ($page.url.pathname != '/mobile') {
			slider.activeIndex = index;
			goto('/mobile');
		} else {
			slider.slider?.slideTo(index);
		}
	};

	const gotoPage = (path) => {
		hideSelf();
		FilterStore.set({});
		goto(path);
	};

	$: if (!showMenu) showFirms = showMenu;

	const hideSelf = () => {
		showMenu = false;
	};

	$: path = $page.url.pathname;

	const changeFirmClick = (/** @type {string} */ firmId) => {
		changeFirm(firmId);
		// alert(getCookie('firmId'));
		window.location.reload();
	};

	const showFirmsFunc = () => {
		showFirms = !showFirms;
	};

	const gotoPocket = () => {
		hideSelf();
		FilterStore.set({});
		goto(pocket);
	};

	const gotoSettings = () => {
		hideSelf();
		FilterStore.set({});
		goto(settings);
	};

	const logout = () => {
		deleteToken();
		window.location.reload();
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="menu"
	use:clickOutside
	on:click_outside={hideSelf}
	in:fly={{ duration: 400, delay: 200, x: -40 }}
	out:fly={{ duration: 400, x: -40 }}
>
	<div class="firms-container">
		<div class="current-firm" on:click={showFirmsFunc}>
			<div class="left">{firm.name}</div>
			<div class="right" class:rotate><ArrowButton /></div>
		</div>
		{#if showFirms}
			{#await getFirms() then firms}
				{#if firms.result}
					<div class="firms-list" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
						{#each firms.result as firm}
							<div
								class="firm"
								on:click={() => {
									changeFirmClick(firm.id);
								}}
							>
								<div class="firm-name">{firm.name}</div>
								{#if firm.messageCount != null && firm.messageCount > 0}
									<div class="counter">{firm.messageCount}</div>
								{/if}
							</div>
						{/each}
						<a class="add-firm-button" href="/mobile/create/firm">{t.menu_add_firm}</a>
					</div>
				{/if}
			{/await}
		{/if}
	</div>
	<div class="second-container">
		<div class="pocket menu-item {path == pocketPath ? 'active' : ''}" on:click={gotoPocket}>
			<div class="pocket-main">{t.menu_pocket}</div>
			{#if pocketCount > 0}
				<div class="counter">{pocketCount}</div>
			{/if}
		</div>
		<div
			class="messages menu-item {slider.slider?.activeIndex == 0 ? 'active' : ''}"
			on:click={() => {
				gotoPage(messages);
			}}
		>
			<div class="messages-main">
				{t.menu_messages}
			</div>
			{#if messagesCount}
				<div class="counter">{messagesCount}</div>
			{/if}
		</div>
	</div>
	<div class="menu-container">
		<div
			class="menu-item invoice {slider.slider?.activeIndex == 1 ? 'active' : ''}"
			on:click={() => {
				gotoPage(invoices);
			}}
		>
			<div class="invoice-main">{t.entity_invoice}</div>
			{#if invoiceCount}
				<div class="counter">{invoiceCount}</div>
			{/if}
		</div>
		<div
			class="menu-item order"
			on:click={() => {
				gotoPage(orders);
			}}
		>
			<div class="order-main {slider.slider?.activeIndex == 2 ? 'active' : ''}">
				{t.entity_order}
			</div>
			{#if orderCount}
				<div class="counter">{orderCount}</div>
			{/if}
		</div>
		<div
			class="menu-item payment {slider.slider?.activeIndex == 3 ? 'active' : ''}"
			on:click={() => {
				gotoPage(payments);
			}}
		>
			<div class="payment-main">{t.entity_payment}</div>
			{#if paymentCount}
				<div class="counter">{paymentCount}</div>
			{/if}
		</div>
		<div
			class="menu-item transaction {slider.slider?.activeIndex == 4 ? 'active' : ''}"
			on:click={() => {
				gotoPage(transactions);
			}}
		>
			<div class="transaction-main">{t.entity_transaction}</div>
			{#if transactionsCount}
				<div class="counter">{transactionsCount}</div>
			{/if}
		</div>
		<div
			class="menu-item truck {path == trucksPath ? 'active' : ''}"
			on:click={() => {
				gotoPage(trucks);
			}}
		>
			<div class="truck-main">{t.entity_truck}</div>
			{#if trucksCount}
				<div class="counter">{trucksCount}</div>
			{/if}
		</div>
		<div
			class="menu-item trailer {path == trailerPath ? 'active' : ''}"
			on:click={() => {
				gotoPage(trailers);
			}}
		>
			<div class="trailer-main">{t.entity_trailer}</div>
			{#if trailerCount}
				<div class="counter">{trailerCount}</div>
			{/if}
		</div>
		<div
			class="menu-item cmr {path == cmrPath ? 'active' : ''}"
			on:click={() => {
				gotoPage(cmrs);
			}}
		>
			<div class="trailer-main">{t.entity_cmr}</div>
			{#if cmrCount}
				<div class="counter">{cmrCount}</div>
			{/if}
		</div>
		<div
			class="menu-item driver {path == driversPath ? 'active' : ''}"
			on:click={() => {
				gotoPage(trailers);
			}}
		>
			<div class="driver-main">{t.entity_driver}</div>
			{#if driverCount}
				<div class="counter">{driverCount}</div>
			{/if}
		</div>
	</div>
	<div class="bottom-menu">
		<div class="settings-link" on:click={gotoSettings}>
			<div class="icon settings-link-icon"><SettingsIcon /></div>
			<div class="text">{t.menu_settings}</div>
		</div>
		<div class="logout-link" on:click={logout}>
			<div class="icon"><LogoutIcon /></div>
			<div class="text">{t.menu_logout_link}</div>
		</div>
	</div>
</div>

<style>
	.menu {
		display: flex;
		flex-direction: column;
		background-color: white;
		height: 100vh;
		width: 250px;
		left: 0px;

		font-family: 'Poppins';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 40px;
		/* or 250% */

		letter-spacing: 1px;

		color: #3d5a80;
	}

	.firms-container {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 23px;
		line-height: 34px;
		letter-spacing: 1px;

		color: #3d5a80;
	}

	.current-firm {
		padding: 15px 18px;
		background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);

		display: flex;
		justify-content: space-between;
	}

	.rotate {
		margin-bottom: -5px;
		transform: rotateZ(180deg);
	}

	.firms-list {
		padding: 10px 0px;
	}

	.firm {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 27px;

		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 19px;
		line-height: 40px;
		/* or 211% */

		text-align: center;
		letter-spacing: 1px;

		color: #3d5a80;
	}

	.counter {
		background: #98c1d9;
		border-radius: 20px;
		width: 42.99px;
		height: 19.2px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 5px;

		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		font-size: 13px;
		line-height: 11px;
		/* or 85% */

		text-align: center;

		color: #edf5ff;
	}

	.add-firm-button {
		display: flex;
		justify-content: center;
		border-bottom: 0.2px solid rgba(41, 50, 65, 0.3);
		padding-bottom: 10px;

		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 17px;
		line-height: 40px;
		/* or 235% */

		text-align: center;
		letter-spacing: 1px;

		color: #3d5a80;
	}

	.second-container {
		padding: 10px 25px 15px 25px;
		border-bottom: 0.2px solid rgba(41, 50, 65, 0.3);
	}

	.menu-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}

	.pocket {
	}

	.messages {
		margin-top: 5px;
	}

	.menu-container {
		padding: 10px 25px 15px 25px;
	}

	.bottom-menu {
		padding: 10px 25px 25px 25px;
		margin-top: auto;

		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 40px;
		/* or 250% */

		letter-spacing: 1px;

		color: #3d5a80;
	}

	.settings-link {
		display: flex;
		align-items: center;
	}

	.logout-link {
		display: flex;
		align-items: center;
		padding: 5px 0px;
	}

	.icon {
		margin-right: 10px;
		display: flex;
		align-items: center;
	}

	.settings-link-icon {
		margin-right: 15px;
	}

	.text {
		margin-top: -2px;
	}

	.active {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 600;
		font-size: 16px;
		line-height: 40px;
		/* or 250% */

		letter-spacing: 1px;

		color: #718196;
	}
</style>
