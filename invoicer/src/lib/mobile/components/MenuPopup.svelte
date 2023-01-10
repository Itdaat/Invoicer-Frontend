<script>
	import { getFirms } from '$lib/api/server/firm';
	import { clickOutside } from '$lib/helpers/ClickOutside';
	import { slide, fade } from 'svelte/transition';
	export let show = false;

	let showFirms = true;

	const hideSelf = () => {
		show = false;
	};
</script>

{#if show}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<main in:fade={{ duration: 150 }} out:fade={{ duration: 150 }}>
		<div class="menu" use:clickOutside on:click_outside={hideSelf}>
			<div class="firms-container">
				<div class="current-firm">Firm</div>
				{#if showFirms}
					<div class="firms-list" in:slide out:slide>
						<!-- {#await getFirms() then firms}
							{#if firms.result}
								{#each firms.result as firm}
									<div class="firm">
										<div class="name">{firm.name}</div>
										{#if firm.messageCount != null && firm.messageCount > 0}
											<div class="counter">{firm.messageCount}</div>
										{/if}
									</div>
								{/each}
							{/if}
						{/await} -->
					</div>
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

	.firm-container {
	}

	.current-firm {
	}

	.firms-list {
	}

	.firm {
		display: flex;
		justify-content: space-between;
		padding: 15px 20px;

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
