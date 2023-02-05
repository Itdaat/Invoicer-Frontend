<script>
	import { slide, fade, fly } from 'svelte/transition';
</script>

<div class="container">
	<div class="content" in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 200 }}>
		<slot />
	</div>
</div>

<style>
	.content {
		font-family: 'Istok Web';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 23px;
		letter-spacing: 1px;
		color: rgba(61, 90, 128, 0.5);

		width: 80%;
	}

	.container {
		display: flex;
		justify-content: center;
		/* align-items: center; */

		/* width: 100%; */
		height: 100%;
	}
</style>
