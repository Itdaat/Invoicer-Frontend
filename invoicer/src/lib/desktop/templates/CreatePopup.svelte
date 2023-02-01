<script>
	import CloseMenuIcon from '$lib/assets/icons/CloseMenuIcon.svelte';
	import { clickOutside } from '$lib/helpers/ClickOutside';
	import LanguageStore from '$lib/stores/Language';
	import { fade } from 'svelte/transition';
	export let show = true;
	export let save = () => {};
	$: t = $LanguageStore;
	let hideFilter = () => {
		show = false;
	};
</script>

{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="main" transition:fade={{ duration: 300 }}>
		<div class="container" use:clickOutside on:click_outside={hideFilter}>
			<div class="close-button icon-button" on:click={hideFilter}>
				<CloseMenuIcon />
			</div>
			<div class="title">{t.filter_title}</div>
			<slot />
			<div class="buttons">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="save" on:click={save}>{t.entity_create}</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.main {
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(2px);
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 9999;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;

		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container {
		background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
		position: absolute;
		box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
		border-radius: 20px;
		padding: 20px 10px;
		width: 80%;
		max-width: fit-content;
		min-height: 30%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.title {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 600;
		font-size: 22px;
		line-height: 40px;
		/* or 182% */

		letter-spacing: 1px;

		color: #3d5a80;

		margin-bottom: 10px;
	}

	.icon-button {
		width: 45px;
		height: 45px;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 100%;
	}

	.close-button {
		position: absolute;
		top: -12%;
		right: -35px;
	}

	.buttons {
		display: flex;
		justify-content: space-around;
		margin-top: 20px;
		width: 100%;
	}

	.save {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 600;
		font-size: 19px;
		line-height: 40px;
		/* or 211% */

		letter-spacing: 1px;
		text-decoration-line: underline;

		user-select: none;
		cursor: pointer;

		color: #3d5a80;
	}
</style>
