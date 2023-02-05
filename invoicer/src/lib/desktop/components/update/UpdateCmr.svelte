<script>
	import { page } from '$app/stores';
	import { updateCmr } from '$lib/api/server/cmr';
	import { updateTrailer } from '$lib/api/server/transport';
	import UpdatePopup from '$lib/desktop/templates/UpdatePopup.svelte';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';

	/**
	 * @type {boolean}
	 */
	export let show;
	export let done = false;

	$: id = $page.params.id;
	$: t = $LanguageStore;

	/** @type {string | null}*/
	let externalNumber = null;

	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let externalNumberStatus = 'ordinary';

	const save = async () => {
		if (!externalNumber) {
			externalNumberStatus = 'error';
			return;
		}
		const result = await updateCmr(id, externalNumber);
		if (result.error != null) {
			openErrorMessage(t.message_server_error);
			return;
		}
		// FilterStore.set({ ...$FilterStore });
		openSuccessMessage(t.cmr_updated_successfully);
		show = false;
		done = true;
	};
</script>

<UpdatePopup bind:show {save} title={t.cmr_update_title}>
	<div class="main">
		<MiniCategory title={t.cmr_main}>
			<LabeledInput
				bind:value={externalNumber}
				status={externalNumberStatus}
				label={t.cmr_external_number}
				placeHolder={t.cmr_external_number}
				message={t.cmr_create_empty}
			/>
		</MiniCategory>
	</div>
</UpdatePopup>
