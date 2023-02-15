<script>
	import { onMount } from 'svelte';

	export let cash = 0;
	export let cent = 0;
	export let sign = '$';
	export let title = '';
	export let onClick = () => {};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={onClick}>
	<span class="title">{title}</span>
	<div class="value">
		<span class="cash">{cash},</span>
		<span class="cent">{cent}</span>
		<span class="sign">{sign}</span>
	</div>
</div>

<style>
	.title {
		display: flex;
		justify-content: center;

		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 14px;
		/* identical to box height */

		letter-spacing: 1px;

		color: #3d5a80;
	}

	.value {
		display: flex;
		justify-content: center;

		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 15px;
		line-height: 22px;
		/* identical to box height */

		text-align: center;
		letter-spacing: 1px;

		color: #284b63;

		margin-top: 7px;
	}

	.value .cash {
	}

	.value .cent {
		/* font-weight: 400; */
	}

	.value .sign {
	}
</style>
