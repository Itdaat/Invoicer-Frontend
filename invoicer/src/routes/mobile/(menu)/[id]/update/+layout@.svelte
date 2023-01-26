<script>
	import MiniMenu from '$lib/mobile/templates/MiniMenu.svelte';
	import MobileHeaderMini from '$lib/mobile/components/MobileHeaderMini.svelte';
	import { slide, fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import LanguageStore from '$lib/stores/Language';
	import GlobalMessageStore from '$lib/stores/GlobalMessage';
	import GlobalMessage from '$lib/mobile/components/GlobalMessage.svelte';
	import GlobalMessages from '$lib/mobile/components/GlobalMessages.svelte';
	$: t = LanguageStore;
	$: globalMessages = $GlobalMessageStore;

	// let title = '';

	let title = localStorage.getItem('create_title') || '';
</script>

<div class="main" in:fade={{ duration: 300, delay: 300 }} out:fade={{ duration: 300 }}>
	<MobileHeaderMini {title}>
		<div class="container">
			<slot />
		</div>
	</MobileHeaderMini>
</div>

<style>
	.main {
		height: 100%;
		/* display: grid; */
		grid-template-rows: auto 1fr;
		user-select: none;
	}
	.container {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
</style>
