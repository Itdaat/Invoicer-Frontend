<script>
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { onMount } from 'svelte';
	import ListItem from '../ListItem.svelte';
	import MiniCategory from '../MiniCategory.svelte';

	$: t = $LanguageStore;
	$: filters = $FilterStore;

	let mounted = false;

	onMount(async () => {
		externalNumber = filters?.externalNumber;
		mounted = true;
	});

	/** @type {string | null} */
	let externalNumber;

	$: {
		externalNumber = externalNumber == '' ? null : externalNumber;

		if (externalNumber == filters.externalNumber || !mounted) {
		} else {
			FilterStore.set({ externalNumber });
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
