<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getTrailersAllFields, getTrucksAllFields } from '$lib/api/server/transport';
	import ListContainer from '$lib/desktop/components/ListContainer.svelte';
	import MiniCategory from '$lib/desktop/components/MiniCategory.svelte';
	import MainPageTemplate from '$lib/desktop/templates/MainPageTemplate.svelte';
	import PageTemplate from '$lib/desktop/templates/PageTemplate.svelte';
	import FilterPopup from '$lib/mobile/components/FilterPopup.svelte';
	import TrailerFilter from '$lib/mobile/components/filters/TrailerFilter.svelte';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import { slide } from 'svelte/transition';
	import { trailers, trucks } from '../../../../consts';

	$: filter = $FilterStore;
	$: t = $LanguageStore;

	$: id = $page.params.id;

	let showFilter = false;

	/**
	 * @param {{ brand?: any; licenseNumber?: any; }} filters
	 */
	const getTrucksFormatted = async (filters) => {
		return (await getTrucksAllFields({ ...filters })).result;
	};

	$: trucksApi = getTrucksFormatted(filter);
	const gotoTruck = (id) => {
		goto(trucks + '/' + id);
	};
</script>

<PageTemplate>
	<ListContainer slot="left">
		<MiniCategory title={t.trailers_many} filter bind:showFilter>
			{#await trucksApi}
				<Loader status="inProcess" />
			{:then trucks}
				{#each trucks as trailer}
					<div class="trailer-container" class:active={id == trailer.id} in:slide={{ delay: 400 }} out:slide={{ duration: 300 }}>
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							class="trailer"
							on:click={() => {
								gotoTruck(trailer.id);
							}}
						>
							<div class="license">{trailer.licenseNumber}</div>
							{#if trailer.brandName}
								<div class="brand">{trailer.brandName}</div>
							{/if}
						</div>
					</div>
				{/each}
			{/await}
		</MiniCategory>
		{#if showFilter}
			<FilterPopup bind:showFilter>
				<TrailerFilter />
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

	/* .trailer:last-of-type {
		border-top: 0.2px solid rgba(54, 56, 59, 0.233);
		border-bottom: 0.2px solid rgba(54, 56, 59, 0.233);
	} */

	.trailer-container {
		width: 100%;
		display: flex;
		justify-content: center;
		transition: all 5s;
		transition: background 1s;
		user-select: none;
		cursor: pointer;
	}

	.active {
		background: rgba(61, 90, 128, 0.1);
		padding-right: 30px;
		color: #3f3f57;
	}
</style>
