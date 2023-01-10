<script>
	import { getFirms } from '$lib/api/server/firm';
	import ArrowButton from '$lib/assets/icons/ArrowButton.svelte';
	import { clickOutside } from '$lib/helpers/ClickOutside';
	import { slide, fade, fly } from 'svelte/transition';
	export let showMenu = false;

	/** @type {import('../../../types/Entities').Firm}*/
	const firm = JSON.parse(localStorage.getItem('firm') || '');

	let showFirms = false;

	$: rotate = showFirms;

	$: if (!showMenu) showFirms = showMenu;

	const hideSelf = () => {
		showMenu = false;
	};

	const showFirmsFunc = () => {
		showFirms = !showFirms;
	};
</script>

{#if showMenu}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<main in:fade={{ duration: 200 }} out:fade={{ duration: 400 }}>
		<div
			class="menu"
			use:clickOutside
			on:click_outside={hideSelf}
			in:fly={{ duration: 400, delay: 200, x: -40 }}
			out:fly={{ duration: 400, x: -40 }}
		>
			<div class="firms-container">
				<div class="current-firm" on:click={showFirmsFunc}>
					<div class="left">{firm.name}</div>
					<div class="right" class:rotate><ArrowButton /></div>
				</div>
				{#if showFirms}
					{#await getFirms() then firms}
						{#if firms.result}
							<div class="firms-list">
								{#each firms.result as firm}
									<div class="firm" in:slide={{ duration: 200 }} out:slide={{ duration: 200 }}>
										<div class="name">{firm.name}</div>
										{#if firm.messageCount != null && firm.messageCount > 0}
											<div class="counter">{firm.messageCount}</div>
										{/if}
									</div>
								{/each}
							</div>
						{/if}
					{/await}
				{/if}
			</div>
		</div>
		<div class="close">s</div>
	</main>
{/if}

<style>
	main {
		background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(2px);
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 10;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.close {
		z-index: 12;
		position: absolute;
		right: 50px;
		top: 50px;
	}

	.menu {
		background-color: white;
		height: 100%;
		width: 276px;
		position: absolute;
		left: 0px;
		z-index: 11;
	}

	.firms-container {
		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 23px;
		line-height: 34px;
		letter-spacing: 1px;

		color: #3d5a80;
	}

	.current-firm {
		padding: 15px 18px;
		background: linear-gradient(0deg, #ffffff, #ffffff), #ffffff;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);

		display: flex;
		justify-content: space-between;
	}

	.rotate {
		margin-top: 5px;
		transform: rotateZ(180deg);
	}

	.firms-list {
		padding: 10px 0px;
	}

	.firm {
		display: flex;
		justify-content: space-between;
		padding: 5px 27px;

		font-family: 'Poppins';
		font-style: normal;
		font-weight: 500;
		font-size: 19px;
		line-height: 40px;
		/* or 211% */

		text-align: center;
		letter-spacing: 1px;

		color: #3d5a80;
	}
</style>
