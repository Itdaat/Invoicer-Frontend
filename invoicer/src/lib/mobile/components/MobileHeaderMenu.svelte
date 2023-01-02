<script>
	import SliderStore from '$lib/stores/Slides';
	import LanguageStore from '$lib/stores/Language';
	import NavLink from '$lib/templates/NavLink.svelte';
	$: t = $LanguageStore;

	$: swiper = $SliderStore;
</script>

<nav class="navigation" id="navigation">
	<NavLink index={0} marked active={swiper.activeIndex == 0}>{t.menu_invoice}</NavLink>
	<NavLink index={1} active={swiper.activeIndex == 1}>{t.menu_order}</NavLink>
</nav>

<style>
	nav {
		display: grid;
		grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr;
		gap: 20px;
	}
</style>
