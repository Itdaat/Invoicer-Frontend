<script>
	import LanguageStore from '$lib/stores/Language';
	import { changeFirm, getFirms } from '$lib/api/server/firm';
	import ArrowButton from '$lib/assets/icons/ArrowButton.svelte';
	import { clickOutside } from '$lib/helpers/ClickOutside';
	import { slide, fade, fly } from 'svelte/transition';
	export let showMenu = false;

	/** @type {import('../../../types/Entities').Firm}*/
	const firm = JSON.parse(localStorage.getItem('firm') || '');

	let showFirms = false;

	$: rotate = showFirms;
	$: t = $LanguageStore;

	const pocketCount = 20;
	const messagesCount = 0;

	$: if (!showMenu) showFirms = showMenu;

	const hideSelf = () => {
		showMenu = false;
	};

	const changeFirmClick = (/** @type {string} */ firmId) => {
		changeFirm(firmId);
		// alert(firmId);
		window.location.reload();
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
							<div class="firms-list" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
								{#each firms.result as firm}
									<div
										class="firm"
										on:click={() => {
											changeFirmClick(firm.id);
										}}
									>
										<div class="firm-name">{firm.name}</div>
										{#if firm.messageCount != null && firm.messageCount > 0}
											<div class="counter">{firm.messageCount}</div>
										{/if}
									</div>
								{/each}
								<div class="add-firm-button">{t.menu_add_firm}</div>
							</div>
						{/if}
					{/await}
				{/if}
			</div>
			<div class="second-container">
				<div class="pocket menu-item">
					<div class="pocket-main">{t.menu_pocket}</div>
					{#if pocketCount > 0}
						<div class="counter">{pocketCount}</div>
					{/if}
				</div>
				<div class="messages menu-item">
					<div class="messages-main">{t.menu_messages}</div>
					{#if messagesCount}
						<div class="counter">{messagesCount}</div>
					{/if}
				</div>
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

		font-family: 'Poppins';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 40px;
		/* or 250% */

		letter-spacing: 1px;

		color: #3d5a80;
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
		margin-bottom: -5px;
		transform: rotateZ(180deg);
	}

	.firms-list {
		padding: 10px 0px;
	}

	.firm {
		display: flex;
		justify-content: space-between;
		align-items: center;
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

	.counter {
		background: #98c1d9;
		border-radius: 20px;
		width: 42.99px;
		height: 19.2px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 5px;

		font-family: 'Roboto';
		font-style: normal;
		font-weight: 500;
		font-size: 13px;
		line-height: 11px;
		/* or 85% */

		text-align: center;

		color: #edf5ff;
	}

	.add-firm-button {
		display: flex;
		justify-content: center;
		border-bottom: 0.2px solid rgba(41, 50, 65, 0.3);
		padding-bottom: 10px;

		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 17px;
		line-height: 40px;
		/* or 235% */

		text-align: center;
		letter-spacing: 1px;

		color: #3d5a80;
	}

	.second-container {
		padding: 10px 25px 15px 25px;
		border-bottom: 0.2px solid rgba(41, 50, 65, 0.3);
	}

	.menu-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.pocket {
	}

	.messages {
		margin-top: 5px;
	}
</style>
