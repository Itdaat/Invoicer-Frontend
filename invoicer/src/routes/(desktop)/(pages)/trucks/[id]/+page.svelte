<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { deleteTruck, getTrucks } from '$lib/api/server/transport';
	import SmallDeleteIcon from '$lib/assets/icons/SmallDeleteIcon.svelte';
	import SmallPencilIcon from '$lib/assets/icons/SmallPencilIcon.svelte';
	import ListItem from '$lib/desktop/components/ListItem.svelte';
	import UpdateTruck from '$lib/desktop/components/update/UpdateTruck.svelte';
	import ConfirmPopup from '$lib/desktop/templates/ConfirmPopup.svelte';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import { fade } from 'svelte/transition';
	import { entityIsUsed, trucks, unreachableError } from '../../../../../consts';

	$: filter = $FilterStore;
	$: t = $LanguageStore;
	/** @type {string} */
	$: id = $page.params.id;

	let updated = false;
	/** @type {boolean | null}*/
	let confirmed = null;
	let showDelete = false;

	/**
	 * @param {string} id
	 * @param {boolean | null} updated
	 * @returns {Promise<import('../../../../../types/Entities').Transport>}
	 */
	const getTruckFormatted = async (id, updated) => {
		if (updated) {
			deleteTruckFun();
		}
		return (await getTrucks(id)).result[0];
	};

	const openUpdateTruck = async () => {
		showUpdate = !showUpdate;
	};

	const deleteTruckFun = async () => {
		const result = await deleteTruck(id);
		if (result.error?.code == entityIsUsed.code) {
			openErrorMessage(t.truck_is_used_error);
			return;
		}
		if (result.error?.code == unreachableError.code) {
			openErrorMessage(t.message_unreachable_error);
			return;
		}
		goto(trucks);
		confirmed = false;
		openSuccessMessage(t.truck_deleted_successfully);
	};

	const openDeleteTruck = async () => {
		showDelete = !showDelete;
	};

	let showUpdate = false;

	$: truckApi = getTruckFormatted(id, confirmed);
	$: if (updated) {
		updated = false;
		truckApi = getTruckFormatted(id, confirmed);
		FilterStore.set({ ...$FilterStore });
	}
</script>

<!-- <MainPageTemplate> -->
{#await truckApi}
	<Loader />
{:then truck}
	<!-- <div class="container"> -->
	<div class="container" in:fade={{ duration: 300, delay: 200 }} out:fade={{ duration: 200 }}>
		<div class="header">
			<div class="title">{truck?.licenseNumber}</div>
			<div class="right">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="icon delete" on:click={openDeleteTruck}><SmallDeleteIcon /></div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="icon update" on:click={openUpdateTruck}><SmallPencilIcon /></div>
			</div>
		</div>
		<div class="main">
			<div class="main-container">
				<ListItem name={t.truck_license} value={truck?.licenseNumber} messageText={t.truck_copied_license} />
				<ListItem name={t.truck_brand} value={truck?.brandName} messageText={t.truck_copied_brand} noDataText={t.truck_no_brand} />
			</div>
		</div>
	</div>
	<UpdateTruck bind:show={showUpdate} bind:done={updated} />
	<ConfirmPopup
		bind:confirmed
		bind:show={showDelete}
		title={t.truck_delete_confirm_title}
		confirmText={t.truck_delete_confirm_button}
		rejectText={t.truck_delete_reject_button}
		description={t.truck_delete_confirm_description}
	/>
	<!-- </div> -->
{/await}

<!-- </MainPageTemplate> -->
<style>
	.header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.main-container {
		background: #ffffff;
		border-radius: 10px;
		filter: drop-shadow(0px 4px 20px rgba(37, 38, 94, 0.1));
		padding: 10px 5px;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.title {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		font-size: 30px;
		line-height: 35px;
		letter-spacing: 1px;

		color: #3d5a80;
	}

	.main {
		width: 85%;
		min-height: 50%;
		margin-top: 50px;
	}

	.icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 45px;
		height: 45px;
		margin: 0px 7px;
		filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.1));
		background-color: white;
		border-radius: 10px;

		cursor: pointer;
	}

	.right {
		display: flex;
	}

	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 100%;
		height: 100%;
	}
</style>
