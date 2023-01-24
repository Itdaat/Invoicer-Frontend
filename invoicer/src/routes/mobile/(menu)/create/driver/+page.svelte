<script>
	import MiniCategory from '../../../../../lib/mobile/components/MiniCategory.svelte';
	import { goto } from '$app/navigation';
	import { createCmr } from '$lib/api/server/cmr';
	import { validateEmail } from '$lib/helpers/email';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import { isValidTelNum } from '$lib/helpers/telNumber';
	import SaveEntity from '$lib/mobile/components/SaveEntity.svelte';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { createPerson, getPersonIds } from '$lib/api/server/persons';
	import { driverTag, emailDataType, phoneDataType } from '../../../../../consts';

	$: t = $LanguageStore;
	/** @type {import('src/types/Response').ResponseStatus}*/
	let responseStatus = 'none';

	let nickNameErrorText = '';

	let firstName = '',
		lastName = '',
		email = '',
		phone = '',
		nickname = '';

	/** @type {import('src/types/InputStatus').InputStatus}*/
	let firstNameStatus = 'ordinary';

	/** @type {import('src/types/InputStatus').InputStatus}*/
	let lastNameStatus = 'ordinary';

	/** @type {import('src/types/InputStatus').InputStatus}*/
	let emailStatus = 'ordinary';

	/** @type {import('src/types/InputStatus').InputStatus}*/
	let phoneStatus = 'ordinary';

	/** @type {import('src/types/InputStatus').InputStatus}*/
	let nicknameStatus = 'ordinary';

	const save = async () => {
		firstNameStatus = lastNameStatus = emailStatus = phoneStatus = nicknameStatus = 'ordinary';

		if (!firstName) {
			firstNameStatus = 'error';
			return;
		}
		if (!lastName) {
			lastNameStatus = 'error';
			return;
		}
		if (!phone || !isValidTelNum(phone)) {
			phoneStatus = 'error';
			return;
		}
		if (email && !validateEmail(email)) emailStatus = 'error';
		if (!nickname) {
			nickNameErrorText = t.person_create_empty;
			nicknameStatus = 'error';
		} else if ((await getPersonIds(null, null, nickname)).length != 0) {
			nickNameErrorText = t.person_create_nickname_exists_error;
			nicknameStatus = 'error';
		}

		if (!firstName || !lastName || !nickname || !phone) return;
		responseStatus = 'inProcess';

		let contactData = [
			{
				typeId: phoneDataType,
				value: phone
			}
		];

		if (email != null && validateEmail(email))
			contactData.push({
				typeId: emailDataType,
				value: email
			});

		const result = await createPerson(firstName, lastName, nickname, contactData, [driverTag]);
		if (result.ok) {
			goto('/mobile/drivers');
			openSuccessMessage(t.person_create_success);
		}
	};
</script>

<div class="main">
	<MiniCategory title={t.title_driver}>
		<LabeledInput
			bind:value={firstName}
			status={firstNameStatus}
			label={t.person_create_first_name}
			message={t.person_create_empty}
			placeHolder={t.person_create_first_name_placeholder}
		/>
		<LabeledInput
			bind:value={lastName}
			status={lastNameStatus}
			label={t.person_create_last_name}
			message={t.person_create_empty}
			placeHolder={t.person_create_last_name_placeholder}
		/>
		<LabeledInput
			bind:value={nickname}
			status={nicknameStatus}
			label={t.person_create_nickname}
			message={nickNameErrorText}
			placeHolder={t.person_create_nickname_placeholder}
		/>
	</MiniCategory>
	<MiniCategory title={t.person_create_contact_data}>
		<LabeledInput
			bind:value={phone}
			status={phoneStatus}
			label={t.person_create_phone}
			message={t.person_create_phone_not_valid}
			placeHolder={t.person_create_phone_placeholder}
			type="tel"
		/>

		<LabeledInput
			bind:value={email}
			status={emailStatus}
			label={t.person_create_email}
			message={t.person_create_email_not_valid}
			placeHolder={t.person_create_email_placeholder}
		/>
	</MiniCategory>
	<SaveEntity {save} status={responseStatus} />
</div>

<style>
	.main {
		width: 100%;
	}
</style>
