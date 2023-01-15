<script>
	import { closeMessage } from '$lib/helpers/message';

	export let message = '';
	export let buttonText = '';
	/** @type {Function}*/
	export let buttonAction = closeMessage;
	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	export let status = 'ordinary';
</script>

<!-- {#if status == 'error' || status == 'success'} -->
<div class="main" class:hide={status == 'ordinary'}>
	<div class="message" class:error={status == 'error'} class:success={status == 'success'}>
		{message}
	</div>
	<div class="button-container">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="button" on:click={buttonAction}>{buttonText}</div>
	</div>
</div>

<!-- {/if} -->
<style>
	.main {
		position: fixed;
		z-index: 100;
		background-color: white;
		padding: 6px 14px;
		bottom: 20px;
		width: 80%;
		display: flex;
		justify-content: space-between;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		border-radius: 10px;
		filter: drop-shadow(0px 0px 5px rgba(37, 38, 94, 0.123));
	}

	.hide {
		display: none;
	}

	.message {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 40px;
		/* or 222% */

		text-align: center;
		letter-spacing: 2px;

		color: #3d5a80;

		margin-top: 2px;
	}

	.error {
		color: #b01a1a;
	}

	.success {
		color: #24a731;
	}

	.button-container {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 17px;
		line-height: 40px;
		/* or 235% */

		letter-spacing: 1px;

		color: #204660;
	}

	.button {
	}
</style>
