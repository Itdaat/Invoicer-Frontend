<script>
	import Loader from '$lib/mobile/components/Loader.svelte';

	/**
	 * @type {'dark' | 'light'}
	 */
	export let type = 'dark';
	/** @type {import("src/types/Response").ResponseStatus}*/
	export let status = 'none';
	export let onClick = () => {};
</script>

<div
	class="container"
	class:ripple-dark={type == 'dark'}
	class:ripple-light={type == 'light'}
	on:keypress={(e) => {}}
	on:click={onClick}
	class:light={type == 'light'}
	class:dark={type == 'dark'}
>
	{#if status == 'inProcess'}
		<Loader {status} size="60" colorTheme={type == 'dark' ? 'light' : 'dark'} />
	{:else}
		<slot />
	{/if}
</div>

<style>
	.container {
		display: block;
		text-decoration: none;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		user-select: none;

		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.container:focus {
		outline: none !important;
	}

	.dark {
		background: #3d5a80;
		box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
		border-radius: 7px;
		font-family: 'Istok Web';
		font-style: normal;
		font-weight: 400;
		font-size: 19px;
		line-height: 27px;
		letter-spacing: 1px;

		color: #ffffff;
	}

	.light {
		background: #ffffff;
		box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
		border-radius: 7px;

		font-family: 'Istok Web';
		font-style: normal;
		font-weight: 400;
		font-size: 19px;
		line-height: 27px;
		letter-spacing: 1px;

		color: #3d5a80;
	}
	.ripple-light {
		background-position: center;
		transition: background 0.9s;
	}
	.ripple-light:hover {
		background: #ffff radial-gradient(circle, transparent 1%, #ffff 1%) center/15000%;
	}
	.ripple-light:active {
		background-color: #e7e2e2;
		background-size: 100%;
		transition: background 0s;
	}

	.ripple-dark {
		background-position: center;
		transition: background 0.8s;
	}
	.ripple-dark:hover {
		background: #3d5a80 radial-gradient(circle, transparent 1%, #3d5a80 1%) center/15000%;
	}
	.ripple-dark:active {
		background-color: #6280a7;
		background-size: 100%;
		transition: background 0s;
	}
</style>
