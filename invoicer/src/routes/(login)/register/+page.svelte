<script>
	import { checkUserLogin, registerUser, setToken } from '$lib/api/server/user';
	import AccountIcon from '$lib/assets/icons/AccountIcon.svelte';
	import BigTitle from '$lib/desktop/components/register/BigTitle.svelte';
	import InputPassword from '$lib/desktop/components/register/InputPassword.svelte';
	import { setCookie } from '$lib/helpers/cookies';
	import { validateEmail } from '$lib/helpers/email';
	import Button from '$lib/templates/Button.svelte';
	import Input from '$lib/templates/Input.svelte';
	import { notValidLogin, notValidPassword, userExists, userNotFound } from '../../../consts';
	import RegisterOrLogin from '../../../lib/desktop/components/register/RegisterOrLogin.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	let t = JSON.parse(data.t);

	/**
	 *
	 * @param {string} login
	 */
	async function checkLogin(login) {
		const userLoginResponse = await checkUserLogin(login);
		if (userLoginResponse.error?.code != userNotFound.code) {
			loginErrorMessage = t.register_accountAlreadyExists;
			loginStatus = 'error';
		} else {
			loginStatus = 'ordinary';
			loginErrorMessage = t.register_accountErrorMessage;
		}
	}

	const checkLoginBlur = () => {
		loginErrorMessage = t.register_accountErrorMessage;
		const isLoginValid = validateEmail(login);
		loginStatus = isLoginValid ? 'ordinary' : 'error';
	};

	// $: if (loginStatus == 'error' && login) {
	// 	checkLoginBlur();
	// }

	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let loginStatus = 'ordinary';
	let loginErrorMessage = t.register_accountErrorMessage;

	let loginButtonLink = '#',
		gotoRegisterLink = '/login';
	// ! login
	let login = '';
	let lastLogin = login;
	$: checkLogin(login);

	// ! password
	let password = '';
	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let passwordStatus = 'ordinary';

	// ! password
	let repeatPassword = '';
	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let repeatPasswordStatus = 'ordinary';

	const checkRepeatPassword = () => {
		if (repeatPassword != password) {
			repeatPasswordStatus = 'error';
		} else {
			repeatPasswordStatus = 'ordinary';
		}
	};

	$: if (repeatPassword == password) {
		repeatPasswordStatus = 'ordinary';
	}

	let showPassword = false;

	const onRegisterClick = async () => {
		checkLoginBlur();
		checkRepeatPassword();
		if (repeatPasswordStatus == 'error' || loginStatus == 'error' || passwordStatus == 'error') {
			return;
		}
		const result = await registerUser(login, password);
		console.log(result);
		if (result.error) {
			if (result.error?.code == userExists.code) {
				loginStatus = 'error';
				loginErrorMessage = t.register_accountAlreadyExists;
			} else if (result.error?.code == notValidPassword.code) {
				passwordStatus = 'error';
			} else if (result.error.code == notValidLogin.code) {
				loginStatus = 'error';
			}
		} else {
			// @ts-ignore
			setToken(result.result.token);
			// setCookie('token', result.result.token);
			// goto('/');
			// window.location.href = window.location.host;
			window.location.href = '/';
		}
	};

	function checkPassword() {
		if (password.length < 3) {
			passwordStatus = 'error';
		}
	}
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="container">
	<div class="block">
		<div class="title-container">
			<BigTitle>{t.register_title}</BigTitle>
		</div>
		<div class="invisible-block">
			<div class="element" id="login-input">
				<Input
					placeHolder={t.register_accountPlaceHolder}
					bind:value={login}
					status={loginStatus}
					message={loginErrorMessage}
					onBlurFunc={checkLoginBlur}
				>
					<AccountIcon slot="left" status={loginStatus} />
				</Input>
			</div>

			<div class="element" id="password-input">
				<InputPassword
					status={passwordStatus}
					placeHolder={t.register_passwordPlaceHolder}
					bind:value={password}
					message={t.register_passwordErrorMessage}
					bind:showPassword
					onFocusFunc={() => {
						passwordStatus = 'ordinary';
					}}
					onBlurFunc={() => {
						checkRepeatPassword();
						checkPassword();
					}}
				/>
			</div>

			<div class="element" id="repeat-password">
				<InputPassword
					status={repeatPasswordStatus}
					placeHolder={t.register_repeatPasswordPlaceHolder}
					bind:value={repeatPassword}
					message={t.register_repeatPasswordErrorMessage}
					bind:showPassword
					onBlurFunc={checkRepeatPassword}
				/>
			</div>

			<div class="button-container login">
				<Button type="dark" onClick={onRegisterClick}>{t.register_registerButton}</Button>
			</div>

			<!-- <div class="text-container">{t.register_textOr}</div>

			<div class="button-container google">
				<Button type="light" link={loginWithGoogleLink}>
					<div class="google-button-container">
						<div class="google-button-left"><GoogleIcon /></div>
						<div class="google-button-right">{t.register_registerWithGoogle}</div>
					</div>
				</Button>
			</div> -->
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
			/* justify-content: flex-end; */
			box-shadow: none;
			padding: 0px;
		}

		.element {
			margin: 35px 0px;
		}

		.title-container {
			margin-top: auto;
		}

		.goto-register-container {
			margin-top: auto;
			margin-bottom: 5%;
		}
	}
</style>
