<script>
	import { clickOutside } from '$lib/helpers/ClickOutside';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import { fade, slide } from 'svelte/transition';

	/**
	 * @param {string} val?
	 * @param {string} pVal?
	 */
	const suggestionClickDefault = (val, pVal) => {
		copyValue = value = val;
		pseudoValue = pVal;
		outside = true;
		selected = true;
	};

	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	export let status = 'ordinary';
	/** @type {string | null }*/
	export let value;
	export let disabled = false;
	export let type = 'text';
	export let placeHolder = '';
	export let message = '';
	export let onBlurFunc = () => {};
	export let onFocusFunc = () => {};
	export let suggestionClick = suggestionClickDefault;
	export let autocomplete = false;
	export let pseudoValue = '';
	export let noText = '';

	let copyValue = '';
	$: selected = copyValue != value;
	let focused = false;
	let outside = true;
	/**
	 * @type {Promise<{ value: string; name: string; pseudoValue : string; }[]> | null}
	 */
	export let suggestionsApi = null;

	export let label = '';

	let success = false,
		error = false;
	$: success = status == 'success';
	$: error = status == 'error';

	const focus = () => {
		outside = false;
		focused = true;
		onBlurFunc();
	};

	const blur = () => {
		focused = false;
		onFocusFunc();
	};
	const clickOutsideEv = () => (outside = true);
</script>

<div class="container">
	<div class="left">
		<div class="label" class:success class:error>{label}</div>
	</div>
	<div class="input-container" use:clickOutside on:click_outside={clickOutsideEv}>
		<input
			class="input"
			class:success
			class:error
			class:disabled
			placeholder={placeHolder}
			{disabled}
			{...{ type }}
			bind:value
			on:blur={blur}
			on:focus={focus}
		/>
		{#if autocomplete && (!outside || focused)}
			{#await suggestionsApi then suggestions}
				<div class="suggestions">
					{#if suggestions?.length > 0}
						{#each suggestions as suggestion}
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<div
								class="suggestion"
								on:click={() => {
									suggestionClick(suggestion.value, suggestion.pseudoValue);
								}}
								out:fade={{ duration: 100 }}
							>
								{suggestion.name}
							</div>
						{/each}
					{:else if selected}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<div
							class="suggestion"
							on:click={() => {
								suggestionClick(null, null);
							}}
						>
							{noText}
						</div>
					{/if}
				</div>
			{/await}
		{/if}
	</div>
</div>
{#if status == 'error' && message != ''}
	<div class="message-container" in:slide>{message}</div>
{/if}

<style>
	.container {
		display: grid;
		grid-template-columns: 45% 55%;
		margin: 14px 0px;
		justify-content: space-between;
		align-items: flex-start;
		/* padding: 0px 30px; */
		max-width: 90%;
		width: 90%;
		position: relative;
	}

	.left {
		height: 100%;
		display: flex;
		align-items: center;
		padding-top: 4px;

		font-family: 'Istok Web';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 23px;
		letter-spacing: 1px;

		color: #3d5a80;
	}

	.input-container {
		overflow-x: hidden;
		/* position: relative; */
	}

	.input {
		display: block;
		border: none;
		height: 80%;
		border-bottom: 0.1px solid rgba(72, 97, 129, 0.631);
		padding: 2px 14px;
		/* width: 45%; */

		font-family: 'Istok Web';
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 23px;

		letter-spacing: 1px;

		color: #3d5a80;
	}

	.disabled {
		cursor: not-allowed;
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

	[type='date']::-webkit-inner-spin-button {
		display: none;
	}
	[type='date']::-webkit-calendar-picker-indicator {
		display: none;
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

	.suggestions {
		/* min-height: 10px; */
		max-height: 170px;

		overflow-y: scroll;
		background-color: white;
		position: absolute;
		/* right: -7px; */
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);

		border-radius: 10px;
		width: 200px;
		z-index: 90;
		/* display: flex;
		justify-content: center;
		flex-direction: column; */
	}

	.suggestions:empty {
		display: none;
	}

	.suggestion {
		/* overflow: hidden; */

		font-family: 'Exo 2';
		text-decoration: none;
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 40px;
		/* or 211% */
		padding: 0px 10px;

		letter-spacing: 1px;

		color: #3d5a80;

		/* overflow-x: hidden; */
		/* word-wrap: break-word; */
	}

	@media only screen and (max-width: 350px) {
		.input {
			width: 50%;
			min-width: 100px;
		}
	}
</style>
