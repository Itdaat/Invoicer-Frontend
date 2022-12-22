<script>
    export let value = '';
    export let disabled = false;
    export let placeHolder = '';

</script>


<div class="container">
    <div class="left">
        <slot></slot>
    </div>
    <input class="input" placeholder={placeHolder} disabled={disabled} type="text" bind:value={value}>
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
        /* identical to box height */

        letter-spacing: 1px;

        color: #3D5A80;

    }

    .input:focus {
        border: none;
        outline: none;
        border-bottom: 2px solid #3D5A80;
    }
</style>