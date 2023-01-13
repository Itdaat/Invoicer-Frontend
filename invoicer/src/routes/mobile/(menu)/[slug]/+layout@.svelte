<script>
	import MobileHeaderMini from './../../../../lib/mobile/components/MobileHeaderMini.svelte';
	import { slide, fade } from 'svelte/transition';
</script>

<main in:fade={{ delay: 400 }} out:fade>
	<slot />
</main>

<style>
	main {
		height: 100vh;
		display: grid;
		grid-template-rows: 106px 1fr;
	}
	.header {
		height: 70px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #ffffff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
		padding: 0px 20px;
		user-select: none;
	}

	.title {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 25px;
		line-height: 38px;
		/* identical to box height */

		letter-spacing: 1px;

		color: #3d5a80;
	}

	.return,
	.actions {
		margin-top: 5px;
	}

	.actions-popup {
		position: absolute;
		top: 78px;
		right: 8px;
		background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		width: 170px;
		height: 137px;

		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 2px;
		user-select: none;
	}

	:global(.actions-item-title) {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 17px;
		line-height: 40px;
		/* or 235% */

		letter-spacing: 1px;

		color: #204660;

		margin-left: 20px;
	}

	:global(.action-item) {
		display: flex;
		align-items: center;
		width: 90%;
		margin-left: 20px;
		margin-top: 3px;
	}

	.main {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
</style>
