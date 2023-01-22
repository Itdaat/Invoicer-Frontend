<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { createCmr, getCmr, updateCmr } from '$lib/api/server/cmr';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import SaveEntity from '$lib/mobile/components/SaveEntity.svelte';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { onMount } from 'svelte';
	import { mobileCmrs, mobileDrivers } from '../../../../../../consts';

	const id = $page.params.id;

	$: t = $LanguageStore;
	/** @type {import('src/types/Response').ResponseStatus}*/
	let responseStatus = 'none';

	let externalNumber = '';
	/** @type {'ordinary' | 'success' | 'error'}*/
	let externalNumberStatus = 'ordinary';
	let externalNumberErrorMessage = '';

	const save = async () => {
		externalNumberStatus = 'ordinary';

		if (!externalNumber) {
			externalNumberStatus = 'error';
			externalNumberErrorMessage = t.cmr_create_empty;
			return;
		}
		responseStatus = 'inProcess';
		const result = await updateCmr(id, externalNumber);
		responseStatus = 'done';
		if (result.error != null) {
			openErrorMessage(t.message_server_error, t.message_ok_button);
			return;
		}
		history.back();
		openSuccessMessage(t.cmr_updated_successfully);
	};

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
		// title = cmr.externalNumber;
		externalNumber = cmr.externalNumber;
		return cmr;
	};

	onMount(() => {
		getCmrFormatted();
	});
</script>

<div class="main">
	<MiniCategory title={t.cmr_main}>
		<LabeledInput
			bind:value={externalNumber}
			status={externalNumberStatus}
			label={t.cmr_external_number}
			message={externalNumberErrorMessage}
			placeHolder={t.cmr_external_number_placeholder}
		/>
	</MiniCategory>
	<SaveEntity {save} status={responseStatus} />
</div>

<style>
	.main {
		width: 100%;
	}
</style>
