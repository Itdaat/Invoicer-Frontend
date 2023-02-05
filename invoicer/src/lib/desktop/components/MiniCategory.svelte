<script>
	import OpenFilterButton from '$lib/assets/icons/OpenFilterButton.svelte';
	import SmallFilterIcon from '$lib/assets/icons/SmallFilterIcon.svelte';
	import { slide } from 'svelte/transition';

	export let title = '';
	export let filter = false;
	export let showFilter = false;

	const changeFilterStatus = () => {
		showFilter = !showFilter;
	};
</script>

<div class="main">
	<div class="title-container">
		<div class="title">{title}</div>
		{#if filter}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div class="filter" on:click={changeFilterStatus}><SmallFilterIcon /></div>
		{/if}
	</div>
	<div class="category-container">
		<slot />
	</div>
</div>

<style>
	.main {
		width: 100%;
	}
	.title-container {
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 0px 20px;
		margin-top: 20px;
		margin-bottom: 30px;
	}
	.filter {
		margin-bottom: -10px;
		padding-right: 10px;
	}
	.title {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		font-size: 20px;
		line-height: 19px;
		/* identical to box height */

		letter-spacing: 1px;

		/* icons */

		color: #3d5a80;
	}
	.category-container {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-top: 14px;
		/* padding: 0px 5px 0px 12px; */
	}
</style>
