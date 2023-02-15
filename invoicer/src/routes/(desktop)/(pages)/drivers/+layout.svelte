<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getPersonAllFields } from '$lib/api/server/persons';
	import FilterPopup from '$lib/desktop/components/FilterPopup.svelte';
	import ListContainer from '$lib/desktop/components/ListContainer.svelte';
	import ListItems from '$lib/desktop/components/ListItems.svelte';
	import MiniCategory from '$lib/desktop/components/MiniCategory.svelte';
	import MainPageTemplate from '$lib/desktop/templates/MainPageTemplate.svelte';
	import PageTemplate from '$lib/desktop/templates/PageTemplate.svelte';
	import PersonFilter from '$lib/mobile/components/filters/PersonFilter.svelte';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import { drivers, trucks } from '../../../../consts';

	$: filter = $FilterStore;
	$: t = $LanguageStore;

	$: id = $page.params.id;

	let showFilter = false;

	const getDriversFormatted = async (filters) => {
		return await getPersonAllFields({
			...filters
		});
	};

	$: personsApi = getDriversFormatted(filter);
	$: if ($page.url.pathname == trucks) {
		personsApi = getDriversFormatted(filter);
	}
	/** @param {string} id*/
	const gotoDriver = (id) => {
		goto(drivers + '/' + id);
	};
</script>

<PageTemplate>
	<ListContainer slot="left">
		<MiniCategory title={t.person_many} filter bind:showFilter>
			{#await personsApi}
				<Loader status="inProcess" />
			{:then persons}
				<ListItems animate={persons.length < 10}>
					{#each persons as person}
						<div class="trailer-container" class:active={id == person.id}>
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								class="trailer"
								on:click={() => {
									gotoDriver(person.id);
								}}
							>
								<div class="license">{person.nickname}</div>
								<div class="brand">{person.firstName}-{person.lastName}</div>
							</div>
						</div>
					{/each}
				</ListItems>
			{/await}
		</MiniCategory>
		{#if showFilter}
			<FilterPopup bind:showFilter>
				<PersonFilter />
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
