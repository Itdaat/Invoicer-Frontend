<script>
</script>

<div class="main">
	<slot />
</div>

<style>
	.main {
		width: 80%;
		/* max-height: 100%; */
		overflow-y: scroll;

		background: white;
		box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.1);
		border-radius: 6px;

		display: flex;
		flex-direction: column;
		align-items: center;

		overflow-x: hidden;

		padding: 10px 0px;
	}

	/* width */
	.main::-webkit-scrollbar {
		scrollbar-width: thin;
		width: 11px;
		padding: 0px 10px;
	}

	/* Track */
	.main::-webkit-scrollbar-track {
		background: rgba(61, 90, 128, 0.08);
		border-radius: 5px;
	}

	/* Handle */
	.main::-webkit-scrollbar-thumb {
		background: rgba(61, 90, 128, 0.7);
		width: 3px;
		border-radius: 10px;
	}

	/* Handle on hover */
	.main::-webkit-scrollbar-thumb:hover {
		background: rgba(76, 109, 151, 0.7);
		border-radius: 2px;
	}
</style>
