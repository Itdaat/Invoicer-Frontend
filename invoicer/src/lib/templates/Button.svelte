<script>
	/**
	 * @type {'dark' | 'light'}
	 */
	export let type = 'dark';
	export let onClick = () => {};
</script>

<div
	class="container {type == 'dark' ? 'ripple-dark' : 'ripple-light'}"
	on:keypress={(e) => {}}
	on:click={onClick}
	class:light={type == 'light'}
	class:dark={type == 'dark'}
>
	<slot />
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
	:global(.ripple-light) {
		background-position: center;
		transition: background 0.8s;
	}
	:global(.ripple-light:hover) {
		background: #ffffff radial-gradient(circle, transparent 1%, #ffffff 1%) center/15000%;
	}
	:global(.ripple-light:active) {
		background-color: #c7c6c6;
		background-size: 100%;
		transition: background 0s;
	}

	:global(.ripple-dark) {
		background-position: center;
		transition: background 0.8s;
	}
	:global(.ripple-dark:hover) {
		background: #3d5a80 radial-gradient(circle, transparent 1%, #3d5a80 1%) center/15000%;
	}
	:global(.ripple-dark:active) {
		background-color: #6280a7;
		background-size: 100%;
		transition: background 0s;
	}
</style>
