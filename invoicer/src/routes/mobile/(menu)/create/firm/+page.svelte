<script>
	import { createFirm } from '$lib/api/server/firm';
	import { validateEmail } from '$lib/helpers/email';
	import { isValidTelNum } from '$lib/helpers/telNumber';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import SaveEntity from '$lib/mobile/components/SaveEntity.svelte';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { notLatinSymbol } from '../../../../../consts';

	$: t = $LanguageStore;

	/** @type {import('src/types/Response').ResponseStatus}*/
	let responseStatus = 'none';

	/** @type {string} */
	let name;
	/** @type {string} */
	let email;
	/** @type {string} */
	let phoneNumber;
	/** @type {import('../../../../../types/Entities').Address} */
	let legalAddress;
	/** @type {import('../../../../../types/Entities').Address} */
	let postAddress;
	/** @type {string} */
	let ibanCode;
	/** @type {string} */
	let taxCode;

	// ~ post address

	/** @type {string} */
	let postalAddressCountry;
	/** @type {string} */
	let postalAddressCity;
	/** @type {string} */
	let postalAddressPostCode;
	/** @type {string} */
	let postalAddressStreet;
	/** @type {string} */
	let postalAddressHouseNumber;

	// ~ legal address

	/** @type {string} */
	let legalAddressCountry;
	/** @type {string} */
	let legalAddressCity;
	/** @type {string} */
	let legalAddressPostCode;
	/** @type {string} */
	let legalAddressStreet;
	/** @type {string} */
	let legalAddressHouseNumber;

	let emailMessage = '';
	let phoneNumberMessage = '';
	let taxMessage = '';

	/** @type {import('src/types/InputStatus').InputStatus}*/
	let nameStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let emailStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let phoneNumberStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let legalAddressStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let postAddressStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let ibanCodeStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let taxStatus = 'ordinary';

	/** @type {import('src/types/InputStatus').InputStatus}*/
	let postalAddressCountryStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let postalAddressCityStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let postalAddressStreetStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let postalAddressPostCodeStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let postalAddressHouseNumberStatus = 'ordinary';

	/** @type {import('src/types/InputStatus').InputStatus}*/
	let legalAddressCountryStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let legalAddressCityStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let legalAddressStreetStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let legalAddressPostCodeStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let legalAddressHouseNumberStatus = 'ordinary';

	const save = async () => {
		responseStatus = 'inProcess';
		nameStatus = emailStatus = phoneNumberStatus = legalAddressStatus = postAddressStatus = ibanCodeStatus = taxStatus = 'ordinary';
		postalAddressCountryStatus =
			postalAddressCityStatus =
			postalAddressStreetStatus =
			postalAddressPostCodeStatus =
			postalAddressHouseNumberStatus =
				'ordinary';
		legalAddressCountryStatus =
			legalAddressCityStatus =
			legalAddressStreetStatus =
			legalAddressPostCodeStatus =
			legalAddressHouseNumberStatus =
				'ordinary';

		if (!email) {
			emailMessage = t.firm_empty;
			emailStatus = 'error';
		} else if (!validateEmail(email)) {
			emailMessage = t.firm_email_invalid;
			emailStatus = 'error';
		}
		if (!phoneNumber) {
			phoneNumberMessage = t.firm_empty;
			phoneNumberStatus = 'error';
		} else if (!isValidTelNum(phoneNumber)) {
			phoneNumberMessage = t.firm_phone_invalid;
			phoneNumberStatus = 'error';
		}

		if (!postalAddressCountry) postalAddressCountryStatus = 'error';
		if (!postalAddressCity) postalAddressCityStatus = 'error';
		if (!postalAddressStreet) postalAddressStreetStatus = 'error';
		if (!postalAddressPostCode) postalAddressPostCodeStatus = 'error';
		if (!postalAddressHouseNumber) postalAddressHouseNumberStatus = 'error';

		if (!legalAddressCountry) legalAddressCountryStatus = 'error';
		if (!legalAddressCity) legalAddressCityStatus = 'error';
		if (!legalAddressStreet) legalAddressStreetStatus = 'error';
		if (!legalAddressPostCode) legalAddressPostCodeStatus = 'error';
		if (!legalAddressHouseNumber) legalAddressHouseNumberStatus = 'error';

		if (!ibanCode) ibanCodeStatus = 'error';
		if (!name) nameStatus = 'error';
		if (!taxCode) {
			taxStatus = 'error';
			taxMessage = t.firm_empty;
		}

		if (
			emailStatus == 'error' ||
			phoneNumberStatus == 'error' ||
			ibanCodeStatus == 'error' ||
			taxStatus == 'error' ||
			postalAddressCountryStatus == 'error' ||
			postalAddressCityStatus == 'error' ||
			postalAddressStreetStatus == 'error' ||
			postalAddressPostCodeStatus == 'error' ||
			postalAddressHouseNumberStatus == 'error' ||
			legalAddressCountryStatus == 'error' ||
			legalAddressCityStatus == 'error' ||
			legalAddressStreetStatus == 'error' ||
			legalAddressPostCodeStatus == 'error' ||
			legalAddressHouseNumberStatus == 'error'
		) {
			responseStatus = 'done';

			// console.log({
			// 	emailStatus,
			// 	phoneNumberStatus,
			// 	ibanCodeStatus,
			// 	taxStatus,
			// 	postalAddressCountryStatus,
			// 	postalAddressCityStatus,
			// 	postalAddressStreetStatus,
			// 	postalAddressPostCodeStatus,
			// 	postalAddressHouseNumberStatus,
			// 	legalAddressCountryStatus,
			// 	legalAddressCityStatus,
			// 	legalAddressStreetStatus,
			// 	legalAddressPostCodeStatus,
			// 	legalAddressHouseNumberStatus
			// });

			return;
		}

		legalAddress = {
			town: legalAddressCity,
			street: legalAddressStreet,
			country: legalAddressCountry,
			postCode: legalAddressPostCode,
			houseNumber: legalAddressHouseNumber
		};

		postAddress = {
			town: postalAddressCity,
			street: postalAddressStreet,
			country: postalAddressCountry,
			postCode: postalAddressPostCode,
			houseNumber: postalAddressHouseNumber
		};

		const result = await createFirm(name, taxCode, email, phoneNumber, legalAddress, postAddress, ibanCode);

		if (result.error?.code == notLatinSymbol.code) {
			taxMessage = t.firm_tax_code_not_latin;
			taxStatus = 'error';
		}
		// responseStatus = 'done';
	};
