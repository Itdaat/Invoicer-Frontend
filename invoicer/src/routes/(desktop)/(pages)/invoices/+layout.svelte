<script>
	import { goto } from '$app/navigation';
	import { getTrailersAllFields } from '$lib/api/server/transport';
	import ListContainer from '$lib/desktop/components/ListContainer.svelte';
	import PageTemplate from '$lib/desktop/templates/PageTemplate.svelte';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import FilterStore from '$lib/stores/FilterStore';
	import { trailer, trailers } from '../../../../consts';
	import { quartInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import LanguageStore from '$lib/stores/Language';
	import MiniCategory from '$lib/desktop/components/MiniCategory.svelte';
	import FilterPopup from '$lib/mobile/components/FilterPopup.svelte';
	import TrailerFilter from '$lib/mobile/components/filters/TrailerFilter.svelte';

	$: filter = $FilterStore;
	$: t = $LanguageStore;

	let showFilter = false;

	/**
	 * @param {{ brand?: any; licenseNumber?: any; }} filters
	 */
	const getTrailersFormatted = async (filters) => {
		return (await getTrailersAllFields(filters)).result;
	};

	$: trailersApi = getTrailersFormatted(filter);

	const gotoTrailer = (id) => {
		goto(trailers + '/' + id);
	};
</script>

<PageTemplate>
	<ListContainer slot="left">
		<MiniCategory title={'Invoices'} filter bind:showFilter>
			{#await trailersApi}
				<Loader status="inProcess" />
			{:then trailers}
				{#each trailers as trailer}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="trailer ripple"
						in:slide|local={{ duration: 700, easing: quartInOut }}
						on:click={() => {
							gotoTrailer(trailer.id);
						}}
					>
						<div class="license">{trailer.licenseNumber}</div>
						<div class="brand">{trailer.brandName}</div>
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
	<div slot="main"><slot /></div>
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

	.trailer:last-of-type {
		border-top: 0.2px solid rgba(54, 56, 59, 0.233);
		border-bottom: 0.2px solid rgba(54, 56, 59, 0.233);
	}

	.ripple {
		user-select: none;
		background-position: center;
		background-size: 1000%;
		transition: background 0.8s;
	}
	.ripple:hover {
		background: #ffffff radial-gradient(circle, transparent 1%, #ffffff 1%) center/10000%;
	}
	.ripple:active {
		background-color: #c7c6c6;
		background-size: 100%;
		transition: background 0s;
	}
</style>
