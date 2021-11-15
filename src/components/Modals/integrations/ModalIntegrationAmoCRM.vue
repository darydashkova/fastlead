<template>
  <div class="modal-integration-amo-crm" @mousedown.self="close">
    <div class="modal-integration-amo-crm__body">
        <div class="modal-integration-amo-crm__header">
      <BaseModalHeader> Подключение к amoCRM </BaseModalHeader>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="modal-integration-amo-crm__header-close pointer"  @click.self="close">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="#9797BB"/>
            </svg>
        </div>
      <!-- <div class="modal-integration-amo-crm__video" >
        <BaseVideoPlayer :video="video"></BaseVideoPlayer>
      </div> -->
      <div class="modal-integration-amo-crm__info">
        <div class="modal-integration-amo-crm__info-title">
          Как настроить интеграцию:
        </div>
        <ol class="modal-integration-amo-crm__info-list">
          <li>Авторизуйтесь в amoCRM</li>

          <li>Установите наш виджет “FastLead” в магазине amoCRM</li>
        </ol>
      </div>
      <div class="modal-integration-amo-crm__buttons">
        <BaseButton class="base-button_enter" @click="save"> Подключить интеграцию </BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from "../../Base/BaseButton.vue";
import BaseModalLabel from "../../Base/BaseModalLabel.vue";
import BaseModalText from "../../Base/BaseModalText.vue";
import BaseModalHint from "../../Base/BaseModalHint.vue";
import BaseModalHeader from "../../Base/BaseModalHeader.vue";
import BaseVideoPlayer from "../../Base/BaseVideoPlayer.vue";

import { onMounted, ref, reactive } from "vue";

export default {
  components: {
    BaseButton,
    BaseModalLabel,
    BaseModalText,
    BaseModalHint,
    BaseModalHeader,
    BaseVideoPlayer,
  },
  setup(props, { emit }) {
    const close = () => {
      emit("close");
    };
    const video = ref({
      src: "https://html5css.ru/html/mov_bbb.mp4",
    });

    const save = () => {
      emit("save");
    };

    return {
      save,
      close,
      video,
    };
  },
};
</script>

<style lang="scss">
.modal-integration-amo-crm {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.34);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
  &.z-index {
    z-index: 1400;
  }
  &__video {
    padding: 0px 20px;
    position: relative;
    .modal-send-videos__video {
      margin-top: 21px;
       max-height: fit-content;
    }
  }
  &__info {
    padding: 20px;
    &-title {
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      color: #f0f0fa;
      font-weight: 600;
      font-size: 18px;
    }
    &-list {
      padding-left: 20px;
      li {
        font-size: 16px;
        line-height: 130%;
        padding-bottom: 15px;
        color: #9797bb;
      }
    }
  }
  &__header{
    position: relative;
    &-close{
        position: absolute;
        top: 0;
        right: 16px;
    }
  }
}
.modal-integration-amo-crm__body {
  width: 528px;
  background: var(--modal-bg-color);
  border-radius: 9px;
  padding: 20px 0;
  text-align: left;
}
.modal-integration-amo-crm__input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 41px 0 0;
  &.modal-integration-amo-crm__input-group_padding-20 {
    padding: 0 20px;
  }
}
.modal-integration-amo-crm__input {
  font-family: Segoe UI;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 21px;
  margin: 8px 0 6px;
  width: 100%;
  padding: 6px 10px;

  color: var(--modal-font-color);
  background: var(--modal-element-hover-bg-color);
  border: 0.7px solid var(--modal-input-border-color);
  box-sizing: border-box;
  border-radius: 3px;
  &.chat__input_placeholder {
    color: var(--search-input-placeholder-color);
  }
}
.modal-integration-amo-crm__buttons {
  padding: 0 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  .base-button_enter{
    color: #252544;
  }
}
</style>