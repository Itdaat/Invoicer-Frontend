<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { deleteTrailer, getTrucks, updateTruck } from '$lib/api/server/transport';
	import DeleteIcon from '$lib/assets/icons/DeleteIcon.svelte';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import ChangeEntity from '$lib/mobile/components/ChangeEntity.svelte';
	import GlobalMessages from '$lib/mobile/components/GlobalMessages.svelte';
	import ListItem from '$lib/mobile/components/ListItem.svelte';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import MiniMenu from '$lib/mobile/templates/MiniMenu.svelte';
	import LanguageStore from '$lib/stores/Language';
	import {
		entityIsUsed,
		mobile,
		mobileTrucks,
		truck,
		unreachableError
	} from '../../../../../../consts';

	export let title = '';
	$: t = $LanguageStore;
	const id = $page.params.id;

	const getTrailerFormatted = async () => {
		const trailerRes = await getTrucks($page.params.id);
		if (trailerRes.error) {
			return;
		}
		const trailer = trailerRes.result[0];
		if (!trailer) {
			goto(mobileTrucks);
			openErrorMessage(t.truck_wrong_trailer);
			return;
		}
		title = trailer.licenseNumber;
		return trailer;
	};

	const deletePersonClick = async () => {
		const result = await deleteTrailer(id);
		if (result.error?.code == entityIsUsed.code) {
			openErrorMessage(t.truck_is_used_error);
			return;
		}
		if (result.error?.code == unreachableError.code) {
			openErrorMessage(t.message_unreachable_error);
			return;
		}
		goto(mobileTrucks);
		openSuccessMessage(t.truck_deleted_successfully);
	};

	const gotoUpdateTrailer = async () => {
		const result = await updateTruck(id);
		if (result.error?.code == entityIsUsed.code) {
			openErrorMessage(t.truck_is_used_error);
			return;
		}
		if (result.error?.code == unreachableError.code) {
			openErrorMessage(t.message_unreachable_error);
			return;
		}
		localStorage.setItem('create_title', t.truck_update);
		goto(mobile + '/' + id + '/update' + truck);
	};
</script>

<MiniMenu {title}>
	<div class="actions" slot="actions">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="action-item" on:click={deletePersonClick}>
			<DeleteIcon />
			<div class="actions-item-title">{t.truck_delete_title}</div>
		</div>
	</div>
	<div class="main" slot="main">
		{#await getTrailerFormatted()}
			<div class="loader-container">
				<Loader type="circle" colorTheme="dark" status="inProcess" size="70" />
			</div>
		{:then trailer}
			<MiniCategory title={t.truck_main}>
				<ListItem
					name={t.truck_license}
					value={trailer?.licenseNumber}
					messageText={t.truck_copied_license}
				/>
				<ListItem
					name={t.truck_brand}
					value={trailer?.brandName}
					messageText={t.truck_copied_brand}
				/>
			</MiniCategory>
		{/await}
	</div>
</MiniMenu>
<ChangeEntity onClick={gotoUpdateTrailer} />
<GlobalMessages />

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

	.loader-container {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 50px;
	}

	.action-item {
		display: flex;
		align-items: center;
		width: 90%;
		margin-left: 20px;
		margin-top: 3px;
	}

	.actions {
		width: 100%;
	}

	.main {
		user-select: none;
	}
</style>
