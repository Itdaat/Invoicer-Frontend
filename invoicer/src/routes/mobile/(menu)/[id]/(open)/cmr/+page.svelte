<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { deleteCmr, getCmr, updateCmr } from '$lib/api/server/cmr';
	import DeleteIcon from '$lib/assets/icons/DeleteIcon.svelte';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import ChangeEntity from '$lib/mobile/components/ChangeEntity.svelte';
	import GlobalMessages from '$lib/mobile/components/GlobalMessages.svelte';
	import ListItem from '$lib/mobile/components/ListItem.svelte';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import MiniMenu from '$lib/mobile/templates/MiniMenu.svelte';
	import LanguageStore from '$lib/stores/Language';
	import { cmr, entityIsUsed, mobile, mobileCmrs, unreachableError } from '../../../../../../consts';

	export let title = '';
	$: t = $LanguageStore;
	const id = $page.params.id;

	/** @type {import('../../../../../../types/Response').ResponseStatus}*/
	let gotoUpdateCmrStatus = 'none';

	const getCmrFormatted = async () => {
		const cmrRes = await getCmr($page.params.id);
		if (cmrRes.error) {
			return;
		}
		const cmr = cmrRes.result[0];
		if (!cmr) {
			goto(mobileCmrs);
			openErrorMessage(t.cmr_wrong_person);
			return;
		}
		title = cmr.externalNumber;
		return cmr;
	};

	const deletePersonClick = async () => {
		const result = await deleteCmr(id);
		if (result.error?.code == entityIsUsed.code) {
			openErrorMessage(t.cmr_is_used);
			return;
		}
		if (result.error?.code == unreachableError.code) {
			openErrorMessage(t.message_unreachable_error);
			return;
		}
		goto(mobileCmrs);
		openSuccessMessage(t.cmr_deleted_successfully);
	};

	const gotoUpdateCmr = async () => {
		gotoUpdateCmrStatus = 'inProcess';
		const result = await updateCmr(id);
		gotoUpdateCmrStatus = 'done';
		if (result.error?.code == entityIsUsed.code) {
			openErrorMessage(t.cmr_is_used);
			return;
		}
		if (result.error?.code == unreachableError.code) {
			openErrorMessage(t.message_unreachable_error);
			return;
		}
		localStorage.setItem('create_title', t.cmr_title);
		goto(mobile + '/' + id + '/update' + cmr);
	};
</script>

<MiniMenu {title}>
	<div class="actions" slot="actions">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="action-item" on:click={deletePersonClick}>
			<DeleteIcon />
			<div class="actions-item-title">{t.cmr_delete_title}</div>
		</div>
	</div>
	<div class="main" slot="main">
		{#await getCmrFormatted()}
			<div class="loader-container">
				<Loader type="circle" colorTheme="dark" status="inProcess" size="70" />
			</div>
		{:then cmr}
			<MiniCategory title={t.cmr_main}>
				<ListItem name={t.cmr_external_number} value={cmr?.externalNumber} messageText={t.cmr_copied_external_number} />
			</MiniCategory>
		{/await}
	</div>
</MiniMenu>
<ChangeEntity onClick={gotoUpdateCmr} status={gotoUpdateCmrStatus} />

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
