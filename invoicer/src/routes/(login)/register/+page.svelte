<script>
	import AccountIcon from '$lib/assets/icons/AccountIcon.svelte';
	import BigTitle from '$lib/components/register/BigTitle.svelte';
	import InputPassword from '$lib/components/register/InputPassword.svelte';
	import Button from '$lib/templates/Button.svelte';
	import Input from '$lib/templates/Input.svelte';
	import GoogleIcon from '../../../lib/assets/icons/GoogleIcon.svelte';
	import RegisterOrLogin from '../../../lib/components/register/RegisterOrLogin.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let t = JSON.parse(data.t);

	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let status = 'ordinary';

	let loginButtonLink = '#',
		loginWithGoogleLink = '#loginTitle',
		gotoRegisterLink = '/login';
	// ! login
	let login = '';

	$: if (login.length == 1) {
		status = 'error';
	} else if (login.length >= 10) {
		status = 'success';
	} else {
		status = 'ordinary';
	}

	// ! password
	let password = '';
	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let passwordStatus = 'ordinary';
	$: if (password.length == 1) {
		passwordStatus = 'error';
	} else if (password.length >= 10) {
		passwordStatus = 'success';
	} else {
		passwordStatus = 'ordinary';
	}

	// ! password
	let repeatPassword = '';
	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let repeatPasswordStatus = 'ordinary';
	$: if (repeatPassword.length == 1) {
		repeatPasswordStatus = 'error';
	} else if (repeatPassword.length >= 10) {
		repeatPasswordStatus = 'success';
	} else {
		repeatPasswordStatus = 'ordinary';
	}
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="container">
	<div class="block">
		<BigTitle>{t.register_title}</BigTitle>
		<div class="invisible-block">
			<div class="element" id="login-input">
				<Input
					placeHolder={t.register_accountPlaceHolder}
					bind:value={login}
					{status}
					message={t.register_accountErrorMessage}
				>
					<AccountIcon slot="left" {status} />
				</Input>
			</div>

			<div class="element" id="password-input">
				<InputPassword
					status={passwordStatus}
					placeHolder={t.register_passwordPlaceHolder}
					bind:value={password}
					message={t.register_passwordErrorMessage}
				/>
			</div>

			<div class="element" id="repeat-password">
				<InputPassword
					status={repeatPasswordStatus}
					placeHolder={t.register_repeatPasswordPlaceHolder}
					bind:value={repeatPassword}
					message={t.register_repeatPasswordErrorMessage}
				/>
			</div>

			<div class="button-container login">
				<Button type="dark" link={loginButtonLink}>{t.register_registerButton}</Button>
			</div>

			<div class="text-container">{t.register_textOr}</div>

			<div class="button-container google">
				<Button type="light" link={loginWithGoogleLink}>
					<div class="google-button-container">
						<div class="google-button-left"><GoogleIcon /></div>
						<div class="google-button-right">{t.register_registerWithGoogle}</div>
					</div>
				</Button>
			</div>

			<div class="goto-register-container">
				<RegisterOrLogin
					link={gotoRegisterLink}
					linkText={t.register_gotoLoginLink}
					text={t.register_gotoLogin}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		background: #fbfbfb;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#login-input,
	#password-input {
		margin-bottom: 33px;
	}

	#repeat-password {
		margin-bottom: 36px;
	}

	.block {
		background: #ffffff;
		box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
		border-radius: 7px;
		width: 460px;
		height: auto;
		padding: 20px 0px;
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

	.invisible-block {
	}

	.text-container {
		font-family: 'Roboto';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 19px;
		/* identical to box height */

		letter-spacing: 1px;

		color: #3d5a80;

		text-align: center;

		margin: 13px 0px;
	}

	.google-button-container {
		display: flex;
	}

	.google-button-left {
		margin-right: 20px;
		display: flex;
		align-items: center;
	}

	.google-button-right {
		padding-top: 2px;
	}

	.goto-register-container {
		width: 100%;
		display: flex;
		justify-content: center;
		margin-top: 26px;
	}

	@media only screen and (max-width: 600px) {
		.block {
			height: 100%;
			width: 100%;
			justify-content: flex-end;
			box-shadow: none;
		}

		.element {
			margin: 35px 0px;
		}

		.goto-register-container {
			margin-top: 55%;
			margin-bottom: 5%;
		}
	}
</style>
