<script>
	import { getCmrAllFields } from '$lib/api/server/cmr';
	import FilterStore from '$lib/stores/FilterStore';
	import FilterStoreHelper from '$lib/stores/FilterStoreHelper';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { onMount } from 'svelte';
	import ListItem from '../ListItem.svelte';
	import MiniCategory from '../MiniCategory.svelte';

	$: t = $LanguageStore;
	$: filters = $FilterStore;
	$: filterStoreHelper = $FilterStoreHelper;

	let mounted = false;

	onMount(async () => {
		externalNumber = filters?.externalNumber;
		mounted = true;
	});

	/** @type {string | null} */
	let externalNumber;

	const getCMRSFormatted = async (filters) => {
		return (await getCmrAllFields(filters)).result;
	};

	$: {
		if (filterStoreHelper.cleared) {
			externalNumber = filters?.externalNumber;
			getCMRSFormatted(filters).then((res) => FilterStoreHelper.set({ count: res.length }));
		}
	}

	$: {
		externalNumber = externalNumber == '' ? null : externalNumber;

		if (externalNumber == filters.externalNumber || !mounted) {
		} else {
			FilterStore.set({ externalNumber });
			getCMRSFormatted(filters).then((res) => FilterStoreHelper.set({ count: res.length }));
		}
	}
</script>

<div class="main">
	<MiniCategory title={t.title_cmr}>
		<LabeledInput
			bind:value={externalNumber}
			label={t.cmr_external_number}
			placeHolder={t.cmr_external_number_placeholder}
		/>
	</MiniCategory>
</div>

<style>
	.main {
		width: 100%;
		margin-top: -20px;
		margin-left: -10px;
	}
</style>
