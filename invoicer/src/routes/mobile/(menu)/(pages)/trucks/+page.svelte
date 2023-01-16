<script>
	import { getTrucks } from '$lib/api/server/transport';
	import MiniCategoryLite from '$lib/mobile/components/MiniCategoryLite.svelte';

	const getTrucksFormatted = async () => {
		return (await getTrucks()).result;
	};
</script>

<div class="main">
	<MiniCategoryLite title="Trucks">
		{#await getTrucksFormatted()}
			Loading
		{:then trucks}
			{#each trucks as truck}
				<div class="truck">
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
		/* margin-bottom: 20px; */
		/* height: 100%; */
		overflow-y: scroll;
		user-select: none;
		/* overflow-y: scroll; */
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
