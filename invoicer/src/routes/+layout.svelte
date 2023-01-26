<script>
	import { goto } from '$app/navigation';
	import { getFirm, setCurrentFirm } from '$lib/api/server/firm';
	import { getCookie, setCookie } from '$lib/helpers/cookies';
	import LanguageStore from '$lib/stores/Language';

	export let data;
	LanguageStore.set(JSON.parse(data.t));
</script>

<slot />
