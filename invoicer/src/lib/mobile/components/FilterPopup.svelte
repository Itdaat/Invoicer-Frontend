<script>
	import { fade } from 'svelte/transition';
	export let showFilter = true;

	let hideFilter = () => {
		showFilter = false;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="main" on:click={hideFilter} transition:fade={{ duration: 150 }}>
	<div class="container"><slot /></div>
</div>

<style>
	.main {
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(2px);
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 10;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container {
		background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
		border-radius: 20px;
		padding: 15px 15px 50px 15px;
	}
</style>
