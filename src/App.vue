<template>
  <!-- 在该页面的所有数据每个页面均会显示 -->
  <div id="app">
    <!-- 界面组合，导航栏+路由界面 -->
    <Header :isShow="flag" @setLogin="login"></Header>
    <router-view @setLogin="login"></router-view>
  </div>
</template>

<script>
  import Header from './components/Header'

  export default {
    data() {
      return {
        flag: true
      }
    },
    methods: {
      login(data) {
        this.flag = data;
      },
    },
    components: {
      Header
    },
    name: 'App'
  }
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin: 0;
    padding: 0;
  }
</style>
