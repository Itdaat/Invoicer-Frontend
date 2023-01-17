<script>
	import { goto } from '$app/navigation';
	import { createCmr } from '$lib/api/server/cmr';
	import { openErrorMessage } from '$lib/helpers/message';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import SaveEntity from '$lib/mobile/components/SaveEntity.svelte';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';

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
		const result = await createCmr(externalNumber);
		if (result.error != null) {
			openErrorMessage(t.message_server_error, t.message_ok_button);
		} else {
			goto('mobile/cmrs');
		}
	};
</script>

<div class="main">
	<MiniCategory title={t.title_cmr}>
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
