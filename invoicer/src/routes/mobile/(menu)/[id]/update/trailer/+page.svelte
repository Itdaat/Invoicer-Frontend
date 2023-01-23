<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getCmr, updateCmr } from '$lib/api/server/cmr';
	import { getTrailers, updateTrailer } from '$lib/api/server/transport';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import SaveEntity from '$lib/mobile/components/SaveEntity.svelte';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { onMount } from 'svelte';
	import { mobileCmrs } from '../../../../../../consts';

	const id = $page.params.id;

	$: t = $LanguageStore;
	/** @type {import('src/types/Response').ResponseStatus}*/
	let responseStatus = 'none';

	let brand = '';
	/** @type {'ordinary' | 'success' | 'error'}*/
	let externalNumberStatus = 'ordinary';
	let externalNumberErrorMessage = '';

	const save = async () => {
		externalNumberStatus = 'ordinary';

		if (!brand) {
			externalNumberStatus = 'error';
			externalNumberErrorMessage = t.cmr_create_empty;
			return;
		}
		responseStatus = 'inProcess';
		const result = await updateTrailer(id, brand);
		responseStatus = 'done';
		if (result.error != null) {
			openErrorMessage(t.message_server_error);
			return;
		}
		history.back();
		openSuccessMessage(t.cmr_updated_successfully);
	};

	const getTrailerFormatted = async () => {
		const trailerRes = await getTrailers($page.params.id);
		if (trailerRes.error) {
			return;
		}
		const trailer = trailerRes.result[0];
		if (!trailer) {
			goto(mobileCmrs);
			openErrorMessage(t.cmr_wrong_person);
			return;
		}
		// title = cmr.externalNumber;
		brand = trailer.brandName;
		return trailer;
	};

	onMount(() => {
		getTrailerFormatted();
	});
</script>

<div class="main">
	<MiniCategory title={t.trailer_main}>
		<LabeledInput
			bind:value={brand}
			status={externalNumberStatus}
			label={t.trailer_brand}
			placeHolder={t.transport_create_brand}
		/>
	</MiniCategory>
	<SaveEntity {save} status={responseStatus} />
</div>

<style>
	.main {
		width: 100%;
	}
</style>
