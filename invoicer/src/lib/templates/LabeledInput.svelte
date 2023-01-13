<script>
	import { fade, slide } from 'svelte/transition';
	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	export let status = 'ordinary';
	export let value = '';
	export let disabled = false;
	export let placeHolder = '';
	export let message = '';
	export let onBlurFunc = () => {};
	export let onFocusFunc = () => {};

	export let label = '';

	let success = false,
		error = false;
	$: success = status == 'success';
	$: error = status == 'error';
</script>

<div class="container">
	<div class="left">
		<div class="label" class:success class:error>{label}</div>
	</div>
	<input
		class="input"
		class:success
		class:error
		placeholder={placeHolder}
		{disabled}
		type="text"
		bind:value
		on:blur={onBlurFunc}
		on:focus={onFocusFunc}
	/>
</div>
{#if status == 'error' && message != ''}
	<div class="message-container" transition:slide={{ duration: 200 }}>{message}</div>
{/if}

<style>
	.container {
		display: grid;
		grid-template-columns: 45% 55%;
		margin: 14px 0px;
		justify-content: center;
		align-items: flex-start;
		/* padding: 0px 30px; */
		max-width: 90%;
		width: 90%;
	}

	.left {
		height: 100%;
		display: flex;
		align-items: center;
		padding-top: 4px;
		margin-right: 20px;

		font-family: 'Istok Web';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 23px;
		letter-spacing: 1px;

		color: #3d5a80;
	}

	.input {
		display: block;
		border: none;
		height: 80%;
		border-bottom: 0.1px solid rgba(72, 97, 129, 0.631);
		margin-left: 13px;
		padding: 2px 30px 2px 13px;
		/* width: 45%; */

		font-family: 'Istok Web';
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 23px;

		letter-spacing: 1px;

		color: #3d5a80;
	}

	.input::placeholder {
		font-family: 'Istok Web';
		font-style: normal;
		font-weight: 400;
		font-size: 16.5px;
		line-height: 26px;
		letter-spacing: 1px;

		color: #6e7c8d;
	}

	.input:focus {
		border: none;
		outline: none;
		border-bottom: 0.9px solid #3d5a80;
	}

	.success {
		color: #24a731;
		border-color: #24a731 !important;
	}

	.error {
		color: #b01a1a;
		border-color: #b01a1a !important;
	}

	.message-container {
		font-family: 'Istok Web';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 23px;
		letter-spacing: 1px;

		color: #b01a1a;

		width: 100%;
		text-align: center;
		margin-top: 9px;
		/* margin-bottom: -10px; */
	}

	@media only screen and (max-width: 350px) {
		.input {
			width: 50%;
		}
	}
</style>
