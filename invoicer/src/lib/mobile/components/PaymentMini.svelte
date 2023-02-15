<script>
	import { goto } from '$app/navigation';
	import { mobile, order } from '../../../consts';

	export let number = '';
	export let price = NaN;
	/**@type {string} */
	export let date;
	export let truckNumber = '';
	export let trailerNumber = '';
	export let sign = '$';

	const dateFormatter = new Date(date);

	/**
	 * @type {number}
	 */
	export let id;

	const year = dateFormatter.getFullYear();
	const month = dateFormatter.getMonth() + 1;
	const day = dateFormatter.getDate();
	let monthStr = month < 10 ? '0' + month : month;
	let dayStr = day < 10 ? '0' + day : day;

	const gotoOrder = () => {
		goto(mobile + '/' + id + order);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<main class="ripple-light">
	<div class="left">
		<div class="number">{number}</div>
		{#if truckNumber != '' && trailerNumber != ''}
			<div class="license">
				<span class="license-title">{truckNumber}</span>
				/
				<span class="license-title">{trailerNumber}</span>
			</div>
		{/if}
	</div>

	<div class="right">
		<div class="price">{price}{sign}</div>
		<div class="date">{dayStr}.{monthStr}.{year}</div>
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: space-between;
		padding: 14px 0px;
		border-top: 0.2px solid rgba(41, 50, 65, 0.3);
		/* box-shadow: 0px -1px 0px -0.9px #000000; */
		width: 90%;
		user-select: none;
	}

	.right {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin-right: 10px;
	}

	.left {
		margin-left: 10px;
	}

	.number {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		line-height: 22px;
		/* identical to box height */

		letter-spacing: 2px;

		color: rgba(94, 94, 117, 0.85);
	}

	.license {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		font-size: 13px;
		line-height: 15px;
		letter-spacing: 1px;

		color: rgba(110, 110, 139, 0.7);

		margin-top: 7px;
	}

	.price {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 17px;
		line-height: 26px;
		/* identical to box height */

		text-align: center;
		letter-spacing: 2px;

		color: rgba(63, 63, 87, 0.7);
	}

	.date {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 18px;
		/* identical to box height */

		letter-spacing: 1px;

		color: rgba(61, 90, 128, 0.7);
		margin-top: 1px;
	}

	.ripple-light {
		background-position: center;
		transition: background 0.8s;
	}
	.ripple-light:hover {
		background: #ffffff radial-gradient(circle, transparent 1%, #ffffff 1%) center/40000%;
	}
	.ripple-light:active {
		background-color: #c7c6c6;
		background-size: 100%;
		transition: background 0s;
	}
</style>
