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
		display: grid;
		grid-template-columns: 45% 55%;
		/* margin: 14px 0px; */
		margin-bottom: 14px;
		margin-top: 10px;
		justify-content: center;
		/* align-items: flex-start; */
		/* padding: 0px 30px; */
		max-width: 90%;
		width: 90%;
	}
	.left {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 400;
		font-size: 15px;
		line-height: 22px;
		/* identical to box height */

		display: flex;
		align-items: center;

		color: #4f6c8d;
		margin-left: 13px;
	}

	.right {
		margin-right: 15px;
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 15px;
		line-height: 22px;
		/* identical to box height */

		display: flex;
		align-items: center;
		justify-content: flex-end;
		text-align: right;

		color: #092058;
		letter-spacing: 1px;
	}
</style>
