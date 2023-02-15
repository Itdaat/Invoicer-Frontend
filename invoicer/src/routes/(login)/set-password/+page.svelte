<script>
	import { page } from '$app/stores';
	import { registerUser, setToken } from '$lib/api/server/user';
	import BigTitle from '$lib/desktop/components/register/BigTitle.svelte';
	import InputPassword from '$lib/desktop/components/register/InputPassword.svelte';
	import Button from '$lib/templates/Button.svelte';
	import { notValidPassword } from '../../../consts';
	import RegisterOrLogin from '../../../lib/desktop/components/register/RegisterOrLogin.svelte';

	// const token = $page.rou.;
	console.log($page.url.searchParams.get('token'));

	/** @type {import('./$types').PageData} */
	export let data;
	let t = JSON.parse(data.t);

	/** @type {import('src/types/Response').ResponseStatus}*/
	let responseStatus = 'none';

	let gotoRegisterLink = '/login';
	// ! login
	let login = '';

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
		responseStatus = 'inProcess';
		checkRepeatPassword();
		if (repeatPasswordStatus == 'error' || passwordStatus == 'error') {
			return;
		}
		const result = await registerUser(login, password).then((res) => {
			responseStatus = 'inProcess';
			return res;
		});
		if (result.error) {
			if (result.error?.code == notValidPassword.code) {
				passwordStatus = 'error';
			}
		} else {
			// @ts-ignore
			setToken(result.result.token);
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
			<BigTitle>{t.set_password_login}</BigTitle>
		</div>
		<div class="invisible-block">
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
				<Button type="dark" status={responseStatus} onClick={onRegisterClick}>{t.set_password_button}</Button>
			</div>
		</div>
		<div class="goto-register-container">
			<RegisterOrLogin link={gotoRegisterLink} linkText={t.register_gotoLoginLink} text={t.register_gotoLogin} />
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
