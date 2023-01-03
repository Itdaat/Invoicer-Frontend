<script>
	import CounterBig from '../components/CounterBig.svelte';
	import CounterSmall from '../components/CounterSmall.svelte';

	let data = {
		sign: '$',
		cash: 1231,
		cent: 23
	};
</script>

<main>
	<div class="counter">
		<CounterBig {...data} />
		<div class="small-counter-container">
			<CounterSmall />
		</div>
	</div>
</main>

<style>
	.counter {
		margin: 20px 0px;
	}
</style>
