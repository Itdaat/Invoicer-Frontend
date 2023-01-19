<script>
	import CheckIcon from '$lib/assets/icons/CheckIcon.svelte';
	import CloseIcon from '$lib/assets/icons/CloseIcon.svelte';
	import CloseMenuIcon from '$lib/assets/icons/CloseMenuIcon.svelte';
	import { clickOutside } from '$lib/helpers/ClickOutside';
	import LanguageStore from '$lib/stores/Language';
	import { fade } from 'svelte/transition';
	export let showFilter = true;
	$: t = $LanguageStore;

	let hideFilter = () => {
		showFilter = false;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="main" transition:fade={{ duration: 300 }}>
	<div class="container" use:clickOutside on:click_outside={hideFilter}>
		<div class="close-button icon-button">
			<CloseMenuIcon />
		</div>
		<div class="filter-button icon-button">
			<CheckIcon />
		</div>
		<div class="title">{t.filter_title}</div>
		<slot />
	</div>
</div>

<style>
	.main {
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(2px);
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 10;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container {
		background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
		position: absolute;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
		border-radius: 20px;
		padding: 15px 15px 50px 15px;
		width: 80%;
		min-height: 40%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.title {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 600;
		font-size: 22px;
		line-height: 40px;
		/* or 182% */

		letter-spacing: 1px;

		color: #3d5a80;

		margin-bottom: 20px;
	}

	.icon-button {
		width: 45px;
		height: 45px;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
	}

	.close-button {
		position: absolute;
		top: -15%;
		right: -15px;
	}

	.filter-button {
		width: 57px;
		height: 57px;
		position: absolute;
		bottom: -35%;
		right: -10px;
	}
</style>
