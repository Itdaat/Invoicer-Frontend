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

	let license = '',
		brand = '',
		name = '';

	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let licenseStatus = 'ordinary';
	/**
	 * @type {string}
	 */
	let licenseText;

	const save = async () => {
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
	<!-- <MiniCategory title={t.transport_create_license}> -->
	<LabeledInput bind:value={name} label={t.transport_create_name} placeHolder="super text" />
	<LabeledInput
		bind:value={license}
		status={licenseStatus}
		label={t.transport_create_license}
		message={licenseText}
		placeHolder="super text"
	/>
	<LabeledInput bind:value={brand} label={t.transport_create_brand} placeHolder="super text" />
	<!-- </MiniCategory> -->
	<SaveEntity {save} />
</div>

<style>
	.main {
		width: 100%;
	}
</style>
