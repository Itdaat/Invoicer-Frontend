<script>
	import { getPersonAllFields } from '$lib/api/server/persons';
	import FilterStore from '$lib/stores/FilterStore';
	import FilterStoreHelper from '$lib/stores/FilterStoreHelper';
	import LanguageStore from '$lib/stores/Language';
	import LabeledInput from '$lib/templates/LabeledInput.svelte';
	import { onMount } from 'svelte';
	import MiniCategory from '../MiniCategory.svelte';
	$: t = $LanguageStore;
	let mounted = false;

	$: filters = $FilterStore;
	$: filterStoreHelper = $FilterStoreHelper;
	// const filters = JSON.parse(localStorage.getItem('filter') || '{}');

	/**
	 * @type {any}
	 */
	let nickname;
	/**
	 * @type {any}
	 */
	let firstName;
	/**
	 * @type {any}
	 */
	let lastName;
	/**
	 * @type {any}
	 */
	let email;
	/**
	 * @type {any}
	 */
	let phone;

	onMount(async () => {
		nickname = filters?.nickname;
		firstName = filters?.firstName;
		lastName = filters?.lastName;
		email = filters?.email;
		phone = filters?.phone;
		mounted = true;
		// @ts-ignore
		getDriversFormatted({ nickname, firstName, lastName, email, phone }).then((res) =>
			FilterStoreHelper.set({ count: res.length })
		);
	});

	const getDriversFormatted = async (filters) => {
		return await getPersonAllFields({
			...filters
		});
	};

	$: {
		if (filterStoreHelper.cleared) {
			nickname = firstName = lastName = email = phone = null;
			filterStoreHelper.cleared = false;
			// @ts-ignore
			getDriversFormatted({ nickname, firstName, lastName, email, phone }).then((res) =>
				FilterStoreHelper.set({ count: res.length })
			);
		}
	}

	$: {
		nickname = nickname == '' ? null : nickname;
		firstName = firstName == '' ? null : firstName;
		lastName = lastName == '' ? null : lastName;
		email = email == '' ? null : email;
		phone = phone == '' ? null : phone;

		// console.log(filters);
		if (
			// (!nickname && !firstName && !lastName && !email && !phone) ||
			(nickname == filters.nickname &&
				firstName == filters.firstName &&
				lastName == filters.lastName &&
				email == filters.email &&
				phone == filters.phone) ||
			!mounted
		) {
		} else {
			FilterStore.set({ nickname, firstName, lastName, email, phone });
			// @ts-ignore
			getDriversFormatted({ nickname, firstName, lastName, email, phone }).then((res) =>
				FilterStoreHelper.set({ count: res.length })
			);
		}
	}
</script>

<div class="main">
	<MiniCategory title={t.person_main}>
		<LabeledInput
			bind:value={firstName}
			label={t.person_create_first_name}
			placeHolder={t.person_create_first_name_placeholder}
		/>
		<LabeledInput
			bind:value={lastName}
			label={t.person_create_last_name}
			placeHolder={t.person_create_last_name_placeholder}
		/>
		<LabeledInput
			bind:value={nickname}
			label={t.person_create_nickname}
			placeHolder={t.person_create_nickname}
		/>
	</MiniCategory>
	<MiniCategory title={t.person_create_contact_data}>
		<LabeledInput
			bind:value={phone}
			label={t.person_create_phone}
			type="tel"
			placeHolder={t.person_create_phone_placeholder}
		/>
		<LabeledInput
			bind:value={email}
			label={t.person_create_email}
			placeHolder={t.person_create_email_placeholder}
		/>
	</MiniCategory>
</div>

<style>
	.main {
		width: 100%;
		margin-left: -10px;
		margin-top: -10px;
	}
</style>
