<script>
	import ForgotPassword from '../../lib/components/register/ForgotPassword.svelte';
	import AccountIcon from '$lib/assets/icons/AccountIcon.svelte';
	import Input from '$lib/templates/Input.svelte';
	import BigTitle from '$lib/components/register/BigTitle.svelte';
	import InputPassword from '$lib/components/register/InputPassword.svelte';
	// import { _, dictionary, register } from 'svelte-i18n';
	/**
	 * @type {'ordinary' | 'success' | 'error'}
	 */
	let status = 'ordinary';

	let loginTitle = 'Login';

	let forgotPasswordText = 'Забули пароль?',
		forgotPasswordLink = '#',
		forgotPasswordLinkText = 'Відновити';

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
				<Input placeHolder={'Register'} bind:value={login} {status}>
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

	.invisible-block {
	}
</style>
