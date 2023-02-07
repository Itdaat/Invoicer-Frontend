<script>
	import { clickOutside } from '$lib/helpers/ClickOutside';
	import Loader from '$lib/mobile/components/Loader.svelte';
	import LanguageStore from '$lib/stores/Language';
	import InputUpgraded from '$lib/templates/InputUpgraded.svelte';
	import { fade, slide } from 'svelte/transition';

	$: t = $LanguageStore;

	export let message = '';
	/** @type {any} */
	export let onButtonClick;

	/** @type {string}*/
	export let name;
	/** @type {string}*/
	export let nameNoText = '';
	/** @type {'ordinary' | 'success' | 'error'} */
	export let nameStatus = 'ordinary';
	/** @type {string}*/
	export let namePlaceHolder = '';
	/** @type {any}*/
	export let nameBlur = () => {};
	/** @type {any}*/
	export let nameFocus = () => {};
	/** @type {string}*/
	export let namePseudoValue = '';
	/** @type {any}*/
	export let nameSuggestionApi = '';

	/** @type {string}*/
	export let value;
	/** @type {string}*/
	export let valueNoText = '';
	/** @type {'ordinary' | 'success' | 'error'} */
	export let valueStatus = 'ordinary';
	/** @type {string}*/
	export let valuePlaceHolder = '';
	/** @type {any}*/
	export let valueBlur = () => {};
	/** @type {any}*/
	export let valueFocus = () => {};
	/** @type {string}*/
	export let valuePseudoValue = '';
	/** @type {any}*/
	export let valueSuggestionApi = '';
	/** @type {any}*/
	export let valueType = '';
</script>

<div class="container">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="left" on:click={onButtonClick}>
		<div class="label">{t.invoice_create_product}</div>
	</div>
	<InputUpgraded
		bind:value={name}
		autocomplete
		noText={nameNoText}
		status={nameStatus}
		placeHolder={namePlaceHolder}
		onBlurFunc={nameBlur}
		onFocusFunc={nameFocus}
		pseudoValue={namePseudoValue}
		suggestionsApi={nameSuggestionApi}
	/>

	<InputUpgraded
		bind:value
		autocomplete
		noText={valueNoText}
		status={valueStatus}
		placeHolder={valuePlaceHolder}
		onBlurFunc={valueBlur}
		onFocusFunc={valueFocus}
		pseudoValue={valuePseudoValue}
		suggestionsApi={valueSuggestionApi}
		type={valueType}
	/>
</div>
{#if status == 'error' && message != ''}
	<div class="message-container" transition:slide={{ duration: 200 }}>{message}</div>
{/if}

<style>
	.container {
		display: grid;
		grid-template-columns: 26% 37% 37%;
		/* margin: 14px 0px; */
		justify-content: space-between;
		align-items: flex-start;
		/* padding: 0px 30px; */
		margin: 14px 0px;
		max-width: 90%;
		width: 90%;
		padding-left: 25px;
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
</style>
