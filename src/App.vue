<template>
  <div id="app">

   <router-view></router-view>

  </div>
</template>

<script>
// import Home from '@/views/Home/index.vue'
export default {
  name: 'App',
  components: {
    // Home
  }

}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
