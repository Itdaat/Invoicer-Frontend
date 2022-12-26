<script>
	/**
	 * @type {'dark' | 'light'}
	 */
	export let type = 'dark';
	export let link = '';
</script>

<div class="container" class:light={type == 'light'} class:dark={type == 'dark'}>
	<slot />
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
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
</style>
