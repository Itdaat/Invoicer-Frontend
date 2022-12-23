<script>
    export let value = '';
    export let disabled = false;
    export let placeHolder = '';
    export let success = false;
    export let error = true;

</script>


<div class="container">
    <div class="left">
        <slot name="left"></slot>
    </div>
    <input class="input" class:success  class:error placeholder={placeHolder} disabled={disabled} type="text" bind:value={value}>
    <div class="right">
        <slot name="right"></slot>
    </div>
</div>

<style>
    .container{
        display: flex;
    }

    .left {
        height: 100%;
        display: flex;
        align-items: center;
        padding-top: 4px;
    }

    .input  {
        display: block;
        border:none;
        height: 100%;
        border-bottom: 0.3px solid #3D5A80;
        margin-left: 13px;
        padding: 3px 13px;

        font-family: 'Istok Web';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 23px;

        letter-spacing: 1px;

        color: #3D5A80;

    }

    .input:focus {
        border: none;
        outline: none;
        border-bottom: 0.9px solid #3D5A80;
    }

    .success {
        color: #24A731;
        border-color: #24A731 !important;
    }

    .error {
        color: #B01A1A;
        border-color: #B01A1A !important;
    }
    
</style>