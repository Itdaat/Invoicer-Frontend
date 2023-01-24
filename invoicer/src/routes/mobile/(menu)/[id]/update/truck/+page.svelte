<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getCmr, updateCmr } from '$lib/api/server/cmr';
	import { getTrailers, getTrucks, updateTrailer, updateTruck } from '$lib/api/server/transport';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import SaveEntity from '$lib/mobile/components/SaveEntity.svelte';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { onMount } from 'svelte';
	import { mobileCmrs, mobileTrucks } from '../../../../../../consts';

	const id = $page.params.id;

	$: t = $LanguageStore;
	/** @type {import('src/types/Response').ResponseStatus}*/
	let responseStatus = 'none';

	let brand = '';
	/** @type {'ordinary' | 'success' | 'error'}*/
	let externalNumberStatus = 'ordinary';
	let errorMessage = '';

	const save = async () => {
		externalNumberStatus = 'ordinary';

		if (!brand) {
			externalNumberStatus = 'error';
			errorMessage = t.trucks_create_empty;
			return;
		}
		responseStatus = 'inProcess';
		const result = await updateTruck(id, brand);
		responseStatus = 'done';
		if (result.error != null) {
			openErrorMessage(t.message_server_error);
			return;
		}
		history.back();
		openSuccessMessage(t.trucks_updated_successfully);
	};

	const getTrailerFormatted = async () => {
		const truckRes = await getTrucks($page.params.id);
		if (truckRes.error) {
			return;
		}
		const truck = truckRes.result[0];
		if (!truck) {
			goto(mobileTrucks);
			openErrorMessage(t.truck_wrong_truck);
			return;
		}
		// title = cmr.externalNumber;
		brand = truck.brandName;
		return truck;
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
			message={errorMessage}
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
