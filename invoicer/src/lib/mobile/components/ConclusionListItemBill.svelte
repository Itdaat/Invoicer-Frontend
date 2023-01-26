<script>
	import { openSuccessMessage } from '$lib/helpers/message';
	import { copy } from 'svelte-copy';

	/** @type {string} */
	export let name;
	/** @type {string | number} */
	export let value;
	/** @type {string}*/
	export let messageText;
	/** @type {string}*/
	export let noDataText = '';
	const messageDuration = 1500;

	const showMessage = () => {
		openSuccessMessage(messageText, '', messageDuration);
	};

	if (typeof value !== 'string') {
		value = value.toString();
	}
</script>

{#if value}
	<div class="list-item">
		<div class="left">{name}</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="right" use:copy={value} on:click={showMessage}>{value}</div>
	</div>
{:else}
	<div class="no-data">{noDataText}</div>
{/if}

<style>
	.no-data {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 400;
		font-size: 15px;
		line-height: 22px;
		/* identical to box height */

		display: flex;
		align-items: center;

		color: #4f6c8d;
		margin-bottom: 14px;
		margin-top: 10px;
	}
	.list-item {
		display: flex;
		justify-content: space-between;
		margin: 10px 0px;
		margin-top: 15px;
	}
	.left {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 600;
		font-size: 15px;
		line-height: 22px;
		/* identical to box height */

		display: flex;
		align-items: center;

		color: #4f6c8d;
	}

	.right {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 600;
		font-size: 15px;
		line-height: 22px;
		/* identical to box height */

		display: flex;
		align-items: center;
		text-align: right;
		letter-spacing: 1.5px;

		/* done */

		color: #24a731;
	}
</style>
