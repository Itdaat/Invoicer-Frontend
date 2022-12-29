<script>
	import LanguageStore from '$lib/stores/Language';
	import UserStore from '$lib/stores/User';

	/** @type {import('./$types').PageData} */
	export let data;

	UserStore.set(data.userId || '');
	LanguageStore.set(JSON.parse(data.t));
</script>

<slot />
