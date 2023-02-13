<script>
	import { page } from '$app/stores';
	import { getCurrentFirmId } from '$lib/api/server/firm';
	import { getOrder, updateOrder } from '$lib/api/server/order';
	import { createPerson, getDriverAutocomplete, getPerson, getPersonAllFields } from '$lib/api/server/persons';
	import { getTrailersAutocomplete, getTrucksAutocomplete } from '$lib/api/server/transport';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import SaveEntity from '$lib/mobile/components/SaveEntity.svelte';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	const firmId = getCurrentFirmId();
	const id = $page.params.id;

	$: t = $LanguageStore;

	/** @type {string | number} */
	let personId;

	let nickNameErrorText = '';

	/** @type {string} */
	let orderNumber;
	/** @type {string} */
	let driver;
	/** @type {string} */
	let truck;
	/** @type {string} */
	let trailer;
	/** @type {string} */
	let firstName;
	/** @type {string} */
	let lastName;
	/** @type {string} */
	let nickname;

	/** @type {import('src/types/Response').ResponseStatus}*/
	let responseStatus = 'none';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let firstNameStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let lastNameStatus = 'ordinary';
	/** @type {import('src/types/InputStatus').InputStatus}*/
	let nicknameStatus = 'ordinary';

	/** @type {'ordinary' | 'success' | 'error'}*/
	let orderNumberStatus = 'ordinary';
	/** @type {'ordinary' | 'success' | 'error'}*/
	let driverStatus = 'ordinary';
	/** @type {'ordinary' | 'success' | 'error'}*/
	let truckStatus = 'ordinary';
	/** @type {'ordinary' | 'success' | 'error'}*/
	let trailerStatus = 'ordinary';

	$: trucksSuggestions = getTrucksAutocomplete(truck);
	$: trailerSuggestions = getTrailersAutocomplete(trailer);
	$: driversSuggestions = getDriverAutocomplete(driver);

	const getOrderFormatted = async () => {
		const order = await getOrder(firmId, id);
		orderNumber = order.orderNumber;
		console.log(order);
		// driver = order.
		truck = order.truck.licenseNumber;
		trailer = order.trailer.licenseNumber;
		// status = order.orderStatusId == signedStatus ;
	};

	const updatePerson = async (id) => {
		if (!id) {
			firstName = lastName = nickname = null;
			return;
		}
		const person = (await getPerson(id)).result[0];
		firstName = person.firstName || '';
		lastName = person.lastName || '';
		nickname = person.nickname || '';
	};

	$: updatePerson(personId);

	onMount(() => getOrderFormatted());

	const save = async () => {
		responseStatus = 'inProcess';
		firstNameStatus = lastNameStatus = nicknameStatus = trailerStatus = driverStatus = truckStatus = orderNumberStatus = 'ordinary';

		if (!trailer) {
			trailerStatus = 'error';
		}

		if (!truck) {
			truckStatus = 'error';
		}

		if (!orderNumber) {
			orderNumberStatus = 'error';
		}

		if (!personId) {
			if (!firstName) {
				firstNameStatus = 'error';
			}

			if (!lastName) {
				lastNameStatus = 'error';
			}

			if (!nickname) {
				nicknameStatus = 'error';
				nickNameErrorText = t.person_create_empty;
			}
		}

		if (trailerStatus == 'error' || truckStatus == 'error' || orderNumberStatus == 'error') {
			return;
		}

		if (!personId) {
			if (firstNameStatus == 'error' || lastNameStatus == 'error' || nicknameStatus == 'error') {
				return;
			}
		}

		if (!personId) {
			let person = await createPerson(firstName, lastName, nickname);
			if (person.ok) {
				let newPerson = await getPersonAllFields({
					firstName: firstName,
					lastName: lastName,
					nickname: nickname
				});
				personId = newPerson[0].id || '';
			}
		}

		const firmId = getCurrentFirmId();

		const result = await updateOrder(id, firmId, truck, trailer, personId, orderNumber);
	};
</script>

<div class="main">
	<MiniCategory title={t.order_main}>
		<LabeledInput
			bind:value={orderNumber}
			status={orderNumberStatus}
			label={t.order_number}
			placeHolder={t.order_number}
			message={t.order_number_empty}
		/>
		<LabeledInput
			bind:value={driver}
			bind:pseudoValue={personId}
			status={driverStatus}
			label={t.order_person}
			placeHolder={t.order_person}
			message={t.order_person_empty}
			autocomplete
			suggestionsApi={driversSuggestions}
			selected={!personId}
			noText={t.order_driver_no_driver}
		/>
		{#if personId == null}
			<div transition:slide>
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
			</div>
		{/if}
	</MiniCategory>
	<MiniCategory title={t.order_transport}>
		<LabeledInput
			bind:value={truck}
			status={truckStatus}
			label={t.order_truck}
			placeHolder={t.order_truck}
			message={t.order_truck_empty}
			autocomplete
			suggestionsApi={trucksSuggestions}
		/>
		<LabeledInput
			bind:value={trailer}
			status={trailerStatus}
			label={t.order_trailer}
			placeHolder={t.order_trailer}
			message={t.order_truck_empty}
			autocomplete
			suggestionsApi={trailerSuggestions}
		/>
	</MiniCategory>
	<SaveEntity {save} status={responseStatus} />
</div>

<style>
	.main {
		width: 100%;
		overflow: hidden;
	}
</style>
