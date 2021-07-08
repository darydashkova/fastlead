<template>
  <router-view/>
</template>

<script>
  import {useAuth} from "./composition/useAuth";
  import {useStyle} from "./composition/useStyle";
  import "./components/emoji-component/css/emoji-mart.css";
  import {useUser} from "./composition/useUser";
  export default {
    setup() {
      const {getCsrf} = useAuth();
      const {setStyle} = useStyle();
      const { getUser } = useUser();
      setStyle(localStorage.getItem('style') === 'true')
      getCsrf();
      getUser();
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
  }
  * {
    box-sizing: border-box;
  }
  body{
    margin: 0;
    padding: 0;
    font-family: Segoe UI, Avenir, Helvetica, Arial, sans-serif;
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
</style>
<style lang="scss" src="./fonts.scss"></style>
