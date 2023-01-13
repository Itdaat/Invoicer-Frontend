<script>
	import { createTruck } from '$lib/api/server/transport';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import MobileHeaderMini from '$lib/mobile/components/MobileHeaderMini.svelte';
	import SaveEntity from '$lib/mobile/components/SaveEntity.svelte';
	import LanguageStore from '$lib/stores/Language';
	import Input from '$lib/templates/Input.svelte';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { entityAlreadyExists, notLatinSymbol, TRANSPORT_TRUCK } from '../../../../../consts';

	$: t = $LanguageStore;

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

		const result = await createTruck(name, license, brand, TRANSPORT_TRUCK);
		licenseStatus = 'ordinary';
		if (result.error?.code == notLatinSymbol.code) {
			licenseText = t.transport_create_license_latin_error;
			licenseStatus = 'error';
		} else if (result.error?.code == entityAlreadyExists.code) {
			licenseText = t.transport_create_license_exists_error;
			licenseStatus = 'error';
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
	<SaveEntity {save} />
</div>

<style>
	.main {
		width: 100%;
		padding-top: 20px;
	}
</style>
