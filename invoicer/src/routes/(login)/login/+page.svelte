<script>
	import { checkUserLogin, loginUser, setToken } from '$lib/api/server/user';
	import AccountIcon from '$lib/assets/icons/AccountIcon.svelte';
	import BigTitle from '$lib/desktop/components/register/BigTitle.svelte';
	import InputPassword from '$lib/desktop/components/register/InputPassword.svelte';
	import { openErrorMessage } from '$lib/helpers/message';
	import Button from '$lib/templates/Button.svelte';
	import Input from '$lib/templates/Input.svelte';
	import { loginError, needRealLogin, notValidPassword, unreachableError, userNotFound } from '../../../consts';
	import ForgotPassword from '../../../lib/desktop/components/register/ForgotPassword.svelte';
	import RegisterOrLogin from '../../../lib/desktop/components/register/RegisterOrLogin.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	const t = JSON.parse(data.t);

	/** @type {import('src/types/Response').ResponseStatus}*/
	let responseStatus = 'none';

	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let loginStatus = 'ordinary';

	let forgotPasswordLink = '/reset-password',
		gotoRegisterLink = '/register';

	const onLoginClick = async () => {
		responseStatus = 'inProcess';
		// loginStatus = passwordStatus = 'ordinary';
		const result = await loginUser(login, password).then((res) => {
			responseStatus = 'done';
			return res;
		});

		console.log(result);
		if (result.error) {
			if (result.error?.code == unreachableError.code) {
				openErrorMessage(t.message_unreachable_error, '');
				return;
			}
			if (result.error?.code == loginError.code) {
				passwordStatus = loginStatus = 'error';
				openErrorMessage(t.login_error);
			}

			if (result.error.code == needRealLogin.code) {
				// @ts-ignore
				setToken(result.result.token);
				// setCookie('token', result.result.token);
				window.location.href = '/';
			}
		} else {
			// @ts-ignore
			// setToken(result.result.token);
			// window.location.href = '/';
		}
	};

	const makeOrdinary = () => {
		passwordStatus = loginStatus = 'ordinary';
	};

	// ! login
	let login = '';

	// ! password
	let password = '';
	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let passwordStatus = 'ordinary';
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
				<Input placeHolder={t.login_accountPlaceHolder} bind:value={login} status={loginStatus} onFocusFunc={makeOrdinary}>
					<AccountIcon slot="left" status={loginStatus} />
				</Input>
			</div>

			<div class="element">
				<InputPassword status={passwordStatus} placeHolder={t.login_passwordPlaceHolder} bind:value={password} onFocusFunc={makeOrdinary} />
			</div>

			<div class="element">
				<ForgotPassword linkText={t.login_forgotPasswordLink} link={forgotPasswordLink} text={t.login_forgotPassword} />
			</div>

			<div class="button-container login">
				<Button type="dark" status={responseStatus} onClick={onLoginClick}>{t.login_loginButton}</Button>
			</div>

			<!-- <div class="text-container">{t.login_textOr}</div> -->

			<!-- <div class="button-container google">
				<Button type="light">
					<div class="google-button-container">
						<div class="google-button-left"><GoogleIcon /></div>
						<div class="google-button-right">{t.login_loginWithGoogle}</div>
					</div>
				</Button>
			</div> -->
		</div>
		<div class="goto-register-container">
			<RegisterOrLogin link={gotoRegisterLink} linkText={t.login_gotoRegisterLink} text={t.login_gotoRegister} />
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
		/* margin-bottom: 0 !important; */
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
			/* justify-content: flex-start; */
			box-shadow: none;
			padding: 0px;
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
