<template>
  <router-view/>
</template>

<script>
  import {useAuth} from "./composition/useAuth";
  import {useStyle} from "./composition/useStyle";

  export default {
    setup() {
      const {getCsrf} = useAuth()
      const {setStyle} = useStyle()
      setStyle(localStorage.getItem('style') === 'true')
      getCsrf();
    }
  }
</script>

<style lang="scss">
  @import "variables.scss";
  * {
    box-sizing: border-box;
  }
  body{
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: Segoe UI, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: --var(kek);
    border-radius: 11px;
  }
</style>
<style lang="scss" src="./fonts.scss"></style>
