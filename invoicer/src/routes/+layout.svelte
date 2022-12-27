<script>
	export const ssr = false;
	export const prerender = false;
	export const csr = true;

	import { addLocalization } from '../translations/i18n.js';
	addLocalization();
</script>

<slot />
