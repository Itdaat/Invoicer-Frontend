<script>
	import MobileHeaderMini from '../../../../lib/mobile/components/MobileHeaderMini.svelte';
	import { slide, fade, fly } from 'svelte/transition';
</script>

<main in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 200 }}>
	<slot />
</main>

<style>
	main {
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr;
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
</style>
