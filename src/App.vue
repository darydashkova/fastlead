<template>
  <router-view v-if="!isRequesting"/>
</template>

<script>
  import { useAuth } from "./composition/useAuth";
  import { useStyle } from "./composition/useStyle";
  import "./components/emoji-component/css/emoji-mart.css";
  import { useUser } from "./composition/useUser";
  import { ref } from 'vue';
  export default {
    setup() {
      const { getCsrf } = useAuth();
      const { setStyle } = useStyle();
      const { getUser } = useUser();

      const isRequesting = ref(true);

      setStyle(localStorage.getItem('style') === 'true')
      getCsrf();
      getUser()
        .then(() => isRequesting.value = false);
      return {
        isRequesting,
      }
    }
  }
</script>

<style lang="scss">
  input, textarea, button {
    -webkit-appearance: none;
    -webkit-box-shadow: none;
    -moz-appearance: none;
    -moz-box-shadow: none;
    box-shadow: none;
    outline: none;
    resize: none;
    border: none;
     caret-color:var(--cursor-input-active);
  }
  * {
    box-sizing: border-box;
  }
  body{
    margin: 0;
    padding: 0;
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #app {
    text-align: center;
    color: #2c3e50;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    min-width: 992px;
  }
  .scroll {
    position: absolute;
    right: 5px;
    bottom: 5px;
    top: 5px;
    width: 6px;
    display: flex;
    justify-content: center;
    z-index: 10;
  }
  .scroll__bar {
    position: absolute;
    right: 0;
    height: 30px;
    width: 3px;
    border-radius: 11px;
    background: var(--webkit-scroll-color);
    transition: transform .5s ease, opacity .3s ease;
    opacity: 0;
  }

  .pointer {
    cursor: pointer;
  }
  .green-color {
    background: var(--green-color);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
  .shadows {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.39);
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .scroll-poiner{
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 4px;               /* ширина scrollbar */
    }
    &::-webkit-scrollbar-track {
      background: none;        /* цвет дорожки */
    }
    &::-webkit-scrollbar-thumb {
      background-color: #9797BB;    /* цвет плашки */
      border-radius: 20px;       /* закругления плашки */
      border: 3px solid none;  /* padding вокруг плашки */
    }
  }



</style>
<style lang="scss" src="./fonts.scss"></style>
