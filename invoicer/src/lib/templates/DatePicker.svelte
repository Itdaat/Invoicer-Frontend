<script>
	import { InlineCalendar } from 'svelte-calendar';
	export let date;

	let store;
	$: dateStore = $store;
	$: {
		if (dateStore) {
			date = new Date(dateStore.selected);
		}
	}

	const theme = {
		calendar: {
			width: '300px'
		}
	};
</script>

<div class="container">
	<InlineCalendar bind:store {theme} />
</div>

<style>
	.container {
	}
</style>
