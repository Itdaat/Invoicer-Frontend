<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { deleteTrailer, getTrailers } from '$lib/api/server/transport';
	import SmallDeleteIcon from '$lib/assets/icons/SmallDeleteIcon.svelte';
	import SmallPencilIcon from '$lib/assets/icons/SmallPencilIcon.svelte';
	import ListItem from '$lib/desktop/components/ListItem.svelte';
	import UpdateTrailer from '$lib/desktop/components/update/UpdateTrailer.svelte';
	import ConfirmPopup from '$lib/desktop/templates/ConfirmPopup.svelte';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import { cmrs, entityIsUsed, mobileTrailers, trailers, unreachableError } from '../../../../../consts';
	import { fade } from 'svelte/transition';
	import { deleteCmr, getCmr, updateCmr } from '$lib/api/server/cmr';
	import UpdateCmr from '$lib/desktop/components/update/UpdateCmr.svelte';

	$: t = $LanguageStore;
	/** @type {string} */
	$: id = $page.params.id;

	let updated = false;
	/** @type {boolean | null}*/
	let confirmed = false;
	let showDelete = false;

	/**
	 * @param {string} id
	 * @param {boolean | null} updated
	 * @returns {Promise<import('../../../../../types/Entities').CMR>}
	 */
	const getCMRFormatted = async (id, updated) => {
		if (updated) {
			deleteCmrFun();
		}
		return (await getCmr(id)).result[0];
	};

	const openUpdateTrailer = async () => {
		showUpdate = !showUpdate;
	};

	const deleteCmrFun = async () => {
		const result = await deleteCmr(id);
		if (result.error?.code == entityIsUsed.code) {
			openErrorMessage(t.cmr_is_used);
			return;
		}
		if (result.error?.code == unreachableError.code) {
			openErrorMessage(t.message_unreachable_error);
			return;
		}
		goto(cmrs);
		confirmed = false;
		openSuccessMessage(t.cmr_deleted_successfully);
	};

	const openDeleteTrailer = async () => {
		showDelete = !showDelete;
	};

	let showUpdate = false;

	$: cmrsApi = getCMRFormatted(id, confirmed);
	$: if (updated) {
		updated = false;
		cmrsApi = getCMRFormatted(id, confirmed);
		FilterStore.set({ ...$FilterStore });
	}
</script>

<!-- <MainPageTemplate> -->
{#await cmrsApi}
	<Loader />
{:then cmr}
	<div class="container" in:fade={{ duration: 300, delay: 200 }} out:fade={{ duration: 200 }}>
		<div class="header">
			<div class="title">{cmr?.externalNumber}</div>
			<div class="right">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="icon delete" on:click={openDeleteTrailer}><SmallDeleteIcon /></div>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="icon update" on:click={openUpdateTrailer}><SmallPencilIcon /></div>
			</div>
		</div>
		<div class="main">
			<div class="main-container">
				<ListItem name={t.cmr_external_number} value={cmr?.externalNumber} messageText={t.cmr_copied_external_number} />
			</div>
			<!-- <MiniCategory title={t.trailer_main}> -->
			<!-- </MiniCategory> -->
		</div>
	</div>
	<UpdateCmr bind:show={showUpdate} bind:done={updated} />
	<ConfirmPopup
		bind:confirmed
		bind:show={showDelete}
		title={t.cmr_delete_confirm_title}
		confirmText={t.cmr_delete_confirm_button}
		rejectText={t.cmr_delete_reject_button}
		description={t.cmr_delete_confirm_description}
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
