<script>
	import CheckGreenIcon from '../../assets/icons/CheckIcon.svelte';

	export let save = () => {};
</script>

<main>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="icon-container" on:click={save}>
		<CheckGreenIcon />
	</div>
</main>

<style>
	main {
		position: fixed;
		right: 30px;
		bottom: 50px;
		z-index: 4;
	}

	.icon-container {
		width: 60px;
		height: 60px;
		margin-top: 3px;
		display: flex;
		justify-content: center;
		align-items: center;
		user-select: none;
		background: #ffffff;
		box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
		border-radius: 100%;
	}
</style>
