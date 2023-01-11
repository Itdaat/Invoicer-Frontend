<script>
	import SliderStore from '$lib/stores/Slides';
	import LanguageStore from '$lib/stores/Language';
	import NavLink from '$lib/templates/NavLink.svelte';
	import BellIcon from '$lib/assets/icons/BellIcon.svelte';
	$: t = $LanguageStore;

	$: swiper = $SliderStore;

	// /**@type {[{index:number, marked: boolean, active: boolean, text: string}]}*/
</script>

<nav>
	<NavLink index={0} marked active={swiper.activeIndex == 0}><BellIcon /></NavLink>
	<NavLink index={1} marked active={swiper.activeIndex == 1}>{t.menu_invoice}</NavLink>
	<NavLink index={2} active={swiper.activeIndex == 2}>{t.menu_order}</NavLink>
	<NavLink index={3} marked active={swiper.activeIndex == 3}>{t.menu_payment}</NavLink>
	<NavLink index={4} active={swiper.activeIndex == 4}>{t.menu_transaction}</NavLink>
</nav>

<style>
	nav {
		display: grid;
		/* grid-template-columns: 0.3fr 1fr 1fr 1fr 1fr; */
		grid-template-columns: auto auto auto auto auto;
		gap: 20px;
		height: 45px;
		align-items: center;
		overflow-x: scroll;
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none;
	}

	nav::-webkit-scrollbar {
		display: none;
	}
</style>
