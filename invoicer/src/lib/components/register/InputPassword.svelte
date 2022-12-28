<script>
	import ClosedEyeIcon from '../../assets/icons/ClosedEyeIcon.svelte';
	import EyeIcon from '$lib/assets/icons/EyeIcon.svelte';
	import PasswordIcon from '$lib/assets/icons/PasswordIcon.svelte';

	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	export let status = 'ordinary';
	export let value = '';
	export let disabled = false;
	export let placeHolder = '';
	let success = false,
		error = false;
	$: success = status == 'success';
	$: error = status == 'error';

	let showPassword = false;
	let isFocused = false;
	let type = 'password';
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
	/>
	{#if isFocused}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="eye-container"
			on:click={() => {
				showPassword = !showPassword;
				type = !showPassword ? 'password' : 'text';
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

<style>
	.container {
		display: flex;
	}

	.left {
		height: 100%;
		display: flex;
		align-items: center;
		padding-top: 1px;
	}

	.input {
		display: block;
		border: none;
		height: 80%;
		border-bottom: 0.3px solid #3d5a80;
		margin-left: 13px;
		padding: 3px 30px 3px 13px;

		font-family: 'Istok Web';
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 23px;

		letter-spacing: 1px;

		color: #3d5a80;
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
</style>
