<template>
  <div id="app">
    <navbar class="mcy-noprint"></navbar>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Navbar from './components/Navbar'//不能加后缀.vue,不知道为什么？难道文档改了？
  import Footer from  './components/Footer'

  Vue.component('navbar', Navbar)
  Vue.component('v-footer', Footer)
export default {
  name: 'app'
}
</script>

<style>
  @import "assets/print.css";
  .el-table__body-wrapper {
    overflow: hidden;
  }
</style>
