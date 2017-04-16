<template>
  <div>
    <div class="nav">
      <div class="logo"><router-link :to="{ path: 'tool' }">LOGO位置</router-link></div>
      <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo navbar" mode="horizontal"
               @select="handleSelect" router>
        <el-menu-item class="navbar-item" index="toolBorrow" :route="{name:'toolBorrow'}">工具借还</el-menu-item>
        <el-menu-item class="navbar-item" index="consumableBorrow" :route="{name:'consumables'}">耗材借还</el-menu-item>
        <el-menu-item class="navbar-item" index="user">用户管理</el-menu-item>
        <el-menu-item class="navbar-item" index="chemicals">航化品</el-menu-item>
      </el-menu>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '0'
      }
    },
    methods: {
      handleSelect: function (key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .nav {
    background: #324157;
    width: 100%;
    height: 60px;
    border-radius: 2px;
  }

  .nav .logo {
    height: 60px;
    line-height: 60px;
    float: left;
    color: #fff;
    padding: 0 20px;
    font-size: large;
  }

  .nav .navbar {
    width: 70% !important;
    float: right !important;
  }

  .nav .navbar-item {
    width: 25% !important;
    font-size: 20px;
  }

  .line {
    margin: 10px 0;
    height: 1px;
    background: #e0e6ed;
  }
  a:-webkit-any-link {
    color: white;
    text-decoration: none;
    cursor: auto;
  }
</style>
