<script>
	import { goto } from '$app/navigation';
	import { getCmrAllFields } from '$lib/api/server/cmr';
	import FilterStore from '$lib/stores/FilterStore';
	import LanguageStore from '$lib/stores/Language';
	import { cmrs } from '../../../../consts';

	$: t = $LanguageStore;

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

	$: filter = $FilterStore;

	const getCMRSFormatted = async (filters) => {
		return (await getCmrAllFields(filters)).result;
	};

	$: cmrsFormatted = getCMRSFormatted(filter);

	const gotoCmr = (/** @type {string | number} */ id) => {
		goto(cmrs + '/' + id);
	};
</script>

<div class="main">
	<div class="menu" />
	<div class="data">
		<slot />
	</div>
</div>

<style>
	.main {
		display: grid;
		grid-template-columns: 2fr 4fr;
		max-height: 100vh;
	}
	.lists {
		width: 100%;
		height: 95%;
		display: flex;
		justify-content: center;
		margin-top: 20px;
		padding: 10px 0px;
	}

	.menu {
		/* padding-top: 40px; */
		/* padding-bottom: 25px; */
		height: 100vh;

		display: flex;
		justify-content: flex-start;
		flex-direction: column;
		align-items: center;

		background: #fbfbfb;
		box-shadow: inset 0px 0px 15px rgba(0, 0, 0, 0.09);

		font-family: 'Istok Web';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 23px;
		/* identical to box height */

		letter-spacing: 1px;

		color: rgba(61, 90, 128, 0.5);
	}

	.cmr {
		display: flex;
		/* grid-template-columns: 1fr 1fr; */
		justify-content: space-between;
		align-items: center;
		width: 80%;
		border-bottom: 0.2px solid rgba(54, 56, 59, 0.1);
		padding: 18px 10px;
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		font-size: 20px;
		line-height: 23px;
		letter-spacing: 2px;

		color: #5e5e75;
	}

	.ripple {
		user-select: none;
		background-position: center;
		background-size: 1000%;
		transition: background 0.8s;
	}
	.ripple:hover {
		background: #ffffff radial-gradient(circle, transparent 1%, #ffffff 1%) center/10000%;
	}
	.ripple:active {
		background-color: #c7c6c6;
		background-size: 100%;
		transition: background 0s;
	}
</style>
