<script>
	import { goto } from '$app/navigation';
	import { createCmr } from '$lib/api/server/cmr';
	import { createTrailer } from '$lib/api/server/transport';
	import CreatePopup from '$lib/desktop/templates/CreatePopup.svelte';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { onMount } from 'svelte';
	import { cmrs, entityAlreadyExists, notLatinSymbol, trailer, trailers, unreachableError } from '../../../../consts';

	/**
	 * @type {boolean}
	 */
	export let show;

	$: t = $LanguageStore;

	/** @type {string | null} */
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
		const result = await createCmr(externalNumber);
		if (result.error != null) {
			openErrorMessage(t.message_server_error);
			return;
		}
		FilterStore.set({});
		show = false;
		setTimeout(() => {
			externalNumber = null;
			goto(cmrs + '/' + result.result.id);
			openSuccessMessage(t.cmr_created_successfully);
		}, 500);
	};

	onMount(() => {
		externalNumber = null;
	});
</script>

<CreatePopup bind:show {save} title={t.title_trailer}>
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
	</div>
</CreatePopup>