</script>

<div class="main">
	<MiniCategory title={t.firm_main}>
		<LabeledInput bind:value={name} status={nameStatus} label={t.firm_name} placeHolder={t.firm_name} message={t.firm_empty} />
		<LabeledInput bind:value={taxCode} status={taxStatus} label={t.firm_tax_code} placeHolder={t.firm_tax_code} message={taxMessage} />
	</MiniCategory>
	<MiniCategory title={t.firm_post_address}>
		<LabeledInput
			bind:value={postalAddressCountry}
			status={postalAddressCountryStatus}
			label={t.firm_address_country}
			placeHolder={t.firm_address_country}
			message={t.firm_empty}
		/>
		<LabeledInput
			bind:value={postalAddressPostCode}
			status={postalAddressPostCodeStatus}
			label={t.firm_address_postal_code}
			placeHolder={t.firm_address_postal_code}
			message={t.firm_empty}
		/>
		<LabeledInput
			bind:value={postalAddressCity}
			status={postalAddressCityStatus}
			label={t.firm_address_city}
			placeHolder={t.firm_address_city}
			message={t.firm_empty}
		/>
		<LabeledInput
			bind:value={postalAddressStreet}
			status={postalAddressStreetStatus}
			label={t.firm_address_street}
			placeHolder={t.firm_address_street}
			message={t.firm_empty}
		/>
		<LabeledInput
			bind:value={postalAddressHouseNumber}
			status={postalAddressHouseNumberStatus}
			label={t.firm_address_house_number}
			placeHolder={t.firm_address_house_number}
			message={t.firm_empty}
		/>
	</MiniCategory>
	<MiniCategory title={t.firm_legal_address}>
		<LabeledInput
			bind:value={legalAddressCountry}
			status={legalAddressCountryStatus}
			label={t.firm_address_country}
			placeHolder={t.firm_address_country}
			message={t.firm_empty}
		/>
		<LabeledInput
			bind:value={legalAddressPostCode}
			status={legalAddressPostCodeStatus}
			label={t.firm_address_postal_code}
			placeHolder={t.firm_address_postal_code}
			message={t.firm_empty}
		/>
		<LabeledInput
			bind:value={legalAddressCity}
			status={legalAddressCityStatus}
			label={t.firm_address_city}
			placeHolder={t.firm_address_city}
			message={t.firm_empty}
		/>
		<LabeledInput
			bind:value={legalAddressStreet}
			status={legalAddressStreetStatus}
			label={t.firm_address_street}
			placeHolder={t.firm_address_street}
			message={t.firm_empty}
		/>
		<LabeledInput
			bind:value={legalAddressHouseNumber}
			status={legalAddressHouseNumberStatus}
			label={t.firm_address_house_number}
			placeHolder={t.firm_address_house_number}
			message={t.firm_empty}
		/>
	</MiniCategory>
	<MiniCategory title={t.firm_contact_data}>
		<LabeledInput bind:value={email} status={emailStatus} label={t.firm_email} placeHolder={t.firm_email} message={emailMessage} />
		<LabeledInput bind:value={phoneNumber} status={phoneNumberStatus} label={t.firm_phone} placeHolder={t.firm_phone} message={phoneNumberMessage} />
	</MiniCategory>
	<MiniCategory title={t.firm_payment}>
		<LabeledInput bind:value={ibanCode} status={ibanCodeStatus} label={t.firm_iban_code} placeHolder={t.firm_iban_code} message={t.firm_empty} />
	</MiniCategory>
	<SaveEntity {save} status={responseStatus} />
</div>

<style>
	.main {
		width: 100%;
	}
</style>
