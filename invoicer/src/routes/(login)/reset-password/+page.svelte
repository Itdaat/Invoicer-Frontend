<script>
	import AccountIcon from '$lib/assets/icons/AccountIcon.svelte';
	import BigTitle from '$lib/desktop/components/register/BigTitle.svelte';
	import Button from '$lib/templates/Button.svelte';
	import Input from '$lib/templates/Input.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let t = JSON.parse(data.t);

	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let status = 'ordinary';

	let loginButtonLink = '#';
	// ! login
	let login = '';
</script>

<svelte:head>
	<title>Reset Password</title>
</svelte:head>

<div class="container">
	<div class="block">
		<div class="title-container">
			<BigTitle>{t.resetPass_title}</BigTitle>
		</div>
		<div class="invisible-block">
			<div class="element" id="login-input">
				<Input
					placeHolder={t.resetPass_account}
					bind:value={login}
					{status}
					message={t.login_accountErrorMessage}
				>
					<AccountIcon slot="left" {status} />
				</Input>
			</div>

			<div class="button-container login">
				<Button type="dark" link={loginButtonLink}>{t.resetPass_resetButton}</Button>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		background: #fbfbfb;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#login-input {
		margin-top: 30px;
		margin-bottom: 45px;
	}

	.block {
		background: #ffffff;
		box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
		border-radius: 7px;
		width: 460px;
		height: auto;
		margin-top: -10px;
		padding: 35px 0px 50px 0px;
		overflow-y: visible;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.element {
		/* margin: 0; */
		margin-top: 25px;
	}

	.button-container {
		width: 320px;
		height: 50px;
	}

	.login {
		margin-top: 19px;
	}

	@media only screen and (max-width: 600px) {
		.block {
			height: 100%;
			width: 100%;
			box-shadow: none;
			padding: 0px;
		}
	}
</style>
