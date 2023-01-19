<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { deletePerson, getFullPerson } from '$lib/api/server/persons';
	import DeleteIcon from '$lib/assets/icons/DeleteIcon.svelte';
	import { openErrorMessage, openSuccessMessage } from '$lib/helpers/message';
	import ChangeEntity from '$lib/mobile/components/ChangeEntity.svelte';
	import GlobalMessages from '$lib/mobile/components/GlobalMessages.svelte';
	import ListItem from '$lib/mobile/components/ListItem.svelte';
	import MiniCategory from '$lib/mobile/components/MiniCategory.svelte';
	import MiniMenu from '$lib/mobile/templates/MiniMenu.svelte';
	import LanguageStore from '$lib/stores/Language';
	import { entityIsUsed, unreachableError } from '../../../../../consts';

	export let title = '';
	$: t = $LanguageStore;
	const id = $page.params.id;

	const sign = () => {};

	const getPersonFormatted = async () => {
		const personRes = await getFullPerson($page.params.id);
		if (personRes.error) {
			return;
		}
		const person = personRes.result;
		if (!person) {
			return;
		}
		title = person.nickname;
		return person;
	};

	const deletePersonClick = async () => {
		const result = await deletePerson(id);
		console.log(result);
		if (result.error?.code == entityIsUsed.code) {
			openErrorMessage(t.person_is_used);
			return;
		}
		if (result.error?.code == unreachableError.code) {
			openErrorMessage(t.message_unreachable_error);
			return;
		}
		goto('/mobile/drivers');
		openSuccessMessage(t.person_deleted_successfully);
	};
</script>

<MiniMenu {title}>
	<div class="actions" slot="actions">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="action-item" on:click={deletePersonClick}>
			<DeleteIcon />
			<div class="actions-item-title">{t.invoice_delete_title}</div>
		</div>
	</div>
	<div class="main" slot="main">
		{#await getPersonFormatted() then person}
			<MiniCategory title={t.person_main}>
				<ListItem
					name={t.person_create_first_name}
					value={person?.firstName}
					messageText={t.person_copied_first_name}
				/>
				<ListItem
					name={t.person_create_last_name}
					value={person?.lastName}
					messageText={t.person_copied_last_name}
				/>
			</MiniCategory>
			<MiniCategory title={t.person_create_contact_data}>
				<ListItem
					name={t.person_create_email}
					value={person?.email?.value}
					messageText={t.person_copied_email}
					noDataText={t.person_no_data_email}
				/>
				<ListItem
					name={t.person_create_phone}
					value={person?.phone?.value}
					messageText={t.person_copied_phone}
					noDataText={t.person_no_data_phone}
				/>
			</MiniCategory>
		{/await}
	</div>
</MiniMenu>
<ChangeEntity />
<GlobalMessages />

<style>
	.actions-item-title {
		font-family: 'Exo 2';
		font-style: normal;
		font-weight: 500;
		font-size: 17px;
		line-height: 40px;
		/* or 235% */

		letter-spacing: 1px;

		color: #204660;

		margin-left: 20px;
	}

	.action-item {
		display: flex;
		align-items: center;
		width: 90%;
		margin-left: 20px;
		margin-top: 3px;
	}

	.actions {
		width: 100%;
	}
</style>
