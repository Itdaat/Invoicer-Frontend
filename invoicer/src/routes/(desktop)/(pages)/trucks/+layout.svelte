<script>
	import PageTemplate from '$lib/desktop/templates/PageTemplate.svelte';
</script>

<PageTemplate>
	<div slot="left">Hello</div>

	<div slot="main"><slot /></div>
</PageTemplate>
