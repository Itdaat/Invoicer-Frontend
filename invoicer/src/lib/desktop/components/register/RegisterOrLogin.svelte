<script>
	export let text = '';
	export let linkText = '';
	export let link = '';
</script>

<span class="text">{text}</span>
<a href={link} class="link">{linkText}</a>

<style>
	.text {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 14.5px;
		line-height: 22px;
		/* identical to box height */

		letter-spacing: 1px;

		color: #3d5a80;

		margin-right: 4px;
	}

	.link {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 14.5px;
		line-height: 22px;
		/* identical to box height */

		letter-spacing: 1px;

		color: #6986ac;
	}
</style>
