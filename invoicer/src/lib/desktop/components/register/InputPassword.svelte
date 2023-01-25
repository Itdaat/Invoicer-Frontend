<script>
	import { slide, fade } from 'svelte/transition';
	import ClosedEyeIcon from '../../../assets/icons/ClosedEyeIcon.svelte';
	import EyeIcon from '$lib/assets/icons/EyeIcon.svelte';
	import PasswordIcon from '$lib/assets/icons/PasswordIcon.svelte';

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
	let success = false,
		error = false;
	$: success = status == 'success';
	$: error = status == 'error';

	export let showPassword = false;
	let isFocused = false;
	// let type = 'password';
	$: type = !showPassword ? 'password' : 'text';
</script>

<div class="container">
	<div class="left">
		<PasswordIcon {status} />
	</div>
	<input
		{...{ type }}
		class="input"
		on:focus={() => {
			isFocused = true;
		}}
		on:blur={() => {
			isFocused = false;
		}}
		class:success
		class:error
		placeholder={placeHolder}
		{disabled}
		bind:value
		on:blur={onBlurFunc}
		on:focus={onFocusFunc}
	/>
	{#if isFocused}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="eye-container"
			on:click={() => {
				showPassword = !showPassword;
			}}
			on:mousedown={(e) => {
				e.preventDefault();
			}}
		>
			{#if showPassword}
				<EyeIcon {status} />
			{:else}
				<ClosedEyeIcon {status} />
			{/if}
		</div>
	{/if}
</div>
{#if status == 'error' && message != ''}
	<div class="message-container" transition:slide={{ duration: 200 }}>{message}</div>
{/if}

<style>
	.container {
		display: flex;
		justify-content: center;
	}

	.left {
		height: 100%;
		display: flex;
		align-items: center;
		padding-top: 4px;
		margin-right: -10px;
		margin-left: -7px;
	}

	.input {
		display: block;
		border: none;
		border-bottom: 0.01em solid rgba(72, 97, 129, 0.438);
		height: 80%;
		margin-left: 13px;
		padding: 2px 30px 2px 13px;

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
		margin-right: 2px;
	}

	.success {
		color: #24a731;
		border-color: #24a731 !important;
	}

	.error {
		color: #b01a1a;
		border-color: #b01a1a !important;
	}

	.eye-container {
		margin-top: 5px;
		margin-left: -30px;
		margin-right: 8px;
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
	}

	@media only screen and (max-width: 350px) {
		.input {
			width: 50%;
			min-width: 100px;
		}
	}
</style>
