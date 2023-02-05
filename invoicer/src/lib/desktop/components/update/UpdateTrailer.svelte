<script>
	import { page } from '$app/stores';
	import { createTrailer, updateTrailer } from '$lib/api/server/transport';
	import CreatePopup from '$lib/desktop/templates/CreatePopup.svelte';
	import UpdatePopup from '$lib/desktop/templates/UpdatePopup.svelte';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { entityAlreadyExists, notLatinSymbol, unreachableError } from '../../../../consts';

	/**
	 * @type {boolean}
	 */
	export let show;
	export let done = false;

	$: id = $page.params.id;
	$: t = $LanguageStore;

	/** @type {string | null}*/
	let brand = null;

	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let brandStatus = 'ordinary';

	const save = async () => {
		if (!brand) {
			brandStatus = 'error';
			return;
		}
		console.log(brand);
		const result = await updateTrailer(id, brand);
		if (result.error != null) {
			openErrorMessage(t.message_server_error);
			return;
		}
		// FilterStore.set({ ...$FilterStore });
		openSuccessMessage(t.trailer_updated_successfully);
		show = false;
		done = true;
	};
</script>

<UpdatePopup bind:show {save} title={t.trailer_update}>
	<div class="main">
		<MiniCategory title={t.transport_create_category}>
			<LabeledInput
				bind:value={brand}
				status={brandStatus}
				label={t.transport_create_brand}
				placeHolder={t.transport_create_brand}
				message={t.transport_create_empty}
			/>
		</MiniCategory>
	</div>
</UpdatePopup>
