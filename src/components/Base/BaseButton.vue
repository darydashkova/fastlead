<template>
    <div class="base-button">
        <slot></slot>
    </div>
</template>

<style lang="scss">
    .base-button {
        font-style: normal;
        font-weight: 550;
        font-size: 16px;
        line-height: 21px;
        color: var(--base-button);
        padding: 8px 32px;
        border-radius: 6px;
        cursor: pointer;
    }
    .base-button_enter {
        background: var(--green-color);
        border-radius: 6px;
        font-weight: 500;
    }
    .base-button_gradient{
        background: var(--green-color);
        border-radius: 6px;
        color: var(--base-button);
        cursor: pointer; 
    }
    .base-button_cancel {
        background: transparent;
        border: 1px solid #5EC075;
        background: var(--green-color);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        border-radius: 6px;
    }
    .base-button_delete {
        background: var(--red-color);
    }
    .base-button_p5-15 {
        padding: 8px 16px;
    }
    .base-button_p6-40 {
        padding: 6px 40px;
    }
    .base-button_p5-10 {
        padding: 5px 10px;
    }
    .base-button_w-100 {
        width: 100%;
    }
    .base-button_p11-24{
        padding: 11px 24px;
    }
    .base-button_fs12{
        font-size: 12px;
        line-height: 130%;
    }
      .base-button_border-green{
         border: 1px solid #5EC075;
        color: #5EC075;
        font-size: 12px;
        background-color: transparent;
        font-size: 16px;
        line-height: 130%;
        border-radius: 6px;

    }
</style>