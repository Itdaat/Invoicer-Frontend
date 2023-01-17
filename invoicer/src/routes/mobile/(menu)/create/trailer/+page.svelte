<script>
	import { goto } from '$app/navigation';
	import { createTrailer, createTruck } from '$lib/api/server/transport';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import GlobalMessage from '$lib/mobile/components/GlobalMessage.svelte';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import SaveEntity from '$lib/mobile/components/SaveEntity.svelte';
	import GlobalMessageStore from '$lib/stores/GlobalMessage';
	import LanguageStore from '$lib/stores/Language';
	import SliderStore from '$lib/stores/Slides';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import {
		entityAlreadyExists,
		notLatinSymbol,
		TRANSPORT_TRAILER,
		unreachableError
	} from '../../../../../consts';

	$: t = $LanguageStore;
	/** @type {import('src/types/Response').ResponseStatus}*/
	let responseStatus = 'none';

	/** @type {string | null}*/
	let license = null;
	/** @type {string | null}*/
	let brand = null;
	/** @type {string | null}*/
	let name = null;

	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let licenseStatus = 'ordinary';
	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let nameStatus = 'ordinary';
	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let brandStatus = 'ordinary';

	/**
	 * @type {string}
	 */
	let licenseText;

	const save = async () => {
		nameStatus = name ? 'ordinary' : 'error';
		brandStatus = brand ? 'ordinary' : 'error';

		if (!license) {
			licenseText = t.transport_create_empty;
			licenseStatus = 'error';
		}

		if (!name || !license || !brand) {
			return;
		}
		responseStatus = 'inProcess';
		const result = await createTrailer(name, license, brand).then((res) => {
			responseStatus = 'done';
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
			goto('/mobile/trailers');
			openSuccessMessage(t.transport_create_success, t.message_ok_button);
		}
	};
</script>

<div class="main">
	<MiniCategory title={t.transport_create_category}>
		<LabeledInput
			bind:value={name}
			status={nameStatus}
			label={t.transport_create_name}
			message={t.transport_create_empty}
			placeHolder={t.transport_create_name}
		/>
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
	<SaveEntity {save} status={responseStatus} />
	<!-- <GlobalMessage
		buttonAction={message}
		buttonText={'super'}
		message="asdf"
		status={messageStatus}
	/> -->
</div>

<style>
	.main {
		width: 100%;
	}
</style>
