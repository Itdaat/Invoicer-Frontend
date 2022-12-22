<script>
	import AccountIcon from './../../lib/assets/icons/AccountIcon.svelte';
	import BigTitle from './../../lib/components/BigTitle.svelte';
    import Input from '../../lib/templates/Input.svelte'

    const placeHolder = 'Login';

</script>

<div class="container">
    <div class="block">
         <BigTitle>Text</BigTitle>
        <Input placeHolder={placeHolder}>
            <AccountIcon/>
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