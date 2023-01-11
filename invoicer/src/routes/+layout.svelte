<script>
	import { getCurrentFirm, setCurrentFirm } from '$lib/api/server/firm';
	import LanguageStore from '$lib/stores/Language';

	/** @type {import('./$types').PageData} */
	export let data;

	localStorage.setItem('firm', JSON.stringify(data.firm));
	setCurrentFirm();
	LanguageStore.set(JSON.parse(data.t));
</script>

<slot />

<!-- <style>
	:global(.ripple-light) {
		background-position: center;
		transition: background 0.8s;
	}
	:global(.ripple-light:hover) {
		background: #ffffff radial-gradient(circle, transparent 1%, #ffffff 1%) center/15000%;
	}
	:global(.ripple-light:active) {
		background-color: #c7c6c6;
		background-size: 100%;
		transition: background 0s;
	}

	:global(.ripple-dark) {
		background-position: center;
		transition: background 0.8s;
	}
	:global(.ripple-dark:hover) {
		background: #3d5a80 radial-gradient(circle, transparent 1%, #3d5a80 1%) center/18000%;
	}
	:global(.ripple-dark:active) {
		background-color: #6280a7;
		background-size: 100%;
		transition: background 0s;
	}
</style> -->
