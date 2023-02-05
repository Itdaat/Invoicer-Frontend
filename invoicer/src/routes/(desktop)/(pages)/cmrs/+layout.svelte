<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getCmrAllFields } from '$lib/api/server/cmr';
	import { getTrailersAllFields } from '$lib/api/server/transport';
	import FilterPopup from '$lib/desktop/components/FilterPopup.svelte';
	import ListContainer from '$lib/desktop/components/ListContainer.svelte';
	import ListItems from '$lib/desktop/components/ListItems.svelte';
	import MiniCategory from '$lib/desktop/components/MiniCategory.svelte';
	import MainPageTemplate from '$lib/desktop/templates/MainPageTemplate.svelte';
	import PageTemplate from '$lib/desktop/templates/PageTemplate.svelte';
	import CmrFilter from '$lib/mobile/components/filters/CmrFilter.svelte';
	import TrailerFilter from '$lib/mobile/components/filters/TrailerFilter.svelte';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import { slide } from 'svelte/transition';
	import { cmrs } from '../../../../consts';

	$: filter = $FilterStore;
	$: t = $LanguageStore;

	$: id = $page.params.id;

	let showFilter = false;

	/**
	 * @param {import('../../../../types/Entities').CMR} filters
	 * @returns {Promise<import('../../../../types/Entities').CMR[]>}
	 */
	const getCmrsFormatted = async (filters) => {
		return (await getCmrAllFields(filters)).result;
	};

	$: cmrsApi = getCmrsFormatted(filter);
	$: if ($page.url.pathname == cmrs) {
		cmrsApi = getCmrsFormatted(filter);
	}
	/** @param {string} id*/
	const gotoCmr = (id) => {
		goto(cmrs + '/' + id);
	};
</script>

<PageTemplate>
	<ListContainer slot="left">
		<MiniCategory title={t.cmr_many_titles} filter bind:showFilter>
			{#await cmrsApi}
				<Loader status="inProcess" />
			{:then cmrs}
				<ListItems animate={cmrs.length < 10}>
					{#each cmrs as cmr}
						<div class="trailer-container" class:active={id == cmr.id}>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								class="trailer"
								on:click={() => {
									gotoCmr(cmr.id);
								}}
							>
								<div class="license">{cmr.externalNumber}</div>
								<!-- {#if cmr.}
									<div class="brand">{cmr.brandName}</div>
								{/if} -->
							</div>
						</div>
					{/each}
				</ListItems>
			{/await}
		</MiniCategory>
		{#if showFilter}
			<FilterPopup bind:showFilter>
				<CmrFilter />
			</FilterPopup>
		{/if}
	</ListContainer>
	<MainPageTemplate slot="main"><slot /></MainPageTemplate>
</PageTemplate>

<style>
	.trailer {
		display: flex;
		/* grid-template-columns: 1fr 1fr; */
		justify-content: space-between;
		align-items: center;
		width: 84%;
		margin-left: -20px;
		border-top: 0.2px solid rgba(54, 56, 59, 0.233);
		padding: 18px 10px;
	}

	.main {
		width: 100%;
	}

	/* .trailer:last-of-type {
		border-top: 0.2px solid rgba(54, 56, 59, 0.233);
		border-bottom: 0.2px solid rgba(54, 56, 59, 0.233);
	} */

	.trailer-container {
		display: flex;
		justify-content: center;
		transition: all 5s;
		transition: background 1s;
		user-select: none;
		cursor: pointer;
		padding: 0px 5px 0px 12px;
	}

	.active {
		width: 100%;
		background: rgba(61, 90, 128, 0.1);
		/* padding-right: 20px; */
		/* padding-left: 300px; */
		margin-left: -17px;
		/* padding-right: 10px; */
		color: #3f3f57;
	}
</style>
