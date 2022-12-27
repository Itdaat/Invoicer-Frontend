<script>
	import ForgotPassword from '../../lib/components/register/ForgotPassword.svelte';
	import AccountIcon from '$lib/assets/icons/AccountIcon.svelte';
	import Input from '$lib/templates/Input.svelte';
	import BigTitle from '$lib/components/register/BigTitle.svelte';
	import InputPassword from '$lib/components/register/InputPassword.svelte';
	import Button from '$lib/templates/Button.svelte';

	import { _ } from 'svelte-i18n';
	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let status = 'ordinary';

	let loginTitle = 'Login';

	let forgotPasswordText = 'Забули пароль?',
		forgotPasswordLink = '#',
		forgotPasswordLinkText = 'Відновити';

	let loginButtonText = 'Login',
		loginButtonLink = '#';

	let textOr = 'Або';

	let loginWithGoogleTitle = 'За допомогою Google',
		loginWithGoogleLink = '#loginTitle';

	let login = '';
	let password = '';

	$: if (login.length == 1) {
		status = 'error';
	} else if (login.length >= 10) {
		status = 'success';
	} else {
		status = 'ordinary';
	}
</script>

<div class="container">
	<div class="block">
		<BigTitle>{loginTitle}</BigTitle>
		<div class="invisible-block">
			<div class="element">
				<Input placeHolder={$_('login')} bind:value={login} {status}>
					<AccountIcon slot="left" {status} />
				</Input>
			</div>
			<div class="element">
				<InputPassword {status} placeHolder={'Password'} bind:value={password} />
			</div>
			<div class="element">
				<ForgotPassword
					linkText={forgotPasswordLinkText}
					link={forgotPasswordLink}
					text={forgotPasswordText}
				/>
			</div>
			<div class="button-container">
				<Button type="dark" link={loginButtonLink}>{loginButtonText}</Button>
			</div>
			<div class="text-container">{textOr}</div>
			<div class="button-container">
				<Button type="light" link={loginWithGoogleLink}>{loginWithGoogleTitle}</Button>
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

	.block {
		background: #ffffff;
		box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
		border-radius: 7px;
		width: 460px;
		height: 521px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.element {
		margin: 16px 0px;
	}

	.button-container {
		width: 320px;
		height: 50px;
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
	}
</style>
