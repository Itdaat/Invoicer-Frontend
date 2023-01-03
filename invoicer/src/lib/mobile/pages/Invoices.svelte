<script>
	import CounterBig from '../components/CounterBig.svelte';
	import CounterSmall from '../components/CounterSmall.svelte';

	let data = {
		sign: '$',
		cash: 123991,
		cent: 23
	};

	let counterSmall = {
		cash: 12232,
		cent: 42,
		sign: '$',
		title: 'В очікуванні'
	};
</script>

<main>
	<div class="counter">
		<CounterBig {...data} />
		<div class="small-counter-container">
			<CounterSmall {...counterSmall} />
			<CounterSmall {...counterSmall} />
			<CounterSmall {...counterSmall} />
		</div>
	</div>
</main>

<style>
	.counter {
		margin: 20px 0px;
	}

	.small-counter-container {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		margin-top: 20px;
		padding: 0px 10px;
	}
</style>
