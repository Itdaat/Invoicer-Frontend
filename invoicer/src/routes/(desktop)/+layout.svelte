<script>
	import { goto } from '$app/navigation';
	import { getCurrentFirmId, getFirm } from '$lib/api/server/firm';
	import CreateEntity from '$lib/desktop/components/CreateEntity.svelte';
	import CreateFirm from '$lib/desktop/components/firm/CreateFirm.svelte';
	import Menu from '$lib/desktop/components/Menu.svelte';
	import { getCookie, setCookie } from '$lib/helpers/cookies';
	import LanguageStore from '$lib/stores/Language';
	import { fade } from 'svelte/transition';
	$: t = $LanguageStore;

	const firmId = getCurrentFirmId();
	const firm = JSON.parse(localStorage.getItem('firm') || '{}');

	let showCreateFirm = !firm || firm.error;
	const GetFirm = async () => {
		let firm;
		const firmId = getCookie('firmId');
		const firmRes = await getFirm(firmId || null);
		if (firmRes.error) {
			localStorage.setItem('create_title', t.firm_create);
			goto('/mobile/create/firm');
		}
		if (firmRes.result.length > 0) {
			// @ts-ignore
			firm = firmRes.result[0];
		} else {
			firm = firmRes.result;
		}
		setCookie('firmId', firm.id);
		localStorage.setItem('firm', JSON.stringify(firm));
	};
</script>

{#await GetFirm() then Get}
	{#if showCreateFirm}
		<CreateFirm showFirm={showCreateFirm} />
	{/if}
	<div class="main">
		<Menu />
		<div class="list-container"><slot /></div>
		<!-- <div class="data"><slot /></div> -->
	</div>
	<CreateEntity />
{/await}

<style>
	.main {
		display: grid;
		grid-template-columns: minmax(10%, 250px) 5fr;
		height: 100vh;
	}
</style>
