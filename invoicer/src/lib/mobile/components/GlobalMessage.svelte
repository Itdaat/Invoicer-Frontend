<script>
	import CloseIcon from '$lib/assets/icons/CloseIcon.svelte';
	import { closeMessage } from '$lib/helpers/message';
	import { standardSwipe, swipe } from '$lib/helpers/swipe';
	import { fly } from 'svelte/transition';

	export let message = '';
	export let buttonText = '';
	export let id = 0;
	/** @type {Function}*/
	export let buttonAction = () => {};
	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	export let status = 'ordinary';

	// @ts-ignore
	const close = () => {
		closeMessage(id);
	};
</script>

<!-- {#if status == 'error' || status == 'success'} -->
<div
	class="main"
	class:hide={status == 'ordinary'}
	in:fly={{ x: -100 }}
	out:fly={{ x: 100 }}
	id={id.toString()}
>
	<div class="message" class:error={status == 'error'} class:success={status == 'success'}>
		{message}
	</div>
	<div class="button-container">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="button"
			on:click={() => {
				buttonAction();
			}}
		>
			{buttonText}
		</div>
	</div>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="close" on:click={close}>
		<CloseIcon />
	</div>
</div>

<!-- {/if} -->
<style>
	.main {
		position: absolute;
		z-index: 100;
		background-color: white;
		padding: 6px 14px;
		bottom: 30px;
		width: 80%;
		display: flex;
		justify-content: space-between;
		left: 0;
		right: 0;
		margin-left: auto;
		margin-right: auto;
		border-radius: 10px;
		box-shadow: 0px 0px 5px rgba(37, 38, 94, 0.123);
		transform: translate3d();
		user-select: none;
	}

	.close {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 22.93px;
		height: 23.53px;
		position: absolute;
		right: -10px;
		top: -10px;
		box-shadow: 0px 0px 5px rgba(37, 38, 94, 0.123);
		background-color: white;
		border-radius: 100%;
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
