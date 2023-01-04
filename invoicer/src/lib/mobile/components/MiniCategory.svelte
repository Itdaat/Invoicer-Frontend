<script>
	export let title = '';
</script>

<main>
	<div class="title">{title}</div>
	<div class="category-container">
		<slot />
	</div>
</main>

<style>
	.title {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 19px;
		/* identical to box height */

		letter-spacing: 1px;

		/* icons */

		color: #51516c;

		padding: 0px 20px;
	}
	.category-container {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-top: 14px;
	}
</style>
