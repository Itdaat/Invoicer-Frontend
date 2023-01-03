<script>
	export let sign = '$';
	export let cash = 0;
	export let cent = 0;
</script>

<main>
	<span class="sign">{sign}</span>
	<span class="cash">{cash}.</span>
	<span class="cent">{cent}</span>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: flex-end;
	}

	.sign {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 46px;
		line-height: 69px;
		/* identical to box height */

		letter-spacing: 1px;

		color: #3d5a80;
	}

	.cash {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 40px;
		line-height: 60px;
		/* identical to box height */

		letter-spacing: 3.2px;

		color: #3d5a80;
	}
	.cent {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 600;
		font-size: 23px;
		line-height: 34px;
		/* identical to box height */

		letter-spacing: 2.5px;

		color: #3d5a80;

		margin-bottom: 8px;
	}
</style>
