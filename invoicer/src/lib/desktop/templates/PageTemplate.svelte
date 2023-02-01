<script>
	import { fade } from 'svelte/transition';
</script>

<div class="main">
	<div class="menu">
		<div class="lists" in:fade|local={{ duration: 700, delay: 400 }} out:fade|local={{ duration: 400 }}>
			<slot name="left" />
		</div>
	</div>
	<div class="data">
		<slot name="main" />
	</div>
</div>

<style>
	.main {
		display: grid;
		grid-template-columns: 2fr 4fr;
		max-height: 100vh;
	}
	.lists {
		width: 100%;
		height: 95%;
		display: flex;
		justify-content: center;
		margin-top: 20px;
		padding: 10px 0px;
	}

	.menu {
		height: 100vh;

		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		align-items: center;

		background: #fbfbfb;
		box-shadow: inset 0px 0px 15px rgba(0, 0, 0, 0.09);

		font-family: 'Istok Web';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 23px;
		/* identical to box height */

		letter-spacing: 1px;

		color: rgba(61, 90, 128, 0.5);
	}
</style>
