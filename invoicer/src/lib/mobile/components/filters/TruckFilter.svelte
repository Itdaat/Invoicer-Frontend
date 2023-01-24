<script>
	import { getTrailersAllFields, getTrucksAllFields } from '$lib/api/server/transport';
	import FilterStore from '$lib/stores/FilterStore';
	import FilterStoreHelper from '$lib/stores/FilterStoreHelper';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { onMount } from 'svelte';
	import MiniCategory from '../MiniCategory.svelte';

	let mounted = false;

	$: t = $LanguageStore;
	$: filter = $FilterStore;
	$: filterStoreHelper = $FilterStoreHelper;
	// const filters = JSON.parse(localStorage.getItem('filter') || '{}');

	/** @type {string} */
	let license;

	/** @type {string}*/
	let brand;

	onMount(async () => {
		license = filter.license;
		brand = filter.brand;
		getTrucksFormatted({ licenseNumber: license, brand }).then((res) => {
			// @ts-ignore
			FilterStoreHelper.set({ count: res.length });
		});
		mounted = true;
	});

	/**
	 * @param {{ brand?: any; licenseNumber?: any; }} filters
	 */
	const getTrucksFormatted = async (filters) => {
		return (await getTrucksAllFields({ ...filters })).result;
	};

	$: if (filterStoreHelper.cleared) {
		license = null;
		brand = null;
		filterStoreHelper.cleared = false;
	}

	$: {
		license = license == '' ? null : license;
		brand = brand == '' ? null : brand;

		// console.log(filters);
		if ((license == filter.license && brand == filter.brand) || !mounted) {
		} else {
			FilterStore.set({ license, brand });
			// @ts-ignore
			getTrucksFormatted({ licenseNumber: license, brand }).then((res) => {
				FilterStoreHelper.set({ count: res.length });
			});
		}
	}
</script>

<div class="main">
	<MiniCategory title={t.trailer_main}>
		<LabeledInput
			bind:value={license}
			label={t.transport_create_license}
			placeHolder={t.transport_create_license}
		/>
		<LabeledInput
			bind:value={brand}
			label={t.transport_create_brand}
			placeHolder={t.transport_create_brand}
			message={t.transport_create_empty}
		/>
	</MiniCategory>
</div>

<style>
	.main {
		width: 100%;
		flex-direction: column;
		margin-left: -10px;
		margin-top: -10px;
	}
</style>
