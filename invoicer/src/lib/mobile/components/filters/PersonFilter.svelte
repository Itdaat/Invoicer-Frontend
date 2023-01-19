<script>
	import InputDate from '$lib/templates/InputDate.svelte';

	let fromInput = '';
	let toInput = '';
</script>

<div class="main">
	<InputDate bind:fromDate={fromInput} bind:toDate={toInput} title="Test" />
</div>

<style></style>
