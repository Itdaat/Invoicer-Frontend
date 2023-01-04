<script>
	import LanguageStore from '$lib/stores/Language';
	import ShareIcon from './../../../lib/assets/icons/ShareIcon.svelte';
	import { slide } from 'svelte/transition';
	import ReturnIcon from '$lib/assets/icons/ReturnIcon.svelte';
	import MoreActionsIcon from './../../../lib/assets/icons/MoreActionsIcon.svelte';
	import PrintIcon from '$lib/assets/icons/PrintIcon.svelte';
	import DeleteIcon from '$lib/assets/icons/DeleteIcon.svelte';
	export let title = 'Інвойс №1231';
	$: t = $LanguageStore;

	const returnToPage = () => {
		history.back();
	};

	let actionsActive = false;

	const openActions = () => {
		actionsActive = !actionsActive;
	};
</script>

<main>
	<div class="header">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="return" on:click={returnToPage}><ReturnIcon /></div>
		<div class="title">{title}</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="actions" on:click={openActions}><MoreActionsIcon /></div>
	</div>
	{#if actionsActive}
		<div class="actions-popup" in:slide out:slide>
			<div class="action-item">
				<ShareIcon />
				<div class="actions-item-title">{t.invoice_share_title}</div>
			</div>
			<div class="action-item">
				<PrintIcon />
				<div class="actions-item-title">{t.invoice_print_title}</div>
			</div>
			<div class="action-item">
				<DeleteIcon />
				<div class="actions-item-title">{t.invoice_delete_title}</div>
			</div>
		</div>
	{/if}
</main>

<style>
	main {
	}
	.header {
		height: 70px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #ffffff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
		padding: 0px 20px;
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
		height: 137px;

		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 2px;
	}

	.actions-item-title {
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

	.action-item {
		display: flex;
		align-items: center;
		width: 90%;
		margin-left: 20px;
		margin-top: 3px;
	}
</style>
