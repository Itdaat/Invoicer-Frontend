<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getTrailersAllFields, getTrucksAllFields } from '$lib/api/server/transport';
	import FilterPopup from '$lib/desktop/components/FilterPopup.svelte';
	import ListContainer from '$lib/desktop/components/ListContainer.svelte';
	import ListItems from '$lib/desktop/components/ListItems.svelte';
	import MiniCategory from '$lib/desktop/components/MiniCategory.svelte';
	import MainPageTemplate from '$lib/desktop/templates/MainPageTemplate.svelte';
	import PageTemplate from '$lib/desktop/templates/PageTemplate.svelte';
	import TrailerFilter from '$lib/mobile/components/filters/TrailerFilter.svelte';
	import TruckFilter from '$lib/mobile/components/filters/TruckFilter.svelte';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import { quartInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { trucks } from '../../../../consts';

	$: filter = $FilterStore;
	$: t = $LanguageStore;

	$: id = $page.params.id;

	let showFilter = false;

	/**
	 * @param {{ brand?: any; licenseNumber?: any; }} filters
	 */
	const getTrucksFormatted = async (filters) => {
		return (await getTrucksAllFields(filters)).result;
	};

	$: trucksApi = getTrucksFormatted(filter);
	$: if ($page.url.pathname == trucks) {
		trucksApi = getTrucksFormatted(filter);
	}
	/** @param {string} id*/
	const gotoTrucks = (id) => {
		goto(trucks + '/' + id);
	};
</script>

<PageTemplate>
	<ListContainer slot="left">
		<MiniCategory title={t.trailers_many} filter bind:showFilter>
			{#await trucksApi}
				<Loader status="inProcess" />
			{:then trucks}
				<ListItems animate={trucks.length < 10}>
					{#each trucks as truck}
						<div class="trailer-container" class:active={id == truck.id}>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								class="trailer"
								on:click={() => {
									gotoTrucks(truck.id);
								}}
							>
								<div class="license">{truck.licenseNumber}</div>
								{#if truck.brandName}
									<div class="brand">{truck.brandName}</div>
								{/if}
							</div>
						</div>
					{/each}
				</ListItems>
			{/await}
		</MiniCategory>
		{#if showFilter}
			<FilterPopup bind:showFilter>
				<TruckFilter />
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
