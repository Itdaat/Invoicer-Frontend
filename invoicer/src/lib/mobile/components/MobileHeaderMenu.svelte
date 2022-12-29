<script>
	import LanguageStore from '$lib/stores/Language';
	import NavLink from '$lib/templates/NavLink.svelte';
	$: t = $LanguageStore;
</script>

<nav>
	<NavLink href="/mobile/invoices" marked>{t.menu_invoice}</NavLink>
	<NavLink href="/mobile/orders">{t.menu_order}</NavLink>
</nav>

<style>
	nav {
		display: grid;
		grid-template-columns: 0.5fr 1fr 1fr 1fr 1fr;
		gap: 20px;
	}
</style>
