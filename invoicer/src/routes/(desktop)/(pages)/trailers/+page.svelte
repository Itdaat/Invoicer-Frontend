<script>
	import MainPageTemplate from '$lib/desktop/templates/MainPageTemplate.svelte';
	import SmallMainPageTemplate from '$lib/desktop/templates/SmallMainPageTemplate.svelte';
	import LanguageStore from '$lib/stores/Language';

	$: t = $LanguageStore;
</script>

<SmallMainPageTemplate>{t.no_selected_trailer}</SmallMainPageTemplate>

<style></style>
