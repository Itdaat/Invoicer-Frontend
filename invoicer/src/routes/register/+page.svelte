<script>
	import AccountIcon from '$lib/assets/icons/AccountIcon.svelte';
	import Input from '$lib/templates/Input.svelte';
	import BigTitle from '$lib/components/BigTitle.svelte';
    // import { _, dictionary, register } from 'svelte-i18n';
    /**
    * @type {'ordinary' | 'success' | 'error'}
   */
   let status = 'ordinary';

    let login = '';

    $: if(login.length == 1) {
        alert('hello');
        status = "error"
    } else if(login.length >= 10) {
        status = "success"
    } else {
        status = "ordinary";
    }

</script>

<div class="container">
    <div class="block">
         <BigTitle>Register</BigTitle>
        <Input placeHolder={'Register'} bind:value={login} status={status}>
            <AccountIcon slot="left" status={status}/>
        </Input>
    </div>
</div>


<style>
    .container {
        background: #FBFBFB;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .block {
        background: #FFFFFF;
        box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.1);
        border-radius: 7px;
        width: 460px;
        height: 521px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
</style>