<script>
	import { Shadow, Jumper } from 'svelte-loading-spinners';

	/** @type {import('src/types/Response').ResponseStatus}*/
	export let status = 'none';
	/** @type {'dark' | 'light'}*/
	export let colorTheme = 'dark';
	export let size = '30';
	/** @type {'shadow' | 'circle'}*/
	export let type = 'circle';

	const color = colorTheme == 'dark' ? '#3D5A80' : '#ffffff';
</script>

{#if status == 'inProcess'}
	{#if type == 'circle'}
		<Jumper {size} {color} unit="px" duration="1.5s" />
	{:else}
		<Shadow {size} {color} unit="px" duration="2s" />
	{/if}
{/if}
