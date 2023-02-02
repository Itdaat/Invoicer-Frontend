<script>
	import { goto } from '$app/navigation';
	import { createTrailer } from '$lib/api/server/transport';
	import CreatePopup from '$lib/desktop/templates/CreatePopup.svelte';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { entityAlreadyExists, notLatinSymbol, trailer, trailers, unreachableError } from '../../../../consts';

	/**
	 * @type {boolean}
	 */
	export let show;

	$: t = $LanguageStore;

	/** @type {string | null}*/
	let license = null;
	/** @type {string | null}*/
	let brand = null;

	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let licenseStatus = 'ordinary';
	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let brandStatus = 'ordinary';

	/**
	 * @type {string}
	 */
	let licenseText;

	const save = async () => {
		brandStatus = brand ? 'ordinary' : 'error';

		if (!license) {
			licenseText = t.transport_create_empty;
			licenseStatus = 'error';
		}

		if (!license || !brand) {
			return;
		}
		// responseStatus = 'inProcess';
		const result = await createTrailer(license, brand).then((res) => {
			// responseStatus = 'done';
			return res;
		});

		licenseStatus = 'ordinary';
		if (result.error?.code == notLatinSymbol.code) {
			licenseText = t.transport_create_license_latin_error;
			licenseStatus = 'error';
		} else if (result.error?.code == entityAlreadyExists.code) {
			licenseText = t.transport_create_license_exists_error;
			licenseStatus = 'error';
		} else if (result.error?.code == unreachableError.code) {
			openErrorMessage(t.message_unreachable_error, '');
		} else {
			FilterStore.set({});
			show = false;
			setTimeout(() => {
				goto(trailers + '/' + result.result.id);
				openSuccessMessage(t.transport_create_success);
			}, 500);
		}
	};
</script>

<CreatePopup bind:show {save}>
	<div class="main">
		<MiniCategory title={t.transport_create_category}>
			<LabeledInput
				bind:value={license}
				status={licenseStatus}
				label={t.transport_create_license}
				message={licenseText}
				placeHolder={t.transport_create_license}
			/>
			<LabeledInput
				bind:value={brand}
				status={brandStatus}
				label={t.transport_create_brand}
				placeHolder={t.transport_create_brand}
				message={t.transport_create_empty}
			/>
		</MiniCategory>
	</div>
</CreatePopup>
