<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { deleteTrailer, getTrailers, getTrucks } from '$lib/api/server/transport';
	import SmallDeleteIcon from '$lib/assets/icons/SmallDeleteIcon.svelte';
	import SmallPencilIcon from '$lib/assets/icons/SmallPencilIcon.svelte';
	import ListItem from '$lib/desktop/components/ListItem.svelte';
	import UpdateTrailer from '$lib/desktop/components/update/UpdateTrailer.svelte';
	import ConfirmPopup from '$lib/desktop/templates/ConfirmPopup.svelte';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import { entityIsUsed, mobileTrailers, trailers, unreachableError } from '../../../../../consts';
	import { fade } from 'svelte/transition';
	import UpdateTruck from '$lib/desktop/components/update/UpdateTruck.svelte';

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
		const result = await deleteTrailer(id);
		if (result.error?.code == entityIsUsed.code) {
			openErrorMessage(t.trailer_is_used_error);
			return;
		}
		if (result.error?.code == unreachableError.code) {
			openErrorMessage(t.message_unreachable_error);
			return;
		}
		goto(trailers);
		confirmed = false;
		openSuccessMessage(t.trailer_deleted_successfully);
	};

	const openDeleteTruck = async () => {
		showDelete = !showDelete;
	};

	let showUpdate = false;

	$: truckApi = getTruckFormatted(id, confirmed);
	$: if (updated) {
		truckApi = getTruckFormatted(id, confirmed);
	}
</script>

<!-- <MainPageTemplate> -->
{#await truckApi}
	<Loader />
{:then trailer}
	<div class="container" in:fade={{ duration: 300, delay: 200 }} out:fade={{ duration: 200 }}>
		<div class="header">
			<div class="title">{trailer?.licenseNumber}</div>
			<div class="right">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="icon delete" on:click={openDeleteTruck}><SmallDeleteIcon /></div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="icon update" on:click={openUpdateTruck}><SmallPencilIcon /></div>
			</div>
		</div>
		<div class="main">
			<div class="main-container">
				<ListItem name={t.trailer_license} value={trailer?.licenseNumber} messageText={t.trailer_copied_license} />
				<ListItem name={t.trailer_brand} value={trailer?.brandName} messageText={t.trailer_copied_brand} noDataText={t.trailer_no_brand} />
			</div>
			<!-- <MiniCategory title={t.trailer_main}> -->
			<!-- </MiniCategory> -->
		</div>
	</div>
	<UpdateTruck bind:show={showUpdate} bind:done={updated} />
	<ConfirmPopup
		bind:confirmed
		bind:show={showDelete}
		title={t.trailer_delete_confirm_title}
		confirmText={t.trailer_delete_confirm_button}
		rejectText={t.trailer_delete_reject_button}
		description={t.trailer_delete_confirm_description}
	/>
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
