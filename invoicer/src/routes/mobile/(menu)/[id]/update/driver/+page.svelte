<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getFullPerson, updateFullPerson } from '$lib/api/server/persons';
	import { validateEmail } from '$lib/helpers/email';
	import { openErrorMessage } from '$lib/helpers/message';
	import { isValidTelNum } from '$lib/helpers/telNumber';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import SaveEntity from '$lib/mobile/components/SaveEntity.svelte';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { onMount } from 'svelte';
	import {
		driverTag,
		emailDataType,
		entityIsUsed,
		mobileDrivers,
		phoneDataType,
		unreachableError
	} from '../../../../../../consts';

	$: t = $LanguageStore;
	/** @type {import('src/types/Response').ResponseStatus}*/
	let responseStatus = 'none';
	const id = $page.params.id;
	/** @type {import('../../../../../../types/Entities').Person}*/
	let gPerson;

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

		if (!firstName) firstNameStatus = 'error';
		if (!lastName) lastNameStatus = 'error';
		if (!phone || !isValidTelNum(phone)) {
			phoneStatus = 'error';
			return;
		}
		if (email && !validateEmail(email)) {
			emailStatus = 'error';
			return;
		}
		if (!nickname) {
			nickNameErrorText = t.person_create_empty;
			nicknameStatus = 'error';
		}

		if (!firstName || !lastName || !nickname || !phone) return;
		responseStatus = 'inProcess';

		let contactData = [
			{
				id: gPerson.phone.id,
				typeId: phoneDataType,
				value: phone
			}
		];

		if (email != null && validateEmail(email))
			contactData.push({
				id: gPerson.email.id,
				typeId: emailDataType,
				value: email
			});

		// @ts-ignore
		const result = await updateFullPerson(id, firstName, lastName, nickname, contactData, [
			driverTag
		]);
		responseStatus = 'done';
		if (result.error?.code == entityIsUsed.code) {
			openErrorMessage(t.person_is_used);
			return;
		}
		if (result.error?.code == unreachableError.code) {
			openErrorMessage(t.message_unreachable_error);
			return;
		}
		history.back();
	};

	const getPersonFormatted = async () => {
		const personRes = await getFullPerson($page.params.id);
		if (personRes.error) {
			return;
		}
		const person = personRes.result;
		if (!person) {
			goto(mobileDrivers);
			openErrorMessage(t.person_wrong_person);
			return;
		}
		gPerson = person;
		firstName = person.firstName;
		lastName = person.lastName;
		nickname = person.nickname;
		phone = person.phone.value;
		email = person.email.value;
		return person;
	};

	onMount(() => {
		getPersonFormatted();
	});
</script>

<div class="main">
	<MiniCategory title={t.person_main}>
		<LabeledInput
			bind:value={firstName}
			status={firstNameStatus}
			label={t.person_create_first_name}
			message={t.person_create_empty}
		/>
		<LabeledInput
			bind:value={lastName}
			status={lastNameStatus}
			label={t.person_create_last_name}
			message={t.person_create_empty}
		/>
		<LabeledInput
			bind:value={nickname}
			status={nicknameStatus}
			label={t.person_create_nickname}
			message={nickNameErrorText}
		/>
	</MiniCategory>
	<MiniCategory title={t.person_create_contact_data}>
		<LabeledInput
			bind:value={phone}
			status={phoneStatus}
			label={t.person_create_phone}
			message={t.person_create_phone_not_valid}
			type="tel"
		/>

		<LabeledInput
			bind:value={email}
			status={emailStatus}
			label={t.person_create_email}
			message={t.person_create_email_not_valid}
		/>
	</MiniCategory>
	<SaveEntity {save} status={responseStatus} />
</div>

<style>
	.main {
		width: 100%;
	}
</style>
