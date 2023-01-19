<script>
	import { slide } from 'svelte/transition';
	import ReturnIcon from '$lib/assets/icons/ReturnIcon.svelte';
	import MoreActionsIcon from './../../../lib/assets/icons/MoreActionsIcon.svelte';
	import { clickOutside } from '$lib/helpers/ClickOutside';
	export let title = '';

	const returnToPage = () => {
		history.back();
	};

	let actionsActive = false;

	const openActions = () => {
		actionsActive = !actionsActive;
	};

	const clickOutsideEvent = () => {
		actionsActive = false;
	};
</script>

<main>
	<div class="header">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="return" on:click={returnToPage}><ReturnIcon /></div>
		<div class="title">{title}</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="actions" use:clickOutside on:click_outside={clickOutsideEvent}>
			<div class="actions-container" on:click={openActions}>
				<MoreActionsIcon />
			</div>
			{#if actionsActive}
				<div class="actions-popup" in:slide out:slide on:click={() => {}}>
					<slot name="actions">s</slot>
				</div>
			{/if}
		</div>
	</div>

	<div class="main">
		<slot name="main">s</slot>
	</div>
</main>

<style>
	main {
		height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;
	}
	.header {
		height: 70px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #ffffff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
		padding: 0px 20px;
		user-select: none;
	}

	.title {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 25px;
		line-height: 38px;
		/* identical to box height */

		letter-spacing: 1px;

		color: #3d5a80;

		text-transform: capitalize;
	}

	.return,
	.actions {
		margin-top: 5px;
	}

	.actions-popup {
		position: absolute;
		top: 78px;
		right: 8px;
		background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		width: 170px;
		/* height: 137px; */

		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 2px;
		padding-bottom: 7px;
		user-select: none;
	}

	:global(.actions-item-title) {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 17px;
		line-height: 40px;
		/* or 235% */

		letter-spacing: 1px;

		color: #204660;

		margin-left: 20px;
	}

	:global(.action-item) {
		display: flex;
		align-items: center;
		width: 90%;
		margin-left: 20px;
		margin-top: 3px;
	}

	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		/* align-items: center; */
	}
</style>
