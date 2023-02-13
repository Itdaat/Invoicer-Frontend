<script>
	import { goto } from '$app/navigation';
	import { getCurrentFirmId, getFirm } from '$lib/api/server/firm';
	import CreateFirm from '$lib/desktop/components/firm/CreateFirm.svelte';
	import { getCookie, setCookie } from '$lib/helpers/cookies';
	import { openErrorMessage } from '$lib/helpers/message';
	import LanguageStore from '$lib/stores/Language';
	import { unreachableError } from '../../../consts';
	import { beforeUpdate, onMount } from 'svelte';
	import GlobalMessage from '$lib/mobile/components/GlobalMessage.svelte';
	$: t = $LanguageStore;

	// const firm = JSON.parse(localStorage.getItem('firm') || '{}');

	// const firmCheck = async () => {
	// 	if (!firm || firm.error) {
	// 		localStorage.setItem('create_title', t.firm_create);
	// 		goto('/mobile/create/firm');
	// 	}
	// };

	// onMount(() => firmCheck());

	const GetFirm = async () => {
		let firm;
		const firmId = getCookie('firmId');
		const firmRes = await getFirm(firmId || null);
		if (firmRes.error?.code == unreachableError.code) {
			openErrorMessage(t.message_unreachable_error);
			return;
		}
		if (firmRes.error || firmRes.result.length <= 0) {
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

	// onMount(GetFirm);
	// GetFirm();
	// beforeUpdate(GetFirm);
</script>

{#await GetFirm() then Get}
	<slot />
	<GlobalMessage />
{/await}
