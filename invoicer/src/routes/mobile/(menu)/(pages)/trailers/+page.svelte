<script>
	import { getTrailers, getTrucks } from '$lib/api/server/transport';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import MiniCategoryLite from '$lib/mobile/components/MiniCategoryLite.svelte';
	import { Jumper } from 'svelte-loading-spinners';
	import { slide } from 'svelte/transition';

	const getTrucksFormatted = async () => {
		return (await getTrailers()).result;
	};
</script>

<div class="main">
	<MiniCategoryLite title="Trailers">
		{#await getTrucksFormatted()}
			<div class="loader-container">
				<Loader status="inProcess" size="60" />
			</div>
		{:then trucks}
			{#each trucks as truck}
				<div class="truck" in:slide={{ duration: 700 }}>
					<div class="license">{truck.licenseNumber}</div>
					<div class="brand">{truck.brandName}</div>
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

	.truck {
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
</style>
