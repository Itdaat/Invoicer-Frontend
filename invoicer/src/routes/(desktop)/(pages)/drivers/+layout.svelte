<script>
	import MainPageTemplate from '$lib/desktop/templates/MainPageTemplate.svelte';
	import PageTemplate from '$lib/desktop/templates/PageTemplate.svelte';
</script>

<PageTemplate>
	<MainPageTemplate slot="main"><slot /></MainPageTemplate>
</PageTemplate>
