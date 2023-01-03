<script>
	import RegisterOrLogin from '../../../lib/desktop/components/register/RegisterOrLogin.svelte';
	import GoogleIcon from '../../../lib/assets/icons/GoogleIcon.svelte';
	import ForgotPassword from '../../../lib/desktop/components/register/ForgotPassword.svelte';
	import AccountIcon from '$lib/assets/icons/AccountIcon.svelte';
	import Input from '$lib/templates/Input.svelte';
	import BigTitle from '$lib/desktop/components/register/BigTitle.svelte';
	import InputPassword from '$lib/desktop/components/register/InputPassword.svelte';
	import Button from '$lib/templates/Button.svelte';
	import { page } from '$app/stores';
	import { loginUser } from '$lib/api/server/user';
	import { redirect } from '@sveltejs/kit';

	/** @type {import('./$types').PageData} */
	export let data;

	let t = JSON.parse(data.t);

	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let status = 'ordinary';

	let forgotPasswordLink = '/reset-password',
		loginWithGoogleLink = '#loginTitle',
		gotoRegisterLink = '/register';

	const onLoginClick = async () => {
		redirect(301, '/register');
		await loginUser();
	};
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
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="container">
	<div class="block">
		<div class="title-container">
			<BigTitle>{t.login_title}</BigTitle>
		</div>
		<div class="invisible-block">
			<div class="element" id="login-input">
				<Input
					placeHolder={t.login_accountPlaceHolder}
					bind:value={login}
					{status}
					message={t.login_accountErrorMessage}
				>
					<AccountIcon slot="left" {status} />
				</Input>
			</div>

			<div class="element">
				<InputPassword
					status={passwordStatus}
					placeHolder={t.login_passwordPlaceHolder}
					bind:value={password}
					message={t.login_passwordErrorMessage}
				/>
			</div>

			<div class="element">
				<ForgotPassword
					linkText={t.login_forgotPasswordLink}
					link={forgotPasswordLink}
					text={t.login_forgotPassword}
				/>
			</div>

			<div class="button-container login">
				<Button type="dark" onClick={onLoginClick}>{t.login_loginButton}</Button>
			</div>

			<div class="text-container">{t.login_textOr}</div>

			<div class="button-container google">
				<Button type="light" link={loginWithGoogleLink}>
					<div class="google-button-container">
						<div class="google-button-left"><GoogleIcon /></div>
						<div class="google-button-right">{t.login_loginWithGoogle}</div>
					</div>
				</Button>
			</div>
		</div>
		<div class="goto-register-container">
			<RegisterOrLogin
				link={gotoRegisterLink}
				linkText={t.login_gotoRegisterLink}
				text={t.login_gotoRegister}
			/>
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
		margin-bottom: 33px;
	}

	.block {
		background: #ffffff;
		box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
		border-radius: 7px;
		width: 460px;
		height: auto;
		padding: 20px 0px;
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
			padding: 0px;
		}

		.goto-register-container {
			margin-top: 48%;
			margin-bottom: 5%;
		}
	}
</style>
