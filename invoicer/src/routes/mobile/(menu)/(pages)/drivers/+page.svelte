<script>
	import { goto } from '$app/navigation';
	import { getPersonAllFields } from '$lib/api/server/persons';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import MiniCategoryLite from '$lib/mobile/components/MiniCategoryLite.svelte';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import { quartInOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	$: filter = $FilterStore;
	$: t = $LanguageStore;

	const getDriversFormatted = async (filters) => {
		return await getPersonAllFields({
			...filters
		});
	};

	$: driversFormatted = getDriversFormatted(filter);

	const gotoDriver = (/** @type {number} */ id) => {
		goto(`/mobile/${id}/driver`);
	};
</script>

<div class="main">
	<MiniCategoryLite title={t.person_many}>
		{#await driversFormatted}
			<div class="loader-container">
				<Loader status="inProcess" size="60" />
			</div>
		{:then persons}
			{#each persons as person}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="person ripple"
					in:slide={{ duration: 700, easing: quartInOut }}
					on:click={() => {
						gotoDriver(person.id);
					}}
				>
					<div class="license">{person.nickname}</div>
					<div class="brand">{person.firstName}-{person.lastName}</div>
				</div>
			{/each}
		{/await}
	</MiniCategoryLite>
</div>

<style>
	.main {
		padding-top: 27px;
		padding-bottom: 5px;
		overflow-y: scroll;
		user-select: none;
	}

	.person {
		display: flex;
		/* grid-template-columns: 1fr 1fr; */
		justify-content: space-between;
		align-items: center;
		width: 80%;
		border-bottom: 0.2px solid rgba(54, 56, 59, 0.233);
		padding: 18px 10px;
	}

	.loader-container {
		margin-top: 20px;
	}

	.license {
		text-align: center;
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 23px;
		letter-spacing: 2px;

		color: #5e5e75;
	}

	.brand {
		text-align: center;
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		font-size: 13px;
		line-height: 15px;
		letter-spacing: 1px;

		color: #6e6e8b;
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
