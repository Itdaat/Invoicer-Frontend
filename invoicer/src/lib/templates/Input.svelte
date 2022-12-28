<script>
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
</script>

<div class="container">
	<div class="left">
		<slot name="left" />
	</div>
	<input
		class="input"
		class:success
		class:error
		placeholder={placeHolder}
		{disabled}
		type="text"
		bind:value
	/>
</div>

<style>
	.container {
		display: flex;
		margin: 16px 0px;
		justify-content: center;
	}

	.left {
		height: 100%;
		display: flex;
		align-items: center;
		padding-top: 1px;
		width: 28px;
	}

	.input {
		display: block;
		border: none;
		height: 80%;
		border-bottom: 0.1px solid #3d5a80;
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
	}

	.success {
		color: #24a731;
		border-color: #24a731 !important;
	}

	.error {
		color: #b01a1a;
		border-color: #b01a1a !important;
	}

	@media only screen and (max-width: 400px) {
		.input {
			width: 50%;
		}
	}
</style>
