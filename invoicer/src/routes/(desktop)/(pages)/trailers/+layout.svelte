<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getTrailersAllFields } from '$lib/api/server/transport';
	import FilterPopup from '$lib/desktop/components/FilterPopup.svelte';
	import ListContainer from '$lib/desktop/components/ListContainer.svelte';
	import MiniCategory from '$lib/desktop/components/MiniCategory.svelte';
	import MainPageTemplate from '$lib/desktop/templates/MainPageTemplate.svelte';
	import PageTemplate from '$lib/desktop/templates/PageTemplate.svelte';
	import TrailerFilter from '$lib/mobile/components/filters/TrailerFilter.svelte';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import { slide } from 'svelte/transition';
	import { trailers } from '../../../../consts';

	$: filter = $FilterStore;
	$: t = $LanguageStore;

	$: id = $page.params.id;

	let showFilter = false;

	/**
	 * @param {{ brand?: any; licenseNumber?: any; }} filters
	 */
	const getTrailersFormatted = async (filters) => {
		return (await getTrailersAllFields(filters)).result;
	};

	$: trailersApi = getTrailersFormatted(filter);
	$: if ($page.url.pathname == trailers) {
		trailersApi = getTrailersFormatted(filter);
	}
	/** @param {string} id*/
	const gotoTrailer = (id) => {
		goto(trailers + '/' + id);
	};
</script>

<PageTemplate>
	<ListContainer slot="left">
		<MiniCategory title={t.trailers_many} filter bind:showFilter>
			{#await trailersApi}
				<Loader status="inProcess" />
			{:then trailers}
				<div class="main" in:slide={{ delay: 400 }} out:slide={{ duration: 300 }}>
					{#each trailers as trailer}
						<div class="trailer-container" class:active={id == trailer.id}>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								class="trailer"
								on:click={() => {
									gotoTrailer(trailer.id);
								}}
							>
								<div class="license">{trailer.licenseNumber}</div>
								{#if trailer.brandName}
									<div class="brand">{trailer.brandName}</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
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
