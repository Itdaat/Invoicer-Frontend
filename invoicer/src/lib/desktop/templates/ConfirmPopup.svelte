<script>
	import CloseMenuIcon from '$lib/assets/icons/CloseMenuIcon.svelte';
	import { clickOutside } from '$lib/helpers/ClickOutside';
	import LanguageStore from '$lib/stores/Language';
	import { fade } from 'svelte/transition';
	export let show = true;
	export let title = '';
	export let confirmed;
	export let description = '';
	export let confirmText = '';
	export let rejectText = '';

	$: t = $LanguageStore;
	let hideFilter = () => {
		show = false;
	};

	const confirm = async () => {
		confirmed = true;
		show = false;
	};

	const reject = async () => {
		confirmed = false;
		show = false;
	};
</script>

{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="main" transition:fade={{ duration: 300 }}>
		<div class="container" use:clickOutside on:click_outside={hideFilter}>
			<div class="title">{title}</div>
			<div class="description">
				{description}
			</div>
			<div class="buttons">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="button" on:click={confirm}>{confirmText}</div>
				<div class="button" on:click={reject}>{rejectText}</div>
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

		filter: drop-shadow(0px 4px 20px rgba(37, 38, 94, 0.1));

		border-radius: 20px;
		padding: 10px 15px;
		width: 375px;
		/* height: 179px; */
		/* min-height: 30%; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.description {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 400;
		font-size: 17px;
		line-height: 26px;
		/* or 137% */

		letter-spacing: 1px;

		color: #3d5a80;

		align-self: flex-start;
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
		align-self: flex-start;
	}

	.buttons {
		display: flex;
		justify-content: flex-end;
		margin-top: 20px;
		width: 100%;
	}

	.button {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 600;
		font-size: 19px;
		line-height: 40px;
		/* or 211% */

		letter-spacing: 1px;
		/* text-decoration-line: underline; */

		user-select: none;
		cursor: pointer;

		margin: 0px 10px;

		color: #3d5a80;
	}
</style>
